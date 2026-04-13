"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FooterInner } from "./footer-inner";

const OPEN_DRAG_PX = 28;
const CLOSE_DRAG_PX = 40;
const TAP_MAX_PX = 10;

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function Footer() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    lastY: number;
    mode: "peek" | "sheet";
  } | null>(null);

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sheetOpen, closeSheet]);

  const onPeekPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      lastY: e.clientY,
      mode: "peek",
    };
  };

  const onPeekPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.mode !== "peek" || d.pointerId !== e.pointerId) return;
    d.lastY = e.clientY;
    if (d.startY - e.clientY >= OPEN_DRAG_PX) {
      setSheetOpen(true);
      dragRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  const endPeekDrag = (
    e: React.PointerEvent<HTMLDivElement>,
    openOnTap: boolean,
  ) => {
    const d = dragRef.current;
    if (d && d.pointerId === e.pointerId && d.mode === "peek") {
      const moved = Math.abs(d.lastY - d.startY);
      if (openOnTap && moved <= TAP_MAX_PX) setSheetOpen(true);
    }
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onSheetHandlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      lastY: e.clientY,
      mode: "sheet",
    };
  };

  const onSheetHandlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.mode !== "sheet" || d.pointerId !== e.pointerId) return;
    d.lastY = e.clientY;
    if (e.clientY - d.startY >= CLOSE_DRAG_PX) {
      setSheetOpen(false);
      dragRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  const endSheetHandle = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d && d.pointerId === e.pointerId && d.mode === "sheet") {
      if (d.lastY - d.startY >= CLOSE_DRAG_PX) setSheetOpen(false);
    }
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <footer className="mt-auto hidden border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-black md:block">
        <FooterInner />
      </footer>

      <div
        className="shrink-0 md:hidden"
        style={{
          height: "calc(3.25rem + env(safe-area-inset-bottom, 0px))",
        }}
        aria-hidden
      />

      <footer
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/90 bg-white pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:border-zinc-800/90 dark:bg-black dark:shadow-[0_-4px_24px_rgba(0,0,0,0.35)] md:hidden ${sheetOpen ? "pointer-events-none invisible" : ""}`}
        aria-hidden={sheetOpen}
      >
        <div
          role="button"
          tabIndex={0}
          className="touch-none select-none px-4 pt-2 pb-1 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-600"
          onPointerDown={onPeekPointerDown}
          onPointerMove={onPeekPointerMove}
          onPointerUp={(e) => endPeekDrag(e, true)}
          onPointerCancel={(e) => endPeekDrag(e, false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSheetOpen(true);
            }
          }}
          aria-label="푸터 펼치기. 위로 드래그하거나 눌러 전체 정보를 표시합니다."
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-1">
            <div
              className="h-1 w-10 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
              aria-hidden
            />
            <ChevronUp className="text-zinc-500 dark:text-zinc-400" />
            <span className="text-[11px] font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              사이트 정보 · 위로 드래그
            </span>
          </div>
        </div>
      </footer>

      {sheetOpen ? (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            aria-label="푸터 닫기"
            onClick={closeSheet}
          />
          <div
            className="absolute inset-x-0 bottom-0 flex max-h-[min(92vh,calc(100dvh-1rem))] flex-col rounded-t-2xl border border-b-0 border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-sheet-label"
          >
            <div
              className="touch-none shrink-0 cursor-grab border-b border-zinc-100 bg-white px-4 pt-3 pb-2 active:cursor-grabbing dark:border-zinc-800 dark:bg-zinc-950"
              onPointerDown={onSheetHandlePointerDown}
              onPointerMove={onSheetHandlePointerMove}
              onPointerUp={endSheetHandle}
              onPointerCancel={endSheetHandle}
            >
              <div className="mx-auto flex max-w-6xl flex-col items-center gap-2">
                <div
                  className="h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600"
                  aria-hidden
                />
                <ChevronUp className="rotate-180 text-zinc-500 dark:text-zinc-400" />
                <span
                  id="footer-sheet-label"
                  className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400"
                >
                  아래로 드래그해 닫기
                </span>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <FooterInner compact />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
