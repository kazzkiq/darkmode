const updateCallbacks = [];

function setLocalDarkMode(value: boolean) {
  localStorage.setItem('darkmode-dark', value.toString());
}

function getLocalDarkMode(): boolean {
  const localValue = localStorage.getItem('darkmode-dark');
  
  if (!localValue) {
    return null;
  }
  
  return localValue === 'true';
}

export function isDark(): boolean {
  return window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function isDarkLocal(): boolean {
  const localDark = getLocalDarkMode();

  if (localDark === null) {
    return isDark();
  }

  return localDark;
}

export function setDark(isDark: boolean) {
  setLocalDarkMode(isDark);

  updateCallbacks.forEach(cb => cb(isDark));
}

export function onUpdate(cb: (isDark: boolean) => void) {
  updateCallbacks.push(cb);

  try {
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => cb(isDark()));
  } catch (e) {
    // Fallback for Safari < 14 and older browsers
    window.matchMedia('(prefers-color-scheme: dark)')
        .addListener(() => cb(isDark()));
  }
}
