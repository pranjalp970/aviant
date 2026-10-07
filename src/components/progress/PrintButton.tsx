"use client";

import { Printer } from "@phosphor-icons/react";
import { buttonClass } from "@/components/ui/button";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("primary", "md", "print:hidden")}>
      <Printer size={18} aria-hidden /> Print or save as PDF
    </button>
  );
}
