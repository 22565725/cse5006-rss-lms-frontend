import Link from "next/link";
import HamburgerMenu from "@/Components/layout/HamburgerMenu";
import { siteConfig, navLinks } from "@/lib/siteConfig";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4">
        <Link
          href="/"
          className="font-semibold text-foreground hover:text-accent"
        >
          {siteConfig.assessmentTitle}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex flex-wrap gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <HamburgerMenu />
      </div>
    </header>
  );
}
