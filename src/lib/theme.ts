/** Theme preference: saved per device in localStorage, applied to <html data-theme>. */
export type ThemePref = "dark" | "light" | "system";
export const THEME_KEY = "aviant-theme";
export const THEME_EVENT = "aviant:theme-change";

/**
 * Runs in <head> before first paint (see app/layout.tsx), so the page never
 * flashes the wrong theme. "system" follows the OS setting, live.
 */
export const THEME_SCRIPT = `(function(){try{
var d=document.documentElement,p=localStorage.getItem("${THEME_KEY}")||"dark",
m=window.matchMedia("(prefers-color-scheme: light)"),
a=function(){var q=localStorage.getItem("${THEME_KEY}")||"dark";d.setAttribute("data-theme",q==="system"?(m.matches?"light":"dark"):q)};
a();m.addEventListener("change",a);window.addEventListener("${THEME_EVENT}",a);
}catch(e){}})()`;

export function readThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "system" ? v : "dark";
  } catch {
    return "dark";
  }
}

export function saveThemePref(pref: ThemePref) {
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* storage blocked: still apply for this page view */
    const light = pref === "light" || (pref === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
    document.documentElement.setAttribute("data-theme", light ? "light" : "dark");
  }
  window.dispatchEvent(new Event(THEME_EVENT)); // the head script re-applies
}
