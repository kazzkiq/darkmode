function setLocalDarkMode(value: boolean) {
  localStorage.setItem('escuro-dark', value.toString());
}

function getLocalDarkMode(): boolean {
  return localStorage.getItem('escuro-dark') === 'true';
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
