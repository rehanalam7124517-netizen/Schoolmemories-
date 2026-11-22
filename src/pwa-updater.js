import { registerSW } from 'virtual:pwa-register';

/* global __APP_VERSION__, __APP_BUILD_TIME__, __APK_UPDATE_URL__ */

const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '15.9.0';
const APP_BUILD_TIME = typeof __APP_BUILD_TIME__ !== 'undefined' ? __APP_BUILD_TIME__ : '';
const BAKED_APK_UPDATE_URL = typeof __APK_UPDATE_URL__ !== 'undefined' ? __APK_UPDATE_URL__ : '';

let deferredInstallPrompt = null;
let swRegistration = null;
let updateSWFn = null;
let isReloadingForUpdate = false;
let isInstalledStandalone =
  window.matchMedia?.('(display-mode: standalone)')?.matches ||
  window.navigator?.standalone === true;
let isCheckingUpdate = false;

function isNativeApk() {
  return Boolean(
    window.OGNativeBridge?.isNativeApp?.() ||
      window.Capacitor?.isNativePlatform?.()
  );
}

function isIOS() {
  return /iphone|ipad|ipod/.test((window.navigator?.userAgent || '').toLowerCase());
}

function notifyUpdaterState(extra = {}) {
  window.dispatchEvent(
    new CustomEvent('ogupdater:state', {
      detail: {
        version: APP_VERSION,
        buildTime: APP_BUILD_TIME,
        isNativeApk: isNativeApk(),
        isInstalled: isInstalledStandalone,
        isInstallable: Boolean(deferredInstallPrompt),
        isIOS: isIOS(),
        isOnline: navigator.onLine !== false,
        ...extra,
      },
    })
  );
}

function emitUpdateToast(msg) {
  window.dispatchEvent(new CustomEvent('ogupdater:toast', { detail: { message: msg } }));
}

function triggerSeamlessReload(reasonMsg) {
  if (isReloadingForUpdate || isNativeApk()) return;
  isReloadingForUpdate = true;
  if (reasonMsg) emitUpdateToast(reasonMsg);
  setTimeout(() => {
    window.location.reload();
  }, 650);
}

async function clearRuntimeCodeCache() {
  if (!('caches' in window)) return;
  try {
    await caches.delete('og-runtime-code');
  } catch {
    // ignore cache cleanup error
  }
}

async function checkWebVersionUpdate(manual = false) {
  if (isNativeApk() || navigator.onLine === false || isCheckingUpdate) return false;
  isCheckingUpdate = true;
  try {
    if (swRegistration) {
      await swRegistration.update().catch(() => {});
    }
    const res = await fetch(`./version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return false;
    const data = await res.json();
    const serverBuild = String(data?.buildTime || '');
    const serverVer = String(data?.version || '');
    const lastReloadedBuild = sessionStorage.getItem('og_reloaded_build') || '';
    if (
      serverBuild &&
      APP_BUILD_TIME &&
      serverBuild !== APP_BUILD_TIME &&
      lastReloadedBuild !== serverBuild
    ) {
      sessionStorage.setItem('og_reloaded_build', serverBuild);
      await clearRuntimeCodeCache();
      if (swRegistration) {
        await swRegistration.update().catch(() => {});
      }
      if (updateSWFn) {
        await updateSWFn(true).catch(() => {});
      }
      triggerSeamlessReload(`Updating to v${serverVer || APP_VERSION} automatically...`);
      return true;
    }
    if (manual) {
      emitUpdateToast(`App is up to date (v${APP_VERSION})`);
    }
    return false;
  } catch {
    if (manual) emitUpdateToast('Could not reach update server right now');
    return false;
  } finally {
    isCheckingUpdate = false;
  }
}

function getApkFeedUrl() {
  return (
    localStorage.getItem('og_apk_update_url') ||
    BAKED_APK_UPDATE_URL ||
    document.querySelector('meta[name="og-apk-feed"]')?.content ||
    ''
  ).trim();
}

async function checkApkUpdate(manual = false) {
  if (!isNativeApk() || navigator.onLine === false) return false;
  const feedUrl = getApkFeedUrl();
  if (!feedUrl) {
    if (manual) {
      const vName = window.OGNativeBridge?.getAppVersionName?.() || APP_VERSION;
      emitUpdateToast(`Android App v${vName} · Auto-updates enabled`);
    }
    return false;
  }
  try {
    const res = await fetch(`${feedUrl}${feedUrl.includes('?') ? '&' : '?'}t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const data = await res.json();
    const remoteCode = Number(data?.versionCode || 0);
    const currentCode = Number(window.OGNativeBridge?.getAppVersionCode?.() || 1);
    const remoteName = String(data?.versionName || 'latest');
    const apkUrl = String(data?.apkUrl || '');
    const promptedCode = Number(sessionStorage.getItem('og_prompted_apk_code') || '0');

    if (remoteCode > currentCode && apkUrl.startsWith('https://')) {
      if (!manual && promptedCode >= remoteCode) return false;
      sessionStorage.setItem('og_prompted_apk_code', String(remoteCode));
      emitUpdateToast(`New APK update v${remoteName} downloading automatically...`);
      window.OGNativeBridge?.downloadAndInstallApk?.(apkUrl, remoteName);
      return true;
    }
    if (manual) {
      const vName = window.OGNativeBridge?.getAppVersionName?.() || APP_VERSION;
      emitUpdateToast(`Android App v${vName} is already up to date`);
    }
    return false;
  } catch {
    if (manual) emitUpdateToast('Could not check APK updates right now');
    return false;
  }
}

// Install prompt handling (PWA)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  notifyUpdaterState();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  isInstalledStandalone = true;
  emitUpdateToast('The OG Legends installed! Future updates will apply automatically.');
  notifyUpdaterState();
});

window.matchMedia?.('(display-mode: standalone)')?.addEventListener?.('change', (e) => {
  isInstalledStandalone = Boolean(e.matches);
  notifyUpdaterState();
});

// Native APK download progress callbacks
window.__ogApkUpdateProgress = (pct, status) => {
  if (status === 'downloading' && pct === 0) {
    emitUpdateToast('Downloading app update...');
  } else if (status === 'ready') {
    emitUpdateToast('Update downloaded — tap Install to complete!');
  } else if (status === 'permission') {
    emitUpdateToast('Enable "Allow from this source" to finish installing the update');
  } else if (status === 'error') {
    emitUpdateToast('Update download paused — will retry when online');
  }
  notifyUpdaterState({ apkProgress: pct, apkStatus: status });
};

// Initialize Web/PWA auto-update Service Worker only outside Capacitor native APK
if (!isNativeApk() && 'serviceWorker' in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) {
      triggerSeamlessReload('App updated automatically to latest version!');
    }
  });

  updateSWFn = registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      swRegistration = registration || null;
      if (registration) {
        // Poll for updates every 3 minutes
        setInterval(() => {
          if (navigator.onLine !== false) {
            registration.update().catch(() => {});
          }
        }, 3 * 60 * 1000);
      }
      setTimeout(() => checkWebVersionUpdate(false), 3500);
    },
    onNeedRefresh() {
      emitUpdateToast('Downloading latest update...');
      updateSWFn?.(true)?.catch?.(() => {});
    },
    onOfflineReady() {
      notifyUpdaterState({ offlineReady: true });
    },
  });
} else if (isNativeApk()) {
  setTimeout(() => checkApkUpdate(false), 4000);
}

window.addEventListener('online', () => {
  notifyUpdaterState();
  if (isNativeApk()) checkApkUpdate(false);
  else checkWebVersionUpdate(false);
});
window.addEventListener('offline', () => notifyUpdaterState());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (isNativeApk()) checkApkUpdate(false);
    else checkWebVersionUpdate(false);
  }
});

window.OGUpdater = {
  version: APP_VERSION,
  buildTime: APP_BUILD_TIME,
  isNativeApk,
  isStandalone: () => isInstalledStandalone,
  isIOS,
  isInstallable: () => Boolean(deferredInstallPrompt),
  async promptInstall() {
    if (!deferredInstallPrompt) return false;
    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice?.outcome === 'accepted') {
      deferredInstallPrompt = null;
      isInstalledStandalone = true;
      notifyUpdaterState();
      return true;
    }
    return false;
  },
  async checkNow() {
    if (isNativeApk()) return checkApkUpdate(true);
    return checkWebVersionUpdate(true);
  },
  getApkVersionLabel() {
    if (!isNativeApk()) return `Web v${APP_VERSION}`;
    const vName = window.OGNativeBridge?.getAppVersionName?.() || APP_VERSION;
    return `Android v${vName}`;
  },
};

notifyUpdaterState();
