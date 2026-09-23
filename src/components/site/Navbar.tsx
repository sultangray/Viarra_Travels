import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/about", label: t("about") },
    { to: "/planner", label: t("planner") },
    { to: "/gallery", label: t("gallery") },
    { to: "/contact", label: t("contact") },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft border-b border-black/5 py-3"
          : "bg-white/80 backdrop-blur-md border-b border-white/20 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-beach font-display text-sm font-bold text-foreground shadow-sm transition-transform group-hover:scale-105">
            V
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Viarra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Language Switcher Pill (Desktop) */}
          <div className="flex items-center bg-black/5 rounded-full p-1 border border-black/5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === "en"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("sl")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === "sl"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SL
            </button>
          </div>

          <Link
            to="/planner"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-accent hover:shadow-lg active:scale-95"
          >
            {t("startPlanning")}
          </Link>
        </nav>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2.5 md:hidden">
          {/* Language Switcher (Mobile) */}
          <div className="flex items-center bg-white/80 rounded-full p-0.5 border border-black/5 text-xs font-semibold shadow-sm">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("sl")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === "sl"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              SL
            </button>
          </div>

          {/* Menu Drawer Toggle */}
          <button
            className="rounded-full p-2.5 bg-white/70 hover:bg-white text-foreground border border-black/5 shadow-sm transition-colors cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-black/5 shadow-lg">
          <div className="flex flex-col gap-1.5 px-6 py-5">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-black/5"
                activeProps={{ className: "text-primary bg-primary/10 font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/planner"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all"
            >
              {t("startPlanning")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}