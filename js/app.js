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
  { n: 'Depanshu', nick: 'Nautanki', title: 'The Nautanki', nature: 'Dramatic', special: 'Drama King', memory: 'Nautanki — the theatrics and humour never failed to keep the whole group entertained. Those scenes are ones we will always smile back on.' },
  { n: 'Sahin', nick: 'Selfish One', title: 'The Graceful One', nature: 'Kind & Cheerful', special: 'Brightest Smile', memory: 'One of the sweetest and most genuine souls in our batch. Always polite, warm-hearted, and ready with a smile that could brighten any ordinary classroom afternoon. The shared laughs and group memories with Sahin will always hold a special place in our story.' }
];

const $ = (id) => document.getElementById(id);
const pageEls = [...document.querySelectorAll('.page')];
const drawerNavItems = [...document.querySelectorAll('.drawer-item[data-nav-page]')];
const bottomNavItems = [...document.querySelectorAll('.bnav-item[data-nav-page]')];
const PAGE = {
  HOME: 0,
  LEGENDS: 1,
  JOURNEY: 2,
  PHOTOS: 3,
  VIDEOS: 4,
  MEMORY_DAY: 5,
  WALL: 6,
  VAULT: 7,
  EPILOGUE: 8,
  MESSAGES: 9,
  ADD_MEMORY: 10,
  PROFILE_DETAIL: 11,
  NEW_PROFILE: 12,
  NEW_JOURNEY: 13,
  MEMORY_PICKER: 14,
  SEARCH: 15,
  META: 16,
  LETTER: 17,
  TOOLS: 18,
  VIEWER: 19
};
const PERSISTENT_PAGES = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
const SUBSCREEN_PAGES = new Set([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
const PAGE_TITLES = [
  'The OG Legends',
  'The Legends',
  'Our Journey',
  'Photos',
  'Videos',
  'Memories of the Day',
  'Memory Wall',
  '5-Memory Vault',
  'Not The End',
  'Batch Group',
  'Add to Memories',
  'Legend Profile',
  'Add Legend',
  'Add Journey Memory',
  'Choose Photos',
  'Search Archive',
  'Memory Info',
  'Friend Letter',
  'Theme & Settings',
  'Memory Viewer'
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
let currentHistState = { ogApp: true, ogDepth: 0, page: 0, drawer: false, msgThread: false, title: null };
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

function cleanupViewerOnLeave() {
  if (typeof stopSlideshow === 'function') stopSlideshow();
  const stage = $('viewerStage');
  if (stage) {
    stage.querySelector('video')?.pause();
    stage.innerHTML = '';
  }
  if (typeof viewerScale !== 'undefined') viewerScale = 1;
}

function syncPageUI(i, persist = true, customTitle = null) {
  const was = currentPage;
  currentPage = Math.max(0, Math.min(i, pageEls.length - 1));
  if (was === PAGE.VIEWER && currentPage !== PAGE.VIEWER) {
    cleanupViewerOnLeave();
  }
  if (was === PAGE.MESSAGES && currentPage !== PAGE.MESSAGES && typeof emitTypingStatus === 'function') {
    emitTypingStatus(false);
  }
  if (was !== currentPage && typeof pauseAllForegroundVideo === 'function') {
    pauseAllForegroundVideo();
  }

  pageEls.forEach((p, idx) => p.classList.toggle('active', idx === currentPage));
  drawerNavItems.forEach((btn) => btn.classList.toggle('active', Number(btn.dataset.navPage) === currentPage));
  bottomNavItems.forEach((btn) => {
    const isActive = Number(btn.dataset.navPage) === currentPage;
    btn.classList.toggle('active', isActive);
    if (isActive && typeof btn.scrollIntoView === 'function') {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  const titleText = customTitle || PAGE_TITLES[currentPage] || 'The OG Legends';
  if ($('appBarTitle')) $('appBarTitle').textContent = titleText;

  const isSubscreen = SUBSCREEN_PAGES.has(currentPage);
  const shell = $('siteShell');
  if (shell) {
    shell.classList.toggle('subscreen-mode', isSubscreen);
    shell.classList.toggle('hide-fab', isSubscreen || currentPage === PAGE.MESSAGES);
  }
  if ($('topBackBtn')) $('topBackBtn').hidden = currentPage === 0;

  closeNavDrawerUI();
  const active = pageEls[currentPage];
  if (active && was !== currentPage) active.scrollTop = 0;
  if (currentPage === RANDOM_PAGE_IDX && was !== RANDOM_PAGE_IDX) resetRandomBatch();
  if (currentPage === PAGE.MESSAGES && typeof renderGroupChat === 'function') {
    renderGroupChat();
  }
  if (persist && PERSISTENT_PAGES.has(currentPage)) {
    localStorage.setItem('og_last_page', String(currentPage));
  }
}

function showPage(i, options = true) {
  const opts = typeof options === 'boolean' ? { persist: options } : (options || {});
  const { persist = true, replace = false, title = null } = opts;
  const target = Math.max(0, Math.min(i, pageEls.length - 1));
  const wasDrawerOpen = currentHistState.drawer;
  closeNavDrawerUI();

  if (isApplyingHistory) {
    syncPageUI(target, persist, title);
    return;
  }

  if (wasDrawerOpen || replace) {
    if (wasDrawerOpen && target === currentPage) {
      if (currentHistState.ogDepth > 0) history.back();
      return;
    }
    replaceHistState({ page: target, drawer: false, title });
    syncPageUI(target, persist, title);
    return;
  }

  if (target === currentPage && title === currentHistState.title) {
    return;
  }

  pushHistState({ page: target, drawer: false, title });
  syncPageUI(target, persist, title);
}

let lastHomeBackTap = 0;
function goBackInApp() {
  if ($('appNavDrawer')?.classList.contains('open')) {
    closeNavDrawer(false);
    return;
  }
  if (!$('chatWhoTray')?.hidden) {
    closeWhoTray();
    return;
  }
  if (currentHistState.ogDepth > 0) {
    history.back();
  } else if (currentPage > 0) {
    showPage(0, { replace: true });
  }
}

window.__ogHandleAndroidBack = function () {
  if ($('appNavDrawer')?.classList.contains('open')) {
    closeNavDrawer(false);
    return true;
  }
  if ($('chatWhoTray') && !$('chatWhoTray').hidden) {
    closeWhoTray();
    return true;
  }
  if (typeof selectionState !== 'undefined') {
    if (selectionState.photo?.active) { setSelectionMode('photo', false); return true; }
    if (selectionState.video?.active) { setSelectionMode('video', false); return true; }
  }
  if (currentPage !== 0 || currentHistState.ogDepth > 0) {
    goBackInApp();
    return true;
  }
  const now = Date.now();
  if (now - lastHomeBackTap < 2000) {
    return false;
  }
  lastHomeBackTap = now;
  showToast('Press back again to exit');
  return true;
};

function finishSubscreenTo(fallbackPage) {
  const prev = currentHistState.ogDepth > 0 ? histStack[currentHistState.ogDepth - 1] : null;
  if (prev && prev.page === fallbackPage) {
    goBackInApp();
  } else {
    showPage(fallbackPage, { replace: true });
  }
}

$('brandHomeBtn')?.addEventListener('click', () => showPage(PAGE.HOME));
$('topBackBtn')?.addEventListener('click', goBackInApp);
$('viewerBackBtn')?.addEventListener('click', goBackInApp);
$('msgBackBtn')?.addEventListener('click', goBackInApp);
$('enterMemoriesBtn')?.addEventListener('click', () => showPage(PAGE.LEGENDS));
$('heroMessagesBtn')?.addEventListener('click', () => openMessagesDialog());
$('homeOpenMsgCard')?.addEventListener('click', () => openMessagesDialog());
$('homeJourneyBtn')?.addEventListener('click', () => showPage(PAGE.JOURNEY));
$('homeAddPhotoBtn')?.addEventListener('click', async () => {
  if (await addMedia('photo')) showPage(PAGE.PHOTOS);
});
$('homeAddVideoBtn')?.addEventListener('click', async () => {
  if (await addMedia('video')) showPage(PAGE.VIDEOS);
});

[...drawerNavItems, ...bottomNavItems].forEach((btn) => {
  btn.addEventListener('click', () => {
    const p = Number(btn.dataset.navPage || 0);
    if (p === PAGE.MESSAGES) openMessagesDialog();
    else showPage(p);
  });
});

document.querySelectorAll('.jump-btn').forEach((b) => {
  b.addEventListener('click', () => {
    closeNavDrawerUI();
    showPage(+b.dataset.target);
  });
});

// Full-screen Add to Memories screen
function openAddSheet() {
  showPage(PAGE.ADD_MEMORY);
}

$('mainFab')?.addEventListener('click', openAddSheet);
$('railFabBtn')?.addEventListener('click', () => { closeNavDrawerUI(); openAddSheet(); });
$('menuDrawerBtn')?.addEventListener('click', openNavDrawer);
$('drawerBackdrop')?.addEventListener('click', () => closeNavDrawer(false));
$('drawerThemeBtn')?.addEventListener('click', () => {
  closeNavDrawerUI();
  $('toolsBtn')?.click();
});

$('sheetAddPhotoBtn')?.addEventListener('click', async () => {
  if (await addMedia('photo')) showPage(PAGE.PHOTOS, { replace: true });
});

$('sheetAddVideoBtn')?.addEventListener('click', async () => {
  if (await addMedia('video')) showPage(PAGE.VIDEOS, { replace: true });
});

$('sheetAddJourneyBtn')?.addEventListener('click', () => showPage(PAGE.NEW_JOURNEY));
$('sheetAddProfileBtn')?.addEventListener('click', () => showPage(PAGE.NEW_PROFILE));

// Initialize History Stack (Home at depth 0; restored sub-page at depth 1 so Back returns to Home)
const savedStartPage = parseInt(localStorage.getItem('og_last_page') || '0', 10);
const initialPage = Number.isFinite(savedStartPage) && PERSISTENT_PAGES.has(savedStartPage) ? savedStartPage : 0;
currentHistState = { ogApp: true, ogDepth: 0, page: 0, drawer: false, msgThread: false, title: null };
histStack[0] = currentHistState;
history.replaceState(currentHistState, '', location.href);
if (initialPage > 0) {
  pushHistState({ page: initialPage, drawer: false, msgThread: false, title: null });
}
syncPageUI(initialPage, false, null, false);

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if ($('appNavDrawer')?.classList.contains('open')) {
    closeNavDrawer(false);
  } else if (currentPage !== 0 || currentHistState.msgThread) {
    goBackInApp();
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

    const targetPage = typeof state.page === 'number' ? state.page : 0;
    syncPageUI(targetPage, true, state.title || null, Boolean(state.msgThread));
  } finally {
    isApplyingHistory = false;
  }
});

// Subtle non-blocking toast notification & 2-tap inline confirmation
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

// =========================================================================
// PERMISSIONS & LIVE NOTIFICATIONS (ANDROID APK BRIDGE + WEB NOTIFICATIONS)
// =========================================================================
const selfCreatedIds = new Map();
function markSelfCreated(id, updatedTs = null) {
  const now = Date.now();
  for (const [k, exp] of selfCreatedIds.entries()) {
    if (exp < now) selfCreatedIds.delete(k);
  }
  const ttl = now + 5 * 60 * 1000;
  if (id) selfCreatedIds.set(String(id), ttl);
  if (id && updatedTs) selfCreatedIds.set(`${id}:${updatedTs}`, ttl);
}
function isSelfCreated(id, updatedTs = null) {
  const key = String(id || '');
  const exp = selfCreatedIds.get(key);
  if (exp && exp >= Date.now()) return true;
  if (updatedTs) {
    const expUpd = selfCreatedIds.get(`${key}:${updatedTs}`);
    if (expUpd && expUpd >= Date.now()) return true;
  }
  return false;
}

function isNativeAndroid() {
  return Boolean(window.OGNativeBridge && typeof window.OGNativeBridge.isNativeApp === 'function' && window.OGNativeBridge.isNativeApp());
}
function areAlertsEnabled() {
  return localStorage.getItem('og_notifs_enabled') !== '0';
}
function getPermissionStatus() {
  if (isNativeAndroid()) {
    const notifGranted = Boolean(window.OGNativeBridge.hasNotificationPermission?.());
    const mediaGranted = Boolean(window.OGNativeBridge.hasMediaPermission?.());
    return { native: true, notifGranted, mediaGranted, denied: !notifGranted, defaultState: !notifGranted };
  }
  if ('Notification' in window) {
    const perm = Notification.permission;
    return {
      native: false,
      notifGranted: perm === 'granted',
      mediaGranted: true,
      denied: perm === 'denied',
      defaultState: perm === 'default'
    };
  }
  return { native: false, notifGranted: false, mediaGranted: true, denied: false, defaultState: false };
}

function syncPermissionUI() {
  const status = getPermissionStatus();
  const enabled = areAlertsEnabled();
  const banner = $('permBanner');
  if (banner) {
    if (!enabled) {
      banner.hidden = true;
    } else if (status.native) {
      banner.hidden = status.notifGranted && status.mediaGranted;
      if ($('permBannerDesc')) {
        $('permBannerDesc').textContent = !status.notifGranted && !status.mediaGranted
          ? 'Allow Notifications & Photos/Videos access for instant batch alerts and uploads.'
          : (!status.notifGranted
            ? 'Allow Notifications permission to get instant message, photo & video alerts.'
            : 'Allow Photos & Videos access so you can upload memories smoothly.');
      }
    } else {
      const dismissed = localStorage.getItem('og_perm_banner_dismissed') === '1';
      banner.hidden = status.notifGranted || status.denied || !status.defaultState || dismissed;
    }
  }

  const toolsStatus = $('toolsPermStatus');
  if (toolsStatus) {
    if (!enabled) {
      toolsStatus.textContent = 'Live alerts muted · Tap to turn back on';
    } else if (status.native) {
      if (status.notifGranted && status.mediaGranted) {
        toolsStatus.textContent = 'Notifications & Media Active · Tap to mute';
      } else if (!status.notifGranted && !status.mediaGranted) {
        toolsStatus.textContent = 'Notifications & Media permission needed · Tap to Allow';
      } else if (!status.notifGranted) {
        toolsStatus.textContent = 'Notifications permission needed · Tap to Allow';
      } else {
        toolsStatus.textContent = 'Photos & Videos access needed · Tap to Allow';
      }
    } else if (!('Notification' in window)) {
      toolsStatus.textContent = 'In-app live alerts active';
    } else if (status.notifGranted) {
      toolsStatus.textContent = 'Browser notifications Active · Tap to mute';
    } else if (status.denied) {
      toolsStatus.textContent = 'Blocked in browser settings · Tap to check';
    } else {
      toolsStatus.textContent = 'Tap to Allow live message, photo & video alerts';
    }
  }
}

async function requestAppPermissions(quiet = false) {
  localStorage.setItem('og_notifs_enabled', '1');
  localStorage.removeItem('og_perm_banner_dismissed');
  if (isNativeAndroid()) {
    try {
      window.OGNativeBridge.requestAllPermissions();
      setTimeout(syncPermissionUI, 700);
      if (!quiet) showToast('Checking Android Notifications & Media permissions...');
    } catch {}
    syncPermissionUI();
    return true;
  }
  if (!('Notification' in window)) {
    syncPermissionUI();
    if (!quiet) showToast('In-app live alerts enabled');
    return false;
  }
  if (Notification.permission === 'granted') {
    syncPermissionUI();
    if (!quiet) showToast('Live notifications are already active');
    return true;
  }
  if (Notification.permission === 'denied') {
    syncPermissionUI();
    if (!quiet) showToast('Allow notifications in your browser site settings');
    return false;
  }
  try {
    const result = await Notification.requestPermission();
    syncPermissionUI();
    if (result === 'granted') {
      if (!quiet) showToast('Live notifications enabled for everyone!');
      return true;
    }
    if (!quiet) showToast('You can enable notifications anytime in Settings');
    return false;
  } catch {
    syncPermissionUI();
    return false;
  }
}

function maybePromptPermissionOnce() {
  if (!areAlertsEnabled() || isNativeAndroid()) return;
  if ('Notification' in window && Notification.permission === 'default' && !localStorage.getItem('og_perm_auto_asked')) {
    localStorage.setItem('og_perm_auto_asked', '1');
    requestAppPermissions(true);
  }
}

window.__ogOpenNotificationTarget = function (pageIdx) {
  const idx = Number(pageIdx);
  if (!Number.isFinite(idx)) return;
  if (idx === PAGE.MESSAGES) {
    openMessagesDialog();
  } else if (idx >= 0 && idx < pageEls.length) {
    showPage(idx);
  }
};

function notifyBatchEvent({ title, body, targetPage = PAGE.HOME, tag = 'og-live', toastText = null }) {
  if (!areAlertsEnabled()) return;
  const cleanTitle = String(title || 'The OG Legends').slice(0, 80);
  const cleanBody = String(body || '').slice(0, 180);

  if (isNativeAndroid()) {
    try {
      window.OGNativeBridge.notify(cleanTitle, cleanBody, Number(targetPage), String(tag || 'og-live'));
    } catch {}
  } else if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification(cleanTitle, {
        body: cleanBody,
        icon: 'assets/og-logo.png',
        badge: 'assets/og-logo.png',
        tag: String(tag || 'og-live')
      });
      n.onclick = () => {
        try { window.focus(); } catch {}
        window.__ogOpenNotificationTarget(targetPage);
        n.close();
      };
    } catch {}
  }

  if (document.visibilityState === 'visible' && currentPage !== targetPage) {
    showToast(toastText || `${cleanTitle}: ${cleanBody}`);
  }
}

$('permAllowBtn')?.addEventListener('click', () => requestAppPermissions(false));
$('permDismissBtn')?.addEventListener('click', () => {
  localStorage.setItem('og_perm_banner_dismissed', '1');
  if ($('permBanner')) $('permBanner').hidden = true;
});
$('toolsPermBtn')?.addEventListener('click', async () => {
  const status = getPermissionStatus();
  if (!areAlertsEnabled()) {
    await requestAppPermissions(false);
    return;
  }
  if (status.notifGranted && status.mediaGranted) {
    localStorage.setItem('og_notifs_enabled', '0');
    syncPermissionUI();
    showToast('Live notifications muted');
    return;
  }
  await requestAppPermissions(false);
});
window.addEventListener('ogpermissions:updated', syncPermissionUI);
document.addEventListener('DOMContentLoaded', syncPermissionUI);
setTimeout(syncPermissionUI, 150);

function syncAutoUpdaterUI(detail) {
  const u = window.OGUpdater;
  const state = detail || {
    version: u?.version || '15.9.0',
    isNativeApk: u?.isNativeApk?.() || false,
    isInstalled: u?.isStandalone?.() || false,
    isInstallable: u?.isInstallable?.() || false,
    isIOS: u?.isIOS?.() || false,
    isOnline: navigator.onLine !== false,
  };
  const showInstall = !state.isNativeApk && !state.isInstalled && (state.isInstallable || state.isIOS);
  if ($('pwaInstallTopBtn')) $('pwaInstallTopBtn').hidden = !showInstall;
  if ($('toolsInstallBtn')) $('toolsInstallBtn').hidden = !showInstall;
  if ($('toolsInstallStatus')) {
    $('toolsInstallStatus').textContent = state.isIOS
      ? 'Tap for iPhone / iPad Home Screen install steps'
      : 'Add to Home Screen · works offline & updates automatically';
  }
  if ($('toolsAutoUpdateStatus')) {
    const label = u?.getApkVersionLabel?.() || `v${state.version}`;
    if (state.apkStatus === 'downloading') {
      $('toolsAutoUpdateStatus').textContent = `Downloading update (${state.apkProgress || 0}%)...`;
    } else {
      $('toolsAutoUpdateStatus').textContent = `${label} · Auto-updates enabled (tap to check)`;
    }
  }
  if ($('offlineBanner')) {
    $('offlineBanner').hidden = state.isOnline !== false;
  }
}

async function handleInstallAppClick() {
  const u = window.OGUpdater;
  if (!u) return;
  if (u.isInstallable?.()) {
    await u.promptInstall();
  } else if (u.isIOS?.()) {
    if ($('iosInstallModal')) $('iosInstallModal').hidden = false;
  } else {
    showToast('Open browser menu (⋮) and tap "Add to Home screen"');
  }
}

$('pwaInstallTopBtn')?.addEventListener('click', handleInstallAppClick);
$('toolsInstallBtn')?.addEventListener('click', handleInstallAppClick);
$('iosInstallCloseBtn')?.addEventListener('click', () => {
  if ($('iosInstallModal')) $('iosInstallModal').hidden = true;
});
$('iosInstallModal')?.addEventListener('click', (e) => {
  if (e.target === $('iosInstallModal')) $('iosInstallModal').hidden = true;
});
$('toolsAutoUpdateBtn')?.addEventListener('click', async () => {
  if (!window.OGUpdater) return;
  showToast('Checking for latest update...');
  await window.OGUpdater.checkNow();
});
window.addEventListener('ogupdater:state', (e) => syncAutoUpdaterUI(e.detail));
window.addEventListener('ogupdater:toast', (e) => {
  if (e.detail?.message) showToast(e.detail.message);
});
window.addEventListener('online', () => syncAutoUpdaterUI());
window.addEventListener('offline', () => syncAutoUpdaterUI());
document.addEventListener('DOMContentLoaded', () => syncAutoUpdaterUI());
setTimeout(() => syncAutoUpdaterUI(), 250);

const inlineConfirmTimers = new WeakMap();
function resetConfirmTap(btn) {
  if (!btn) return;
  clearTimeout(inlineConfirmTimers.get(btn));
  btn.dataset.confirming = '';
  if (btn.dataset.origHtml) btn.innerHTML = btn.dataset.origHtml;
}
function confirmTap(btn, promptText = 'Tap again to confirm') {
  if (!btn) return true;
  if (btn.dataset.confirming === '1') {
    resetConfirmTap(btn);
    return true;
  }
  btn.dataset.origHtml = btn.innerHTML;
  btn.dataset.confirming = '1';
  btn.textContent = promptText;
  showToast('Tap again to confirm');
  const t = setTimeout(() => resetConfirmTap(btn), 3000);
  inlineConfirmTimers.set(btn, t);
  return false;
}

function pauseAllForegroundVideo() {
  document.querySelectorAll('#viewerStage video, .timeline-card video, .quick-video-card video, .chat-bubble-media video').forEach((v) => {
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
const PROFILE_SEED_VER = 3;
const BUILTIN_SEED_TS = 1700000000000;
function isUntouchedBuiltinProfile(existing, seed) {
  return Boolean(
    existing
    && !existing.imageBlob
    && (existing.image || 'assets/common.jpg') === 'assets/common.jpg'
    && existing.n === seed.n
    && existing.nick === seed.nick
    && existing.title === seed.title
    && existing.nature === seed.nature
    && existing.special === seed.special
    && existing.memory === seed.memory
  );
}
async function seedProfiles() {
  const saved = await getAll('profiles');
  for (let i = 0; i < PEOPLE.length; i++) {
    const id = 'builtin-profile-' + i;
    const existing = saved.find((x) => x.id === id);
    if (!localStorage.getItem('deleted_' + id)) {
      if (!existing) {
        await put('profiles', { ...PEOPLE[i], id, builtin: true, order: i, image: 'assets/common.jpg', profileVer: PROFILE_SEED_VER, updated: BUILTIN_SEED_TS });
      } else if (HAS_SMALLCAPS.test(existing.n || '') || (existing.profileVer || 0) < PROFILE_SEED_VER) {
        await put('profiles', {
          ...existing,
          ...PEOPLE[i],
          id,
          builtin: true,
          order: existing.order ?? i,
          image: existing.image || 'assets/common.jpg',
          profileVer: PROFILE_SEED_VER,
          updated: existing.imageBlob ? Date.now() : BUILTIN_SEED_TS
        });
      } else if (isUntouchedBuiltinProfile(existing, PEOPLE[i]) && Number(existing.updated || 0) > BUILTIN_SEED_TS) {
        await put('profiles', { ...existing, updated: BUILTIN_SEED_TS });
      }
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

function renderProfileDetailBody(p) {
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
          <button class="mini-btn" id="openProfileChatBtn" type="button"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 14a2.5 2.5 0 0 1-2.5 2.5H8l-4.5 4V6A2.5 2.5 0 0 1 6 3.5h12.5A2.5 2.5 0 0 1 21 6v8Z" fill="currentColor" fill-opacity="0.16"/></svg><span>Message in Batch Group</span></button>
          <button class="mini-btn" id="openLetterBtn" type="button"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="currentColor" fill-opacity="0.14"/><path d="m3.5 7 8.5 6 8.5-6"/></svg><span>Open Letter</span></button>
          <button class="mini-btn" id="changeProfileImageBtn" type="button"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="3.5" fill="currentColor" fill-opacity="0.14"/><circle cx="8.8" cy="8.8" r="1.6" fill="currentColor" stroke="none"/><path d="m21 15.5-3.8-3.8a2 2 0 0 0-2.83 0L6 20.5"/></svg><span>Change Photo</span></button>
          <button class="mini-btn danger" id="deleteProfileBtn" type="button"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg><span>Delete</span></button>
        </div>
      </div>
    </div>
    <div class="memory-box"><strong>Memory Note</strong><p>${escapeHtml(p.memory)}</p></div>`;
  $('openProfileChatBtn').onclick = () => openMessagesDialog(p.n);
  $('openLetterBtn').onclick = () => openFriendLetter(p);
  $('changeProfileImageBtn').onclick = async () => {
    const [file] = await filePicker('image/*', false);
    if (!file) return;
    p.imageBlob = file;
    p.updated = Date.now();
    markSelfCreated(p.id, p.updated);
    await put('profiles', p);
    await renderPeople();
    const updated = activeProfiles.find((x) => x.id === p.id) || p;
    renderProfileDetailBody(updated);
    showToast('Profile photo updated & syncing...');
    queueCloudOp('profile:' + p.id, () => window.OGCloud.pushProfile(p), 'Profile photo sync retry scheduled');
  };
  $('deleteProfileBtn').onclick = async () => {
    if (!confirmTap($('deleteProfileBtn'), 'Tap again to delete')) return;
    await recycleItem('profile', p.id, p);
    await del('profiles', p.id);
    if (p.builtin) localStorage.setItem('deleted_' + p.id, '1');
    await renderPeople();
    showToast(`${p.n} deleted (recoverable in Restore Center)`);
    queueCloudOp('profile-del:' + p.id, () => window.OGCloud.markProfileDeleted(p, true));
    finishSubscreenTo(PAGE.LEGENDS);
  };
}

function openProfile(i) {
  const p = activeProfiles[i];
  if (!p) return;
  renderProfileDetailBody(p);
  showPage(PAGE.PROFILE_DETAIL, { title: p.n });
}

$('addProfileBtn').onclick = () => showPage(PAGE.NEW_PROFILE);
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
    image: 'assets/common.jpg',
    updated: Date.now()
  };
  if (file) p.imageBlob = file;
  markSelfCreated(p.id, p.updated);
  maybePromptPermissionOnce();
  await put('profiles', p);
  e.target.reset();
  await renderPeople();
  showToast(`Added ${p.n} to The Legends`);
  queueCloudOp('profile:' + p.id, () => window.OGCloud.pushProfile(p));
  finishSubscreenTo(PAGE.LEGENDS);
};

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
  initCloudSyncOnce();
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
      queueCloudOp('hidden:' + item.id, () => window.OGCloud.setHiddenMedia(item.id, true));
    } else {
      await recycleItem('media', item.id, item);
      await del('media', item.id);
      queueCloudOp('media-del:' + item.id, () => window.OGCloud.markMediaDeleted(item, true));
    }
  }
  await renderQuickGalleries();
  await updateV7Home();
  const label = items.length === 1 ? (type === 'photo' ? 'Photo' : 'Video') : `${items.length} ${type}s`;
  showToast(`${label} deleted & synced`);
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
          ${st.active ? `<span class="quick-select-badge" aria-hidden="true">${isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</span>` : ''}
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
          ${st.active ? `<span class="quick-select-badge" aria-hidden="true">${isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</span>` : ''}
          <div class="quick-video-thumb">
            <video src="${src}" muted playsinline preload="metadata"></video>
            <button class="quick-play-overlay" type="button" aria-label="Play ${escapeHtml(item.name || 'Video')}"><svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg></button>
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
  if (!confirmTap($('deleteSelectedPhotosBtn'), `Confirm (${chosen.length})`)) return;
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
  if (!confirmTap($('deleteSelectedVideosBtn'), `Confirm (${chosen.length})`)) return;
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

// Full-screen Media viewer
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
  showPage(PAGE.VIEWER, { title: items[index]?.name || 'Memory Viewer' });
}

function getViewerSrc(item) {
  return item.builtin ? item.src : URL.createObjectURL(item.blob);
}

function renderViewer() {
  const item = currentViewerItems[currentViewerIndex];
  if (!item) return;
  resetConfirmTap($('viewerDelete'));
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
  const createdList = [];
  const uploader = getChatSender();
  for (const file of files) {
    const item = {
      id: 'm-' + Date.now() + '-' + Math.random().toString(36).slice(2),
      folderId,
      type,
      name: file.name,
      blob: file,
      addedBy: uploader,
      created: Date.now(),
      updated: Date.now()
    };
    markSelfCreated(item.id, item.updated);
    await put('media', item);
    createdList.push(item);
  }
  maybePromptPermissionOnce();
  await renderQuickGalleries();
  await updateV7Home();
  showToast(`Added ${files.length} ${type}${files.length > 1 ? 's' : ''} — syncing online...`);
  Promise.all(
    createdList.map((it) => queueCloudOp('media:' + it.id, () => window.OGCloud.pushMediaItem(it)))
  )
    .then(() => showToast(`${files.length} ${type}${files.length > 1 ? 's' : ''} synced to everyone!`))
    .catch((err) => {
      if (err?.message === 'FILE_TOO_LARGE_FOR_CLOUD') {
        showToast('Saved on device (video max 25 MB for online sync)');
      } else {
        showToast('Saved locally — will auto-sync when online');
      }
    });
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
      if (!existing) await put('journeys', { ...j, updated: BUILTIN_SEED_TS });
      else if (HAS_SMALLCAPS.test(existing.title || '')) await put('journeys', { ...existing, ...j, updated: existing.updated || BUILTIN_SEED_TS });
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
        <button class="mini-btn danger journey-delete" type="button"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg><span>Delete Memory</span></button>
      </div>`;
    c.querySelector('.journey-delete').onclick = async (ev) => {
      if (!confirmTap(ev.currentTarget, 'Tap again to delete')) return;
      await recycleItem('journey', j.id, j);
      await del('journeys', j.id);
      if (j.builtin) localStorage.setItem('deleted_' + j.id, '1');
      renderJourney();
      updateV7Home();
      showToast('Journey memory deleted');
      queueCloudOp('journey-del:' + j.id, () => window.OGCloud.markJourneyDeleted(j, true));
    };
    host.appendChild(c);
  });
  updateV7Home();
}

$('addJourneyBtn').onclick = () => showPage(PAGE.NEW_JOURNEY);
$('newJourneyForm').onsubmit = async (e) => {
  e.preventDefault();
  const file = $('journeyMedia').files[0] || null;
  const j = {
    id: 'journey-' + Date.now(),
    date: $('journeyDate').value.trim(),
    title: $('journeyTitle').value.trim(),
    message: $('journeyMessage').value.trim(),
    order: Date.now(),
    updated: Date.now(),
    builtin: false
  };
  if (file) {
    j.mediaBlob = file;
    j.mediaType = file.type;
  }
  markSelfCreated(j.id, j.updated);
  maybePromptPermissionOnce();
  await put('journeys', j);
  e.target.reset();
  await renderJourney();
  showToast('Added memory to Our Journey');
  queueCloudOp('journey:' + j.id, () => window.OGCloud.pushJourney(j));
  finishSubscreenTo(PAGE.JOURNEY);
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
function saveMemoryDayIds(ids, pushCloud = true) {
  const clean = [...new Set(ids)];
  localStorage.setItem('og-memory-day-items', JSON.stringify(clean));
  if (pushCloud) {
    markSelfCreated('appState:memoryOfDay', Date.now());
    queueCloudOp('appState:memoryOfDay', () => window.OGCloud.pushMemoryOfDay(clean));
  }
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
    saveMemoryDayIds(ids, false);
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
        rm.setAttribute('aria-label', 'Remove from Memories of the Day');
        rm.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>';
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
  if (!grid) return;
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
      showToast('Added to Memories of the Day');
      goBackInApp();
    };
    grid.appendChild(b);
  });
  showPage(PAGE.MEMORY_PICKER);
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
  const [local, profiles, journeys, grpMsgs] = await Promise.all([
    getAll('media'), getAll('profiles'), getAll('journeys'), getAll('groupMessages')
  ]);
  const lp = local.filter((x) => x.type === 'photo').length;
  const lv = local.filter((x) => x.type === 'video').length;
  const totalMsgs = grpMsgs.filter((m) => m.groupId === SHARED_GROUP_ID).length;
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
  if (!confirmTap($('viewerDelete'), 'Confirm?')) return;
  stopSlideshow();
  await deleteMediaItems([item], currentViewerType);
  currentViewerItems.splice(currentViewerIndex, 1);
  if (!currentViewerItems.length) {
    goBackInApp();
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
  $('metaPage').dataset.mediaId = item.id;
  showPage(PAGE.META);
};

$('metaForm').onsubmit = async (e) => {
  e.preventDefault();
  const id = $('metaPage').dataset.mediaId;
  if (!id) return;
  const meta = {
    id,
    date: $('metaDate').value.trim(),
    caption: $('metaCaption').value.trim(),
    updated: Date.now()
  };
  markSelfCreated(meta.id, meta.updated);
  await put('mediaMeta', meta);
  await refreshViewerV7();
  await updateV7Home();
  showToast('Caption & date saved');
  queueCloudOp('meta:' + meta.id, () => window.OGCloud.pushMediaMeta(meta));
  goBackInApp();
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
    $('viewerSlideshow').innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>';
    $('viewerSlideshow').classList.remove('active');
  }
}
function startSlideshow(items) {
  if (!items?.length) return;
  stopSlideshow();
  openViewer(items, 0, 'photo');
  if ($('viewerSlideshow')) {
    $('viewerSlideshow').innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
    $('viewerSlideshow').classList.add('active');
  }
  slideshowTimer = setInterval(() => {
    if (currentPage !== PAGE.VIEWER) { stopSlideshow(); return; }
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
  showPage(PAGE.LETTER, { title: `Letter to ${p.n}` });
}
$('saveLetterBtn').onclick = async () => {
  if (!activeLetterProfile) return;
  const letter = { id: activeLetterProfile.id, text: $('letterText').value, updated: Date.now() };
  markSelfCreated(letter.id, letter.updated);
  await put('letters', letter);
  showToast(`Letter saved for ${activeLetterProfile.n}`);
  queueCloudOp('letter:' + letter.id, () => window.OGCloud.pushLetter(letter));
  goBackInApp();
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
// RECREATED FULL-SCREEN BATCH GROUP CHAT (ONE GROUP — EVERYONE SEES EVERY MESSAGE)
// =========================================================================
const SHARED_GROUP_ID = 'grp-og-legends';
const CHAT_SENDER_PALETTE = ['#f4c152', '#4ae3b5', '#82b6ff', '#ff8aa8', '#c09bff', '#ffa65c', '#5ce1e6'];
const CHAT_REACTIONS = ['❤️', '😂', '🔥', '👏'];
let pendingMsgMedia = null; // { blob, mediaType, name, previewUrl }
let activeChatObjectUrls = [];
let chatRenderSeq = 0;
let replyingToMsg = null; // { id, sender, snippet }

function getChatSender() {
  return localStorage.getItem('og_chat_sender') || 'Rehan';
}
function setChatSender(name) {
  localStorage.setItem('og_chat_sender', name || 'Rehan');
}
function senderAccentColor(name) {
  let h = 0;
  const s = String(name || 'Legend');
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return CHAT_SENDER_PALETTE[Math.abs(h) % CHAT_SENDER_PALETTE.length];
}
function senderInitials(name) {
  const parts = String(name || '?').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
function formatDateLabel(ts) {
  const d = new Date(ts);
  const now = new Date();
  const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((startOfDay(now) - startOfDay(d)) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
}
function revokeChatUrls() {
  activeChatObjectUrls.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
  activeChatObjectUrls = [];
}
function clearPendingAttachment() {
  if (pendingMsgMedia?.previewUrl) {
    try { URL.revokeObjectURL(pendingMsgMedia.previewUrl); } catch {}
  }
  pendingMsgMedia = null;
  if ($('msgMediaInput')) $('msgMediaInput').value = '';
  if ($('msgAttachThumb')) {
    $('msgAttachThumb').src = '';
    $('msgAttachThumb').hidden = true;
  }
  if ($('msgAttachmentBar')) $('msgAttachmentBar').hidden = true;
}

function closeWhoTray() {
  if ($('chatWhoTray')) $('chatWhoTray').hidden = true;
  if ($('chatWhoToggleBtn')) $('chatWhoToggleBtn').setAttribute('aria-expanded', 'false');
}

function clearReplyTarget() {
  replyingToMsg = null;
  if ($('chatReplyAuthor')) $('chatReplyAuthor').textContent = '';
  if ($('chatReplySnippet')) $('chatReplySnippet').textContent = '';
  if ($('chatReplyBar')) $('chatReplyBar').hidden = true;
}

function setReplyTarget(m) {
  if (!m) return;
  const snippet = m.text?.trim()
    || (m.mediaType?.startsWith('video') ? '🎥 Video' : (m.mediaBlob ? '📷 Photo' : 'Message'));
  replyingToMsg = { id: m.id, sender: m.sender || 'Legend', snippet };
  if ($('chatReplyAuthor')) $('chatReplyAuthor').textContent = `Replying to ${replyingToMsg.sender}`;
  if ($('chatReplySnippet')) $('chatReplySnippet').textContent = replyingToMsg.snippet;
  if ($('chatReplyBar')) $('chatReplyBar').hidden = false;
  $('msgTextInput')?.focus();
}

$('chatCancelReplyBtn')?.addEventListener('click', clearReplyTarget);

function syncSenderDropdown() {
  const current = getChatSender();
  if ($('chatWhoLabel')) $('chatWhoLabel').textContent = current;
  const host = $('chatSenderChips');
  if (!host) return;
  const names = [...new Set([...activeProfiles.map((p) => p.n), current, 'Guest Friend'])].filter(Boolean);
  host.innerHTML = '';
  names.forEach((name) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chat-sender-chip' + (name === current ? ' active' : '');
    const accent = senderAccentColor(name);
    chip.innerHTML = `<span class="chat-chip-dot" style="color:${accent}">${escapeHtml(senderInitials(name))}</span><span>${escapeHtml(name)}</span>`;
    chip.onclick = async () => {
      setChatSender(name);
      closeWhoTray();
      syncSenderDropdown();
      await renderGroupChat();
      if ($('msgTextInput')?.value.trim()) emitTypingStatus(true, { force: true });
      showToast(`Writing as ${name}`);
    };
    host.appendChild(chip);
  });
}

$('chatWhoToggleBtn')?.addEventListener('click', () => {
  const tray = $('chatWhoTray');
  const btn = $('chatWhoToggleBtn');
  if (!tray || !btn) return;
  const opening = tray.hidden;
  tray.hidden = !opening;
  btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
  if (opening) {
    syncSenderDropdown();
    if ($('customSenderInput')) $('customSenderInput').value = '';
  }
});

$('customSenderWrap')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = $('customSenderInput');
  const name = input?.value.trim();
  if (!name) return;
  setChatSender(name);
  if (input) input.value = '';
  closeWhoTray();
  syncSenderDropdown();
  await renderGroupChat();
  if ($('msgTextInput')?.value.trim()) emitTypingStatus(true, { force: true });
  showToast(`Writing as ${name}`);
});

async function seedSocialMessages() {
  const grpMsgs = await getAll('groupMessages');
  const shared = grpMsgs.filter((m) => m.groupId === SHARED_GROUP_ID);
  if (!shared.length && !localStorage.getItem('seeded_shared_group_v2')) {
    localStorage.setItem('seeded_shared_group_v2', '1');
    const now = Date.now();
    await put('groupMessages', {
      id: 'gm-1',
      groupId: SHARED_GROUP_ID,
      sender: 'Rehan',
      text: 'Welcome everyone to The OG Legends Group! Jo bhi likhoge woh sabko dikhega — drop messages, photos, or videos anytime.',
      created: now - 3000000
    });
    await put('groupMessages', {
      id: 'gm-2',
      groupId: SHARED_GROUP_ID,
      sender: 'Sonu',
      text: 'Yaar ek idea hai — sab log apne Kushinagar trip aur school ke best moments share karo! 😄',
      created: now - 2400000
    });
    await put('groupMessages', {
      id: 'gm-3',
      groupId: SHARED_GROUP_ID,
      sender: 'Sahin',
      text: 'This batch keepsake feels so warm ❤️ So good seeing everyone here together!',
      created: now - 1900000
    });
    await put('groupMessages', {
      id: 'gm-4',
      groupId: SHARED_GROUP_ID,
      sender: 'Abdul',
      text: 'Done! Check the Photos & Videos tabs too, pura archive ek number lag raha hai.',
      created: now - 1400000
    });
    await put('groupMessages', {
      id: 'gm-5',
      groupId: SHARED_GROUP_ID,
      sender: 'Saniya',
      text: 'Batch 2025–26 memories forever ❤️✨',
      created: now - 800000
    });
  }
}

let latestCloudGroupRows = [];
const sentReceiptKeys = new Set();

function getDeviceId() {
  let id = localStorage.getItem('og_device_id');
  if (!id || !/^dev-[a-zA-Z0-9_-]{4,48}$/.test(id)) {
    id = 'dev-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    localStorage.setItem('og_device_id', id);
  }
  return id;
}

function safeReceiptKey(raw) {
  return String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64);
}

function getReceiptInfo(m) {
  if (m?.syncState === 'sending') {
    return {
      state: 'sending',
      label: 'Sending',
      readers: [],
      deliveredCount: 0,
      tooltip: 'Sending to group cloud...'
    };
  }
  const senderDevKey = m?.senderDeviceId ? safeReceiptKey(m.senderDeviceId) : '';
  const readMap = m?.readBy && typeof m.readBy === 'object' ? m.readBy : {};
  const delivMap = m?.deliveredTo && typeof m.deliveredTo === 'object' ? m.deliveredTo : {};

  const readers = Object.entries(readMap)
    .filter(([key, val]) => {
      if (!val || typeof val !== 'object') return false;
      if (senderDevKey) return key !== senderDevKey;
      return String(val.name || '') !== String(m?.sender || '');
    })
    .map(([, val]) => ({
      name: String(val.name || 'Legend'),
      at: Number(val.at || 0)
    }))
    .sort((a, b) => b.at - a.at);

  const deliveredKeys = Object.keys(delivMap).filter((key) => {
    if (senderDevKey) return key !== senderDevKey;
    return true;
  });

  if (readers.length > 0) {
    const label = readers.length > 1 ? `Read · ${readers.length}` : 'Read';
    const names = readers
      .slice(0, 5)
      .map((r) => `${r.name}${r.at ? ' (' + formatTimeShort(r.at) + ')' : ''}`)
      .join(', ');
    return {
      state: 'read',
      label,
      readers,
      deliveredCount: Math.max(deliveredKeys.length, readers.length),
      tooltip: `Read by ${names}${readers.length > 5 ? ` +${readers.length - 5} more` : ''}`
    };
  }

  if (deliveredKeys.length > 0) {
    return {
      state: 'delivered',
      label: 'Delivered',
      readers: [],
      deliveredCount: deliveredKeys.length,
      tooltip: `Delivered to ${deliveredKeys.length} ${deliveredKeys.length === 1 ? 'friend' : 'friends'}`
    };
  }

  return {
    state: 'sent',
    label: 'Sent',
    readers: [],
    deliveredCount: 0,
    tooltip: 'Sent to group cloud'
  };
}

function renderStatusHtml(info) {
  if (info.state === 'sending') {
    return '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg><span>Sending</span>';
  }
  if (info.state === 'sent') {
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>Sent</span>';
  }
  return `<svg width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 12.5 6.5 17.5 16.5 6.5"/><path d="M8.5 12.5 13.5 17.5 23 6.5"/></svg><span>${escapeHtml(info.label)}</span>`;
}

function formatReceiptToast(m, info) {
  if (info.state === 'sending') return 'Sending message to group cloud...';
  if (info.state === 'sent') return 'Sent to group cloud · waiting for delivery';
  if (info.state === 'delivered') {
    return `Delivered to ${info.deliveredCount} ${info.deliveredCount === 1 ? 'friend' : 'friends'} · not read yet`;
  }
  const seenList = info.readers
    .slice(0, 4)
    .map((r) => `${r.name} (${formatTimeShort(r.at || m.updated || m.created)})`)
    .join(', ');
  const extra = info.readers.length > 4 ? ` +${info.readers.length - 4} more` : '';
  return `Read by ${seenList}${extra}`;
}

function isRemoteMessageForDevice(r, myDevId, myDevKey, mySender) {
  if (!r || r.deleted || /^gm-[1-5]$/.test(r.id)) return false;
  if (r.senderDeviceId) {
    return r.senderDeviceId !== myDevId && safeReceiptKey(r.senderDeviceId) !== myDevKey;
  }
  return String(r.sender || '') !== String(mySender || '');
}

async function syncReceiptsForRows(rows, isViewingChat, pendingWriteIds = new Set()) {
  if (!DB || !window.OGCloud || navigator.onLine === false) return;
  const source = Array.isArray(rows) ? rows : latestCloudGroupRows;
  if (!source.length) return;

  const myDevId = getDeviceId();
  const myDevKey = safeReceiptKey(myDevId);
  const mySender = getChatSender();
  const nowTs = Date.now();

  const candidates = source
    .filter((r) => !pendingWriteIds.has(r.id) && isRemoteMessageForDevice(r, myDevId, myDevKey, mySender))
    .sort((a, b) => Number(b.created || 0) - Number(a.created || 0))
    .slice(0, 30);

  if (!candidates.length) return;

  const toRead = [];
  const toDeliver = [];

  for (const r of candidates) {
    const hasDelivered = Boolean(r.deliveredTo && r.deliveredTo[myDevKey]);
    const hasRead = Boolean(r.readBy && r.readBy[myDevKey]);
    if (isViewingChat) {
      const readKey = `${r.id}:read:${myDevKey}`;
      if (!hasRead && !sentReceiptKeys.has(readKey)) {
        sentReceiptKeys.add(readKey);
        sentReceiptKeys.add(`${r.id}:deliv:${myDevKey}`);
        toRead.push({
          id: r.id,
          created: r.created,
          updated: r.updated,
          deliveredAt: (r.deliveredTo && r.deliveredTo[myDevKey]) || nowTs
        });
      }
    } else {
      const delivKey = `${r.id}:deliv:${myDevKey}`;
      if (!hasDelivered && !sentReceiptKeys.has(delivKey)) {
        sentReceiptKeys.add(delivKey);
        toDeliver.push({
          id: r.id,
          created: r.created,
          updated: r.updated,
          deliveredAt: nowTs
        });
      }
    }
  }

  if (!toRead.length && !toDeliver.length) return;

  const readerInfo = { deviceId: myDevId, name: mySender };

  // Optimistically mirror receipts in IndexedDB
  const locals = await getAll('groupMessages');
  const localMap = new Map(locals.map((x) => [x.id, x]));
  for (const entry of toDeliver) {
    const rec = localMap.get(entry.id);
    if (rec) {
      rec.deliveredTo = { ...(rec.deliveredTo || {}), [myDevKey]: entry.deliveredAt };
      await put('groupMessages', rec);
    }
  }
  for (const entry of toRead) {
    const rec = localMap.get(entry.id);
    if (rec) {
      rec.deliveredTo = { ...(rec.deliveredTo || {}), [myDevKey]: entry.deliveredAt };
      rec.readBy = { ...(rec.readBy || {}), [myDevKey]: { name: mySender, at: nowTs } };
      await put('groupMessages', rec);
    }
  }

  if (toDeliver.length) {
    window.OGCloud.markMessagesReceipt(toDeliver, 'delivered', readerInfo).catch(() => {
      toDeliver.forEach((e) => sentReceiptKeys.delete(`${e.id}:deliv:${myDevKey}`));
    });
  }
  if (toRead.length) {
    window.OGCloud.markMessagesReceipt(toRead, 'read', readerInfo).catch(() => {
      toRead.forEach((e) => sentReceiptKeys.delete(`${e.id}:read:${myDevKey}`));
    });
  }
}

function markVisibleCloudMessagesRead() {
  if (currentPage === PAGE.MESSAGES && document.visibilityState === 'visible') {
    syncReceiptsForRows(latestCloudGroupRows, true);
  }
}

let latestTypingRows = [];
let typingExpiryTimer = null;
let typingAutoStopTimer = null;
let lastTypingSentAt = 0;
let lastTypingSentActive = false;
let lastTypingSentSender = '';

function formatTypingLabel(names) {
  if (!names.length) return '';
  if (names.length === 1) return `${names[0]} is typing...`;
  if (names.length === 2) return `${names[0]} and ${names[1]} are typing...`;
  return `${names[0]}, ${names[1]} and ${names.length - 2} more are typing...`;
}

function renderTypingIndicator() {
  const bar = $('chatTypingBar');
  const textEl = $('chatTypingText');
  if (!bar || !textEl) return;

  if (typingExpiryTimer) {
    clearTimeout(typingExpiryTimer);
    typingExpiryTimer = null;
  }

  const myDevKey = safeReceiptKey(getDeviceId());
  const myTypingDocId = `gt_${myDevKey}`;
  const nowTs = Date.now();

  const activeTypers = (Array.isArray(latestTypingRows) ? latestTypingRows : [])
    .filter((r) => {
      if (!r || !r.isTyping) return false;
      if (r.groupId && r.groupId !== SHARED_GROUP_ID) return false;
      if (r.id === myTypingDocId || safeReceiptKey(r.deviceId) === myDevKey) return false;
      const exp = Number(r.expiresAt || (Number(r.updated || 0) + 7500));
      return exp > nowTs;
    })
    .sort((a, b) => Number(b.updated || 0) - Number(a.updated || 0));

  if (!activeTypers.length) {
    bar.hidden = true;
    return;
  }

  const seenNames = [];
  for (const row of activeTypers) {
    const label = String(row.sender || 'Someone').trim() || 'Someone';
    if (!seenNames.includes(label)) seenNames.push(label);
  }

  textEl.textContent = formatTypingLabel(seenNames);
  bar.hidden = false;

  const nextExpiry = Math.min(
    ...activeTypers.map((r) => Number(r.expiresAt || (Number(r.updated || 0) + 7500)))
  );
  const waitMs = Math.max(400, Math.min(8000, nextExpiry - nowTs + 150));
  typingExpiryTimer = setTimeout(() => {
    renderTypingIndicator();
  }, waitMs);
}

function emitTypingStatus(isTyping, { force = false } = {}) {
  const active = Boolean(isTyping);
  if (typingAutoStopTimer) {
    clearTimeout(typingAutoStopTimer);
    typingAutoStopTimer = null;
  }

  const sender = getChatSender();
  const nowTs = Date.now();

  if (active) {
    typingAutoStopTimer = setTimeout(() => {
      emitTypingStatus(false);
    }, 3500);
    if (!force && lastTypingSentActive && lastTypingSentSender === sender && (nowTs - lastTypingSentAt) < 2500) {
      return;
    }
  } else if (!force && !lastTypingSentActive) {
    return;
  }

  lastTypingSentActive = active;
  lastTypingSentAt = nowTs;
  lastTypingSentSender = sender;

  if (!window.OGCloud?.setTypingStatus || navigator.onLine === false) return;
  window.OGCloud.setTypingStatus({
    deviceId: getDeviceId(),
    sender,
    isTyping: active
  }).catch(() => {});
}

async function updateUnreadBadge() {
  if (!DB) return;
  const gm = (await getAll('groupMessages')).filter((m) => m.groupId === SHARED_GROUP_ID);
  const total = gm.length;
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
  const gm = (await getAll('groupMessages')).filter((m) => m.groupId === SHARED_GROUP_ID);
  localStorage.setItem('og_msg_seen_count', String(gm.length));
  updateUnreadBadge();
}

async function openMessagesDialog(mentionName = null) {
  clearPendingAttachment();
  clearReplyTarget();
  closeWhoTray();
  closeNavDrawerUI();
  const alreadyHere = currentPage === PAGE.MESSAGES;
  showPage(PAGE.MESSAGES);
  await waitDB();
  syncSenderDropdown();
  await markMessagesSeen();
  markVisibleCloudMessagesRead();
  if (alreadyHere || !chatRenderSeq) {
    await renderGroupChat();
  }
  if (typeof mentionName === 'string' && mentionName.trim() && $('msgTextInput')) {
    const input = $('msgTextInput');
    if (!input.value) input.value = `@${mentionName.trim()} `;
    input.focus();
  }
}

$('toolsMsgBtn')?.addEventListener('click', () => openMessagesDialog());

async function renderGroupChat({ preserveScroll = false } = {}) {
  if (!DB) return;
  const feed = $('msgFeedHost');
  if (!feed) return;

  const seq = ++chatRenderSeq;
  const prevScroll = feed.scrollTop;
  const sender = getChatSender();
  if ($('chatWhoLabel')) $('chatWhoLabel').textContent = sender;

  const items = (await getAll('groupMessages'))
    .filter((m) => m.groupId === SHARED_GROUP_ID)
    .sort((a, b) => a.created - b.created);

  if (seq !== chatRenderSeq) return;

  revokeChatUrls();
  feed.innerHTML = '';

  if ($('msgThreadSub')) {
    $('msgThreadSub').textContent = `${activeProfiles.length} Legends · ${items.length} ${items.length === 1 ? 'message' : 'messages'} · Everyone sees all`;
  }
  if ($('msgTextInput')) {
    $('msgTextInput').placeholder = `Message everyone as ${sender}...`;
  }

  const banner = document.createElement('div');
  banner.className = 'chat-welcome-banner';
  banner.innerHTML = '<strong><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v2.2H3V18Zm0-2.5L1.6 7.4a1 1 0 0 1 1.58-.98L7.6 9.8 11.15 4.2a1 1 0 0 1 1.7 0l3.55 5.6 4.42-3.38a1 1 0 0 1 1.58.98L21 15.5H3Z"/></svg> The OG Legends Group</strong><br>One shared room for the whole batch — tap your name above to switch sender, reply, react, or share photos &amp; videos.';
  feed.appendChild(banner);

  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `No messages yet.<br><small>Write a message or attach a photo/video below as <strong>${escapeHtml(sender)}</strong>.</small>`;
    feed.appendChild(empty);
    return;
  }

  let lastDateLabel = '';
  items.forEach((m) => {
    const dLabel = formatDateLabel(m.created);
    if (dLabel !== lastDateLabel) {
      lastDateLabel = dLabel;
      const dateEl = document.createElement('div');
      dateEl.className = 'chat-date-pill';
      dateEl.textContent = dLabel;
      feed.appendChild(dateEl);
    }

    const myDevId = getDeviceId();
    const isMe = m.sender === sender && (!m.senderDeviceId || m.senderDeviceId === myDevId);
    const rInfo = isMe ? getReceiptInfo(m) : null;
    const row = document.createElement('div');
    row.className = 'chat-row ' + (isMe ? 'me' : 'them');

    const quoteHtml = m.replyTo
      ? `<div class="chat-quote-box"><strong>${escapeHtml(m.replyTo.sender || 'Legend')}</strong><span>${escapeHtml(m.replyTo.snippet || '')}</span></div>`
      : '';

    let mediaHtml = '';
    if (m.mediaBlob) {
      const u = URL.createObjectURL(m.mediaBlob);
      activeChatObjectUrls.push(u);
      mediaHtml = m.mediaType?.startsWith('video')
        ? `<div class="chat-bubble-media"><video src="${u}" controls playsinline></video></div>`
        : `<div class="chat-bubble-media"><img src="${u}" alt="${escapeHtml(m.mediaName || 'Shared photo')}" referrerpolicy="no-referrer"></div>`;
    }

    const reactionsMap = m.reactions && typeof m.reactions === 'object' ? m.reactions : {};
    const reactHtml = CHAT_REACTIONS.map((emoji) => {
      const users = Array.isArray(reactionsMap[emoji]) ? reactionsMap[emoji] : [];
      const active = users.includes(sender);
      const countText = users.length > 0 ? ` <span>${users.length}</span>` : '';
      return `<button class="chat-react-chip${active ? ' active' : ''}" type="button" data-emoji="${emoji}" aria-label="React ${emoji}">${emoji}${countText}</button>`;
    }).join('');

    const accent = senderAccentColor(m.sender);
    const avatarHtml = !isMe
      ? `<div class="chat-avatar-dot" style="color:${accent}" aria-hidden="true">${escapeHtml(senderInitials(m.sender))}</div>`
      : '';

    row.innerHTML = `
      ${avatarHtml}
      <div class="chat-bubble">
        <div class="chat-bubble-head">
          <span class="chat-sender-name" style="color:${isMe ? 'var(--accent)' : accent}">${escapeHtml(m.sender)}</span>
          <div class="chat-bubble-actions">
            <button class="chat-mini-act reply" type="button" title="Reply" aria-label="Reply to message"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg></button>
            <button class="chat-mini-act del" type="button" title="Delete message" aria-label="Delete message"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
          </div>
        </div>
        ${quoteHtml}
        ${mediaHtml}
        ${m.text ? `<div class="chat-bubble-text">${escapeHtml(m.text)}</div>` : ''}
        <div class="chat-bubble-bottom">
          <div class="chat-react-row">${reactHtml}</div>
          <div class="chat-bubble-foot">
            <span>${formatTimeShort(m.created)}</span>
            ${isMe ? `<button class="chat-status status-${rInfo.state}" type="button" aria-label="Message status: ${escapeHtml(rInfo.label)}" title="${escapeHtml(rInfo.tooltip)}">${renderStatusHtml(rInfo)}</button>` : ''}
          </div>
        </div>
      </div>`;

    const statusBtn = row.querySelector('.chat-status');
    if (statusBtn && rInfo) {
      statusBtn.onclick = () => showToast(formatReceiptToast(m, rInfo));
    }

    row.querySelector('.chat-mini-act.reply').onclick = () => setReplyTarget(m);
    row.querySelector('.chat-mini-act.del').onclick = async () => {
      if (replyingToMsg?.id === m.id) clearReplyTarget();
      await del('groupMessages', m.id);
      await markMessagesSeen();
      await renderGroupChat({ preserveScroll: true });
      await updateV7Home();
      showToast('Message deleted');
      queueCloudOp('gm-del:' + m.id, () => window.OGCloud.markMessageDeleted(m));
    };
    row.querySelectorAll('.chat-react-chip').forEach((chip) => {
      chip.onclick = async () => {
        const emoji = chip.dataset.emoji;
        const nextReactions = { ...(m.reactions || {}) };
        const list = Array.isArray(nextReactions[emoji]) ? [...nextReactions[emoji]] : [];
        const idx = list.indexOf(sender);
        if (idx >= 0) list.splice(idx, 1);
        else list.push(sender);
        if (list.length) nextReactions[emoji] = list;
        else delete nextReactions[emoji];
        m.reactions = nextReactions;
        m.updated = Date.now();
        markSelfCreated(m.id, m.updated);
        await put('groupMessages', m);
        await renderGroupChat({ preserveScroll: true });
        queueCloudOp('gm-react:' + m.id, () => window.OGCloud.updateMessageReactions(m, nextReactions));
      };
    });
    if (m.mediaBlob && !m.mediaType?.startsWith('video')) {
      row.querySelector('.chat-bubble-media img')?.addEventListener('click', () => {
        openViewer([{ id: m.id, blob: m.mediaBlob, builtin: false, type: 'photo', name: m.mediaName || 'Shared Photo' }], 0, 'photo');
      });
    }
    feed.appendChild(row);
  });

  requestAnimationFrame(() => {
    feed.scrollTop = preserveScroll ? prevScroll : feed.scrollHeight;
  });
}

$('msgMediaInput')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (pendingMsgMedia?.previewUrl) {
    try { URL.revokeObjectURL(pendingMsgMedia.previewUrl); } catch {}
  }
  const previewUrl = file.type?.startsWith('image') ? URL.createObjectURL(file) : '';
  pendingMsgMedia = { blob: file, mediaType: file.type, name: file.name, previewUrl };
  $('msgAttachName').textContent = file.name;
  if ($('msgAttachThumb')) {
    if (previewUrl) {
      $('msgAttachThumb').src = previewUrl;
      $('msgAttachThumb').hidden = false;
    } else {
      $('msgAttachThumb').src = '';
      $('msgAttachThumb').hidden = true;
    }
  }
  $('msgAttachmentBar').hidden = false;
  $('msgTextInput')?.focus();
});

$('msgClearAttachBtn')?.addEventListener('click', clearPendingAttachment);

$('msgTextInput')?.addEventListener('input', () => {
  const hasText = Boolean($('msgTextInput')?.value.trim());
  emitTypingStatus(hasText);
});

$('msgTextInput')?.addEventListener('blur', () => {
  emitTypingStatus(false);
});

$('msgComposeForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = $('msgTextInput').value.trim();
  if (!text && !pendingMsgMedia) return;
  emitTypingStatus(false, { force: true });
  await waitDB();
  const sender = getChatSender();
  const nowTs = Date.now();
  const msg = {
    id: 'gm-' + nowTs + '-' + Math.random().toString(36).slice(2),
    groupId: SHARED_GROUP_ID,
    sender,
    senderDeviceId: getDeviceId(),
    text,
    deliveredTo: {},
    readBy: {},
    syncState: 'sending',
    created: nowTs,
    updated: nowTs
  };
  if (replyingToMsg) {
    msg.replyTo = { ...replyingToMsg };
  }
  if (pendingMsgMedia) {
    msg.mediaBlob = pendingMsgMedia.blob;
    msg.mediaType = pendingMsgMedia.mediaType;
    msg.mediaName = pendingMsgMedia.name;
  }

  markSelfCreated(msg.id, msg.updated);
  maybePromptPermissionOnce();
  await put('groupMessages', msg);
  $('msgTextInput').value = '';
  clearPendingAttachment();
  clearReplyTarget();
  closeWhoTray();
  await markMessagesSeen();
  await renderGroupChat();
  await updateV7Home();
  $('msgTextInput')?.focus();
  queueCloudOp('gm:' + msg.id, () => window.OGCloud.pushMessage(msg))
    .then(async (ok) => {
      if (!ok) return;
      const allMsgs = await getAll('groupMessages');
      const existing = allMsgs.find((x) => x.id === msg.id);
      if (existing && existing.syncState === 'sending') {
        existing.syncState = 'sent';
        await put('groupMessages', existing);
        if (currentPage === PAGE.MESSAGES) {
          await renderGroupChat({ preserveScroll: true });
        }
      }
    })
    .catch((err) => {
      if (err?.message === 'FILE_TOO_LARGE_FOR_CLOUD') {
        showToast('Media saved on device (max 25 MB for online sync)');
      } else {
        showToast('Message queued — will sync online automatically');
      }
    });
});

let clearChatConfirmTimer = null;
$('msgClearThreadBtn')?.addEventListener('click', async () => {
  const btn = $('msgClearThreadBtn');
  if (btn.dataset.confirming !== '1') {
    btn.dataset.confirming = '1';
    btn.style.color = 'var(--danger)';
    showToast('Tap trash icon again to clear all chat messages');
    clearTimeout(clearChatConfirmTimer);
    clearChatConfirmTimer = setTimeout(() => {
      btn.dataset.confirming = '';
      btn.style.color = '';
    }, 3000);
    return;
  }
  clearTimeout(clearChatConfirmTimer);
  btn.dataset.confirming = '';
  btn.style.color = '';
  const all = await getAll('groupMessages');
  const targets = all.filter((x) => x.groupId === SHARED_GROUP_ID);
  for (const m of targets) {
    await del('groupMessages', m.id);
    queueCloudOp('gm-del:' + m.id, () => window.OGCloud.markMessageDeleted(m));
  }
  clearReplyTarget();
  await markMessagesSeen();
  await renderGroupChat();
  await updateV7Home();
  showToast('Group messages cleared');
});

// =========================================================================
// ARCHIVE SEARCH (Legends, Journeys, Photos, Videos & Batch Group Messages)
// =========================================================================
function openSearchDialog() {
  $('searchInput').value = '';
  $('searchResults').innerHTML = '<div class="empty-state">Type to search names, nicknames, captions, photos, videos, or messages</div>';
  showPage(PAGE.SEARCH);
  setTimeout(() => $('searchInput').focus(), 80);
}
$('searchBtn')?.addEventListener('click', openSearchDialog);
$('toolsSearchBtn')?.addEventListener('click', openSearchDialog);

$('searchInput')?.addEventListener('input', async () => {
  const q = $('searchInput').value.trim().toLowerCase();
  const host = $('searchResults');
  if (q.length < 2) {
    host.innerHTML = '<div class="empty-state">Type at least 2 characters</div>';
    return;
  }
  await waitDB();
  const [profiles, journeys, metas, localMedia, grpMsgs] = await Promise.all([
    getAll('profiles'), getAll('journeys'), getAll('mediaMeta'), getAll('media'), getAll('groupMessages')
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
  grpMsgs.filter((m) => m.groupId === SHARED_GROUP_ID).forEach((m) => {
    if ([m.sender, m.text].join(' ').toLowerCase().includes(q)) {
      out.push({ kind: 'groupMsg', title: m.text || 'Group Media', sub: `Batch Group · ${m.sender}` });
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
        openProfile(activeProfiles.findIndex((x) => x.id === r.id));
      } else if (r.kind === 'journey') {
        showPage(PAGE.JOURNEY);
        setTimeout(() => document.querySelector(`[data-journey-id="${r.id}"]`)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else if (r.kind === 'groupMsg') {
        openMessagesDialog();
      } else {
        const item = await resolveMedia(r.id);
        if (item) openViewer([item], 0, item.type);
      }
    };
    host.appendChild(b);
  });
});

$('toolsAddBtn')?.addEventListener('click', openAddSheet);

// Settings, Theme Switcher, Backup & Restore Center
$('themePicker')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.theme-swatch-btn[data-theme-choice]');
  if (!btn) return;
  applyTheme(btn.dataset.themeChoice, true);
});
$('toolsBtn').onclick = () => {
  $('restoreList').hidden = true;
  applyTheme(document.documentElement.dataset.theme || 'obsidian-gold', false);
  syncPermissionUI();
  showPage(PAGE.TOOLS);
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
      if (r.kind === 'profile') {
        const restored = { ...r.data, deleted: false, updated: Date.now() };
        markSelfCreated(restored.id, restored.updated);
        await put('profiles', restored);
        queueCloudOp('profile:' + restored.id, () => window.OGCloud.pushProfile(restored));
      } else if (r.kind === 'journey') {
        const restored = { ...r.data, deleted: false, updated: Date.now() };
        markSelfCreated(restored.id, restored.updated);
        await put('journeys', restored);
        queueCloudOp('journey:' + restored.id, () => window.OGCloud.pushJourney(restored));
      } else if (r.kind === 'media') {
        const restored = { ...r.data, deleted: false, updated: Date.now() };
        markSelfCreated(restored.id, restored.updated);
        await put('media', restored);
        queueCloudOp('media:' + restored.id, () => window.OGCloud.pushMediaItem(restored));
      } else if (r.kind === 'hiddenMedia') {
        await del('hiddenMedia', r.originalId);
        queueCloudOp('hidden:' + r.originalId, () => window.OGCloud.setHiddenMedia(r.originalId, false));
      }
      localStorage.removeItem('deleted_' + r.originalId);
      await del('recycle', r.id);
      await seedProfiles(); await seedJourneys();
      await renderPeople(); await renderQuickGalleries(); await renderJourney();
      await renderRestoreCenter(); await updateV7Home();
      showToast('Item restored & synced');
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
      queueCloudOp('hidden:' + h.id, () => window.OGCloud.setHiddenMedia(h.id, false));
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
      const restoredIds = deletedKeys.map((k) => k.slice('deleted_'.length));
      deletedKeys.forEach((k) => localStorage.removeItem(k));
      await seedProfiles(); await seedJourneys();
      const nowTs = Date.now();
      const [allProfs, allJourns] = await Promise.all([getAll('profiles'), getAll('journeys')]);
      for (const pid of restoredIds) {
        const p = allProfs.find((x) => x.id === pid);
        if (p) {
          p.updated = nowTs;
          markSelfCreated(p.id, nowTs);
          await put('profiles', p);
          queueCloudOp('profile:' + p.id, () => window.OGCloud.pushProfile({ ...p, deleted: false }));
        }
        const j = allJourns.find((x) => x.id === pid);
        if (j) {
          j.updated = nowTs;
          markSelfCreated(j.id, nowTs);
          await put('journeys', j);
          queueCloudOp('journey:' + j.id, () => window.OGCloud.pushJourney({ ...j, deleted: false }));
        }
      }
      await renderPeople(); await renderQuickGalleries(); await renderJourney();
      await renderRestoreCenter(); await updateV7Home();
      showToast('All built-in items restored & synced');
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
    if (window.OGCloud) {
      const [profs, journs, meds, msgs, metas, lets, hids] = await Promise.all([
        getAll('profiles'), getAll('journeys'), getAll('media'),
        getAll('groupMessages'), getAll('mediaMeta'), getAll('letters'), getAll('hiddenMedia')
      ]);
      profs.forEach((p) => queueCloudOp('profile:' + p.id, () => window.OGCloud.pushProfile({ ...p, updated: p.updated || Date.now(), deleted: false })));
      journs.forEach((j) => queueCloudOp('journey:' + j.id, () => window.OGCloud.pushJourney({ ...j, updated: j.updated || Date.now(), deleted: false })));
      meds.forEach((m) => queueCloudOp('media:' + m.id, () => window.OGCloud.pushMediaItem(m)));
      msgs.filter((m) => m.groupId === SHARED_GROUP_ID && !/^gm-[1-5]$/.test(m.id))
        .forEach((m) => queueCloudOp('gm:' + m.id, () => window.OGCloud.pushMessage(m)));
      metas.forEach((m) => queueCloudOp('meta:' + m.id, () => window.OGCloud.pushMediaMeta(m)));
      lets.forEach((l) => queueCloudOp('letter:' + l.id, () => window.OGCloud.pushLetter(l)));
      hids.forEach((h) => queueCloudOp('hidden:' + h.id, () => window.OGCloud.setHiddenMedia(h.id, true)));
      const modIds = memoryDaySavedIds();
      if (modIds.length) queueCloudOp('appState:memoryOfDay', () => window.OGCloud.pushMemoryOfDay(modIds));
    }
    showToast('Backup imported & syncing across devices');
  } catch {
    showToast('Invalid backup file');
  }
  e.target.value = '';
};

// =========================================================================
// REAL-TIME ONLINE CLOUD SYNC ACROSS ALL PHONES (FIRESTORE)
// =========================================================================
let cloudSyncStarted = false;
let cloudBootSeededMessages = false;
let cloudBootSeededProfiles = false;
let cloudBootSeededJourneys = false;
const cloudHydrated = {
  groupMessages: false,
  mediaItems: false,
  profiles: false,
  journeys: false,
  letters: false,
  appState: false
};
const uploadedMissingIds = new Set();
const pendingCloudOps = new Map();
let retryTimer = null;

function queueCloudOp(key, fn) {
  if (!window.OGCloud) {
    pendingCloudOps.set(key, fn);
    return Promise.resolve(false);
  }
  return Promise.resolve()
    .then(() => fn())
    .then((ok) => {
      pendingCloudOps.delete(key);
      return ok;
    })
    .catch((err) => {
      if (err?.message === 'FILE_TOO_LARGE_FOR_CLOUD') {
        pendingCloudOps.delete(key);
        throw err;
      }
      pendingCloudOps.set(key, fn);
      scheduleCloudRetry();
      console.warn('[OGCloud] Queued for retry:', key, err?.message || err);
      return false;
    });
}

function scheduleCloudRetry() {
  if (retryTimer) return;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    flushPendingCloudOps();
  }, 6000);
}

async function flushPendingCloudOps() {
  if (!window.OGCloud || !pendingCloudOps.size) return;
  const entries = [...pendingCloudOps.entries()];
  for (const [key, fn] of entries) {
    try {
      await fn();
      pendingCloudOps.delete(key);
    } catch (err) {
      if (err?.message === 'FILE_TOO_LARGE_FOR_CLOUD') {
        pendingCloudOps.delete(key);
      } else {
        scheduleCloudRetry();
      }
    }
  }
}

function initCloudSyncOnce() {
  if (cloudSyncStarted || !DB || !window.OGCloud) return;
  cloudSyncStarted = true;
  const cloud = window.OGCloud;

  flushPendingCloudOps();

  cloud.startRealtimeSync({
    async onGroupMessages(rows, snapshot) {
      latestCloudGroupRows = rows;
      const pendingWriteIds = new Set(
        (snapshot?.docs || []).filter((d) => d.metadata?.hasPendingWrites).map((d) => d.id)
      );

      if (!rows.length && !cloudBootSeededMessages) {
        cloudBootSeededMessages = true;
        cloudHydrated.groupMessages = true;
        const locals = (await getAll('groupMessages')).filter((m) => m.groupId === SHARED_GROUP_ID);
        for (const m of locals) {
          queueCloudOp('gm:' + m.id, () => cloud.pushMessage(m)).catch(() => {});
        }
        return;
      }
      cloudBootSeededMessages = true;
      const wasHydrated = cloudHydrated.groupMessages;
      cloudHydrated.groupMessages = true;
      const locals = await getAll('groupMessages');
      const localMap = new Map(locals.map((x) => [x.id, x]));
      const cloudIds = new Set(rows.map((r) => r.id));
      let changed = false;
      let hasBrandNewMsg = false;
      const incomingOtherMsgs = [];

      for (const r of rows) {
        const cur = localMap.get(r.id);
        if (r.deleted) {
          if (cur) {
            await del('groupMessages', r.id);
            changed = true;
          }
          continue;
        }
        const needBlob = !cur?.mediaBlob && Boolean(r.mediaData || r.chunked);
        const isNewer = !cur || Number(r.updated || 0) > Number(cur.updated || 0);
        const nextDelivered = r.deliveredTo && typeof r.deliveredTo === 'object' ? r.deliveredTo : (cur?.deliveredTo || {});
        const nextRead = r.readBy && typeof r.readBy === 'object' ? r.readBy : (cur?.readBy || {});
        const nextSenderDevId = r.senderDeviceId || cur?.senderDeviceId || '';
        const nextSyncState = pendingWriteIds.has(r.id) ? 'sending' : 'sent';
        const receiptsChanged = !cur
          || cur.syncState !== nextSyncState
          || (cur.senderDeviceId || '') !== nextSenderDevId
          || JSON.stringify(cur.deliveredTo || {}) !== JSON.stringify(nextDelivered)
          || JSON.stringify(cur.readBy || {}) !== JSON.stringify(nextRead);

        if (isNewer || needBlob || receiptsChanged) {
          const isStaticSeed = /^gm-[1-5]$/.test(r.id);
          if (!cur) hasBrandNewMsg = true;
          if (!cur && wasHydrated && !isStaticSeed && !isSelfCreated(r.id)) {
            incomingOtherMsgs.push(r);
          }
          const baseRec = {
            id: r.id,
            groupId: r.groupId || SHARED_GROUP_ID,
            sender: r.sender || 'Legend',
            senderDeviceId: nextSenderDevId,
            text: r.text || '',
            created: Number(r.created || Date.now()),
            updated: Number(r.updated || r.created || Date.now()),
            replyTo: r.replyTo || null,
            reactions: r.reactions || {},
            deliveredTo: nextDelivered,
            readBy: nextRead,
            syncState: nextSyncState
          };
          if (cur?.mediaBlob) {
            baseRec.mediaBlob = cur.mediaBlob;
            baseRec.mediaType = cur.mediaType || r.mediaType || cur.mediaBlob.type;
            baseRec.mediaName = cur.mediaName || r.mediaName || 'Shared media';
          }
          await put('groupMessages', baseRec);
          changed = true;

          if (!cur?.mediaBlob && (r.mediaData || r.chunked)) {
            let mediaBlob = null;
            try {
              mediaBlob = await cloud.resolveCloudBlob(r.id, r.mediaData, r.chunked, r.mediaType, r.chunkCount);
            } catch (err) {
              console.warn('[OGCloud] chat media resolve deferred:', r.id, err?.message || err);
            }
            if (mediaBlob) {
              baseRec.mediaBlob = mediaBlob;
              baseRec.mediaType = r.mediaType || mediaBlob.type;
              baseRec.mediaName = r.mediaName || 'Shared media';
              await put('groupMessages', baseRec);
              changed = true;
            }
          }
        }
      }

      // Push any user-created local messages not yet in cloud (ignore static gm-1..gm-5 seeds)
      for (const m of locals) {
        const isStaticSeed = /^gm-[1-5]$/.test(m.id);
        if (!isStaticSeed && m.groupId === SHARED_GROUP_ID && !cloudIds.has(m.id) && !uploadedMissingIds.has('gm:' + m.id)) {
          uploadedMissingIds.add('gm:' + m.id);
          queueCloudOp('gm:' + m.id, () => cloud.pushMessage(m)).catch(() => {
            uploadedMissingIds.delete('gm:' + m.id);
          });
        }
      }

      if (changed) {
        await updateUnreadBadge();
        await updateV7Home();
        if (currentPage === PAGE.MESSAGES) {
          await markMessagesSeen();
          await renderGroupChat({ preserveScroll: !hasBrandNewMsg });
        }
        if (incomingOtherMsgs.length && (currentPage !== PAGE.MESSAGES || document.hidden)) {
          const latest = incomingOtherMsgs.sort((a, b) => Number(a.created || 0) - Number(b.created || 0)).pop();
          const hasMedia = Boolean(latest.mediaData || latest.chunked);
          const mediaAction = latest.mediaType?.startsWith('video') ? 'sent a video' : 'sent a photo';
          const body = hasMedia
            ? (latest.text ? `${mediaAction}: ${latest.text}` : `${mediaAction} in Batch Group`)
            : (latest.text || 'Sent a new message');
          notifyBatchEvent({
            title: `💬 ${latest.sender || 'Legend'} (Batch Group)`,
            body,
            targetPage: PAGE.MESSAGES,
            tag: 'gm-' + latest.id,
            toastText: `💬 ${latest.sender || 'Legend'}: ${body.slice(0, 46)}`
          });
        }
      }

      syncReceiptsForRows(rows, currentPage === PAGE.MESSAGES && document.visibilityState === 'visible', pendingWriteIds);
    },

    onGroupTyping(rows) {
      latestTypingRows = Array.isArray(rows) ? rows : [];
      renderTypingIndicator();
    },

    async onMediaItems(rows) {
      const wasHydrated = cloudHydrated.mediaItems;
      cloudHydrated.mediaItems = true;
      const locals = await getAll('media');
      const localMap = new Map(locals.map((x) => [x.id, x]));
      const cloudIds = new Set(rows.map((r) => r.id));
      let changed = false;
      const incomingNewMedia = [];

      for (const r of rows) {
        const cur = localMap.get(r.id);
        if (r.deleted) {
          if (cur) {
            await del('media', r.id);
            changed = true;
          }
          continue;
        }
        const needBlob = !cur?.blob && Boolean(r.dataUrl || r.chunked);
        const isNewer = !cur || Number(r.updated || 0) > Number(cur.updated || 0);
        if (isNewer || needBlob) {
          let blob = cur?.blob || null;
          if (!blob) {
            try {
              blob = await cloud.resolveCloudBlob(r.id, r.dataUrl, r.chunked, r.mimeType, r.chunkCount);
            } catch (err) {
              console.warn('[OGCloud] media resolve deferred:', r.id, err?.message || err);
            }
          }
          if (blob) {
            await put('media', {
              id: r.id,
              folderId: r.folderId || (r.type === 'video' ? 'builtin-videos' : 'builtin-photos'),
              type: r.type === 'video' ? 'video' : 'photo',
              name: r.name || 'Batch Memory',
              blob,
              addedBy: r.addedBy || 'Legend',
              created: Number(r.created || Date.now()),
              updated: Number(r.updated || r.created || Date.now())
            });
            changed = true;
            if (!cur && wasHydrated && !isSelfCreated(r.id)) {
              incomingNewMedia.push(r);
            }
          }
        }
      }

      // Sync any local uploads not yet in Firestore
      for (const m of locals) {
        if (!cloudIds.has(m.id) && !uploadedMissingIds.has('media:' + m.id)) {
          uploadedMissingIds.add('media:' + m.id);
          queueCloudOp('media:' + m.id, () => cloud.pushMediaItem(m)).catch(() => {
            uploadedMissingIds.delete('media:' + m.id);
          });
        }
      }

      if (changed) {
        await renderQuickGalleries();
        await updateV7Home();
        if (currentPage === PAGE.MEMORY_DAY) await renderMemoryDay();
        if (incomingNewMedia.length) {
          if (incomingNewMedia.length === 1) {
            const item = incomingNewMedia[0];
            const isVid = item.type === 'video';
            notifyBatchEvent({
              title: isVid ? '🎬 New Video Added' : '📸 New Photo Added',
              body: `${item.addedBy || 'A Legend'} added "${formatMediaTitle(item.name)}"`,
              targetPage: isVid ? PAGE.VIDEOS : PAGE.PHOTOS,
              tag: 'media-' + item.id
            });
          } else {
            const hasVid = incomingNewMedia.some((x) => x.type === 'video');
            const hasPhoto = incomingNewMedia.some((x) => x.type !== 'video');
            const who = incomingNewMedia[0].addedBy || 'A Legend';
            const kindLabel = hasPhoto && hasVid ? 'photos & videos' : (hasVid ? 'videos' : 'photos');
            notifyBatchEvent({
              title: `📸 ${incomingNewMedia.length} New ${kindLabel} Added`,
              body: `${who} shared ${incomingNewMedia.length} ${kindLabel} in Gallery`,
              targetPage: hasVid && !hasPhoto ? PAGE.VIDEOS : PAGE.PHOTOS,
              tag: 'media-batch-' + Date.now()
            });
          }
        }
      }
    },

    async onProfiles(rows) {
      if (!rows.length && !cloudBootSeededProfiles) {
        cloudBootSeededProfiles = true;
        cloudHydrated.profiles = true;
        const locals = await getAll('profiles');
        for (const p of locals) {
          queueCloudOp('profile:' + p.id, () => cloud.pushProfile({ ...p, updated: p.updated || Date.now(), deleted: false }));
        }
        return;
      }
      cloudBootSeededProfiles = true;
      const wasHydrated = cloudHydrated.profiles;
      cloudHydrated.profiles = true;
      const locals = await getAll('profiles');
      const localMap = new Map(locals.map((x) => [x.id, x]));
      const cloudMap = new Map(rows.map((r) => [r.id, r]));
      let changed = false;
      const incomingProfiles = [];

      for (const r of rows) {
        const cur = localMap.get(r.id);
        if (r.deleted) {
          if (cur) {
            await del('profiles', r.id);
            if (r.builtin) localStorage.setItem('deleted_' + r.id, '1');
            changed = true;
          }
          continue;
        }
        const needBlob = !cur?.imageBlob && Boolean(r.imageData);
        const higherVer = Number(r.profileVer || 0) > Number(cur?.profileVer || 0);
        const sameVerNewer = Number(r.profileVer || 0) >= Number(cur?.profileVer || 0) && Number(r.updated || 0) > Number(cur?.updated || 0);
        if (!cur || higherVer || sameVerNewer || needBlob) {
          if (r.builtin) localStorage.removeItem('deleted_' + r.id);
          const isRemoteChange = wasHydrated && !isSelfCreated(r.id, r.updated);
          if (isRemoteChange && (!cur || sameVerNewer)) {
            incomingProfiles.push({ kind: cur ? 'update' : 'new', row: r });
          }
          const imageBlob = r.imageData ? cloud.dataUrlToBlob(r.imageData, 'image/jpeg') : (cur?.imageBlob || null);
          const rec = {
            id: r.id,
            builtin: Boolean(r.builtin),
            order: Number(r.order ?? 999),
            n: r.n || 'Legend',
            nick: r.nick || '',
            title: r.title || '',
            nature: r.nature || '',
            special: r.special || '',
            memory: r.memory || '',
            image: r.image || 'assets/common.jpg',
            profileVer: Number(r.profileVer || 3),
            updated: Number(r.updated || Date.now())
          };
          if (imageBlob) rec.imageBlob = imageBlob;
          await put('profiles', rec);
          changed = true;
        }
      }

      // Push any local-only or newer profile updates to Firestore
      for (const p of locals) {
        const remote = cloudMap.get(p.id);
        const localNewer = !remote || (Number(p.profileVer || 0) > Number(remote.profileVer || 0)) || (Number(p.updated || 0) > Number(remote.updated || 0) && !remote.deleted);
        if (localNewer && !uploadedMissingIds.has('profile:' + p.id + ':' + (p.updated || 0))) {
          uploadedMissingIds.add('profile:' + p.id + ':' + (p.updated || 0));
          queueCloudOp('profile:' + p.id, () => cloud.pushProfile({ ...p, updated: p.updated || Date.now(), deleted: false }));
        }
      }

      if (changed) {
        await renderPeople();
        if (incomingProfiles.length) {
          const latest = incomingProfiles[incomingProfiles.length - 1];
          notifyBatchEvent({
            title: latest.kind === 'new' ? '👑 New Legend Added' : '✨ Legend Profile Updated',
            body: latest.kind === 'new'
              ? `${latest.row.n}${latest.row.nick ? ` (${latest.row.nick})` : ''} joined The Legends`
              : `${latest.row.n}'s profile or photo was updated`,
            targetPage: PAGE.LEGENDS,
            tag: 'prof-' + latest.row.id
          });
        }
      }
    },

    async onJourneys(rows) {
      if (!rows.length && !cloudBootSeededJourneys) {
        cloudBootSeededJourneys = true;
        cloudHydrated.journeys = true;
        const locals = await getAll('journeys');
        for (const j of locals) {
          queueCloudOp('journey:' + j.id, () => cloud.pushJourney({ ...j, updated: j.updated || Date.now(), deleted: false }));
        }
        return;
      }
      cloudBootSeededJourneys = true;
      const wasHydrated = cloudHydrated.journeys;
      cloudHydrated.journeys = true;
      const locals = await getAll('journeys');
      const localMap = new Map(locals.map((x) => [x.id, x]));
      const cloudMap = new Map(rows.map((r) => [r.id, r]));
      let changed = false;
      const incomingJourneys = [];

      for (const r of rows) {
        const cur = localMap.get(r.id);
        if (r.deleted) {
          if (cur) {
            await del('journeys', r.id);
            if (r.builtin) localStorage.setItem('deleted_' + r.id, '1');
            changed = true;
          }
          continue;
        }
        const needBlob = !cur?.mediaBlob && Boolean(r.mediaData);
        const isNewer = !cur || Number(r.updated || 0) > Number(cur.updated || 0);
        if (isNewer || needBlob) {
          if (r.builtin) localStorage.removeItem('deleted_' + r.id);
          if (!cur && wasHydrated && !isSelfCreated(r.id, r.updated)) {
            incomingJourneys.push(r);
          }
          const mediaBlob = r.mediaData ? cloud.dataUrlToBlob(r.mediaData, r.mediaType) : (cur?.mediaBlob || null);
          const rec = {
            id: r.id,
            date: r.date || '',
            title: r.title || '',
            message: r.message || '',
            order: Number(r.order || Date.now()),
            builtin: Boolean(r.builtin),
            updated: Number(r.updated || Date.now())
          };
          if (mediaBlob) {
            rec.mediaBlob = mediaBlob;
            rec.mediaType = r.mediaType || mediaBlob.type;
          }
          await put('journeys', rec);
          changed = true;
        }
      }

      for (const j of locals) {
        const remote = cloudMap.get(j.id);
        if ((!remote || Number(j.updated || 0) > Number(remote.updated || 0)) && !remote?.deleted && !uploadedMissingIds.has('journey:' + j.id)) {
          uploadedMissingIds.add('journey:' + j.id);
          queueCloudOp('journey:' + j.id, () => cloud.pushJourney({ ...j, updated: j.updated || Date.now(), deleted: false }));
        }
      }

      if (changed) {
        await renderJourney();
        if (incomingJourneys.length) {
          const latest = incomingJourneys[incomingJourneys.length - 1];
          notifyBatchEvent({
            title: '📖 New Journey Memory',
            body: `${latest.title || 'New Story'}${latest.date ? ` · ${latest.date}` : ''}`,
            targetPage: PAGE.JOURNEY,
            tag: 'jrn-' + latest.id
          });
        }
      }
    },

    async onMediaMeta(rows) {
      const locals = await getAll('mediaMeta');
      const localMap = new Map(locals.map((x) => [x.id, x]));
      const cloudMap = new Map(rows.map((r) => [r.id, r]));
      let changed = false;
      for (const r of rows) {
        const cur = localMap.get(r.id);
        if (!cur || Number(r.updated || 0) > Number(cur.updated || 0)) {
          await put('mediaMeta', { id: r.id, date: r.date || '', caption: r.caption || '', updated: Number(r.updated || Date.now()) });
          changed = true;
        }
      }
      for (const m of locals) {
        const remote = cloudMap.get(m.id);
        if ((!remote || Number(m.updated || 0) > Number(remote.updated || 0)) && !uploadedMissingIds.has('meta:' + m.id)) {
          uploadedMissingIds.add('meta:' + m.id);
          queueCloudOp('meta:' + m.id, () => cloud.pushMediaMeta(m));
        }
      }
      if (changed) await refreshViewerV7();
    },

    async onLetters(rows) {
      const wasHydrated = cloudHydrated.letters;
      cloudHydrated.letters = true;
      const locals = await getAll('letters');
      const localMap = new Map(locals.map((x) => [x.id, x]));
      const cloudMap = new Map(rows.map((r) => [r.id, r]));
      const updatedLetters = [];
      for (const r of rows) {
        const cur = localMap.get(r.id);
        if (!cur || Number(r.updated || 0) > Number(cur.updated || 0)) {
          await put('letters', { id: r.id, text: r.text || '', updated: Number(r.updated || Date.now()) });
          if (wasHydrated && !isSelfCreated(r.id, r.updated)) {
            updatedLetters.push(r);
          }
        }
      }
      for (const l of locals) {
        const remote = cloudMap.get(l.id);
        if ((!remote || Number(l.updated || 0) > Number(remote.updated || 0)) && !uploadedMissingIds.has('letter:' + l.id)) {
          uploadedMissingIds.add('letter:' + l.id);
          queueCloudOp('letter:' + l.id, () => cloud.pushLetter(l));
        }
      }
      if (updatedLetters.length) {
        const latest = updatedLetters[updatedLetters.length - 1];
        const profName = activeProfiles.find((x) => x.id === latest.id)?.n || 'a Legend';
        notifyBatchEvent({
          title: '✉️ Friend Letter Updated',
          body: `A letter memory was updated for ${profName}`,
          targetPage: PAGE.LEGENDS,
          tag: 'let-' + latest.id
        });
      }
    },

    async onHiddenMedia(rows) {
      const locals = await getAll('hiddenMedia');
      const localSet = new Set(locals.map((x) => x.id));
      const cloudMap = new Map(rows.map((r) => [r.id, r]));
      let changed = false;
      for (const r of rows) {
        if (r.hidden && !localSet.has(r.id)) {
          await put('hiddenMedia', { id: r.id });
          changed = true;
        } else if (!r.hidden && localSet.has(r.id)) {
          await del('hiddenMedia', r.id);
          changed = true;
        }
      }
      for (const h of locals) {
        if (!cloudMap.has(h.id) && !uploadedMissingIds.has('hidden:' + h.id)) {
          uploadedMissingIds.add('hidden:' + h.id);
          queueCloudOp('hidden:' + h.id, () => cloud.setHiddenMedia(h.id, true));
        }
      }
      if (changed) {
        await renderQuickGalleries();
        await updateV7Home();
      }
    },

    async onAppState(rows) {
      const wasHydrated = cloudHydrated.appState;
      cloudHydrated.appState = true;
      const mod = rows.find((r) => r.id === 'memoryOfDay');
      if (mod && Array.isArray(mod.ids) && mod.ids.length) {
        const current = JSON.stringify(memoryDaySavedIds());
        const incoming = JSON.stringify(mod.ids);
        if (current !== incoming) {
          saveMemoryDayIds(mod.ids, false);
          await renderMemoryDay();
          if (wasHydrated && !isSelfCreated('appState:memoryOfDay')) {
            notifyBatchEvent({
              title: '🌟 Memories of the Day',
              body: 'Today’s 5 spotlight memories were refreshed!',
              targetPage: PAGE.MEMORY_DAY,
              tag: 'app-mod'
            });
          }
        }
      } else if (!mod && !uploadedMissingIds.has('appState:memoryOfDay')) {
        const localIds = memoryDaySavedIds();
        if (localIds.length) {
          uploadedMissingIds.add('appState:memoryOfDay');
          queueCloudOp('appState:memoryOfDay', () => cloud.pushMemoryOfDay(localIds));
        }
      }
    }
  });
}

window.addEventListener('ogcloud:ready', initCloudSyncOnce);
if (window.OGCloud) initCloudSyncOnce();
setTimeout(() => {
  if (!cloudSyncStarted && DB && window.OGCloud) initCloudSyncOnce();
}, 400);
window.addEventListener('online', () => {
  window.OGCloud?.ensureOnline?.();
  flushPendingCloudOps();
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    window.OGCloud?.ensureOnline?.();
    flushPendingCloudOps();
    markVisibleCloudMessagesRead();
  } else {
    emitTypingStatus(false);
  }
});
window.addEventListener('pagehide', () => {
  emitTypingStatus(false);
});



