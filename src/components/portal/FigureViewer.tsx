"use client";

import { CornersOut, Image as ImageIcon, MagnifyingGlassMinus, MagnifyingGlassPlus, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { QuestionFigure } from "@/content/types";

/** Zoom steps, as multiples of "fit the whole figure in view". */
const LEVELS = [1, 1.5, 2, 3, 4];
const SOURCE = "FAA-CT-8080-2H";

/** Start downloading a figure before it's shown (e.g. the next quiz question's). */
export function preloadFigure(figure?: QuestionFigure) {
  if (figure) new window.Image().src = figure.src;
}

function ToolButton({ label, onClick, disabled, autoFocus, children }: { label: string; onClick: () => void; disabled?: boolean; autoFocus?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
      aria-label={label}
      title={label}
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-ui text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

/**
 * The figure with a zoom toolbar. Zoom keeps the point under the cursor (or the center) in place;
 * pan by scrolling, dragging with the mouse, or the arrow keys once the figure has focus.
 */
function ZoomView({ figure, fill, eager, onFullScreen, onClose }: { figure: QuestionFigure; fill?: boolean; eager?: boolean; onFullScreen?: () => void; onClose?: () => void }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [level, setLevel] = useState(0);
  const [dragging, setDragging] = useState(false);
  const anchor = useRef<{ fx: number; fy: number; vx: number; vy: number } | null>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ratio = figure.width / figure.height;
  const fitW = box.w && box.h ? Math.min(box.w, box.h * ratio) : 0;
  const imgW = fitW * LEVELS[level];
  const imgH = imgW / ratio;
  const canvasW = Math.max(box.w, imgW);
  const canvasH = Math.max(box.h, imgH);
  const zoomed = level > 0;

  /** Change zoom, keeping the figure point under viewport point (vx, vy) still. */
  function zoomTo(next: number, vx?: number, vy?: number) {
    const el = viewport.current;
    const n = Math.max(0, Math.min(LEVELS.length - 1, next));
    if (!el || !fitW || n === level) return;
    const px = vx ?? el.clientWidth / 2;
    const py = vy ?? el.clientHeight / 2;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    anchor.current = {
      fx: clamp((el.scrollLeft + px - (canvasW - imgW) / 2) / imgW),
      fy: clamp((el.scrollTop + py - (canvasH - imgH) / 2) / imgH),
      vx: px,
      vy: py,
    };
    setLevel(n);
  }

  useLayoutEffect(() => {
    const el = viewport.current;
    const a = anchor.current;
    if (!el || !a) return;
    anchor.current = null;
    el.scrollLeft = a.fx * imgW + (canvasW - imgW) / 2 - a.vx;
    el.scrollTop = a.fy * imgH + (canvasH - imgH) / 2 - a.vy;
  }, [level, imgW, imgH, canvasW, canvasH]);

  // Trackpad pinch arrives as ctrl + wheel; it needs a non-passive listener to stop the page zooming.
  const stepRef = useRef((delta: number, vx?: number, vy?: number) => zoomTo(level + delta, vx, vy));
  useEffect(() => {
    stepRef.current = (delta, vx, vy) => zoomTo(level + delta, vx, vy);
  });
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      acc += e.deltaY;
      if (Math.abs(acc) < 40) return;
      const r = el.getBoundingClientRect();
      stepRef.current(acc < 0 ? 1 : -1, e.clientX - r.left, e.clientY - r.top);
      acc = 0;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const point = (e: React.MouseEvent) => {
    const r = viewport.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };

  return (
    <>
      <div className="flex h-12 shrink-0 items-center gap-1 border-b border-border bg-bg-elevated pl-4 pr-1">
        <p className="annot min-w-0 max-w-none flex-1 truncate text-fg-muted">
          {figure.label} <span className="text-fg-subtle">· {SOURCE}</span>
        </p>
        <ToolButton label="Zoom out" onClick={() => zoomTo(level - 1)} disabled={!zoomed}>
          <MagnifyingGlassMinus size={18} aria-hidden />
        </ToolButton>
        <span className="annot w-9 text-center tabular-nums text-fg-subtle" role="status" aria-label={`Zoom ${LEVELS[level]} times`}>
          {LEVELS[level]}×
        </span>
        <ToolButton label="Zoom in" onClick={() => zoomTo(level + 1)} disabled={level === LEVELS.length - 1}>
          <MagnifyingGlassPlus size={18} aria-hidden />
        </ToolButton>
        {onFullScreen && (
          <ToolButton label={`Open ${figure.label} full screen`} onClick={onFullScreen}>
            <CornersOut size={18} aria-hidden />
          </ToolButton>
        )}
        {onClose && (
          <ToolButton label="Close figure" onClick={onClose} autoFocus>
            <X size={18} aria-hidden />
          </ToolButton>
        )}
      </div>
      <div
        ref={viewport}
        tabIndex={0}
        role="region"
        aria-label={`${figure.label}. Plus and minus keys zoom, arrow keys pan.`}
        style={fill ? undefined : { aspectRatio: `${figure.width} / ${figure.height}` }}
        className={clsx(
          "relative w-full overflow-auto overscroll-contain bg-inset outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green",
          fill ? "min-h-0 flex-1" : "max-h-[min(65vh,30rem)] min-h-52",
          zoomed && (dragging ? "cursor-grabbing" : "cursor-grab"),
        )}
        onKeyDown={(e) => {
          if (e.key === "+" || e.key === "=") zoomTo(level + 1);
          else if (e.key === "-" || e.key === "_") zoomTo(level - 1);
          else if (e.key === "0") zoomTo(0);
          else return;
          e.preventDefault();
        }}
        onDoubleClick={(e) => zoomTo(level === LEVELS.length - 1 ? 0 : level + 1, ...point(e))}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0 || !zoomed) return;
          const el = viewport.current!;
          drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
          el.setPointerCapture(e.pointerId);
          setDragging(true);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          viewport.current!.scrollLeft = d.left - (e.clientX - d.x);
          viewport.current!.scrollTop = d.top - (e.clientY - d.y);
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
      >
        <div className="flex items-center justify-center" style={fitW ? { width: canvasW, height: canvasH } : { width: "100%", height: "100%" }}>
          {/* Pre-sized WebP from public/figures, so next/image's resizing isn't needed. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            draggable={false}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={clsx("block select-none bg-white", fitW ? "max-w-none" : "max-h-full max-w-full")}
            style={fitW ? { width: imgW, height: imgH } : undefined}
          />
        </div>
      </div>
    </>
  );
}

/** Full-screen figure in a modal dialog: Escape or the close button returns to the question. */
function FigureDialog({ figure, onClose }: { figure: QuestionFigure; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const d = ref.current;
    if (!d) return;
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    d.showModal();
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
      if (d.open) d.close();
      opener?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      // A close queued by an effect cleanup (React dev re-runs effects) can land after the dialog reopened; only a real close counts.
      onClose={() => !ref.current?.open && onClose()}
      aria-label={figure.label}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none flex-col bg-bg p-0 text-fg backdrop:bg-black/70 open:flex"
    >
      <ZoomView figure={figure} fill eager onClose={onClose} />
    </dialog>
  );
}

/** The figure inline with its question, zoomable in place or full screen. */
export function FigurePane({ figure, eager }: { figure: QuestionFigure; eager?: boolean }) {
  const [full, setFull] = useState(false);
  return (
    <figure className="overflow-hidden rounded-ui border border-border">
      <ZoomView figure={figure} eager={eager} onFullScreen={() => setFull(true)} />
      {full && <FigureDialog figure={figure} onClose={() => setFull(false)} />}
    </figure>
  );
}

/** A compact "View Figure 20" link that opens the figure full screen (answer reviews, history). */
export function FigureLink({ figure }: { figure: QuestionFigure }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="annot inline-flex min-h-9 cursor-pointer items-center gap-2 text-accent transition-opacity hover:opacity-80"
      >
        <ImageIcon size={14} aria-hidden />
        View {figure.label}
      </button>
      {open && <FigureDialog figure={figure} onClose={() => setOpen(false)} />}
    </>
  );
}
