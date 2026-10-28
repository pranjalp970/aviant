"use client";

import { Desktop, Moon, Sun } from "@phosphor-icons/react";
import clsx from "clsx";
import { useSyncExternalStore } from "react";
import { readThemePref, saveThemePref, THEME_EVENT, THEME_KEY, type ThemePref } from "@/lib/theme";

const OPTIONS: { value: ThemePref; label: string; icon: typeof Sun }[] = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Desktop },
];

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === THEME_KEY && onChange();
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemePicker() {
  const pref = useSyncExternalStore(subscribe, readThemePref, () => "dark" as ThemePref);

  return (
    <fieldset>
      <legend className="mb-2 text-sm text-fg-muted">Theme</legend>
      <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-2">
        {OPTIONS.map(({ value, label, icon: Icon }) => {
          const selected = pref === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => saveThemePref(value)}
              className={clsx(
        "flex min-h-14 cursor-pointer transition-colors hover:border-fg/35 flex-col items-start justify-center gap-1 rounded-ui border px-3 py-2 text-sm",
                selected ? "border-green bg-green/10 text-fg" : "border-border-strong bg-inset text-fg-muted",
              )}
            >
              <Icon size={20} weight={selected ? "fill" : "regular"} className={selected ? "text-accent" : undefined} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-fg-subtle">Saved on this device. &ldquo;System&rdquo; follows your phone or computer&rsquo;s setting.</p>
    </fieldset>
  );
}
