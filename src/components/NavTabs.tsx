"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Portfolio Dashboard" },
  { href: "/analyze", label: "Analyze Document" },
  { href: "/calendar", label: "Expiry Calendar" },
  { href: "/standards", label: "Regulatory Standards" },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-1 px-6">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                isActive ? "text-navy" : "text-slate-500 hover:text-navy"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan" aria-hidden />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
