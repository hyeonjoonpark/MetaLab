export type NavChild = { readonly href: string; readonly label: string };

export type SiteNavEntry =
  | { readonly type: "link"; readonly href: string; readonly label: string }
  | {
      readonly type: "dropdown";
      readonly label: string;
      readonly href: string;
      readonly children: readonly NavChild[];
    };

export const siteNavItems: readonly SiteNavEntry[] = [
  { type: "link", href: "/", label: "HOME" },
  { type: "link", href: "/#about", label: "ABOUT" },
  {
    type: "dropdown",
    label: "PROJECTS",
    href: "/#projects",
    children: [
      { href: "/software", label: "SOFTWARE" },
      { href: "/hardware", label: "HARDWARE" },
      { href: "/ai", label: "AI" },
      { href: "/3D", label: "3D PRINTING" },
    ],
  },
  { type: "link", href: "/blog", label: "BLOG" },
  { type: "link", href: "/#contact", label: "CONTACT" },
];
