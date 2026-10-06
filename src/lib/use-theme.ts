"use client";

import { useSyncExternalStore } from "react";

/** The theme currently applied to <html data-theme> ("dark" | "light"), kept in sync live. */
export function useResolvedTheme(): "dark" | "light" {
  return useSyncExternalStore(
    (onChange) => {
      const obs = new MutationObserver(onChange);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => obs.disconnect();
    },
    () => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"),
    () => "dark",
  );
}
