export type ThemePreference = 'system' | 'light' | 'dark';
export const themeStorageKey = 'webbdev-theme';
const eventName = 'webbdev-theme-change';

export function isTheme(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function applyTheme(preference: ThemePreference) {
  const resolved = preference === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolved;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#050509' : '#fafafd');
  window.dispatchEvent(new Event(eventName));
}

export function setTheme(preference: ThemePreference) {
  try { localStorage.setItem(themeStorageKey, preference); } catch { /* The choice still works for this visit. */ }
  applyTheme(preference);
}

export function themeSnapshot(): ThemePreference {
  const value = document.documentElement.dataset.themePreference;
  return isTheme(value) ? value : 'system';
}

export function subscribeTheme(listener: () => void) {
  window.addEventListener(eventName, listener);
  return () => window.removeEventListener(eventName, listener);
}

// Runs in the document head before body paint. No user input is interpolated.
export const themeInitScript = `(function(){var p='system';try{var s=localStorage.getItem('${themeStorageKey}');if(s==='light'||s==='dark'||s==='system')p=s;}catch(e){}var t=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;var d=document.documentElement;d.dataset.theme=t;d.dataset.themePreference=p;d.style.colorScheme=t;})();`;
