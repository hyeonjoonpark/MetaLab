import Link from "next/link";
import { Fragment } from "react";
import { siteNavItems } from "./site-nav";

type FooterInnerProps = {
  /** 모바일 시트에서 패딩 축소 */
  compact?: boolean;
};

export function FooterInner({ compact }: FooterInnerProps) {
  const year = new Date().getFullYear();

  const shell =
    compact === true
      ? "mx-auto max-w-6xl px-4 py-5 pb-6 sm:px-6"
      : "mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8";

  return (
    <div className={shell}>
      <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="max-w-sm">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Metalab
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            실험과 아이디어를 모으는 공간입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              메뉴
            </h2>
            <nav className="mt-3 flex flex-col gap-2" aria-label="푸터 메뉴">
              {siteNavItems.map((entry) =>
                entry.type === "link" ? (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                  >
                    {entry.label}
                  </Link>
                ) : (
                  <Fragment key={entry.label}>
                    <Link
                      href={entry.href}
                      className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                      {entry.label}
                    </Link>
                    {entry.children.map((child) => (
                      <Link
                        key={`${entry.label}-${child.href}-${child.label}`}
                        href={child.href}
                        className="pl-3 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </Fragment>
                ),
              )}
            </nav>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              법적 고지
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              사업자 정보
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                  상호
                </dt>
                <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-200">
                  Metalab
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                  대표
                </dt>
                <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-200">
                  000
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                  이메일
                </dt>
                <dd className="mt-0.5">
                  <a
                    href="mailto:metalab@gmail.com"
                    className="break-all font-medium text-zinc-700 underline-offset-2 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50"
                  >
                    metalab@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          ©Copyright {year} Metalab. All rights reserved.
        </p>
      </div>
    </div>
  );
}
