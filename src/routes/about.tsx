import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Sparkles, ShieldCheck, Compass, Users, Ban } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Viarra Travels" },
      { name: "description", content: "Viarra Travels is a personal travel planning service — not a travel agency. Freedom, flexibility, transparent pricing, and trips designed entirely around you." },
      { property: "og:title", content: "About Viarra Travels" },
      { property: "og:description", content: "A personal travel planning service designed around you." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Compass, title: "Freedom", desc: "No tour groups. No fixed dates. Travel your way." },
  { icon: Sparkles, title: "Flexibility", desc: "Every plan flexes to your life and your pace." },
  { icon: ShieldCheck, title: "Transparent Pricing", desc: "You always know exactly what you pay for." },
  { icon: Heart, title: "Personalised", desc: "Every trip designed around what you love." },
  { icon: Ban, title: "No Hidden Costs", desc: "Provider fees go straight to providers." },
  { icon: Users, title: "Not an Agency", desc: "A planning service — with a real human behind it." },
];

const STATS = [
  { value: "40+", label: "Countries Planned" },
  { value: "1,200+", label: "Happy Travellers" },
  { value: "18,000+", label: "Hours Saved" },
  { value: "99%", label: "Customer Satisfaction" },
];

function About() {
  return (
    <div className="pt-32 pb-24">
      <section className="px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <Heart size={14} /> Our story
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight">
            Not an agency.<br />A personal planner.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Viarra Travels is a professional travel planning service. We don't sell packaged tours — we design travel experiences, tailored around every traveller, and organised entirely online.
          </p>
        </div>
      </section>

      <section className="px-6 mt-24">
        <div className="mx-auto max-w-7xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-3xl bg-card p-8 shadow-soft hover:bg-accent transition-colors"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-beach">
                <v.icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 mt-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] gradient-beach p-12 md:p-16 shadow-soft">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl md:text-6xl font-bold">{s.value}</div>
                <div className="mt-2 text-sm text-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 mt-24 text-center">
        <Link to="/planner" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all">
          Plan my trip
        </Link>
      </section>
    </div>
  );
}
