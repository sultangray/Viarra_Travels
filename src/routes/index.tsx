import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight, Sparkles, Clock, Shield, Tag, Wand2, Ban, FileCheck,
  Plane, BedDouble, LifeBuoy, ClipboardCheck, Search, CreditCard, MapPinned, CalendarCheck, PlaneTakeoff, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-beach.jpg";
import { QuickPlanner } from "@/components/site/QuickPlanner";
import { useTranslation } from "@/lib/i18n";

const SLOGANS = [
  "We Plan. You Travel.",
  "Less Planning. More Exploring.",
  "You Dream. We Plan.",
];

const REASONS = [
  { icon: Sparkles, title: "No Stress", desc: "Every detail handled." },
  { icon: Clock, title: "Save Hours of Research", desc: "We do the heavy lifting." },
  { icon: Tag, title: "Transparent Pricing", desc: "Clear service fees, no surprises." },
  { icon: Wand2, title: "Tailor-Made Trips", desc: "Designed around you." },
  { icon: Ban, title: "No Hidden Costs", desc: "You always know what you pay." },
  { icon: FileCheck, title: "Visa Guidance", desc: "Paperwork made simple." },
  { icon: Plane, title: "Flight Planning", desc: "Best routes, best times." },
  { icon: BedDouble, title: "Accommodation Planning", desc: "Curated stays only." },
  { icon: LifeBuoy, title: "Support Available", desc: "We're here while you travel." },
];

const STEPS = [
  { icon: ClipboardCheck, title: "Complete our questionnaire", desc: "Share your dream trip in 5 minutes." },
  { icon: Search, title: "We review your request", desc: "Our planners study your brief." },
  { icon: CreditCard, title: "Confirm your booking", desc: "Secure payment to kick things off." },
  { icon: MapPinned, title: "Receive your proposal", desc: "A personalised, ready-to-go plan." },
  { icon: CalendarCheck, title: "Bookings are made", desc: "Flights, stays, activities — done." },
  { icon: PlaneTakeoff, title: "Enjoy your trip", desc: "Just travel. We handled the rest." },
];

const DESTINATIONS = [
  { name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80" },
  { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80" },
  { name: "Thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80" },
  { name: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80" },
  { name: "South Africa", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80" },
  { name: "Greece", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80" },
  { name: "Italy", img: "https://images.unsplash.com/photo-1499602240951-078d17a1a5f8?w=1200&q=80" },
  { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80" },
  { name: "Iceland", img: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=1200&q=80" },
  { name: "Swiss Alps", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80" },
];

const TESTIMONIALS = [
  { name: "Sofia & Marc", trip: "Maldives · 10 days", quote: "It felt like they read our minds. Every detail was perfect — from the resort to the seaplane transfer." },
  { name: "Amelia R.", trip: "Japan · 3 weeks", quote: "I saved so many hours. The itinerary flowed beautifully. No travel-planning stress at all." },
  { name: "David L.", trip: "Bali · Family", quote: "Traveling with kids is chaos — Viarra made it feel effortless. Worth every euro." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viarra Travels — Plan Less. Travel More." },
      { name: "description", content: "Personal travel planning designed around you. Flights, stays, visas, routes and activities — organised entirely online." },
      { property: "og:title", content: "Viarra Travels — Plan Less. Travel More." },
      { property: "og:description", content: "Personal travel planning designed around you." },
    ],
  }),
  component: Home,
});



function Home() {
  const [slogan, setSlogan] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlogan((s) => (s + 1) % SLOGANS.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury beach" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white/95" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-tropic animate-pulse" />
              <motion.span
                key={slogan}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {SLOGANS[slogan]}
              </motion.span>
            </div>

            <h1 className="mt-6 font-display text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-lg">
              Plan Less.<br />Travel More.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/95 drop-shadow">
              We create fully personalised travel experiences tailored around you. Flights, accommodation, visas, transport, routes, and activities — everything organised online.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#quick-planner"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-accent hover:shadow-xl"
              >
                Start Planning
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-semibold text-foreground"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK PLANNER */}
      <QuickPlanner />

      {/* WHY CHOOSE VIARRA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Why choose Viarra</h2>
            <p className="mt-4 text-muted-foreground">A modern planning service built on trust, transparency and taste.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:bg-accent"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-beach">
                  <r.icon size={22} className="text-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24 gradient-soft">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
              <Shield size={14} /> How it works
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">Six steps to your trip</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-soft"
              >
                <div className="absolute -right-4 -top-6 font-display text-8xl font-bold text-secondary/60 select-none">{i + 1}</div>
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/20">
                    <s.icon size={22} className="text-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Featured destinations</h2>
              <p className="mt-3 text-muted-foreground">A few places we love to plan.</p>
            </div>
            <Link to="/gallery" className="text-sm font-medium text-foreground/70 hover:text-foreground">See gallery →</Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {DESTINATIONS.map((d) => (
              <div key={d.name} className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display text-lg font-semibold text-white">{d.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-24 gradient-soft">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Travellers who trust us</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl bg-white p-8 shadow-soft">
                <Quote size={22} className="text-primary" />
                <p className="mt-4 text-foreground/85 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.trip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <Pricing />

      {/* FINAL CALL TO ACTION */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] gradient-beach p-12 md:p-16 shadow-soft text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold">Ready to start planning?</h2>
          <p className="mt-4 text-foreground/80 max-w-xl mx-auto">Your dream trip is closer than you think. Let's design it together.</p>
          <Link
            to="/planner"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Start Your Journey <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Pricing() {
  const plans = [
    { name: "Standard Planning", price: "€150", desc: "Up to 2 adults", highlight: true },
    { name: "Additional Adult", price: "€30", desc: "Per extra adult" },
    { name: "Additional Child", price: "€15", desc: "Per child" },
    { name: "City Break", price: "€80", desc: "Short getaway planning up to 5 days" },
  ];
  const support = [
    { days: "5 Days", price: "€80" },
    { days: "14 Days", price: "€100" },
    { days: "30 Days", price: "€150" },
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted-foreground">
            Service fees cover planning only. Flights, accommodation, transport and visa fees are paid directly to providers.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 shadow-soft transition-all hover:-translate-y-1 ${
                p.highlight ? "bg-primary text-primary-foreground" : "bg-card"
              }`}
            >
              <div className="text-xs font-medium opacity-70">{p.name}</div>
              <div className="mt-2 font-display text-5xl font-bold">{p.price}</div>
              <div className="mt-2 text-sm opacity-80">{p.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-card p-8 shadow-soft">
            <h3 className="font-display text-xl font-semibold">Support Packages</h3>
            <div className="mt-5 space-y-3">
              {support.map((s) => (
                <div key={s.days} className="flex items-center justify-between rounded-2xl bg-white/70 px-5 py-3.5">
                  <span className="font-medium">{s.days}</span>
                  <span className="font-display text-xl font-bold">{s.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-soft flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold">Visa Assistance</h3>
              <p className="mt-2 text-sm text-muted-foreground">Full paperwork guidance and documentation review.</p>
            </div>
            <div className="mt-6 font-display text-4xl font-bold">€25 – €45</div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          Disclaimer: Service fees cover planning only. Flights, accommodation, transport and visa fees are paid directly to their respective providers.
        </p>
      </div>
    </section>
  );
}