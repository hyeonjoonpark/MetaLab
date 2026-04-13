"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteNavItems } from "./site-nav";

const linkClass =
  "text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50";

const dropdownPanelClass =
  "absolute left-1/2 top-full z-50 hidden w-max min-w-44 -translate-x-1/2 pt-2 group-hover:block group-focus-within:block";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(false);
        setMobileProjectsOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMobile = () => {
    setOpen(false);
    setMobileProjectsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          onClick={closeMobile}
        >
          Metalab
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="주요 메뉴"
        >
          {siteNavItems.map((item) =>
            item.type === "link" ? (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  {item.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className={dropdownPanelClass}>
                  <ul
                    className="rounded-lg border border-zinc-200 bg-white py-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                    aria-label={`${item.label} 하위 메뉴`}
                  >
                    {item.children.map((child) => (
                      <li key={`${child.href}-${child.label}`}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          )}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-900"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        >
          {open ? (
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
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
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
              aria-hidden
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-zinc-200 dark:border-zinc-800`}
        role="navigation"
        aria-label="모바일 메뉴"
      >
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col gap-1">
            {siteNavItems.map((item) =>
              item.type === "link" ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label}>
                  <div className="flex items-stretch gap-1 rounded-lg">
                    <Link
                      href={item.href}
                      className="flex min-w-0 flex-1 items-center rounded-lg px-3 py-3 text-base font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex w-11 shrink-0 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                      aria-expanded={mobileProjectsOpen}
                      aria-controls="mobile-projects-sub"
                      aria-label={
                        mobileProjectsOpen
                          ? `${item.label} 하위 메뉴 접기`
                          : `${item.label} 하위 메뉴 펼치기`
                      }
                      onClick={() =>
                        setMobileProjectsOpen((prev) => !prev)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          mobileProjectsOpen ? "rotate-180" : ""
                        }
                        aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  <ul
                    id="mobile-projects-sub"
                    className={
                      mobileProjectsOpen
                        ? "mt-1 flex flex-col gap-0.5 border-l-2 border-zinc-200 py-1 pl-3 dark:border-zinc-700"
                        : "hidden"
                    }
                  >
                    {item.children.map((child) => (
                      <li key={`${child.href}-${child.label}`}>
                        <Link
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                          onClick={closeMobile}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
