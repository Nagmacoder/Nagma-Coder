"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  // Close the mobile menu after navigating.
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const links = (
    <ul className="nav__list">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="nav__link" aria-current={isActive(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <Link href="/contact" className="btn btn--primary btn--small" aria-current={isActive("/contact") ? "page" : undefined}>
          Contact Me
        </Link>
      </li>
    </ul>
  );

  return (
    <nav aria-label="Main" className="nav">
      <div className="nav__desktop">{links}</div>
      {/* <details> keeps the mobile menu usable even before JavaScript loads. */}
      <details className="nav__mobile" ref={menuRef}>
        <summary className="nav__toggle" aria-label="Menu">
          <Menu className="nav__icon-open" size={22} aria-hidden="true" />
          <X className="nav__icon-close" size={22} aria-hidden="true" />
        </summary>
        <div className="nav__sheet">{links}</div>
      </details>
    </nav>
  );
}
