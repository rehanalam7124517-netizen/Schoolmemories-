import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const BATCH_KEY = 'mtps-og-2025-26';
const MAX_INLINE_DATA_CHARS = 720000;
const CHUNK_CHAR_SIZE = 450000;
const MAX_VIDEO_SYNC_BYTES = 12 * 1024 * 1024;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write'
};

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

function sanitizeId(raw) {
  const clean = String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
  return clean || ('doc-' + Date.now());
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('File read error'));
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl, fallbackType = 'application/octet-stream') {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.includes(',')) return null;
  const [head, body] = dataUrl.split(',');
  const mime = (head.match(/data:([^;]+)/) || [])[1] || fallbackType;
  const bin = atob(body);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function compressImageToDataUrl(fileOrBlob, maxSide = 1280, maxChars = 480000) {
  if (!fileOrBlob) return '';
  if (!String(fileOrBlob.type || '').startsWith('image/')) {
    return blobToDataUrl(fileOrBlob);
  }
  const objUrl = URL.createObjectURL(fileOrBlob);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Image decode error'));
      el.src = objUrl;
    });
    const natW = img.naturalWidth || 1;
    const natH = img.naturalHeight || 1;
    let scale = Math.min(1, maxSide / Math.max(natW, natH));
    const qualities = [0.8, 0.68, 0.56, 0.44];
    for (let attempt = 0; attempt < qualities.length; attempt++) {
      const w = Math.max(1, Math.round(natW * scale));
      const h = Math.max(1, Math.round(natH * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      const out = canvas.toDataURL('image/jpeg', qualities[attempt]);
      if (out.length <= maxChars || attempt === qualities.length - 1) {
        return out;
      }
      scale *= 0.8;
    }
    return '';
  } finally {
    URL.revokeObjectURL(objUrl);
  }
}

async function encodeMediaForCloud(id, blob, mimeType, isImageMaxSide = 1280) {
  if (!blob) return { inlineData: '', chunked: false, chunkCount: 0, mimeType: mimeType || '' };
  const resolvedType = mimeType || blob.type || 'application/octet-stream';
  if (resolvedType.startsWith('image/')) {
    const dataUrl = await compressImageToDataUrl(blob, isImageMaxSide, 520000);
    if (dataUrl.length <= MAX_INLINE_DATA_CHARS) {
      return { inlineData: dataUrl, chunked: false, chunkCount: 0, mimeType: 'image/jpeg' };
    }
  }
  if (blob.size > MAX_VIDEO_SYNC_BYTES) {
    throw new Error('FILE_TOO_LARGE_FOR_CLOUD');
  }
  const dataUrl = await blobToDataUrl(blob);
  if (dataUrl.length <= MAX_INLINE_DATA_CHARS) {
    return { inlineData: dataUrl, chunked: false, chunkCount: 0, mimeType: resolvedType };
  }
  // Split into ordered 450KB chunks in mediaChunks collection
  const safeMediaId = sanitizeId(id);
  const totalChunks = Math.ceil(dataUrl.length / CHUNK_CHAR_SIZE);
  const created = Date.now();
  const batchSize = 5;
  for (let start = 0; start < totalChunks; start += batchSize) {
    const batch = writeBatch(db);
    const end = Math.min(totalChunks, start + batchSize);
    for (let idx = start; idx < end; idx++) {
      const chunkId = `${safeMediaId}_c_${idx}`;
      const slice = dataUrl.slice(idx * CHUNK_CHAR_SIZE, (idx + 1) * CHUNK_CHAR_SIZE);
      batch.set(doc(db, 'mediaChunks', chunkId), {
        id: chunkId,
        batchKey: BATCH_KEY,
        mediaId: safeMediaId,
        index: idx,
        data: slice,
        created
      });
    }
    try {
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'mediaChunks');
    }
  }
  return { inlineData: '', chunked: true, chunkCount: totalChunks, mimeType: resolvedType };
}

const chunkDownloadCache = new Map();
async function resolveCloudBlob(id, inlineData, chunked, mimeType, chunkCount = 0) {
  if (inlineData) {
    return dataUrlToBlob(inlineData, mimeType);
  }
  if (!chunked || !chunkCount) return null;
  const safeMediaId = sanitizeId(id);
  if (chunkDownloadCache.has(safeMediaId)) {
    return chunkDownloadCache.get(safeMediaId);
  }
  const promise = (async () => {
    try {
      const refs = Array.from({ length: chunkCount }, (_, idx) =>
        getDoc(doc(db, 'mediaChunks', `${safeMediaId}_c_${idx}`))
      );
      const snaps = await Promise.all(refs);
      const parts = snaps
        .filter((s) => s.exists())
        .map((s) => s.data())
        .sort((a, b) => (a.index || 0) - (b.index || 0));
      if (parts.length !== chunkCount) return null;
      const fullDataUrl = parts.map((p) => p.data || '').join('');
      return dataUrlToBlob(fullDataUrl, mimeType);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'mediaChunks');
      return null;
    }
  })();
  chunkDownloadCache.set(safeMediaId, promise);
  return promise;
}

const unsubs = [];
function stopSync() {
  while (unsubs.length) {
    try { unsubs.pop()(); } catch {}
  }
}

function subscribeCollection(colName, onData) {
  const q = query(collection(db, colName), where('batchKey', '==', BATCH_KEY));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const rows = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData(rows, snapshot);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, colName);
      } catch (logged) {
        console.warn(`[OGCloud] ${colName} listener notice:`, logged.message);
      }
    }
  );
  unsubs.push(unsub);
  return unsub;
}

async function upsertDoc(colName, docId, payload, opType = OperationType.WRITE) {
  const id = sanitizeId(docId);
  const path = `${colName}/${id}`;
  try {
    await setDoc(doc(db, colName, id), { ...payload, id, batchKey: BATCH_KEY }, { merge: false });
    return true;
  } catch (error) {
    handleFirestoreError(error, opType, path);
    return false;
  }
}

async function patchDoc(colName, docId, fields, fallbackFullPayload = null) {
  const id = sanitizeId(docId);
  const path = `${colName}/${id}`;
  try {
    await updateDoc(doc(db, colName, id), fields);
    return true;
  } catch (error) {
    if (error?.code === 'not-found' && fallbackFullPayload) {
      return upsertDoc(colName, id, fallbackFullPayload, OperationType.WRITE);
    }
    handleFirestoreError(error, OperationType.UPDATE, path);
    return false;
  }
}

window.OGCloud = {
  BATCH_KEY,
  dataUrlToBlob,
  resolveCloudBlob,
  stopSync,

  startRealtimeSync(handlers = {}) {
    stopSync();
    if (handlers.onGroupMessages) subscribeCollection('groupMessages', handlers.onGroupMessages);
    if (handlers.onMediaItems) subscribeCollection('mediaItems', handlers.onMediaItems);
    if (handlers.onProfiles) subscribeCollection('profiles', handlers.onProfiles);
    if (handlers.onJourneys) subscribeCollection('journeys', handlers.onJourneys);
    if (handlers.onMediaMeta) subscribeCollection('mediaMeta', handlers.onMediaMeta);
    if (handlers.onLetters) subscribeCollection('letters', handlers.onLetters);
    if (handlers.onHiddenMedia) subscribeCollection('hiddenMedia', handlers.onHiddenMedia);
    if (handlers.onAppState) subscribeCollection('appState', handlers.onAppState);
  },

  async pushMessage(msg) {
    const id = sanitizeId(msg.id);
    let mediaInfo = { inlineData: '', chunked: false, chunkCount: 0, mimeType: msg.mediaType || '' };
    if (msg.mediaBlob) {
      mediaInfo = await encodeMediaForCloud(id, msg.mediaBlob, msg.mediaType, 1280);
    } else if (msg.mediaData) {
      mediaInfo = {
        inlineData: msg.mediaData,
        chunked: Boolean(msg.chunked),
        chunkCount: Number(msg.chunkCount || 0),
        mimeType: msg.mediaType || ''
      };
    }
    const payload = {
      id,
      batchKey: BATCH_KEY,
      groupId: String(msg.groupId || 'grp-og-legends').slice(0, 64),
      sender: String(msg.sender || 'Legend').slice(0, 80),
      text: String(msg.text || '').slice(0, 4000),
      mediaData: mediaInfo.inlineData || '',
      mediaType: String(mediaInfo.mimeType || '').slice(0, 80),
      mediaName: String(msg.mediaName || '').slice(0, 200),
      chunked: Boolean(mediaInfo.chunked),
      chunkCount: Number(mediaInfo.chunkCount || 0),
      replyTo: msg.replyTo
        ? {
            id: String(msg.replyTo.id || '').slice(0, 128),
            sender: String(msg.replyTo.sender || 'Legend').slice(0, 80),
            snippet: String(msg.replyTo.snippet || '').slice(0, 400)
          }
        : null,
      reactions: msg.reactions && typeof msg.reactions === 'object' ? msg.reactions : {},
      created: Number(msg.created || Date.now()),
      updated: Number(msg.updated || msg.created || Date.now()),
      deleted: Boolean(msg.deleted)
    };
    return upsertDoc('groupMessages', id, payload, OperationType.CREATE);
  },

  async updateMessageReactions(msg, reactions) {
    const msgId = typeof msg === 'string' ? msg : msg.id;
    const nextReactions = reactions && typeof reactions === 'object' ? reactions : {};
    const fallback = typeof msg === 'object' && msg ? { ...msg, reactions: nextReactions, updated: Date.now() } : null;
    if (fallback) {
      fallback.batchKey = BATCH_KEY;
      fallback.groupId = String(fallback.groupId || 'grp-og-legends').slice(0, 64);
      fallback.text = String(fallback.text || '').slice(0, 4000);
      fallback.deleted = Boolean(fallback.deleted);
      fallback.created = Number(fallback.created || Date.now());
      delete fallback.mediaBlob;
    }
    return patchDoc('groupMessages', msgId, {
      reactions: nextReactions,
      updated: Date.now()
    }, fallback);
  },

  async markMessageDeleted(msg) {
    const msgId = typeof msg === 'string' ? msg : msg.id;
    const nowTs = Date.now();
    const fallback = typeof msg === 'object' && msg ? {
      id: sanitizeId(msgId),
      batchKey: BATCH_KEY,
      groupId: String(msg.groupId || 'grp-og-legends').slice(0, 64),
      sender: String(msg.sender || 'Legend').slice(0, 80),
      text: String(msg.text || '').slice(0, 4000),
      created: Number(msg.created || nowTs),
      updated: nowTs,
      deleted: true
    } : null;
    return patchDoc('groupMessages', msgId, {
      deleted: true,
      updated: nowTs
    }, fallback);
  },

  async pushMediaItem(item) {
    const id = sanitizeId(item.id);
    let mediaInfo = { inlineData: item.dataUrl || '', chunked: Boolean(item.chunked), chunkCount: Number(item.chunkCount || 0), mimeType: item.mimeType || '' };
    if (item.blob && !item.dataUrl && !item.chunked) {
      mediaInfo = await encodeMediaForCloud(id, item.blob, item.blob.type, 1280);
    }
    const payload = {
      id,
      batchKey: BATCH_KEY,
      folderId: String(item.folderId || (item.type === 'video' ? 'builtin-videos' : 'builtin-photos')).slice(0, 64),
      type: item.type === 'video' ? 'video' : 'photo',
      name: String(item.name || 'Batch Memory').slice(0, 200),
      mimeType: String(mediaInfo.mimeType || '').slice(0, 80),
      dataUrl: mediaInfo.inlineData || '',
      chunked: Boolean(mediaInfo.chunked),
      chunkCount: Number(mediaInfo.chunkCount || 0),
      addedBy: String(item.addedBy || 'Legend').slice(0, 80),
      created: Number(item.created || Date.now()),
      updated: Number(item.updated || item.created || Date.now()),
      deleted: Boolean(item.deleted)
    };
    return upsertDoc('mediaItems', id, payload, OperationType.CREATE);
  },

  async markMediaDeleted(mediaId, deleted = true) {
    return patchDoc('mediaItems', mediaId, {
      deleted: Boolean(deleted),
      updated: Date.now()
    });
  },

  async pushProfile(p) {
    const id = sanitizeId(p.id);
    let imageData = p.imageData || '';
    if (p.imageBlob) {
      imageData = await compressImageToDataUrl(p.imageBlob, 560, 420000);
    }
    const payload = {
      id,
      batchKey: BATCH_KEY,
      builtin: Boolean(p.builtin),
      order: Number(p.order ?? 999),
      n: String(p.n || 'Legend').slice(0, 80),
      nick: String(p.nick || '').slice(0, 80),
      title: String(p.title || '').slice(0, 100),
      nature: String(p.nature || '').slice(0, 80),
      special: String(p.special || '').slice(0, 100),
      memory: String(p.memory || '').slice(0, 3000),
      image: String(p.image || 'assets/common.jpg').slice(0, 300),
      imageData,
      profileVer: Number(p.profileVer || 2),
      updated: Number(p.updated || Date.now()),
      deleted: Boolean(p.deleted)
    };
    return upsertDoc('profiles', id, payload, OperationType.WRITE);
  },

  async markProfileDeleted(profileId, deleted = true) {
    return patchDoc('profiles', profileId, {
      deleted: Boolean(deleted),
      updated: Date.now()
    });
  },

  async pushJourney(j) {
    const id = sanitizeId(j.id);
    let mediaData = j.mediaData || '';
    let mediaType = j.mediaType || '';
    if (j.mediaBlob && !mediaData) {
      const encoded = await encodeMediaForCloud(id, j.mediaBlob, j.mediaType || j.mediaBlob.type, 1100);
      mediaData = encoded.inlineData;
      mediaType = encoded.mimeType;
    }
    const payload = {
      id,
      batchKey: BATCH_KEY,
      date: String(j.date || '').slice(0, 100),
      title: String(j.title || '').slice(0, 160),
      message: String(j.message || '').slice(0, 4000),
      order: Number(j.order || Date.now()),
      builtin: Boolean(j.builtin),
      mediaData,
      mediaType: String(mediaType || '').slice(0, 80),
      updated: Number(j.updated || Date.now()),
      deleted: Boolean(j.deleted)
    };
    return upsertDoc('journeys', id, payload, OperationType.WRITE);
  },

  async markJourneyDeleted(journeyId, deleted = true) {
    return patchDoc('journeys', journeyId, {
      deleted: Boolean(deleted),
      updated: Date.now()
    });
  },

  async pushMediaMeta(m) {
    const id = sanitizeId(m.id);
    return upsertDoc('mediaMeta', id, {
      id,
      batchKey: BATCH_KEY,
      date: String(m.date || '').slice(0, 120),
      caption: String(m.caption || '').slice(0, 500),
      updated: Number(m.updated || Date.now())
    }, OperationType.WRITE);
  },

  async pushLetter(l) {
    const id = sanitizeId(l.id);
    return upsertDoc('letters', id, {
      id,
      batchKey: BATCH_KEY,
      text: String(l.text || '').slice(0, 8000),
      updated: Number(l.updated || Date.now())
    }, OperationType.WRITE);
  },

  async setHiddenMedia(mediaId, hidden = true) {
    const id = sanitizeId(mediaId);
    return upsertDoc('hiddenMedia', id, {
      id,
      batchKey: BATCH_KEY,
      hidden: Boolean(hidden),
      updated: Date.now()
    }, OperationType.WRITE);
  },

  async pushMemoryOfDay(ids) {
    return upsertDoc('appState', 'memoryOfDay', {
      id: 'memoryOfDay',
      batchKey: BATCH_KEY,
      ids: Array.isArray(ids) ? ids.slice(0, 30).map((x) => String(x)) : [],
      updated: Date.now()
    }, OperationType.WRITE);
  }
};

window.dispatchEvent(new CustomEvent('ogcloud:ready'));
