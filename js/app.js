const HAS_SMALLCAPS = /[ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ]/;
const PEOPLE = [
  { n: 'Rehan', nick: 'CEO', title: 'The CEO', nature: 'Moody', special: 'Always Helpful', memory: 'The one who was always there when the group needed someone. From lighthearted moments to serious ones, every memory carries its own story.' },
  { n: 'Abdul', nick: 'Unpredictable', title: 'The Unpredictable', nature: 'Situational', special: 'Best Player', memory: 'The one whose next move was always impossible to guess. From games to classroom moments, he always kept things interesting.' },
  { n: 'Rabsana', nick: 'Rabsi', title: 'The Wild One', nature: 'Mastikhor', special: 'Unpredictable Energy', memory: 'The mischief and spontaneous moments with Rabsi are things none of us will ever forget.' },
  { n: 'Saniya', nick: 'Pyaari', title: 'The Sweet One', nature: 'Sweet', special: 'Warm Vibe', memory: 'A kind soul with an effortless, genuine warmth. Some people become part of your favourite memories without even trying.' },
  { n: 'Sonu', nick: 'Gulabo', title: 'The Gulabo', nature: 'Shararti', special: 'Pure Fun', memory: 'Gulabo and his nonstop banter — those classroom jokes will always remain an inseparable part of our school years.' },
  { n: 'Amrendra', nick: 'Bhaukali', title: 'The Bhaukali', nature: 'Bold', special: 'Signature Attitude', memory: 'The Bhaukali energy was always distinct. The confidence, the timing, and the fun — everything had a style of its own.' },
  { n: 'Amrit', nick: 'Tandoor', title: 'The Tandoor', nature: 'Playful', special: 'Good Vibes', memory: 'Tandoor — one nickname, and far too many hilarious memories. That spark turned ordinary afternoons into stories.' },
  { n: 'Aniket', nick: 'Kallu', title: 'The Kallu', nature: 'Energetic', special: 'Troublemaker', memory: 'Kallu was always full of energy. Wherever mischief was happening, there was a good chance Aniket was right in the middle of it.' },
  { n: 'Krishna', nick: 'Maharaj', title: 'The Maharaj', nature: 'Cool', special: 'Royal Presence', memory: 'Maharaj — the name itself said everything. That calm presence and those shared classroom moments made him unforgettable.' },
  { n: 'Hemant', nick: 'Sustmal', title: 'The Sustmal', nature: 'Laid-back', special: 'Sleepyhead', memory: 'Sustmal — the unhurried vibe and quiet humour are what set Hemant apart. Some memories do not need noise to be remembered.' },
  { n: 'Depanshu', nick: 'Nautanki', title: 'The Nautanki', nature: 'Dramatic', special: 'Drama King', memory: 'Nautanki — the theatrics and humour never failed to keep the whole group entertained. Those scenes are ones we will always smile back on.' }
];

const $ = (id) => document.getElementById(id);
const pageEls = [...document.querySelectorAll('.page')];
const drawerNavItems = [...document.querySelectorAll('.drawer-item[data-nav-page]')];
const bottomNavItems = [...document.querySelectorAll('.bnav-item[data-nav-page]')];
const PAGE_TITLES = [
  'The OG Legends',
  'The Legends',
  'Our Journey',
  'Photos',
  'Videos',
  'Memories of the Day',
  'Memory Wall',
  '5-Memory Vault',
  'Not The End'
];
const THEME_META_COLORS = {
  'obsidian-gold': '#0a0b0f',
  'midnight-emerald': '#070d0c',
  'cobalt-studio': '#090c14',
  'warm-parchment': '#f6f4ee'
};

function applyTheme(themeId, persist = true) {
  const valid = THEME_META_COLORS[themeId] ? themeId : 'obsidian-gold';
  document.documentElement.dataset.theme = valid;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_META_COLORS[valid]);
  document.querySelectorAll('#themePicker .theme-swatch-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.themeChoice === valid);
  });
  if (persist) localStorage.setItem('og_theme', valid);
}

applyTheme(localStorage.getItem('og_theme') || 'obsidian-gold', false);

let currentPage = 0;
const RANDOM_PAGE_IDX = pageEls.findIndex((p) => p.id === 'randomPage');
let randomBatchShown = false;

let isApplyingHistory = false;
let lastModalClosedAt = 0;
let currentHistState = { ogApp: true, ogDepth: 0, page: 0, drawer: false, modals: [], msgThread: false };
const histStack = [currentHistState];

function pushHistState(partial) {
  const next = {
    ...currentHistState,
    ...partial,
    ogApp: true,
    ogDepth: currentHistState.ogDepth + 1
  };
  histStack.length = currentHistState.ogDepth + 1;
  histStack.push(next);
  currentHistState = next;
  history.pushState(next, '', location.href);
}

function replaceHistState(partial) {
  const next = {
    ...currentHistState,
    ...partial,
    ogApp: true
  };
  histStack[currentHistState.ogDepth] = next;
  currentHistState = next;
  history.replaceState(next, '', location.href);
}

function openNavDrawerUI() {
  $('appNavDrawer')?.classList.add('open');
  if ($('drawerBackdrop')) $('drawerBackdrop').hidden = false;
}

function closeNavDrawerUI() {
  $('appNavDrawer')?.classList.remove('open');
  if ($('drawerBackdrop')) $('drawerBackdrop').hidden = true;
}

function openNavDrawer() {
  if ($('appNavDrawer')?.classList.contains('open')) return;
  openNavDrawerUI();
  if (!isApplyingHistory) {
    pushHistState({ drawer: true });
  }
}

function closeNavDrawer(fromHistory = false) {
  const wasOpen = $('appNavDrawer')?.classList.contains('open');
  closeNavDrawerUI();
  if (!fromHistory && !isApplyingHistory && wasOpen && currentHistState.drawer && currentHistState.ogDepth > 0) {
    history.back();
  }
}

function openDialog(dlg) {
  if (!dlg || dlg.open) return;
  dlg.showModal();
  if (isApplyingHistory) return;
  const openIds = [...document.querySelectorAll('dialog[open]')].map((d) => d.id);
  const justReplacedModal = Date.now() - lastModalClosedAt < 80 && currentHistState.modals.length >= openIds.length;
  if (justReplacedModal) {
    replaceHistState({
      drawer: false,
      modals: openIds,
      msgThread: openIds.includes('messagesDialog') ? currentHistState.msgThread : false
    });
  } else {
    pushHistState({
      drawer: false,
      modals: openIds,
      msgThread: openIds.includes('messagesDialog') ? currentHistState.msgThread : false
    });
  }
}

function resetRandomBatch() {
  randomBatchShown = false;
  const host = $('randomBatch');
  if (host) host.innerHTML = '';
  if ($('randomBtn')) {
    $('randomBtn').hidden = false;
    $('randomBtn').disabled = false;
  }
  if ($('randomBack')) $('randomBack').hidden = true;
}

function syncPageUI(i, persist = true) {
  const was = currentPage;
  currentPage = Math.max(0, Math.min(i, pageEls.length - 1));
  pageEls.forEach((p, idx) => p.classList.toggle('active', idx === currentPage));
  drawerNavItems.forEach((btn) => btn.classList.toggle('active', Number(btn.dataset.navPage) === currentPage));
  bottomNavItems.forEach((btn) => btn.classList.toggle('active', Number(btn.dataset.navPage) === currentPage));
  if ($('appBarTitle')) $('appBarTitle').textContent = PAGE_TITLES[currentPage] || 'The OG Legends';
  if ($('topBackBtn')) $('topBackBtn').hidden = currentPage === 0;
  closeNavDrawerUI();
  const active = pageEls[currentPage];
  if (active) active.scrollTop = 0;
  if (currentPage === RANDOM_PAGE_IDX && was !== RANDOM_PAGE_IDX) resetRandomBatch();
  if (persist) localStorage.setItem('og_last_page', String(currentPage));
}

function showPage(i, persist = true) {
  const target = Math.max(0, Math.min(i, pageEls.length - 1));
  const wasDrawerOpen = currentHistState.drawer;
  closeNavDrawerUI();

  if (isApplyingHistory) {
    syncPageUI(target, persist);
    return;
  }

  if (wasDrawerOpen) {
    if (target === currentPage && !currentHistState.modals.length) {
      if (currentHistState.ogDepth > 0) history.back();
      return;
    }
    replaceHistState({ page: target, drawer: false, modals: [], msgThread: false });
    syncPageUI(target, persist);
    return;
  }

  const hasOpenModals = currentHistState.modals.length > 0;
  if (target === currentPage && !hasOpenModals) return;

  if (Date.now() - lastModalClosedAt < 80 && hasOpenModals) {
    replaceHistState({ page: target, drawer: false, modals: [], msgThread: false });
  } else {
    pushHistState({ page: target, drawer: false, modals: [], msgThread: false });
  }
  syncPageUI(target, persist);
}

function goBackInApp() {
  if (currentHistState.ogDepth > 0) {
    history.back();
  } else if (currentPage > 0) {
    showPage(0);
  }
}

$('brandHomeBtn')?.addEventListener('click', () => showPage(0));
$('topBackBtn')?.addEventListener('click', goBackInApp);
$('enterMemoriesBtn')?.addEventListener('click', () => showPage(1));
$('heroMessagesBtn')?.addEventListener('click', () => { closeNavDrawerUI(); openMessagesDialog(); });
$('bottomChatsBtn')?.addEventListener('click', () => { closeNavDrawerUI(); openMessagesDialog(); });
$('homeOpenMsgCard')?.addEventListener('click', () => openMessagesDialog());
$('homeJourneyBtn')?.addEventListener('click', () => showPage(2));
$('homeAddPhotoBtn')?.addEventListener('click', async () => {
  if (await addMedia('photo')) showPage(3);
});
$('homeAddVideoBtn')?.addEventListener('click', async () => {
  if (await addMedia('video')) showPage(4);
});

[...drawerNavItems, ...bottomNavItems].forEach((btn) => {
  btn.addEventListener('click', () => showPage(Number(btn.dataset.navPage || 0)));
});

document.querySelectorAll('.jump-btn').forEach((b) => {
  b.addEventListener('click', () => {
    closeNavDrawerUI();
    showPage(+b.dataset.target);
  });
});

// Android Add Media & Chapters Bottom Sheet
function openAddSheet() {
  openDialog($('addSheetDialog'));
}

$('mainFab')?.addEventListener('click', openAddSheet);
$('railFabBtn')?.addEventListener('click', () => { closeNavDrawerUI(); openAddSheet(); });
$('menuDrawerBtn')?.addEventListener('click', openNavDrawer);
$('closeDrawerBtn')?.addEventListener('click', () => closeNavDrawer(false));
$('drawerBackdrop')?.addEventListener('click', () => closeNavDrawer(false));
$('drawerThemeBtn')?.addEventListener('click', () => {
  closeNavDrawerUI();
  $('toolsBtn')?.click();
});

$('sheetAddPhotoBtn')?.addEventListener('click', async () => {
  $('addSheetDialog')?.close();
  if (await addMedia('photo')) showPage(3);
});

$('sheetAddVideoBtn')?.addEventListener('click', async () => {
  $('addSheetDialog')?.close();
  if (await addMedia('video')) showPage(4);
});

$('sheetAddJourneyBtn')?.addEventListener('click', () => {
  $('addSheetDialog')?.close();
  openDialog($('newJourneyDialog'));
});

$('sheetAddProfileBtn')?.addEventListener('click', () => {
  $('addSheetDialog')?.close();
  openDialog($('newProfileDialog'));
});

// Sync every <dialog> with mobile Back button, Escape key, and backdrop tap
document.querySelectorAll('dialog').forEach((dlg) => {
  dlg.addEventListener('cancel', (e) => {
    e.preventDefault();
    if (dlg.id === 'messagesDialog' && $('msgThreadPane')?.classList.contains('mobile-show')) {
      if (currentHistState.msgThread && currentHistState.ogDepth > 0) {
        history.back();
      } else {
        $('msgThreadPane')?.classList.remove('mobile-show');
        $('msgListPane')?.classList.remove('mobile-hide');
      }
      return;
    }
    dlg.close();
  });

  if (dlg.id !== 'mediaViewerDialog') {
    dlg.addEventListener('click', (e) => {
      if (e.target !== dlg) return;
      const rect = dlg.getBoundingClientRect();
      const clickedOutside =
        e.clientX !== 0 &&
        (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom);
      if (clickedOutside) dlg.close();
    });
  }

  dlg.addEventListener('close', () => {
    if (isApplyingHistory) return;
    lastModalClosedAt = Date.now();
    queueMicrotask(() => {
      if (isApplyingHistory) return;
      const openIds = [...document.querySelectorAll('dialog[open]')].map((d) => d.id);
      if (
        openIds.length === currentHistState.modals.length &&
        openIds.every((id, idx) => currentHistState.modals[idx] === id)
      ) {
        return;
      }
      if (currentHistState.modals.length === 0 && openIds.length === 0) return;

      let targetDepth = currentHistState.ogDepth - 1;
      while (targetDepth > 0) {
        const candidate = histStack[targetDepth];
        if (
          candidate &&
          candidate.modals.length === openIds.length &&
          candidate.modals.every((id, idx) => candidate.modals[idx] === id) &&
          (!candidate.msgThread || openIds.includes('messagesDialog'))
        ) {
          break;
        }
        targetDepth--;
      }
      const delta = currentHistState.ogDepth - targetDepth;
      if (delta > 0) {
        history.go(-delta);
      }
    });
  });
});

// Initialize History Stack (Home at depth 0; restored sub-page at depth 1 so Back returns to Home)
const savedStartPage = parseInt(localStorage.getItem('og_last_page') || '0', 10);
const initialPage = Number.isFinite(savedStartPage) ? Math.max(0, Math.min(savedStartPage, pageEls.length - 1)) : 0;
currentHistState = { ogApp: true, ogDepth: 0, page: 0, drawer: false, modals: [], msgThread: false };
histStack[0] = currentHistState;
history.replaceState(currentHistState, '', location.href);
if (initialPage > 0) {
  pushHistState({ page: initialPage, drawer: false, modals: [], msgThread: false });
}
syncPageUI(initialPage, false);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('appNavDrawer')?.classList.contains('open')) {
    closeNavDrawer(false);
  }
});

window.addEventListener('popstate', (e) => {
  const state = e.state;
  if (!state || !state.ogApp) return;

  isApplyingHistory = true;
  try {
    currentHistState = state;
    histStack[state.ogDepth] = state;

    if (state.drawer) openNavDrawerUI();
    else closeNavDrawerUI();

    const desired = state.modals || [];
    const openDialogs = [...document.querySelectorAll('dialog[open]')];
    for (let idx = openDialogs.length - 1; idx >= 0; idx--) {
      const d = openDialogs[idx];
      if (!desired.includes(d.id)) d.close();
    }
    for (const id of desired) {
      const d = $(id);
      if (d && !d.open) {
        try { d.showModal(); } catch {}
      }
    }

    if (desired.includes('messagesDialog')) {
      if (state.msgThread && activeThread) {
        $('msgThreadPane')?.classList.add('mobile-show');
        $('msgListPane')?.classList.add('mobile-hide');
      } else {
        $('msgThreadPane')?.classList.remove('mobile-show');
        $('msgListPane')?.classList.remove('mobile-hide');
      }
    } else {
      $('msgThreadPane')?.classList.remove('mobile-show');
      $('msgListPane')?.classList.remove('mobile-hide');
    }

    if (typeof state.page === 'number' && state.page !== currentPage) {
      syncPageUI(state.page, true);
    }
  } finally {
    isApplyingHistory = false;
  }
});

// Subtle non-blocking toast notification
let toastTimer = null;
function showToast(msg) {
  const el = $('appToast');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => {
      if (!el.classList.contains('show')) el.hidden = true;
    }, 220);
  }, 2400);
}

function pauseAllForegroundVideo() {
  document.querySelectorAll('#viewerStage video, .timeline-card video, .quick-video-card video, .msg-attachment-media video').forEach((v) => {
    try { v.pause(); } catch {}
  });
}
window.addEventListener('pagehide', pauseAllForegroundVideo);
window.addEventListener('beforeunload', pauseAllForegroundVideo);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseAllForegroundVideo();
});

function escapeHtml(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
function waitDB() {
  if (DB) return Promise.resolve();
  return new Promise((r) => {
    const t = setInterval(() => {
      if (DB) { clearInterval(t); r(); }
    }, 50);
  });
}
function formatMediaTitle(filename) {
  if (!filename) return 'Batch Memory';
  return decodeURIComponent(filename)
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\d+[_-]/, '')
    .replace(/[_-]+/g, ' ')
    .trim() || 'Batch Memory';
}
function formatTimeShort(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function directPairId(a, b) {
  return [String(a || '').toLowerCase(), String(b || '').toLowerCase()].sort().join('__');
}

// People profiles persisted in IndexedDB
let activeProfiles = [];
function profileImageSrc(p) {
  return p?.imageBlob ? URL.createObjectURL(p.imageBlob) : (p?.image || 'assets/common.jpg');
}
async function seedProfiles() {
  const saved = await getAll('profiles');
  for (let i = 0; i < PEOPLE.length; i++) {
    const id = 'builtin-profile-' + i;
    const existing = saved.find((x) => x.id === id);
    if (!localStorage.getItem('deleted_' + id)) {
      if (!existing) await put('profiles', { ...PEOPLE[i], id, builtin: true, order: i, image: 'assets/common.jpg' });
      else if (HAS_SMALLCAPS.test(existing.n || '')) await put('profiles', { ...existing, ...PEOPLE[i] });
    }
  }
}
async function renderPeople() {
  if (!DB) return;
  activeProfiles = (await getAll('profiles')).sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  const filterQ = ($('peopleFilterInput')?.value || '').trim().toLowerCase();
  const filtered = filterQ
    ? activeProfiles.filter((p) => [p.n, p.nick, p.title, p.nature, p.special].join(' ').toLowerCase().includes(filterQ))
    : activeProfiles;
  const peopleGrid = $('peopleGrid');
  peopleGrid.innerHTML = '';
  $('peopleCounter').textContent = filterQ ? `${filtered.length} of ${activeProfiles.length}` : `${activeProfiles.length} Profiles`;

  if (!filtered.length) {
    peopleGrid.innerHTML = '<div class="empty-state">No profiles match your filter.</div>';
  } else {
    filtered.forEach((p) => {
      const idx = activeProfiles.findIndex((x) => x.id === p.id);
      const c = document.createElement('article');
      c.className = 'person-card';
      c.innerHTML = `
        <div class="person-img-wrap">
          <img src="${profileImageSrc(p)}" alt="${escapeHtml(p.n)}" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'">
        </div>
        <div class="person-body">
          <div class="person-meta-line">${escapeHtml(p.title)} · ${escapeHtml(p.nature)}</div>
          <h3>${escapeHtml(p.n)}</h3>
          <p><strong>Nickname:</strong> ${escapeHtml(p.nick)}</p>
          <p><strong>Special:</strong> ${escapeHtml(p.special)}</p>
        </div>`;
      c.onclick = () => openProfile(idx);
      peopleGrid.appendChild(c);
    });
  }
  // Populate Home Legends Avatar Strip
  const homePeopleStrip = $('homePeopleStrip');
  if (homePeopleStrip) {
    homePeopleStrip.innerHTML = '';
    activeProfiles.forEach((p, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'home-person-chip';
      chip.innerHTML = `
        <img src="${profileImageSrc(p)}" alt="${escapeHtml(p.n)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'">
        <span>${escapeHtml(p.n)}</span>`;
      chip.onclick = () => openProfile(idx);
      homePeopleStrip.appendChild(chip);
    });
  }

  syncSenderDropdown();
  if (typeof updateV7Home === 'function') updateV7Home();
}

$('peopleFilterInput')?.addEventListener('input', renderPeople);

function openProfile(i) {
  const p = activeProfiles[i];
  if (!p) return;
  $('profileDialogBody').innerHTML = `
    <div class="profile-top">
      <div class="profile-img-wrap">
        <img src="${profileImageSrc(p)}" alt="${escapeHtml(p.n)}" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'">
      </div>
      <div class="profile-info">
        <div class="eyebrow">${escapeHtml(p.n)}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <div class="profile-details">
          <p><strong>Nickname:</strong> ${escapeHtml(p.nick)}</p>
          <p><strong>Nature:</strong> ${escapeHtml(p.nature)}</p>
          <p><strong>Special:</strong> ${escapeHtml(p.special)}</p>
        </div>
        <div class="profile-actions">
          <button class="mini-btn" id="openProfileChatBtn" type="button">💬 Message ${escapeHtml(p.n)}</button>
          <button class="mini-btn" id="openLetterBtn" type="button">💌 Open Letter</button>
          <button class="mini-btn" id="changeProfileImageBtn" type="button">🖼️ Change Photo</button>
          <button class="mini-btn danger" id="deleteProfileBtn" type="button">🗑️ Delete</button>
        </div>
      </div>
    </div>
    <div class="memory-box"><strong>Memory Note</strong><p>${escapeHtml(p.memory)}</p></div>`;
  openDialog($('profileDialog'));
  $('openProfileChatBtn').onclick = () => {
    $('profileDialog').close();
    openMessagesDialog('chats', p.n);
  };
  $('openLetterBtn').onclick = () => openFriendLetter(p);
  $('changeProfileImageBtn').onclick = async () => {
    const [file] = await filePicker('image/*', false);
    if (!file) return;
    p.imageBlob = file;
    await put('profiles', p);
    $('profileDialog').close();
    await renderPeople();
    openProfile(activeProfiles.findIndex((x) => x.id === p.id));
  };
  $('deleteProfileBtn').onclick = async () => {
    if (!confirm('Delete this profile?')) return;
    await recycleItem('profile', p.id, p);
    await del('profiles', p.id);
    if (p.builtin) localStorage.setItem('deleted_' + p.id, '1');
    $('profileDialog').close();
    renderPeople();
  };
}

$('addProfileBtn').onclick = () => openDialog($('newProfileDialog'));
$('newProfileForm').onsubmit = async (e) => {
  e.preventDefault();
  const file = $('profileImageInput').files[0] || null;
  const all = await getAll('profiles');
  const p = {
    id: 'profile-' + Date.now() + '-' + Math.random().toString(36).slice(2),
    builtin: false,
    order: 1000 + all.length,
    n: $('profileName').value.trim(),
    nick: $('profileNick').value.trim(),
    title: $('profileTitle').value.trim(),
    nature: $('profileNature').value.trim(),
    special: $('profileSpecial').value.trim(),
    memory: $('profileMemory').value.trim(),
    image: 'assets/common.jpg'
  };
  if (file) p.imageBlob = file;
  await put('profiles', p);
  e.target.reset();
  $('newProfileDialog').close();
  renderPeople();
  showToast(`Added ${p.n} to The Legends`);
};

document.querySelectorAll('[data-close]').forEach((b) => {
  b.onclick = () => b.closest('dialog').close();
});

// Built-in media manifest + directory fallback
window.BUILTIN_MEDIA = window.BUILTIN_MEDIA || { photos: [], videos: [] };
const PHOTO_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogg)$/i;

async function discoverDirectory(path, re) {
  try {
    const r = await fetch(path, { cache: 'no-store' });
    if (!r.ok) return [];
    const html = await r.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return [...doc.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && !h.startsWith('?') && !h.startsWith('/') && re.test(decodeURIComponent(h)))
      .map((h) => path + encodeURI(decodeURIComponent(h)));
  } catch {
    return [];
  }
}

async function hydrateBuiltins() {
  if (!window.BUILTIN_MEDIA.photos?.length) {
    const found = await discoverDirectory('media/photos/', PHOTO_EXT);
    if (found.length) window.BUILTIN_MEDIA.photos = found;
  }
  if (!window.BUILTIN_MEDIA.videos?.length) {
    const found = await discoverDirectory('media/videos/', VIDEO_EXT);
    if (found.length) window.BUILTIN_MEDIA.videos = found;
  }
}

// IndexedDB stores (upgrading v14 -> v15 smoothly, ensuring message stores exist)
let DB;
const req = indexedDB.open('ogLegendsMemories', 15);
req.onupgradeneeded = (e) => {
  const db = e.target.result;
  if (!db.objectStoreNames.contains('folders')) db.createObjectStore('folders', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('media')) {
    const s = db.createObjectStore('media', { keyPath: 'id' });
    s.createIndex('folderId', 'folderId', { unique: false });
  }
  if (!db.objectStoreNames.contains('profiles')) db.createObjectStore('profiles', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('journeys')) db.createObjectStore('journeys', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('hiddenMedia')) db.createObjectStore('hiddenMedia', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('favorites')) db.createObjectStore('favorites', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('mediaMeta')) db.createObjectStore('mediaMeta', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('letters')) db.createObjectStore('letters', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('recycle')) db.createObjectStore('recycle', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('messages')) {
    const ms = db.createObjectStore('messages', { keyPath: 'id' });
    ms.createIndex('pairId', 'pairId', { unique: false });
  }
  if (!db.objectStoreNames.contains('groups')) db.createObjectStore('groups', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('groupMessages')) {
    const gm = db.createObjectStore('groupMessages', { keyPath: 'id' });
    gm.createIndex('groupId', 'groupId', { unique: false });
  }
  if (!db.objectStoreNames.contains('channels')) db.createObjectStore('channels', { keyPath: 'id' });
  if (!db.objectStoreNames.contains('channelPosts')) {
    const cp = db.createObjectStore('channelPosts', { keyPath: 'id' });
    cp.createIndex('channelId', 'channelId', { unique: false });
  }
};

req.onsuccess = async (e) => {
  DB = e.target.result;
  await hydrateBuiltins();
  await seedProfiles();
  await seedJourneys();
  await seedSocialMessages();
  await renderPeople();
  await renderQuickGalleries();
  await renderJourney();
  await updateV7Home();
  updateUnreadBadge();
};

function store(name, mode = 'readonly') { return DB.transaction(name, mode).objectStore(name); }
function getAll(name) {
  return new Promise((res, rej) => {
    if (!DB || !DB.objectStoreNames.contains(name)) return res([]);
    const r = store(name).getAll();
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
function put(name, val) {
  return new Promise((res, rej) => {
    const r = store(name, 'readwrite').put(val);
    r.onsuccess = () => res();
    r.onerror = () => rej(r.error);
  });
}
function del(name, id) {
  return new Promise((res, rej) => {
    const r = store(name, 'readwrite').delete(id);
    r.onsuccess = () => res();
    r.onerror = () => rej(r.error);
  });
}

async function getAllCombinedMedia(type) {
  const hidden = new Set((await getAll('hiddenMedia')).map((x) => x.id));
  const builtinList = window.BUILTIN_MEDIA[type === 'photo' ? 'photos' : 'videos'] || [];
  const prefix = type === 'photo' ? 'builtin-photos-b' : 'builtin-videos-b';
  const built = builtinList
    .map((src, i) => ({
      id: prefix + i,
      src,
      builtin: true,
      type,
      name: formatMediaTitle(src.split('/').pop()),
      rawName: decodeURIComponent(src.split('/').pop())
    }))
    .filter((x) => !hidden.has(x.id));
  const local = (await getAll('media')).filter((x) => x.type === type);
  return [...built, ...local];
}



const selectionState = {
  photo: { active: false, ids: new Set() },
  video: { active: false, ids: new Set() }
};

function updateSelectionBarUI(type) {
  const st = selectionState[type];
  const bar = $(type === 'photo' ? 'photoSelectBar' : 'videoSelectBar');
  const countEl = $(type === 'photo' ? 'photoSelectCount' : 'videoSelectCount');
  const delBtn = $(type === 'photo' ? 'deleteSelectedPhotosBtn' : 'deleteSelectedVideosBtn');
  const toggleBtn = $(type === 'photo' ? 'selectPhotosBtn' : 'selectVideosBtn');
  if (bar) bar.hidden = !st.active;
  if (countEl) countEl.textContent = `${st.ids.size} selected`;
  if (delBtn) delBtn.disabled = st.ids.size === 0;
  if (toggleBtn) toggleBtn.textContent = st.active ? 'Cancel' : 'Select';
}

function setSelectionMode(type, active) {
  selectionState[type].active = active;
  if (!active) selectionState[type].ids.clear();
  updateSelectionBarUI(type);
  renderQuickGalleries();
}

async function deleteMediaItems(items, type) {
  if (!items.length) return;
  for (const item of items) {
    if (item.builtin) {
      await recycleItem('hiddenMedia', item.id, item);
      await put('hiddenMedia', { id: item.id });
    } else {
      await recycleItem('media', item.id, item);
      await del('media', item.id);
    }
  }
  await renderQuickGalleries();
  await updateV7Home();
  const label = items.length === 1 ? (type === 'photo' ? 'Photo' : 'Video') : `${items.length} ${type}s`;
  showToast(`${label} deleted (recoverable in Restore Center)`);
}

// Direct Photo & Video Galleries
async function renderQuickGalleries() {
  if (!DB) return;

  // Photos masonry
  const photosHost = $('allPhotosQuickGrid');
  if (photosHost) {
    const photos = await getAllCombinedMedia('photo');
    const st = selectionState.photo;
    photosHost.classList.toggle('is-selecting', st.active);
    updateSelectionBarUI('photo');
    if ($('allPhotosCountLabel')) {
      $('allPhotosCountLabel').textContent = st.active
        ? `Tap photos to select for deletion · ${st.ids.size} selected`
        : `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'} · Tap any image to view, zoom, or delete`;
    }
    photosHost.innerHTML = '';
    if (!photos.length) {
      photosHost.innerHTML = '<div class="empty-state">No photos yet — upload photos from your device using ＋ Add Photos.</div>';
    } else {
      photos.forEach((item, index) => {
        const src = getViewerSrc(item);
        const card = document.createElement('div');
        const isSelected = st.active && st.ids.has(item.id);
        card.className = 'quick-media-card' + (isSelected ? ' selected' : '');
        card.innerHTML = `
          ${st.active ? `<span class="quick-select-badge" aria-hidden="true">${isSelected ? '✓' : ''}</span>` : ''}
          <img src="${src}" alt="${escapeHtml(item.name || 'Memory photo')}" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'">
          <div class="quick-media-caption">
            <span>${escapeHtml(item.name || 'Batch Photo')}</span>
          </div>`;
        card.onclick = () => {
          if (st.active) {
            if (st.ids.has(item.id)) st.ids.delete(item.id);
            else st.ids.add(item.id);
            renderQuickGalleries();
          } else {
            openViewer(photos, index, 'photo');
          }
        };
        photosHost.appendChild(card);
      });
    }
  }

  // Videos showcase grid
  const videosHost = $('allVideosQuickGrid');
  if (videosHost) {
    const videos = await getAllCombinedMedia('video');
    const st = selectionState.video;
    videosHost.classList.toggle('is-selecting', st.active);
    updateSelectionBarUI('video');
    if ($('allVideosCountLabel')) {
      $('allVideosCountLabel').textContent = st.active
        ? `Tap videos to select for deletion · ${st.ids.size} selected`
        : `${videos.length} ${videos.length === 1 ? 'video' : 'videos'} · Tap to watch in full player`;
    }
    videosHost.innerHTML = '';
    if (!videos.length) {
      videosHost.innerHTML = '<div class="empty-state">No videos yet — upload videos from your device using ＋ Add Videos.</div>';
    } else {
      videos.forEach((item, index) => {
        const src = getViewerSrc(item);
        const card = document.createElement('article');
        const isSelected = st.active && st.ids.has(item.id);
        card.className = 'quick-video-card' + (isSelected ? ' selected' : '');
        card.innerHTML = `
          ${st.active ? `<span class="quick-select-badge" aria-hidden="true">${isSelected ? '✓' : ''}</span>` : ''}
          <div class="quick-video-thumb">
            <video src="${src}" muted playsinline preload="metadata"></video>
            <button class="quick-play-overlay" type="button" aria-label="Play ${escapeHtml(item.name || 'Video')}">▶</button>
          </div>
          <div class="quick-video-meta">
            <div>
              <strong>${escapeHtml(item.name || 'Batch Video')}</strong>
              <small>${item.builtin ? 'Archive Montage' : 'Device Upload'}</small>
            </div>
          </div>`;
        card.onclick = () => {
          if (st.active) {
            if (st.ids.has(item.id)) st.ids.delete(item.id);
            else st.ids.add(item.id);
            renderQuickGalleries();
          } else {
            openViewer(videos, index, 'video');
          }
        };
        videosHost.appendChild(card);
      });
    }
  }
}

$('selectPhotosBtn')?.addEventListener('click', () => setSelectionMode('photo', !selectionState.photo.active));
$('cancelSelectPhotosBtn')?.addEventListener('click', () => setSelectionMode('photo', false));
$('deleteSelectedPhotosBtn')?.addEventListener('click', async () => {
  const photos = await getAllCombinedMedia('photo');
  const chosen = photos.filter((x) => selectionState.photo.ids.has(x.id));
  if (!chosen.length) return;
  if (!confirm(`Delete ${chosen.length} selected ${chosen.length === 1 ? 'photo' : 'photos'}?`)) return;
  selectionState.photo.active = false;
  selectionState.photo.ids.clear();
  await deleteMediaItems(chosen, 'photo');
});

$('selectVideosBtn')?.addEventListener('click', () => setSelectionMode('video', !selectionState.video.active));
$('cancelSelectVideosBtn')?.addEventListener('click', () => setSelectionMode('video', false));
$('deleteSelectedVideosBtn')?.addEventListener('click', async () => {
  const videos = await getAllCombinedMedia('video');
  const chosen = videos.filter((x) => selectionState.video.ids.has(x.id));
  if (!chosen.length) return;
  if (!confirm(`Delete ${chosen.length} selected ${chosen.length === 1 ? 'video' : 'videos'}?`)) return;
  selectionState.video.active = false;
  selectionState.video.ids.clear();
  await deleteMediaItems(chosen, 'video');
});

$('quickUploadPhotoBtn')?.addEventListener('click', () => addMedia('photo'));
$('quickUploadVideoBtn')?.addEventListener('click', () => addMedia('video'));
$('playAllPhotosSlideshow')?.addEventListener('click', async () => {
  const photos = await getAllCombinedMedia('photo');
  if (!photos.length) return showToast('No photos available for slideshow');
  startSlideshow(photos);
});

// Media viewer
let currentViewerItems = [];
let currentViewerIndex = 0;
let currentViewerType = 'photo';
let viewerScale = 1;
let slideshowTimer = null;

function openViewer(items, index, type) {
  currentViewerItems = items;
  currentViewerIndex = index;
  currentViewerType = type;
  viewerScale = 1;
  renderViewer();
  openDialog($('mediaViewerDialog'));
}

function getViewerSrc(item) {
  return item.builtin ? item.src : URL.createObjectURL(item.blob);
}

function renderViewer() {
  const item = currentViewerItems[currentViewerIndex];
  if (!item) return;
  $('viewerCount').textContent = `${currentViewerIndex + 1} / ${currentViewerItems.length}`;
  if ($('viewerTitle')) $('viewerTitle').textContent = item.name || (currentViewerType === 'photo' ? 'Photo Memory' : 'Video Memory');
  const stage = $('viewerStage');
  stage.innerHTML = '';
  viewerScale = 1;
  const src = getViewerSrc(item);
  if (currentViewerType === 'photo') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = item.name || 'photo';
    img.className = 'viewer-photo';
    img.id = 'viewerActiveMedia';
    img.referrerPolicy = 'no-referrer';
    img.onerror = () => { img.src = 'assets/common.jpg'; };
    stage.appendChild(img);
  } else {
    const v = document.createElement('video');
    v.src = src;
    v.controls = true;
    v.playsInline = true;
    v.autoplay = true;
    v.className = 'viewer-video';
    v.id = 'viewerActiveMedia';
    stage.appendChild(v);
  }
  $('viewerPrev').disabled = currentViewerItems.length < 2;
  $('viewerNext').disabled = currentViewerItems.length < 2;
  $('viewerZoomOut').disabled = currentViewerType !== 'photo';
  $('viewerZoomIn').disabled = currentViewerType !== 'photo';
  $('viewerReset').disabled = currentViewerType !== 'photo';
  $('viewerSlideshow').hidden = currentViewerType !== 'photo' || currentViewerItems.length < 2;
  refreshViewerV7();
}

function applyViewerScale() {
  const el = $('viewerActiveMedia');
  if (el && currentViewerType === 'photo') {
    el.style.transform = `scale(${viewerScale})`;
    el.style.transformOrigin = 'center center';
    el.style.transition = 'transform .15s ease';
  }
}

$('viewerPrev').onclick = () => {
  currentViewerIndex = (currentViewerIndex - 1 + currentViewerItems.length) % currentViewerItems.length;
  renderViewer();
};
$('viewerNext').onclick = () => {
  currentViewerIndex = (currentViewerIndex + 1) % currentViewerItems.length;
  renderViewer();
};
$('viewerZoomIn').onclick = () => { viewerScale = Math.min(4, viewerScale + 0.25); applyViewerScale(); };
$('viewerZoomOut').onclick = () => { viewerScale = Math.max(0.5, viewerScale - 0.25); applyViewerScale(); };
$('viewerReset').onclick = () => { viewerScale = 1; applyViewerScale(); };
$('viewerDownload').onclick = () => {
  const item = currentViewerItems[currentViewerIndex];
  if (!item) return;
  const src = getViewerSrc(item);
  const a = document.createElement('a');
  a.href = src;
  a.download = item.rawName || item.name || (`og-memory-${currentViewerIndex + 1}.${currentViewerType === 'photo' ? 'jpg' : 'mp4'}`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  if (!item.builtin) setTimeout(() => URL.revokeObjectURL(src), 1500);
};
$('mediaViewerDialog').addEventListener('close', () => {
  stopSlideshow();
  $('viewerStage').querySelector('video')?.pause();
  $('viewerStage').innerHTML = '';
  viewerScale = 1;
});

function filePicker(accept, multiple = false) {
  return new Promise((res) => {
    const i = document.createElement('input');
    i.type = 'file';
    i.accept = accept;
    i.multiple = multiple;
    i.onchange = () => res([...i.files]);
    i.click();
  });
}

async function addMedia(type) {
  const files = await filePicker(type === 'photo' ? 'image/*' : 'video/*', true);
  if (!files.length) return 0;
  const folderId = type === 'photo' ? 'builtin-photos' : 'builtin-videos';
  for (const file of files) {
    await put('media', {
      id: 'm-' + Date.now() + '-' + Math.random().toString(36).slice(2),
      folderId,
      type,
      name: file.name,
      blob: file,
      created: Date.now()
    });
  }
  await renderQuickGalleries();
  await updateV7Home();
  showToast(`Added ${files.length} ${type}${files.length > 1 ? 's' : ''}`);
  return files.length;
}

// Journey timeline
const JOURNEY_SEED = [
  { id: 'journey-1', date: '2024 — The Beginning', title: '🏫 When Ordinary Days Became Our Story', message: 'We did not know at the time that these ordinary classroom days would become some of our favourite memories. The laughter between lectures, the small jokes, the moments when no one could stop laughing — all of it slowly built the story we now call The OG Legends. ❤️', builtin: true, order: 1 },
  { id: 'journey-2', date: '01 January 2024', title: '🚌 Kushinagar Trip', message: 'A day away from the usual classroom routine gave us moments that felt different. The travel, the photos, the jokes and the people around us made it more than just a trip. It became one of those days we can look back on and instantly remember who we were with. 📸❤️', builtin: true, order: 2 },
  { id: 'journey-3', date: '2025–26', title: '👑 The OG Legends', message: 'By the time we realised how fast time was moving, we already had a gallery full of faces, videos and stories. People will move to different places and life will change, but these memories will always be proof that for one chapter of life, we were here together. The end of a class is not the end of the memories. ❤️♾️', builtin: true, order: 3 }
];

async function seedJourneys() {
  const saved = await getAll('journeys');
  for (const j of JOURNEY_SEED) {
    const existing = saved.find((x) => x.id === j.id);
    if (!localStorage.getItem('deleted_' + j.id)) {
      if (!existing) await put('journeys', j);
      else if (HAS_SMALLCAPS.test(existing.title || '')) await put('journeys', { ...existing, ...j });
    }
  }
}

async function renderJourney() {
  if (!DB) return;
  const host = $('journeyTimeline');
  if (!host) return;
  const list = (await getAll('journeys')).sort((a, b) => (a.order || 999) - (b.order || 999));
  host.innerHTML = '';
  list.forEach((j, idx) => {
    const c = document.createElement('div');
    c.className = 'timeline-card journey-card';
    c.dataset.journeyId = j.id;
    let media = '';
    if (j.mediaBlob) {
      const u = URL.createObjectURL(j.mediaBlob);
      media = j.mediaType?.startsWith('video')
        ? `<video src="${u}" controls playsinline></video>`
        : `<img src="${u}" alt="journey" referrerpolicy="no-referrer">`;
    }
    c.innerHTML = `
      <div class="journey-step">${String(idx + 1).padStart(2, '0')}</div>
      <div class="journey-body">
        <b>${escapeHtml(j.date)}</b>
        <h3>${escapeHtml(j.title)}</h3>
        ${media}
        <p>${escapeHtml(j.message)}</p>
        <button class="mini-btn danger journey-delete" type="button">🗑️ Delete Memory</button>
      </div>`;
    c.querySelector('.journey-delete').onclick = async () => {
      if (!confirm('Delete this journey memory?')) return;
      await recycleItem('journey', j.id, j);
      await del('journeys', j.id);
      if (j.builtin) localStorage.setItem('deleted_' + j.id, '1');
      renderJourney();
      updateV7Home();
    };
    host.appendChild(c);
  });
  updateV7Home();
}

$('addJourneyBtn').onclick = () => openDialog($('newJourneyDialog'));
$('newJourneyForm').onsubmit = async (e) => {
  e.preventDefault();
  const file = $('journeyMedia').files[0] || null;
  const j = {
    id: 'journey-' + Date.now(),
    date: $('journeyDate').value.trim(),
    title: $('journeyTitle').value.trim(),
    message: $('journeyMessage').value.trim(),
    order: Date.now(),
    builtin: false
  };
  if (file) {
    j.mediaBlob = file;
    j.mediaType = file.type;
  }
  await put('journeys', j);
  e.target.reset();
  $('newJourneyDialog').close();
  renderJourney();
  showToast('Added memory to Our Journey');
};

// 5-Memory Vault
const randomLines = [
  'School days often felt ordinary while we were living them. We didn’t know that a random laugh in class, a photo taken without a plan, or a few minutes spent together would one day feel so valuable. Those unplanned moments are now the ones we would probably choose to live one more time. That is what makes these memories special — they were real, unplanned and ours. ❤️',
  'There were days when the classroom felt too long, everyone was waiting for the bell and the day felt like it would never end. But now we don’t remember those boring minutes. We remember the friends, the jokes, the mischief, the silly dialogues and the feeling of being part of something together. Maybe that is the magic of school — you only understand how special it was when it becomes a memory. 👑',
  'The Kushinagar trip was not just about going somewhere else. It was about being together outside the usual routine, taking photos, laughing at things that would only make sense to us and carrying back more than just photos. The best trips are often remembered not because of the place, but because of the people who were there. 🚌📸❤️',
  'The OG Legends was never about being perfect. It was about different personalities fitting into one story — the quiet ones, the loud ones, the funny ones, the moody ones and the people who could turn an ordinary day into a story. Inside jokes, random photos and moments that only the people who were there can fully understand — that is what made it ours. 👑',
  'One day we will all be busy with different plans, different cities and different chapters. But a photo, a song or one familiar name can bring back an entire era in a second. That is why we keep these memories — not to live in the past, but to remember a chapter that made us smile. No matter how far everyone goes, these memories will always be one place where we are still together. ❤️♾️'
];

function showFiveMemories() {
  if (randomBatchShown) return;
  randomBatchShown = true;
  const host = $('randomBatch');
  host.innerHTML = '';
  randomLines.forEach((text, i) => {
    const card = document.createElement('article');
    card.className = 'random-memory-card';
    card.innerHTML = `<div class="random-memory-no">MEMORY ${String(i + 1).padStart(2, '0')}</div><p>${text}</p>`;
    host.appendChild(card);
  });
  $('randomBtn').hidden = true;
  $('randomBack').hidden = false;
  host.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
$('randomBtn').onclick = showFiveMemories;
$('randomBack').onclick = goBackInApp;

// Memories of the Day, Search, Letters, Backup & Restore
let activeLetterProfile = null;
let memoryDayItems = [];
const V7_STORES = [
  'profiles', 'folders', 'media', 'journeys', 'hiddenMedia',
  'mediaMeta', 'letters', 'recycle',
  'messages', 'groups', 'groupMessages', 'channels', 'channelPosts'
];

async function recycleItem(kind, id, data) {
  if (!DB || !DB.objectStoreNames.contains('recycle')) return;
  try {
    await put('recycle', { id: `${kind}:${id}`, kind, originalId: id, data, deletedAt: Date.now() });
  } catch {}
}

function gcd(a, b) {
  while (b) { const t = b; b = a % b; a = t; }
  return Math.abs(a) || 1;
}

async function getMemoryDayPool() {
  const hidden = new Set((await getAll('hiddenMedia')).map((x) => x.id));
  const builtin = (window.BUILTIN_MEDIA.photos || [])
    .map((src, i) => ({
      id: 'builtin-photos-b' + i,
      src,
      builtin: true,
      type: 'photo',
      name: formatMediaTitle(src.split('/').pop()),
      rawName: decodeURIComponent(src.split('/').pop())
    }))
    .filter((x) => !hidden.has(x.id));
  let local = [];
  try {
    local = (await getAll('media'))
      .filter((x) => x.type === 'photo')
      .map((x) => ({ ...x, src: x.blob ? URL.createObjectURL(x.blob) : x.src, builtin: false, type: 'photo' }));
  } catch {}
  return [...builtin, ...local];
}

function memoryDaySavedIds() {
  try { return JSON.parse(localStorage.getItem('og-memory-day-items') || '[]'); } catch { return []; }
}
function saveMemoryDayIds(ids) {
  localStorage.setItem('og-memory-day-items', JSON.stringify([...new Set(ids)]));
}
function dailyDefaultIds(all) {
  if (!all.length) return [];
  const d = new Date();
  const dayKey = Number(`${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`);
  const count = Math.min(5, all.length);
  const start = dayKey % all.length;
  let step = (dayKey % Math.max(1, all.length - 1)) + 1;
  while (all.length > 1 && gcd(step, all.length) !== 1) step++;
  const ids = [];
  const used = new Set();
  for (let n = 0; n < count; n++) {
    let idx = (start + n * step) % all.length;
    while (used.has(idx)) idx = (idx + 1) % all.length;
    used.add(idx);
    ids.push(all[idx].id);
  }
  return ids;
}

async function renderMemoryDay() {
  const host = $('memoryDayGrid');
  const homeStrip = $('homeTodayStrip');
  const all = await getMemoryDayPool();
  let ids = memoryDaySavedIds().filter((id) => all.some((x) => x.id === id));
  if (!ids.length) {
    ids = dailyDefaultIds(all);
    saveMemoryDayIds(ids);
  }
  memoryDayItems = ids.map((id) => all.find((x) => x.id === id)).filter(Boolean);

  if (host) {
    host.innerHTML = '';
    if (!memoryDayItems.length) {
      host.innerHTML = '<div class="memory-day-loading">No curated memories yet — click Pick Photos to add.</div>';
    } else {
      memoryDayItems.forEach((item, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'memory-day-item';
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'memory-day-photo';
        b.setAttribute('aria-label', `Open memory ${index + 1}`);
        b.innerHTML = `<img src="${item.src}" alt="${escapeHtml(item.name || `Memory ${index + 1}`)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'">`;
        b.onclick = () => openViewer(memoryDayItems, index, 'photo');
        const rm = document.createElement('button');
        rm.type = 'button';
        rm.className = 'memory-day-remove';
        rm.title = 'Remove from Memories of the Day';
        rm.textContent = '✕';
        rm.onclick = async (e) => {
          e.stopPropagation();
          saveMemoryDayIds(memoryDaySavedIds().filter((id) => id !== item.id));
          await renderMemoryDay();
        };
        wrap.append(b, rm);
        host.appendChild(wrap);
      });
    }
  }

  if (homeStrip) {
    homeStrip.innerHTML = '';
    if (!memoryDayItems.length) {
      homeStrip.innerHTML = '<div class="empty-state">No photos selected yet.</div>';
    } else {
      memoryDayItems.slice(0, 5).forEach((item, index) => {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'home-today-tile';
        tile.innerHTML = `<img src="${item.src}" alt="${escapeHtml(item.name || 'Highlight')}" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'"><span>${escapeHtml(item.name || 'Memory')}</span>`;
        tile.onclick = () => openViewer(memoryDayItems, index, 'photo');
        homeStrip.appendChild(tile);
      });
    }
  }
}

async function openMemoryDayPicker() {
  const grid = $('memoryDayPickerGrid');
  const dlg = $('memoryDayPicker');
  if (!grid || !dlg) return;
  const all = await getMemoryDayPool();
  const selected = new Set(memoryDaySavedIds());
  grid.innerHTML = '';
  all.forEach((item) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'memory-day-pick' + (selected.has(item.id) ? ' selected' : '');
    b.innerHTML = `<img src="${item.src}" alt="Memory choice" loading="lazy" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'"><span>${selected.has(item.id) ? 'Added' : 'Add'}</span>`;
    b.onclick = async () => {
      const ids = memoryDaySavedIds();
      if (!ids.includes(item.id)) {
        ids.push(item.id);
        saveMemoryDayIds(ids);
      }
      await renderMemoryDay();
      dlg.close();
    };
    grid.appendChild(b);
  });
  openDialog(dlg);
}

async function randomizeMemoryDay() {
  const all = await getMemoryDayPool();
  const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, Math.min(5, all.length));
  saveMemoryDayIds(shuffled.map((x) => x.id));
  await renderMemoryDay();
}
$('memoryDayAdd')?.addEventListener('click', openMemoryDayPicker);
$('memoryDayRandom')?.addEventListener('click', randomizeMemoryDay);

async function updateV7Home() {
  if (!DB) return;
  const hidden = new Set((await getAll('hiddenMedia')).map((x) => x.id));
  const p = (window.BUILTIN_MEDIA.photos || []).filter((_, i) => !hidden.has(`builtin-photos-b${i}`)).length;
  const v = (window.BUILTIN_MEDIA.videos || []).filter((_, i) => !hidden.has(`builtin-videos-b${i}`)).length;
  const [local, profiles, journeys, msgs, grpMsgs, chPosts] = await Promise.all([
    getAll('media'), getAll('profiles'), getAll('journeys'),
    getAll('messages'), getAll('groupMessages'), getAll('channelPosts')
  ]);
  const lp = local.filter((x) => x.type === 'photo').length;
  const lv = local.filter((x) => x.type === 'video').length;
  const totalMsgs = msgs.length + grpMsgs.length + chPosts.length;
  if ($('memoryStats')) {
    $('memoryStats').innerHTML = `
      <div class="stat-item"><b>${p + lp}</b><span>Photos</span></div>
      <div class="stat-item"><b>${v + lv}</b><span>Videos</span></div>
      <div class="stat-item"><b>${profiles.length}</b><span>Legends</span></div>
      <div class="stat-item"><b>${journeys.length}</b><span>Journeys</span></div>
      <div class="stat-item"><b>${totalMsgs}</b><span>Messages</span></div>`;
  }
  await renderMemoryDay();
}

async function getMeta(id) {
  if (!DB) return null;
  try { return (await getAll('mediaMeta')).find((x) => x.id === id) || null; } catch { return null; }
}
async function refreshViewerV7() {
  const item = currentViewerItems[currentViewerIndex];
  if (!item || !DB) return;
  const meta = await getMeta(item.id);
  if ($('viewerMetaLine')) {
    $('viewerMetaLine').textContent = [meta?.date, meta?.caption].filter(Boolean).join(' • ') || (item.builtin ? 'Batch 2025–26 Archive' : 'Device Upload');
  }
}

$('viewerDelete').onclick = async () => {
  const item = currentViewerItems[currentViewerIndex];
  if (!item) return;
  if (!confirm(`Delete this ${currentViewerType} from your gallery?`)) return;
  stopSlideshow();
  await deleteMediaItems([item], currentViewerType);
  currentViewerItems.splice(currentViewerIndex, 1);
  if (!currentViewerItems.length) {
    $('mediaViewerDialog')?.close();
    return;
  }
  if (currentViewerIndex >= currentViewerItems.length) {
    currentViewerIndex = currentViewerItems.length - 1;
  }
  renderViewer();
};

$('viewerInfo').onclick = async () => {
  const item = currentViewerItems[currentViewerIndex];
  if (!item) return;
  const m = await getMeta(item.id);
  $('metaDate').value = m?.date || '';
  $('metaCaption').value = m?.caption || '';
  $('metaDialog').dataset.mediaId = item.id;
  openDialog($('metaDialog'));
};

$('metaForm').onsubmit = async (e) => {
  e.preventDefault();
  const id = $('metaDialog').dataset.mediaId;
  if (!id) return;
  await put('mediaMeta', {
    id,
    date: $('metaDate').value.trim(),
    caption: $('metaCaption').value.trim(),
    updated: Date.now()
  });
  $('metaDialog').close();
  await refreshViewerV7();
  await updateV7Home();
  showToast('Caption & date saved');
};

$('viewerShare').onclick = async () => {
  const item = currentViewerItems[currentViewerIndex];
  if (!item) return;
  const meta = await getMeta(item.id);
  const title = meta?.caption || item.name || 'Our Memory';
  try {
    if (navigator.share) {
      let file = null;
      try {
        const blob = item.builtin ? await (await fetch(item.src)).blob() : item.blob;
        if (blob) file = new File([blob], item.rawName || item.name || `memory.${currentViewerType === 'photo' ? 'jpg' : 'mp4'}`, { type: blob.type });
      } catch {}
      const data = { title, text: title };
      if (file && navigator.canShare?.({ files: [file] })) data.files = [file];
      else if (item.builtin) data.url = new URL(item.src, location.href).href;
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(item.builtin ? new URL(item.src, location.href).href : title);
      showToast('Memory link copied to clipboard');
    }
  } catch {}
};

function stopSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
  if ($('viewerSlideshow')) {
    $('viewerSlideshow').textContent = '▶';
    $('viewerSlideshow').classList.remove('active');
  }
}
function startSlideshow(items) {
  if (!items?.length) return;
  stopSlideshow();
  openViewer(items, 0, 'photo');
  if ($('viewerSlideshow')) {
    $('viewerSlideshow').textContent = '❚❚';
    $('viewerSlideshow').classList.add('active');
  }
  slideshowTimer = setInterval(() => {
    if (!$('mediaViewerDialog').open) { stopSlideshow(); return; }
    currentViewerIndex = (currentViewerIndex + 1) % currentViewerItems.length;
    renderViewer();
  }, 4000);
}
$('viewerSlideshow').onclick = () => {
  if (slideshowTimer) stopSlideshow();
  else if (currentViewerType === 'photo' && currentViewerItems.length) startSlideshow(currentViewerItems);
};

function defaultLetter(p) {
  return `${p.n},\n\nThere are some people who become part of a chapter without anyone planning it. The jokes, the classroom afternoons, the unplanned photographs, and those small moments made the journey what it was. Time may change our routines, but the memories we built together will always belong to The OG Legends.`;
}
async function openFriendLetter(p) {
  activeLetterProfile = p;
  const all = await getAll('letters');
  const l = all.find((x) => x.id === p.id);
  $('letterTitle').textContent = `Letter to ${p.n}`;
  $('letterText').value = l?.text || defaultLetter(p);
  openDialog($('letterDialog'));
}
$('saveLetterBtn').onclick = async () => {
  if (!activeLetterProfile) return;
  await put('letters', { id: activeLetterProfile.id, text: $('letterText').value, updated: Date.now() });
  $('letterDialog').close();
  showToast(`Letter saved for ${activeLetterProfile.n}`);
};

async function resolveMedia(id) {
  if (id?.startsWith('builtin-photos-b')) {
    const i = +id.split('-b').pop();
    const src = window.BUILTIN_MEDIA.photos?.[i];
    if (src) return { id, src, builtin: true, type: 'photo', name: formatMediaTitle(src.split('/').pop()) };
  }
  if (id?.startsWith('builtin-videos-b')) {
    const i = +id.split('-b').pop();
    const src = window.BUILTIN_MEDIA.videos?.[i];
    if (src) return { id, src, builtin: true, type: 'video', name: formatMediaTitle(src.split('/').pop()) };
  }
  const media = await getAll('media');
  return media.find((x) => x.id === id) || null;
}

// =========================================================================
// BATCH MESSAGE SYSTEM (ZERO ID-CREATION / ZERO LOGIN — INDEXEDDB PERSISTED)
// =========================================================================
let activeMsgTab = 'chats'; // 'chats' | 'groups' | 'channels'
let activeThread = null; // { kind: 'chat'|'group'|'channel', id, title, avatar }
let pendingMsgMedia = null; // { blob, mediaType, name }

function getChatSender() {
  return localStorage.getItem('og_chat_sender') || 'Rehan';
}
function setChatSender(name) {
  localStorage.setItem('og_chat_sender', name || 'Rehan');
}

function syncSenderDropdown() {
  const sel = $('chatSenderSelect');
  if (!sel) return;
  const current = getChatSender();
  const names = [...new Set([...activeProfiles.map((p) => p.n), current, 'Guest Friend'])].filter(Boolean);
  sel.innerHTML = '';
  names.forEach((name) => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    if (name === current) opt.selected = true;
    sel.appendChild(opt);
  });
  const customOpt = document.createElement('option');
  customOpt.value = '__custom__';
  customOpt.textContent = '＋ Custom Name...';
  sel.appendChild(customOpt);
}

$('chatSenderSelect')?.addEventListener('change', async (e) => {
  const val = e.target.value;
  if (val === '__custom__') {
    if ($('customSenderWrap')) {
      $('customSenderWrap').hidden = false;
      $('customSenderInput').value = '';
      $('customSenderInput').focus();
    }
    return;
  }
  if ($('customSenderWrap')) $('customSenderWrap').hidden = true;
  setChatSender(val);
  await renderMessageList();
  if (activeThread) await renderActiveThread();
  showToast(`Now messaging as ${val}`);
});

$('customSenderWrap')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('customSenderInput').value.trim();
  if (!name) return;
  setChatSender(name);
  $('customSenderWrap').hidden = true;
  syncSenderDropdown();
  await renderMessageList();
  if (activeThread) await renderActiveThread();
  showToast(`Now messaging as ${name}`);
});

async function seedSocialMessages() {
  const [msgs, groups, grpMsgs, channels, chPosts] = await Promise.all([
    getAll('messages'), getAll('groups'), getAll('groupMessages'), getAll('channels'), getAll('channelPosts')
  ]);
  const now = Date.now();

  if (!groups.length && !localStorage.getItem('seeded_og_groups')) {
    await put('groups', {
      id: 'grp-og-legends',
      name: '👑 The OG Legends (Batch 2025–26)',
      desc: 'Main class group · No formality, only memories',
      members: PEOPLE.map((p) => p.n),
      created: now - 3600000
    });
    await put('groups', {
      id: 'grp-kushinagar',
      name: '🚌 Kushinagar Trip Squad',
      desc: 'Trip photos, jokes & bus memories',
      members: ['Rehan', 'Abdul', 'Sonu', 'Amrendra', 'Amrit', 'Aniket', 'Krishna', 'Depanshu'],
      created: now - 3200000
    });
    localStorage.setItem('seeded_og_groups', '1');

    if (!grpMsgs.length) {
      await put('groupMessages', { id: 'gm-1', groupId: 'grp-og-legends', sender: 'Rehan', text: 'Welcome everyone to our open Batch Message space! Drop photos, videos, or jokes anytime — no ID or login needed.', created: now - 3000000 });
      await put('groupMessages', { id: 'gm-2', groupId: 'grp-og-legends', sender: 'Sonu', text: 'Yaar ek idea hai — sab log apne Kushinagar trip aur farewell pics upload karo! 😄', created: now - 2500000 });
      await put('groupMessages', { id: 'gm-3', groupId: 'grp-og-legends', sender: 'Abdul', text: 'Done! Check the Photos & Videos chapters too, highlights clip mast bana hai.', created: now - 1900000 });
      await put('groupMessages', { id: 'gm-4', groupId: 'grp-kushinagar', sender: 'Amrendra', text: 'Bus ke piche wali seats ka maza hi alag tha bhai log 🔥', created: now - 1500000 });
      await put('groupMessages', { id: 'gm-5', groupId: 'grp-kushinagar', sender: 'Depanshu', text: 'Aur Amrit ka Tandoor mode on tha pure trip mein 😂', created: now - 1100000 });
    }
  }

  if (!channels.length && !localStorage.getItem('seeded_og_channels')) {
    await put('channels', {
      id: 'chn-batch-notice',
      name: '📢 Batch 2025–26 Noticeboard',
      desc: 'Shared milestones, reunion updates & highlights for all OG Legends',
      created: now - 4000000
    });
    localStorage.setItem('seeded_og_channels', '1');

    if (!chPosts.length) {
      await put('channelPosts', {
        id: 'cp-1',
        channelId: 'chn-batch-notice',
        sender: 'Rehan',
        text: '👑 Mother Teresa Public School — Batch 2025–26 Archive is live with restored Photos, Video Highlights, Friend Letters, and Open Batch Messaging.',
        likes: 11,
        created: now - 2800000
      });
      await put('channelPosts', {
        id: 'cp-2',
        channelId: 'chn-batch-notice',
        sender: 'Saniya',
        text: '✨ Do not forget to write a personal Friend Letter in every Legend profile card and add your own photos from device anytime!',
        likes: 8,
        created: now - 1200000
      });
    }
  }

  if (!msgs.length && !localStorage.getItem('seeded_og_dms')) {
    localStorage.setItem('seeded_og_dms', '1');
    await put('messages', {
      id: 'dm-1',
      pairId: directPairId('Rehan', 'Abdul'),
      sender: 'Abdul',
      recipient: 'Rehan',
      text: 'Bhai, group photos aur video archive ek number lag raha hai! ❤️',
      created: now - 2100000
    });
    await put('messages', {
      id: 'dm-2',
      pairId: directPairId('Rehan', 'Abdul'),
      sender: 'Rehan',
      recipient: 'Abdul',
      text: 'Hamesha yaad rahega ye chapter 🤝',
      created: now - 1800000
    });
    await put('messages', {
      id: 'dm-3',
      pairId: directPairId('Rehan', 'Sonu'),
      sender: 'Sonu',
      recipient: 'Rehan',
      text: 'Gulabo reporting in! Naya photo add kar raha hu gallery mein.',
      created: now - 900000
    });
  }
}

async function updateUnreadBadge() {
  if (!DB) return;
  const [msgs, gm, cp] = await Promise.all([getAll('messages'), getAll('groupMessages'), getAll('channelPosts')]);
  const total = msgs.length + gm.length + cp.length;
  const seen = Number(localStorage.getItem('og_msg_seen_count') || '0');
  const diff = Math.max(0, total - seen);
  const label = diff > 9 ? '9+' : String(diff);
  ['msgUnreadBadge', 'bottomChatBadge'].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.textContent = label;
    el.hidden = diff === 0;
  });
}

async function markMessagesSeen() {
  if (!DB) return;
  const [msgs, gm, cp] = await Promise.all([getAll('messages'), getAll('groupMessages'), getAll('channelPosts')]);
  localStorage.setItem('og_msg_seen_count', String(msgs.length + gm.length + cp.length));
  updateUnreadBadge();
}

async function openMessagesDialog(tab = null, directTarget = null) {
  if (tab) activeMsgTab = tab;
  setActiveMsgTabUI();
  pendingMsgMedia = null;
  if ($('msgAttachmentBar')) $('msgAttachmentBar').hidden = true;
  if ($('msgMediaInput')) $('msgMediaInput').value = '';
  closeNavDrawerUI();
  openDialog($('messagesDialog'));
  await waitDB();
  syncSenderDropdown();
  await markMessagesSeen();
  await renderMessageList();

  if (directTarget) {
    const p = activeProfiles.find((x) => x.n.toLowerCase() === directTarget.toLowerCase());
    if (p) {
      await openChatThread({
        kind: 'chat',
        id: p.n,
        title: p.n,
        sub: `${p.nick} · ${p.title}`,
        avatar: profileImageSrc(p)
      });
    }
  } else if (activeThread) {
    await renderActiveThread();
  }
}

$('messageBtn')?.addEventListener('click', () => openMessagesDialog());
$('toolsMsgBtn')?.addEventListener('click', () => { $('toolsDialog')?.close(); openMessagesDialog(); });

function setActiveMsgTabUI() {
  document.querySelectorAll('.msg-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.msgTab === activeMsgTab);
  });
  const createBtn = $('msgCreateActionBtn');
  if (createBtn) {
    if (activeMsgTab === 'groups') {
      createBtn.hidden = false;
      createBtn.textContent = '＋ New Group';
    } else if (activeMsgTab === 'channels') {
      createBtn.hidden = false;
      createBtn.textContent = '＋ New Board';
    } else {
      createBtn.hidden = true;
    }
  }
}

document.querySelectorAll('.msg-tab').forEach((btn) => {
  btn.addEventListener('click', async () => {
    activeMsgTab = btn.dataset.msgTab;
    setActiveMsgTabUI();
    await renderMessageList();
  });
});

$('msgSearchInput')?.addEventListener('input', renderMessageList);
$('msgBackToListBtn')?.addEventListener('click', () => {
  if (currentHistState.msgThread && currentHistState.ogDepth > 0) {
    history.back();
  } else {
    $('msgThreadPane')?.classList.remove('mobile-show');
    $('msgListPane')?.classList.remove('mobile-hide');
  }
});

$('msgCreateActionBtn')?.addEventListener('click', () => {
  if (activeMsgTab === 'groups') {
    const list = $('groupMemberChecklist');
    list.innerHTML = '';
    activeProfiles.forEach((p) => {
      const label = document.createElement('label');
      label.className = 'member-check-item';
      label.innerHTML = `<input type="checkbox" value="${escapeHtml(p.n)}" checked /><span>${escapeHtml(p.n)} <small>(${escapeHtml(p.nick)})</small></span>`;
      list.appendChild(label);
    });
    openDialog($('createGroupDialog'));
  } else if (activeMsgTab === 'channels') {
    openDialog($('createChannelDialog'));
  }
});

$('createGroupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('groupNameInput').value.trim();
  const desc = $('groupDescInput').value.trim();
  const members = [...document.querySelectorAll('#groupMemberChecklist input:checked')].map((x) => x.value);
  const g = {
    id: 'grp-' + Date.now(),
    name,
    desc: desc || `${members.length} members`,
    members,
    created: Date.now()
  };
  await put('groups', g);
  e.target.reset();
  $('createGroupDialog').close();
  activeMsgTab = 'groups';
  setActiveMsgTabUI();
  await renderMessageList();
  await openChatThread({ kind: 'group', id: g.id, title: g.name, sub: `${g.members.length} members`, avatar: 'assets/common.jpg' });
  showToast(`Group "${name}" created`);
});

$('createChannelForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('channelNameInput').value.trim();
  const desc = $('channelDescInput').value.trim();
  const ch = {
    id: 'chn-' + Date.now(),
    name,
    desc: desc || 'Open Batch Noticeboard',
    created: Date.now()
  };
  await put('channels', ch);
  e.target.reset();
  $('createChannelDialog').close();
  activeMsgTab = 'channels';
  setActiveMsgTabUI();
  await renderMessageList();
  await openChatThread({ kind: 'channel', id: ch.id, title: ch.name, sub: ch.desc, avatar: 'assets/common.jpg' });
  showToast(`Noticeboard "${name}" created`);
});

async function renderMessageList() {
  const host = $('msgListHost');
  if (!host || !DB) return;
  const q = ($('msgSearchInput')?.value || '').trim().toLowerCase();
  const sender = getChatSender();
  host.innerHTML = '';

  if (activeMsgTab === 'chats') {
    const allMsgs = await getAll('messages');
    const peers = activeProfiles.filter((p) => {
      if (p.n.toLowerCase() === sender.toLowerCase()) return false;
      return !q || [p.n, p.nick, p.title].join(' ').toLowerCase().includes(q);
    });
    if (!peers.length) {
      host.innerHTML = '<div class="empty-state">No matching legends found.</div>';
      return;
    }
    peers.forEach((p) => {
      const pid = directPairId(sender, p.n);
      const threadMsgs = allMsgs.filter((m) => m.pairId === pid).sort((a, b) => a.created - b.created);
      const last = threadMsgs[threadMsgs.length - 1];
      const preview = last ? `${last.sender === sender ? 'You: ' : ''}${last.text || (last.mediaBlob ? '📎 Media attachment' : '')}` : `${p.nick} · Tap to start chatting`;
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'msg-list-item' + (activeThread?.kind === 'chat' && activeThread?.id === p.n ? ' active' : '');
      row.innerHTML = `
        <img src="${profileImageSrc(p)}" alt="${escapeHtml(p.n)}" referrerpolicy="no-referrer" onerror="this.src='assets/common.jpg'">
        <div class="msg-list-meta">
          <div class="msg-list-top">
            <b>${escapeHtml(p.n)}</b>
            <small>${last ? formatTimeShort(last.created) : ''}</small>
          </div>
          <p>${escapeHtml(preview)}</p>
        </div>`;
      row.onclick = () => openChatThread({ kind: 'chat', id: p.n, title: p.n, sub: `${p.nick} · ${p.title}`, avatar: profileImageSrc(p) });
      host.appendChild(row);
    });
  } else if (activeMsgTab === 'groups') {
    const [groups, grpMsgs] = await Promise.all([getAll('groups'), getAll('groupMessages')]);
    const list = groups.filter((g) => !q || [g.name, g.desc].join(' ').toLowerCase().includes(q));
    if (!list.length) {
      host.innerHTML = '<div class="empty-state">No groups yet — create one with ＋ New Group.</div>';
      return;
    }
    list.sort((a, b) => (a.created || 0) - (b.created || 0)).forEach((g) => {
      const msgs = grpMsgs.filter((m) => m.groupId === g.id).sort((a, b) => a.created - b.created);
      const last = msgs[msgs.length - 1];
      const preview = last ? `${last.sender}: ${last.text || '📎 Media'}` : (g.desc || `${(g.members || []).length} members`);
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'msg-list-item' + (activeThread?.kind === 'group' && activeThread?.id === g.id ? ' active' : '');
      row.innerHTML = `
        <img src="assets/common.jpg" alt="${escapeHtml(g.name)}" referrerpolicy="no-referrer">
        <div class="msg-list-meta">
          <div class="msg-list-top">
            <b>${escapeHtml(g.name)}</b>
            <small>${last ? formatTimeShort(last.created) : ''}</small>
          </div>
          <p>${escapeHtml(preview)}</p>
        </div>`;
      row.onclick = () => openChatThread({ kind: 'group', id: g.id, title: g.name, sub: g.desc || `${(g.members || []).length} members`, avatar: 'assets/common.jpg' });
      host.appendChild(row);
    });
  } else if (activeMsgTab === 'channels') {
    const [channels, chPosts] = await Promise.all([getAll('channels'), getAll('channelPosts')]);
    const list = channels.filter((c) => !q || [c.name, c.desc].join(' ').toLowerCase().includes(q));
    if (!list.length) {
      host.innerHTML = '<div class="empty-state">No noticeboards yet — create one above.</div>';
      return;
    }
    list.sort((a, b) => (a.created || 0) - (b.created || 0)).forEach((ch) => {
      const posts = chPosts.filter((p) => p.channelId === ch.id).sort((a, b) => a.created - b.created);
      const last = posts[posts.length - 1];
      const preview = last ? `${last.sender}: ${last.text || '📎 Media'}` : ch.desc;
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'msg-list-item' + (activeThread?.kind === 'channel' && activeThread?.id === ch.id ? ' active' : '');
      row.innerHTML = `
        <img src="assets/common.jpg" alt="${escapeHtml(ch.name)}" referrerpolicy="no-referrer">
        <div class="msg-list-meta">
          <div class="msg-list-top">
            <b>${escapeHtml(ch.name)}</b>
            <small>${last ? formatTimeShort(last.created) : ''}</small>
          </div>
          <p>${escapeHtml(preview)}</p>
        </div>`;
      row.onclick = () => openChatThread({ kind: 'channel', id: ch.id, title: ch.name, sub: ch.desc, avatar: 'assets/common.jpg' });
      host.appendChild(row);
    });
  }
}

async function openChatThread(thread) {
  const wasInThread = $('msgThreadPane')?.classList.contains('mobile-show');
  activeThread = thread;
  $('msgEmptyPlaceholder').hidden = true;
  $('msgActiveThread').hidden = false;
  $('msgThreadPane')?.classList.add('mobile-show');
  $('msgListPane')?.classList.add('mobile-hide');
  if (!isApplyingHistory && !wasInThread && $('messagesDialog')?.open) {
    pushHistState({ msgThread: true });
  }
  await renderMessageList();
  await renderActiveThread();
}

async function renderActiveThread() {
  if (!activeThread || !DB) return;
  const sender = getChatSender();
  $('msgThreadTitle').textContent = activeThread.title;
  $('msgThreadSub').textContent = activeThread.sub || '';
  $('msgThreadAvatar').src = activeThread.avatar || 'assets/common.jpg';

  const feed = $('msgFeedHost');
  feed.innerHTML = '';

  let items = [];
  if (activeThread.kind === 'chat') {
    const pid = directPairId(sender, activeThread.id);
    items = (await getAll('messages')).filter((m) => m.pairId === pid).sort((a, b) => a.created - b.created);
    $('msgTextInput').placeholder = `Message ${activeThread.title} as ${sender}...`;
  } else if (activeThread.kind === 'group') {
    items = (await getAll('groupMessages')).filter((m) => m.groupId === activeThread.id).sort((a, b) => a.created - b.created);
    $('msgTextInput').placeholder = `Message group as ${sender}...`;
  } else if (activeThread.kind === 'channel') {
    items = (await getAll('channelPosts')).filter((m) => m.channelId === activeThread.id).sort((a, b) => a.created - b.created);
    $('msgTextInput').placeholder = `Post announcement as ${sender}...`;
  }

  if (!items.length) {
    feed.innerHTML = `<div class="empty-state">No messages yet.<br><small>Send a note or attach a photo/video below — you are messaging as <strong>${escapeHtml(sender)}</strong>.</small></div>`;
    return;
  }

  items.forEach((m) => {
    const isMe = m.sender === sender;
    if (activeThread.kind === 'channel') {
      const post = document.createElement('article');
      post.className = 'channel-post-card';
      let mediaHtml = '';
      if (m.mediaBlob) {
        const u = URL.createObjectURL(m.mediaBlob);
        mediaHtml = m.mediaType?.startsWith('video')
          ? `<div class="msg-attachment-media"><video src="${u}" controls playsinline></video></div>`
          : `<div class="msg-attachment-media"><img src="${u}" alt="Attachment" referrerpolicy="no-referrer"></div>`;
      }
      post.innerHTML = `
        <div class="channel-post-head">
          <strong>${escapeHtml(m.sender)}</strong>
          <small>${formatTimeShort(m.created)}</small>
        </div>
        ${mediaHtml}
        ${m.text ? `<p>${escapeHtml(m.text)}</p>` : ''}
        <div class="channel-post-actions">
          <button class="mini-btn like-post-btn" type="button">♥ ${m.likes || 0}</button>
          <button class="mini-btn danger del-msg-btn" type="button">Delete</button>
        </div>`;
      post.querySelector('.like-post-btn').onclick = async () => {
        m.likes = (m.likes || 0) + 1;
        await put('channelPosts', m);
        await renderActiveThread();
      };
      post.querySelector('.del-msg-btn').onclick = async () => {
        await del('channelPosts', m.id);
        await renderActiveThread();
        await renderMessageList();
        await updateV7Home();
      };
      if (m.mediaBlob && !m.mediaType?.startsWith('video')) {
        post.querySelector('.msg-attachment-media img')?.addEventListener('click', () => {
          openViewer([{ id: m.id, blob: m.mediaBlob, builtin: false, type: 'photo', name: m.mediaName || 'Chat Photo' }], 0, 'photo');
        });
      }
      feed.appendChild(post);
      return;
    }

    const row = document.createElement('div');
    row.className = 'msg-bubble-row ' + (isMe ? 'me' : 'them');
    let mediaHtml = '';
    if (m.mediaBlob) {
      const u = URL.createObjectURL(m.mediaBlob);
      mediaHtml = m.mediaType?.startsWith('video')
        ? `<div class="msg-attachment-media"><video src="${u}" controls playsinline></video></div>`
        : `<div class="msg-attachment-media"><img src="${u}" alt="Attachment" referrerpolicy="no-referrer"></div>`;
    }
    row.innerHTML = `
      <div class="msg-bubble">
        <div class="msg-bubble-meta">
          <span>${escapeHtml(m.sender)}</span>
          <small>${formatTimeShort(m.created)}</small>
        </div>
        ${mediaHtml}
        ${m.text ? `<div class="msg-bubble-text">${escapeHtml(m.text)}</div>` : ''}
        <button class="msg-del-inline" type="button" title="Delete message" aria-label="Delete message">✕</button>
      </div>`;
    row.querySelector('.msg-del-inline').onclick = async () => {
      const storeName = activeThread.kind === 'chat' ? 'messages' : 'groupMessages';
      await del(storeName, m.id);
      await renderActiveThread();
      await renderMessageList();
      await updateV7Home();
    };
    if (m.mediaBlob && !m.mediaType?.startsWith('video')) {
      row.querySelector('.msg-attachment-media img')?.addEventListener('click', () => {
        openViewer([{ id: m.id, blob: m.mediaBlob, builtin: false, type: 'photo', name: m.mediaName || 'Shared Photo' }], 0, 'photo');
      });
    }
    feed.appendChild(row);
  });

  feed.scrollTop = feed.scrollHeight;
}

$('msgMediaInput')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  pendingMsgMedia = { blob: file, mediaType: file.type, name: file.name };
  $('msgAttachName').textContent = `📎 ${file.name}`;
  $('msgAttachmentBar').hidden = false;
});

$('msgClearAttachBtn')?.addEventListener('click', () => {
  pendingMsgMedia = null;
  $('msgMediaInput').value = '';
  $('msgAttachmentBar').hidden = true;
});

$('msgComposeForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!activeThread) return;
  const text = $('msgTextInput').value.trim();
  if (!text && !pendingMsgMedia) return;
  const sender = getChatSender();
  const base = {
    sender,
    text,
    created: Date.now()
  };
  if (pendingMsgMedia) {
    base.mediaBlob = pendingMsgMedia.blob;
    base.mediaType = pendingMsgMedia.mediaType;
    base.mediaName = pendingMsgMedia.name;
  }

  if (activeThread.kind === 'chat') {
    await put('messages', {
      ...base,
      id: 'dm-' + Date.now() + '-' + Math.random().toString(36).slice(2),
      pairId: directPairId(sender, activeThread.id),
      recipient: activeThread.id
    });
  } else if (activeThread.kind === 'group') {
    await put('groupMessages', {
      ...base,
      id: 'gm-' + Date.now() + '-' + Math.random().toString(36).slice(2),
      groupId: activeThread.id
    });
  } else if (activeThread.kind === 'channel') {
    await put('channelPosts', {
      ...base,
      id: 'cp-' + Date.now() + '-' + Math.random().toString(36).slice(2),
      channelId: activeThread.id,
      likes: 0
    });
  }

  $('msgTextInput').value = '';
  pendingMsgMedia = null;
  $('msgMediaInput').value = '';
  $('msgAttachmentBar').hidden = true;
  await markMessagesSeen();
  await renderActiveThread();
  await renderMessageList();
  await updateV7Home();
});

$('msgClearThreadBtn')?.addEventListener('click', async () => {
  if (!activeThread) return;
  if (!confirm(`Clear all messages in "${activeThread.title}"?`)) return;
  const sender = getChatSender();
  if (activeThread.kind === 'chat') {
    const pid = directPairId(sender, activeThread.id);
    const all = await getAll('messages');
    for (const m of all.filter((x) => x.pairId === pid)) await del('messages', m.id);
  } else if (activeThread.kind === 'group') {
    const all = await getAll('groupMessages');
    for (const m of all.filter((x) => x.groupId === activeThread.id)) await del('groupMessages', m.id);
  } else if (activeThread.kind === 'channel') {
    const all = await getAll('channelPosts');
    for (const m of all.filter((x) => x.channelId === activeThread.id)) await del('channelPosts', m.id);
  }
  await renderActiveThread();
  await renderMessageList();
  await updateV7Home();
});

// =========================================================================
// ARCHIVE SEARCH (Legends, Journeys, Photos, Videos & Messages)
// =========================================================================
function openSearchDialog() {
  $('searchInput').value = '';
  $('searchResults').innerHTML = '<div class="empty-state">Type to search names, nicknames, captions, photos, videos, or messages</div>';
  openDialog($('searchDialog'));
  setTimeout(() => $('searchInput').focus(), 80);
}
$('searchBtn')?.addEventListener('click', openSearchDialog);
$('toolsSearchBtn')?.addEventListener('click', () => { $('toolsDialog')?.close(); openSearchDialog(); });

$('searchInput')?.addEventListener('input', async () => {
  const q = $('searchInput').value.trim().toLowerCase();
  const host = $('searchResults');
  if (q.length < 2) {
    host.innerHTML = '<div class="empty-state">Type at least 2 characters</div>';
    return;
  }
  await waitDB();
  const [profiles, journeys, metas, localMedia, dms, grpMsgs] = await Promise.all([
    getAll('profiles'), getAll('journeys'), getAll('mediaMeta'), getAll('media'), getAll('messages'), getAll('groupMessages')
  ]);
  const out = [];
  profiles.forEach((p) => {
    if ([p.n, p.nick, p.title, p.nature, p.special, p.memory].join(' ').toLowerCase().includes(q)) {
      out.push({ kind: 'profile', title: p.n, sub: `Legend · ${p.title}`, id: p.id });
    }
  });
  journeys.forEach((j) => {
    if ([j.date, j.title, j.message].join(' ').toLowerCase().includes(q)) {
      out.push({ kind: 'journey', title: j.title, sub: `Journey · ${j.date}`, id: j.id });
    }
  });
  for (const type of ['photos', 'videos']) {
    for (let i = 0; i < (window.BUILTIN_MEDIA[type] || []).length; i++) {
      const src = window.BUILTIN_MEDIA[type][i];
      const id = `builtin-${type}-b${i}`;
      const m = metas.find((x) => x.id === id);
      const text = [src, m?.date, m?.caption].join(' ').toLowerCase();
      if (text.includes(q)) {
        out.push({
          kind: type === 'photos' ? 'photo' : 'video',
          title: m?.caption || formatMediaTitle(src.split('/').pop()),
          sub: m?.date || (type === 'photos' ? 'Archive Photo' : 'Archive Video'),
          id
        });
      }
    }
  }
  localMedia.forEach((item) => {
    const m = metas.find((x) => x.id === item.id);
    const text = [item.name, m?.date, m?.caption].join(' ').toLowerCase();
    if (text.includes(q)) {
      out.push({
        kind: item.type || 'photo',
        title: m?.caption || item.name || 'Uploaded Media',
        sub: m?.date || 'Device Media',
        id: item.id
      });
    }
  });
  dms.forEach((m) => {
    if ([m.sender, m.recipient, m.text].join(' ').toLowerCase().includes(q)) {
      out.push({ kind: 'dm', title: m.text || 'Media Message', sub: `Chat · ${m.sender} → ${m.recipient}`, peer: m.sender === getChatSender() ? m.recipient : m.sender });
    }
  });
  grpMsgs.forEach((m) => {
    if ([m.sender, m.text].join(' ').toLowerCase().includes(q)) {
      out.push({ kind: 'groupMsg', title: m.text || 'Group Media', sub: `Group Message · ${m.sender}`, groupId: m.groupId });
    }
  });

  host.innerHTML = '';
  if (!out.length) {
    host.innerHTML = '<div class="empty-state">No matching memories</div>';
    return;
  }
  out.slice(0, 80).forEach((r) => {
    const b = document.createElement('button');
    b.className = 'search-result';
    b.type = 'button';
    b.innerHTML = `<b>${escapeHtml(r.title)}</b><small>${escapeHtml(r.sub || '')}</small>`;
    b.onclick = async () => {
      if (r.kind === 'profile') {
        const arr = await getAll('profiles');
        activeProfiles = arr.sort((a, b2) => (a.order ?? 9999) - (b2.order ?? 9999));
        $('searchDialog').close();
        openProfile(activeProfiles.findIndex((x) => x.id === r.id));
      } else if (r.kind === 'journey') {
        $('searchDialog').close();
        showPage(2);
        setTimeout(() => document.querySelector(`[data-journey-id="${r.id}"]`)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else if (r.kind === 'dm') {
        $('searchDialog').close();
        openMessagesDialog('chats', r.peer);
      } else if (r.kind === 'groupMsg') {
        $('searchDialog').close();
        openMessagesDialog('groups');
      } else {
        const item = await resolveMedia(r.id);
        $('searchDialog').close();
        if (item) openViewer([item], 0, item.type);
      }
    };
    host.appendChild(b);
  });
});

$('toolsAddBtn')?.addEventListener('click', () => { $('toolsDialog')?.close(); openAddSheet(); });

// Settings, Theme Switcher, Backup & Restore Center
$('themePicker')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.theme-swatch-btn[data-theme-choice]');
  if (!btn) return;
  applyTheme(btn.dataset.themeChoice, true);
});
$('toolsBtn').onclick = () => {
  $('restoreList').hidden = true;
  applyTheme(document.documentElement.dataset.theme || 'obsidian-gold', false);
  openDialog($('toolsDialog'));
};
$('restoreBtn').onclick = renderRestoreCenter;

async function renderRestoreCenter() {
  const host = $('restoreList');
  host.hidden = false;
  host.innerHTML = '';
  const rec = await getAll('recycle');
  const hidden = await getAll('hiddenMedia');
  const deletedKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith('deleted_')) deletedKeys.push(k);
  }
  if (!rec.length && !hidden.length && !deletedKeys.length) {
    host.innerHTML = '<div class="empty-state">Nothing to restore — everything in your archive is active.</div>';
    return;
  }
  for (const r of rec) {
    const row = document.createElement('div');
    row.className = 'restore-row';
    row.innerHTML = `<span>${escapeHtml(r.kind)} · ${escapeHtml(r.data?.name || r.data?.n || r.data?.title || r.originalId)}</span><button class="mini-btn" type="button">Restore</button>`;
    row.querySelector('button').onclick = async () => {
      if (r.kind === 'profile') await put('profiles', r.data);
      else if (r.kind === 'journey') await put('journeys', r.data);
      else if (r.kind === 'media') await put('media', r.data);
      else if (r.kind === 'hiddenMedia') await del('hiddenMedia', r.originalId);
      localStorage.removeItem('deleted_' + r.originalId);
      await del('recycle', r.id);
      await seedProfiles(); await seedJourneys();
      await renderPeople(); await renderQuickGalleries(); await renderJourney();
      await renderRestoreCenter(); await updateV7Home();
      showToast('Item restored');
    };
    host.appendChild(row);
  }
  for (const h of hidden) {
    if (rec.some((r) => r.originalId === h.id)) continue;
    const row = document.createElement('div');
    row.className = 'restore-row';
    row.innerHTML = `<span>Hidden media · ${escapeHtml(h.id)}</span><button class="mini-btn" type="button">Restore</button>`;
    row.querySelector('button').onclick = async () => {
      await del('hiddenMedia', h.id);
      await renderRestoreCenter();
      await renderQuickGalleries();
      await updateV7Home();
    };
    host.appendChild(row);
  }
  if (deletedKeys.length) {
    const row = document.createElement('div');
    row.className = 'restore-row';
    row.innerHTML = `<span>${deletedKeys.length} hidden built-in items</span><button class="mini-btn" type="button">Restore All</button>`;
    row.querySelector('button').onclick = async () => {
      deletedKeys.forEach((k) => localStorage.removeItem(k));
      await seedProfiles(); await seedJourneys();
      await renderPeople(); await renderQuickGalleries(); await renderJourney();
      await renderRestoreCenter(); await updateV7Home();
      showToast('All built-in items restored');
    };
    host.appendChild(row);
  }
}

function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(blob);
  });
}
async function encodeValue(v) {
  if (v instanceof Blob) return { __blob: true, type: v.type, data: await blobToDataURL(v) };
  if (Array.isArray(v)) return Promise.all(v.map(encodeValue));
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, val] of Object.entries(v)) o[k] = await encodeValue(val);
    return o;
  }
  return v;
}
function dataURLToBlob(s, type) {
  const [head, b64] = s.split(',');
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: type || head.match(/data:(.*?);/)?.[1] || '' });
}
async function decodeValue(v) {
  if (v?.__blob) return dataURLToBlob(v.data, v.type);
  if (Array.isArray(v)) return Promise.all(v.map(decodeValue));
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, val] of Object.entries(v)) o[k] = await decodeValue(val);
    return o;
  }
  return v;
}

$('exportBtn').onclick = async () => {
  const data = { version: 11, created: new Date().toISOString(), localStorage: {} };
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith('deleted_') || k === 'og-memory-day-items' || k === 'og_chat_sender') {
      data.localStorage[k] = localStorage.getItem(k);
    }
  }
  for (const s of V7_STORES) {
    if (DB.objectStoreNames.contains(s)) data[s] = await encodeValue(await getAll(s));
  }
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'OG-Legends-Memories-Backup.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  showToast('Archive backup downloaded');
};

$('importInput').onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    for (const s of V7_STORES) {
      if (!DB.objectStoreNames.contains(s) || !Array.isArray(data[s])) continue;
      const rows = await decodeValue(data[s]);
      const tx = DB.transaction(s, 'readwrite');
      const st = tx.objectStore(s);
      st.clear();
      for (const row of rows) st.put(row);
      await new Promise((r) => { tx.oncomplete = r; tx.onerror = r; tx.onabort = r; });
    }
    Object.entries(data.localStorage || {}).forEach(([k, v]) => localStorage.setItem(k, v));
    await seedProfiles(); await seedJourneys(); await seedSocialMessages();
    await renderPeople(); await renderQuickGalleries(); await renderJourney();
    await updateV7Home(); updateUnreadBadge();
    showToast('Backup imported successfully');
  } catch {
    showToast('Invalid backup file');
  }
  e.target.value = '';
};
