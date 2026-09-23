import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Sparkles, ShieldCheck, Compass, Users, Ban } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Viarra Travels" },
      { name: "description", content: "Viarra Travels is a personal travel planning service, not a travel agency. Freedom, flexibility, transparent pricing, and trips designed entirely around you." },
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
        { value: "40+", label: "Načrtovanih držav" },
        { value: "1,200+", label: "Zadovoljnih popotnikov" },
        { value: "18,000+", label: "Prihranjenih ur iskanja" },
        { value: "99%", label: "Zadovoljstvo strank" },
      ]
    : [
        { value: "40+", label: "Countries Planned" },
        { value: "1,200+", label: "Happy Travellers" },
        { value: "18,000+", label: "Hours Saved" },
        { value: "99%", label: "Customer Satisfaction" },
      ];

  return (
    <div className="pt-32 pb-24">
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
              ? "Viarra Travels je profesionalna storitev osebnega načrtovanja potovanj. Ne prodajamo vnaprej pripravljenih paketnih tur, temveč ustvarjamo potovalna doživetja, prilagojena vsakemu popotniku posebej in organizirana v celoti prek spleta."
              : "Viarra Travels is a professional travel planning service. We do not sell packaged tours, we design travel experiences, tailored around every traveller, and organised entirely online."}
          </p>
        </div>
      </section>

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