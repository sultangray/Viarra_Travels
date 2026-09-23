import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Sparkles, ShieldCheck, Compass, Users, Ban, MapPin, Compass as CompassIcon } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Viarra Travels" },
      { name: "description", content: "Meet Lana and the story behind Viarra Travels. Personal travel planning designed around your life and your freedom." },
      { property: "og:title", content: "About Viarra Travels" },
      { property: "og:description", content: "A personal travel planning service designed around you." },
    ],
  }),
  component: About,
});

function About() {
  const { language } = useTranslation();

  const values = language === "sl"
    ? [
        { icon: Compass, title: "Svoboda", desc: "Brez skupinskih vodenj. Brez fiksnih datumov. Potujte povsem po svoje." },
        { icon: Sparkles, title: "Prilagodljivost", desc: "Vsak načrt se natančno prilagaja vašemu življenjskemu tempu." },
        { icon: ShieldCheck, title: "Pregledne cene", desc: "Vedno točno veste, kaj plačate in za katero storitev." },
        { icon: Heart, title: "Povsem po meri", desc: "Vsako potovanje je oblikovano okrog stvari, ki jih imate radi." },
        { icon: Ban, title: "Brez skritih stroškov", desc: "Cene ponudnikov plačate neposredno ponudnikom samim." },
        { icon: Users, title: "Nismo agencija", desc: "Osebna storitev načrtovanja, za katero stoji resnična oseba." },
      ]
    : [
        { icon: Compass, title: "Freedom", desc: "No tour groups. No fixed dates. Travel your way." },
        { icon: Sparkles, title: "Flexibility", desc: "Every plan flexes to your life and your personal pace." },
        { icon: ShieldCheck, title: "Transparent Pricing", desc: "You always know exactly what you are paying for." },
        { icon: Heart, title: "Personalised", desc: "Every trip designed around the things you love." },
        { icon: Ban, title: "No Hidden Costs", desc: "Provider fees go straight to the chosen providers." },
        { icon: Users, title: "Not an Agency", desc: "A personal planning service, with a real human behind it." },
      ];

  const stats = language === "sl"
    ? [
        { value: "50+", label: "Obiskanih držav" },
        { value: "1,200+", label: "Zadovoljnih popotnikov" },
        { value: "18,000+", label: "Prihranjenih ur iskanja" },
        { value: "99%", label: "Zadovoljstvo strank" },
      ]
    : [
        { value: "50+", label: "Countries Explored" },
        { value: "1,200+", label: "Happy Travellers" },
        { value: "18,000+", label: "Hours Saved" },
        { value: "99%", label: "Customer Satisfaction" },
      ];

  return (
    <div className="pt-32 pb-24">
      {/* Top Header */}
      <section className="px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
            <Heart size={14} /> {language === "sl" ? "Naša zgodba" : "Our story"}
          </div>

          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {language === "sl" ? (
              <>Nismo agencija.<br />Smo vaš osebni načrtovalec.</>
            ) : (
              <>Not an agency.<br />A personal planner.</>
            )}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {language === "sl"
              ? "Viarra Travels je profesionalna storitev osebnega načrtovanja potovanj. Ne prodajamo vnaprej pripravljenih paketnih aranžmajev, temveč ustvarjamo potovalna doživetja po vaši meri, organizirana v celoti prek spleta."
              : "Viarra Travels is a professional travel planning service. We do not sell packaged tours, we design custom travel experiences tailored around you, organised entirely online."}
          </p>
        </div>
      </section>

      {/* LANA'S STORY CARD */}
      <section className="px-6 mt-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-card p-8 md:p-14 shadow-soft border border-border/50 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/40">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-beach font-display text-xl font-bold text-foreground shrink-0 shadow-sm">
                L
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {language === "sl" ? "Kako se je vse začelo" : "How it all began"}
                </h2>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">
                  Lana · {language === "sl" ? "Ustanoviteljica Viarra Travels" : "Founder of Viarra Travels"}
                </div>
              </div>
            </div>

            <div className="space-y-6 text-foreground/85 text-base md:text-lg leading-relaxed">
              <p>
                {language === "sl"
                  ? "Pozdravljeni! Sem Lana, ustanoviteljica Viarra Travels. Že od nekdaj me navdušuje odkrivanje sveta. Da bi resnično razumela vse, kar ustvarja nepozabno potovanje, sem v Sloveniji zaključila študij turizma. Do danes sem raziskala približno 50 držav in vsaka pot me še vedno znova navdihne za načrtovanje naslednje."
                  : "Hi! I am Lana, the founder of Viarra Travels. I have loved travelling for as long as I can remember. To understand everything that goes into creating a great journey, I studied tourism in Slovenia. Over the years, I have visited around 50 countries, and every single trip still gets me excited to plan the next one."}
              </p>

              <p>
                {language === "sl"
                  ? "Leta 2022 sem začela potovati sama. Všeč mi je bila svoboda izbire destinacij in prilagajanja načrtov sproti, a na začetku je bilo načrtovanje precej zamudno. Ure sem preživela ob iskanju ugodnih letov, primerjavi nastanitev in urejanju prevozov. Takrat sem pomislila, kako čudovito bi bilo imeti nekoga z izkušnjami, ki bi me usmeril, a mi hkrati pustil vso svobodo."
                  : "In 2022, I started travelling solo. I loved the freedom of choosing where to go, changing plans whenever I felt like it, and staying longer in places I loved. But in the beginning, planning everything on my own was overwhelming. I spent hours searching for affordable flights, comparing places to stay, and working out local transport. I remember thinking how wonderful it would be to have someone knowledgeable to point me in the right direction while letting me keep the journey entirely my own."}
              </p>

              <p>
                {language === "sl"
                  ? "Ko so me prijatelji začeli spraševati za pomoč pri iskanju letov, hotelov in idej za aktivnosti, sem z veseljem raziskovala zanje, kot da bi šlo za moje potovanje. Kmalu sem spoznala, da želim to omogočiti več ljudem. Tako je nastala Viarra Travels."
                  : "As I shared my journeys, people began reaching out for help planning their trips: which flights to choose, where to stay, and what to experience. I found myself happily researching their trips as if they were my own. Soon, I realised I wanted to do this for more people. That is how Viarra Travels was born."}
              </p>

              <div className="rounded-2xl bg-secondary/30 p-6 border border-border/40 text-sm md:text-base leading-relaxed text-foreground">
                {language === "sl"
                  ? "Viarra Travels je namenjena vsem: parom, družinam, skupinam prijateljev in samostojnim popotnikom. Ni se vam treba vključevati v toge skupinske ture, da bi prejeli pomoč. Prevzamem zamuden del raziskovanja, vi pa ohranite popolno svobodo raziskovanja v svojem ritmu."
                  : "Viarra Travels is created for everyone: couples, families, groups of friends, and solo adventurers. You do not need to join rigid group tours to get guidance. I take care of the time consuming research so you keep complete freedom to explore at your own pace."}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 mt-24">
        <div className="mx-auto max-w-7xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-3xl bg-card p-8 shadow-soft hover:bg-accent transition-colors"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-beach">
                <v.icon size={22} className="text-foreground" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section className="px-6 mt-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] gradient-beach p-12 md:p-16 shadow-soft">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl md:text-6xl font-bold text-foreground">{s.value}</div>
                <div className="mt-2 text-sm text-foreground/75 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 mt-24 text-center">
        <Link
          to="/planner"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all cursor-pointer"
        >
          {language === "sl" ? "Načrtuj moje potovanje" : "Plan my trip"}
        </Link>
      </section>
    </div>
  );
}