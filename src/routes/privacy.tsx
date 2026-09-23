import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Mail, Phone, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · Viarra Travels" },
      { name: "description", content: "Learn how Viarra Travels collects, protects, and manages your personal travel planning data under GDPR." },
      { property: "og:title", content: "Privacy Policy · Viarra Travels" },
      { property: "og:description", content: "Transparent data protection and privacy practices at Viarra Travels." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { language } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-4 md:px-6 gradient-soft min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Navigacija in glava */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            {language === "sl" ? "Nazaj na domačo stran" : "Back to home"}
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-4">
            <ShieldCheck size={14} />
            {language === "sl" ? "Varstvo podatkov in GDPR" : "Data Protection and GDPR"}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {language === "sl" ? "Pravilnik o zasebnosti" : "Privacy Policy"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {language === "sl"
              ? "Zadnja posodobitev: September 2026 · Velja za vse uporabnike storitve Viarra Travels"
              : "Last updated: September 2026 · Applies to all Viarra Travels users"}
          </p>
        </div>

        {/* Vsebinski sklop */}
        <div className="rounded-3xl bg-card p-6 md:p-12 shadow-soft space-y-10 text-foreground/90">
          {/* 1. točka */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <FileText size={20} />
              <h2>{language === "sl" ? "1. Upravljavec osebnih podatkov" : "1. Data Controller"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl" ? (
                <>
                  Upravljavec vaših osebnih podatkov je <strong>Viarra Travels</strong> (Slovenija). Zavezani smo k varovanju vaše zasebnosti in zakoniti obdelavi vaših podatkov v skladu s Splošno uredbo o varstvu podatkov (GDPR) ter veljavno slovensko zakonodajo.
                </>
              ) : (
                <>
                  The data controller responsible for your information is <strong>Viarra Travels</strong> (Slovenia). We are committed to protecting your privacy and processing your data transparently and lawfully in accordance with the General Data Protection Regulation (GDPR).
                </>
              )}
            </p>
          </section>

          {/* 2. točka */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <Eye size={20} />
              <h2>{language === "sl" ? "2. Podatki, ki jih zbiramo" : "2. Information We Collect"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl"
                ? "Za pripravo prilagojenih potovalnih načrtov zbiramo le tiste podatke, ki nam jih sami posredujete prek spletnih obrazcev ali neposredne komunikacije:"
                : "To design personalized travel plans and facilitate bookings, we only collect information you voluntarily provide via our forms or direct communication:"}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground pl-2">
              {language === "sl" ? (
                <>
                  <li><strong>Kontaktni podatki:</strong> Ime in priimek, e-poštni naslov, telefonska številka, WhatsApp kontakt.</li>
                  <li><strong>Podatki o potnikih:</strong> Imena potnikov, državljanstvo, spol, starost otrok in morebitne zahteve po posebni pomoči.</li>
                  <li><strong>Potovalne preference:</strong> Ciljne destinacije, datumi, proračun, slog potovanja, želje glede prevozov in nastanitev.</li>
                  <li><strong>Dokumentacija za vizume:</strong> Podatki, potrebni za preverjanje in urejanje vizumskih zahtev, kadar je to naročeno kot dodatna storitev.</li>
                </>
              ) : (
                <>
                  <li><strong>Contact Information:</strong> Full name, email address, phone number, and WhatsApp handle.</li>
                  <li><strong>Passenger Details:</strong> Traveler names, nationalities, gender, child ages, and special assistance requests.</li>
                  <li><strong>Trip Preferences:</strong> Destinations, dates, budgets, accommodation choices, flight criteria, and luggage specifications.</li>
                  <li><strong>Visa Documentation:</strong> Relevant information required to determine or process visa requirements, when explicitly requested as an add-on.</li>
                </>
              )}
            </ul>
          </section>

          {/* 3. točka */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <Lock size={20} />
              <h2>{language === "sl" ? "3. Namen in pravna podlaga obdelave" : "3. Purpose and Legal Basis"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl" ? (
                <>
                  Vaše podatke obdelujemo izključno za:
                </>
              ) : (
                <>
                  We process your personal information strictly for the following purposes:
                </>
              )}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground pl-2">
              {language === "sl" ? (
                <>
                  <li>Pripravo individualnih ponudb, itinerarjev in potovalnih načrtov ter izvajanje dogovorjenih storitev.</li>
                  <li>Komunikacijo glede rezervacij ter obveščanje o spremembah cen ali razpoložljivosti letov in nastanitev.</li>
                  <li>Zagotavljanje podpore med potovanjem, v kolikor je izbran paket podpore.</li>
                  <li>Izpolnjevanje zakonskih in računovodskih obveznosti.</li>
                </>
              ) : (
                <>
                  <li>Preparing custom itineraries, proposals, and logistical recommendations for contract performance.</li>
                  <li>Communicating regarding bookings, price updates, and schedule options.</li>
                  <li>Delivering priority support during your journey, when booked as an add-on service.</li>
                  <li>Complying with statutory accounting and tax obligations.</li>
                </>
              )}
            </ul>
          </section>

          {/* 4. točka */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <ShieldCheck size={20} />
              <h2>{language === "sl" ? "4. Posredovanje podatkov tretjim osebam" : "4. Third-Party Sharing"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl" ? (
                <>
                  Viarra Travels vaših podatkov ne prodaja in jih ne posreduje nepooblaščenim tretjim osebam. Kadar za vas izvajamo rezervacijo ali posredujemo povezave, se nujni podatki posredujejo ponudnikom letalskih kart, hotelom, prevoznikom ali partnerskim vizumskim agencijam izključno z namenom izvedbe vašega potovanja.
                </>
              ) : (
                <>
                  Viarra Travels does not sell, rent, or trade your personal data. Where you request us to facilitate bookings on your behalf, necessary passenger details are provided directly to airlines, lodging hosts, transit operators, or visa partner agencies exclusively to execute your travel arrangements.
                </>
              )}
            </p>
          </section>

          {/* 5. točka */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <FileText size={20} />
              <h2>{language === "sl" ? "5. Hramba podatkov in varnost" : "5. Data Retention and Security"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl" ? (
                <>
                  Osebne podatke hranimo le toliko časa, kolikor je potrebno za izvedbo načrtovanja in zagotavljanje podpore, oziroma do preklica privolitve ali poteka zakonskih rokov hrambe. Uporabljamo ustrezne tehnične in organizacijske ukrepe za zaščito pred nepooblaščenim dostopom ali izgubo.
                </>
              ) : (
                <>
                  We retain personal data only as long as required to deliver our planning services, complete active itineraries, or fulfill applicable legal requirements. We implement appropriate technical safeguards to prevent unauthorized access, accidental alteration, or disclosure.
                </>
              )}
            </p>
          </section>

          {/* 6. točka */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <Eye size={20} />
              <h2>{language === "sl" ? "6. Vaše pravice po GDPR" : "6. Your Rights Under GDPR"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl" ? (
                <>
                  Kot posameznik imate pravico do dostopa do svojih podatkov, popravka netočnih podatkov, izbrisa oziroma pravice do pozabe, omejitve obdelave, prenosljivosti podatkov ter vložitve ugovora zoper obdelavo. V kolikor želite uveljavljati katerokoli izmed teh pravic, nas lahko kontaktirate prek spodnjih podatkov.
                </>
              ) : (
                <>
                  Under the GDPR, you have the right to access the data we hold about you, request corrections, request erasure, restrict processing, request data portability, and object to processing. To exercise any of these rights, simply reach out to us.
                </>
              )}
            </p>
          </section>

          {/* 7. točka: Kontakt */}
          <section className="space-y-3 border-t pt-8">
            <h2 className="font-semibold text-lg text-foreground">
              {language === "sl" ? "7. Kontakt za vprašanja o zasebnosti" : "7. Privacy Contact"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === "sl"
                ? "Za vsa vprašanja glede obdelave in varstva vaših osebnih podatkov smo vam na voljo prek:"
                : "If you have any questions regarding how your data is handled, feel free to reach us via:"}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <a
                href="mailto:viarratravels@gmail.com"
                className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/40 hover:bg-secondary/70 transition-colors text-sm font-medium text-foreground"
              >
                <Mail size={16} className="text-primary" />
                <span>viarratravels@gmail.com</span>
              </a>
              <a
                href="tel:+38640973329"
                className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/40 hover:bg-secondary/70 transition-colors text-sm font-medium text-foreground"
              >
                <Phone size={16} className="text-primary" />
                <span>+386 40 973 329</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}