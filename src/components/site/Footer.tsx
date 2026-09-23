import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { language, t } = useTranslation();

  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        {/* Predstavitev znamke in družbena omrežja */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <span className="grid h-9 w-9 place-items-center rounded-full gradient-beach font-display text-sm font-bold text-foreground transition-transform group-hover:scale-105">
              V
            </span>
            <span className="font-display text-lg font-bold tracking-tight">Viarra Travels</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            {language === "sl"
              ? "Osebno načrtovanje potovanj, prilagojeno vašim željam. Leti, nastanitve, itinerarji in logistika — vse urejeno prek spleta."
              : "Personal travel planning designed around you. Flights, accommodation, itineraries, and logistics organised entirely online."}
          </p>

          {/* Povezave do družbenih omrežij brez Facebooka */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://instagram.com/viarratravels"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Instagram @viarratravels"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://wa.me/38640973329"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-[#25D366] hover:text-white transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            <a
              href="mailto:viarratravels@gmail.com"
              className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="E-pošta"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Glavna navigacija */}
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground tracking-wide">
            {language === "sl" ? "Razišči" : "Explore"}
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link to="/planner" className="hover:text-primary transition-colors">
                {t("planner")}
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary transition-colors">
                {t("gallery")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Pravne informacije */}
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground tracking-wide">
            {language === "sl" ? "Pravno" : "Legal"}
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                {language === "sl" ? "Pravilnik o zasebnosti" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition-colors">
                {language === "sl" ? "Splošni pogoji poslovanja" : "Terms of Service"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Pravno opozorilo in avtorske pravice */}
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground space-y-2">
        <p className="max-w-3xl mx-auto leading-relaxed">
          {language === "sl"
            ? "Pomembno: Viarra Travels je storitev osebnega potovalnega načrtovanja in svetovanja ter ne nastopa kot turistična agencija. Plačilo storitve krije organizacijo, raziskovanje in pripravo načrta. Letalske karte, nastanitve in prevoze stranke plačajo neposredno ponudnikom storitev."
            : "Disclaimer: Viarra Travels is a personal travel planning service, not a travel agency. Service fees cover research, itinerary curation, and logistics coordination. Flights, accommodations, transport, and third-party bookings are paid directly to their respective providers."}
        </p>
        <p>© {new Date().getFullYear()} Viarra Travels. {language === "sl" ? "Vse pravice pridržane." : "All rights reserved."}</p>
      </div>
    </footer>
  );
}