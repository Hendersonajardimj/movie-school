import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-[rgba(6,6,10,0.74)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="font-display text-xl tracking-[0.16em] text-white">
          MOVIE SCHOOL
        </Link>
        <nav className="flex items-center gap-5 text-sm text-white/85">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
