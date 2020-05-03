const DARKMODE_KEY = 'escuro-dark';

function setLocalDarkMode(value: boolean) {
  localStorage.setItem(DARKMODE_KEY, value.toString());
}

function getLocalDarkMode(): boolean {
  return localStorage.getItem(DARKMODE_KEY) === 'true';
}

export function isBrowserDark(): boolean {
  return window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function isDark(): boolean {
  return getLocalDarkMode() || isBrowserDark();
}

export function setDark(isDark: boolean) {
  setLocalDarkMode(isDark);
}

export function onUpdate(cb: (isDark: boolean) => void) {
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change',cb.call(null, isBrowserDark()));
}

export function onDestroy(cb: () => void) {
  window.matchMedia('(prefers-color-scheme: dark)')
    .removeEventListener('change', cb.call(null, isBrowserDark()));
}
