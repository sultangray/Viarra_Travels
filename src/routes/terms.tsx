import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, FileText, Globe, ShieldAlert } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service and Disclaimer · Viarra Travels" },
      { name: "description", content: "Terms of service, disclaimers, booking execution conditions, and scope of Viarra Travels planning services." },
      { property: "og:title", content: "Terms of Service · Viarra Travels" },
      { property: "og:description", content: "Transparent cooperation terms and booking disclaimers." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { language } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-4 md:px-6 gradient-soft min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Top Return Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            {language === "sl" ? "Nazaj na domačo stran" : "Back to home"}
          </Link>
        </div>

        {/* PRIMARY NOTICE: PLACED AT THE VERY FRONT AS REQUESTED */}
        <div className="mb-8 rounded-3xl border border-primary/20 bg-primary/10 p-6 md:p-8 flex items-start gap-4 shadow-soft">
          <AlertCircle className="text-primary shrink-0 mt-1" size={24} />
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              {language === "sl" ? "Pomembno obvestilo pred oddajo" : "Important Notice Before Submitting"}
            </h2>
            <p className="mt-1 text-sm md:text-base font-medium leading-relaxed text-foreground/90">
              {language === "sl"
                ? "Pred oddajo obrazca vas prosimo, da preberete spodnje obvestilo, da bomo lahko imeli jasno in prijetno sodelovanje."
                : "Before submitting the form, please review the notice below to ensure clear and smooth cooperation."}
            </p>
          </div>
        </div>

        {/* Main Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-4">
            <FileText size={14} />
            {language === "sl" ? "Pogoji poslovanja in omejitev odgovornosti" : "Terms of Service and Disclaimer"}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {language === "sl" ? "Splošni pogoji sodelovanja" : "Terms and Conditions"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {language === "sl"
              ? "Pravna opredelitev storitve, odgovornosti in navodila za izvedbo rezervacij"
              : "Legal definition of service, liability limitations, and booking protocols"}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="rounded-3xl bg-card p-6 md:p-12 shadow-soft space-y-10 text-foreground/90">
          {/* Section 1: Disclaimer and Nature of Service */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-primary font-semibold text-xl">
              <ShieldAlert size={22} />
              <h2>{language === "sl" ? "Pomembno: prosim preberite (Disclaimer)" : "Important: Please Read (Disclaimer)"}</h2>
            </div>
            
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                {language === "sl"
                  ? "Moja storitev je namenjena osebnemu potovalnemu svetovanju, organizaciji in koordinaciji rezervacij v skladu z vašimi željami, proračunom in stilom potovanja."
                  : "Our service is dedicated to personalized travel consultation, itinerary organization, and booking coordination tailored to your preferences, budget, and travel style."}
              </p>
              <p className="font-medium text-foreground">
                {language === "sl"
                  ? "Ne nastopam kot turistična agencija in ne prodajam turističnih aranžmajev v smislu zakonodaje o paketnih potovanjih. Moja vloga je svetovalna in organizacijska."
                  : "We do not operate as a travel agency and do not sell package holidays under package travel legislation. Our role is strictly advisory and organizational."}
              </p>
              <p>
                {language === "sl"
                  ? "Rezervacije (letalske karte, nastanitve, transferji, parkiranja in podobno) se izvajajo v imenu naročnika, plačila pa se vedno izvedejo neposredno ponudnikom storitev (letalske družbe, hoteli, prevozniki, ponudniki parkiranja)."
                  : "All bookings (flight tickets, accommodation, transfers, parking, and similar) are made on behalf of the client, and payments are always made directly to the respective service providers (airlines, hotels, transport operators, parking providers)."}
              </p>
            </div>
          </section>

          {/* Section 2: Dynamic Pricing and Limitation of Liability */}
          <section className="space-y-4 border-t pt-8">
            <div className="flex items-center gap-2.5 text-primary font-semibold text-xl">
              <AlertCircle size={22} />
              <h2>{language === "sl" ? "Cene, razpoložljivost in omejitev odgovornosti" : "Pricing, Availability and Liability Limits"}</h2>
            </div>
            
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                {language === "sl"
                  ? "Letalske cene, razpoložljivost nastanitev in pogoji ponudnikov so dinamični in se lahko spremenijo v kateremkoli trenutku do dejanskega plačila."
                  : "Flight fares, lodging availability, and supplier conditions are dynamic and subject to change at any moment until final payment is completed."}
              </p>
              <p>
                {language === "sl"
                  ? "Ne prevzemam odgovornosti za spremembe, odpovedi ali zamude letov, tehnične težave, vremenske razmere, stavke, politične razmere ali druge nepredvidene okoliščine, ki so izven mojega vpliva. V takih primerih vam lahko v okviru izbranega paketa pomagam z usmeritvami in alternativami."
                  : "We assume no liability for flight changes, delays, cancellations, technical issues, severe weather, strikes, political unrest, or other unforeseen events outside our direct control. In such cases, we assist you with alternative solutions and guidance within the scope of your chosen support package."}
              </p>
              <p>
                {language === "sl"
                  ? "Končna odločitev glede rezervacij in plačil je vedno odgovornost naročnika."
                  : "The final decision regarding confirmations, options, and payments remains exclusively with the client."}
              </p>
              <p>
                {language === "sl"
                  ? "Plačilo storitve predstavlja plačilo za opravljeno delo, čas, znanje in organizacijo ter ni vezano na končno ceno potovanja ali uspešnost posameznih rezervacij. Moja odgovornost je v vsakem primeru omejena na višino plačila za storitev organizacije."
                  : "Service fees represent compensation for professional time, research, knowledge, and logistics, and are not tied to the final cost of third party bookings. In all circumstances, our legal liability is strictly limited to the fee paid for our planning services."}
              </p>
              <p>
                {language === "sl"
                  ? "Plačilo predstavlja nadomestilo za svetovanje, organizacijo in iskanje ustreznih rešitev ter ne predstavlja jamstva za doseganje določenih cen ali razpoložljivosti storitev."
                  : "Payment covers consultation and solution curation; it does not constitute a guarantee of specific third party market rates or permanent availability."}
              </p>
              <p>
                {language === "sl"
                  ? "Pri izvedbi storitve se bomo po najboljših močeh potrudili poiskati in uskladiti nastanitve, prevoze in druge storitve v skladu z vašimi željami in navedenimi okvirji. Kljub temu se lahko zgodi, da določenih storitev zaradi razpoložljivosti, cen ali drugih okoliščin ni mogoče zagotoviti."
                  : "We use our best efforts to find and coordinate accommodation, transit, and activities according to your criteria. However, certain options may occasionally become unavailable due to capacity constraints, rapid rate fluctuations, or provider terms."}
              </p>
            </div>
          </section>

          {/* Section 3: Booking Execution Protocol */}
          <section className="space-y-4 border-t pt-8">
            <div className="flex items-center gap-2.5 text-primary font-semibold text-xl">
              <CheckCircle2 size={22} />
              <h2>{language === "sl" ? "V primeru, da rezervacijo opravimo mi" : "When Bookings Are Handled By Us"}</h2>
            </div>
            
            <div className="rounded-2xl bg-secondary/30 p-5 space-y-3 text-sm leading-relaxed text-muted-foreground border">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  {language === "sl"
                    ? "Rezervacije se izvajajo v imenu naročnika."
                    : "All reservations are executed strictly in the client's name."}
                </li>
                <li>
                  {language === "sl"
                    ? "Naročnik vnaprej nakaže dogovorjen znesek, jaz pa v njegovem imenu opravim rezervacijo in plačilo pri izbranem ponudniku."
                    : "The client transfers the agreed amount in advance, and we execute the reservation and payment with the selected provider on their behalf."}
                </li>
                <li>
                  {language === "sl"
                    ? "Rezervacija se izvede šele po prejemu sredstev. Zaradi dinamičnih cen in razpoložljivosti storitev je veljavna izključno cena, ki velja v trenutku dejanske rezervacije."
                    : "Reservations are executed only after funds are successfully received. Due to dynamic market rates, only the live price available at the exact moment of booking is valid."}
                </li>
                <li>
                  {language === "sl"
                    ? "V primeru zamude pri prejemu plačila zaradi bančnih postopkov se lahko cena ali razpoložljivost storitev spremeni. V takem primeru naročnika o tem obvestim in se skupaj odločimo o potrditvi nove cene ali izbiri alternativne možnosti."
                    : "In case of transfer delays such as banking clearance times, fares or availability may fluctuate. If this occurs, we notify you promptly to decide jointly on accepting the new price or selecting an alternative option."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Timelines and Trip Complexity */}
          <section className="space-y-4 border-t pt-8">
            <div className="flex items-center gap-2.5 text-primary font-semibold text-xl">
              <Clock size={22} />
              <h2>{language === "sl" ? "Roki priprave ponudbe in kompleksnost potovanja" : "Proposal Turnaround and Complexity"}</h2>
            </div>
            
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                {language === "sl"
                  ? "Po prejemu izpolnjenega vprašalnika pripravimo celotno ponudbo praviloma v roku od 3 do 7 delovnih dni, odvisno od kompleksnosti potovanja. Pri bolj kompleksnih ali večdestinacijskih potovanjih se lahko čas priprave ustrezno podaljša. Ponudbo vam bomo poslali na vaš e-poštni naslov."
                  : "Upon receipt of the completed brief, we prepare the comprehensive proposal within 3 to 7 business days, depending on trip complexity. For multi-destination or multi-country routes, this preparation window may be extended accordingly. Proposals are delivered to your email address."}
              </p>
              <p>
                {language === "sl"
                  ? "Če krajši pobeg vključuje več logistike, kombinacije prevozov ali dodatne zahteve, se obravnava kot standardna organizacija potovanja, ne glede na destinacijo."
                  : "If a short getaway requires extensive logistics, multi-modal transport combinations, or custom demands, it is classified and billed as standard trip planning regardless of the destination."}
              </p>
              <p>
                {language === "sl"
                  ? "Potovanja, ki vključujejo več držav, lahko zahtevajo več usklajevanja glede prevozov, časovnih razporedov in vizumov, zato se cena storitve prilagodi glede na zahtevnost in obseg poti."
                  : "Multi-country itineraries involve increased coordination regarding transit connections, schedule synchronizations, and visa assessments, hence service pricing adjusts based on itinerary complexity and scale."}
              </p>
              <p className="font-semibold text-foreground">
                {language === "sl"
                  ? "Cena storitve se nanaša na organizacijo in svetovanje ter ne vključuje stroškov letalskih kart, nastanitev ali drugih storitev tretjih ponudnikov."
                  : "Service fees cover consultation, research, and itinerary coordination only, and do not include the costs of flight tickets, accommodations, or other third-party services."}
              </p>
            </div>
          </section>

          {/* Section 5: Visas */}
          <section className="space-y-4 border-t pt-8">
            <div className="flex items-center gap-2.5 text-primary font-semibold text-xl">
              <Globe size={22} />
              <h2>{language === "sl" ? "Urejanje vizumov" : "Visa Guidance and Regulatory Disclaimers"}</h2>
            </div>
            
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "sl"
                ? "Uradne vizumske takse in stroški ponudnikov niso vključeni v ceno storitve. Odobritev vizuma je v izključni pristojnosti pristojnih uradnih organov posamezne države."
                : "Official consular visa fees and external processing fees are not included in our service pricing. Final visa approval remains strictly within the discretionary authority of the relevant government bodies."}
            </p>
          </section>
        </div>

        {/* Bottom Contact / Action Bar */}
        <div className="mt-8 text-center">
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all cursor-pointer"
          >
            {language === "sl" ? "Nadaljuj na obrazec za načrtovanje" : "Proceed to Travel Planner"}
          </Link>
        </div>
      </div>
    </div>
  );
}