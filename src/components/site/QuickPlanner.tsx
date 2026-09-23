import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { savePlanner, loadPlanner, type QuickPlannerData } from "@/lib/planner-store";
import { ArrowRight, MapPin, Plane, Calendar, Clock, Users, Wallet, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const STYLE_OPTIONS = [
  { key: "Relaxing", labelEn: "Relaxing", labelSl: "Sproščeno" },
  { key: "Adventure", labelEn: "Adventure", labelSl: "Pustolovščina" },
  { key: "Luxury", labelEn: "Luxury", labelSl: "Luksuz" },
  { key: "Family", labelEn: "Family", labelSl: "Družinsko" },
  { key: "Beach", labelEn: "Beach", labelSl: "Plaža" },
  { key: "Digital Nomad", labelEn: "Digital Nomad", labelSl: "Digitalni nomad" },
  { key: "Road Trip", labelEn: "Road Trip", labelSl: "Cestno potovanje" },
];

export function QuickPlanner() {
  const navigate = useNavigate();
  const { language } = useTranslation();
  const existing = typeof window !== "undefined" ? loadPlanner() : {};

  const [data, setData] = useState<QuickPlannerData>({
    destination: existing.destination ?? "",
    departureCountry: existing.departureCountry ?? "",
    startDate: existing.startDate ?? "",
    endDate: existing.endDate ?? "",
    duration: existing.duration ?? "",
    adults: existing.adults ?? 2,
    children: existing.children ?? 0,
    budget: existing.budget ?? "",
    travelStyle: existing.travelStyle ?? [],
  });

  const set = <K extends keyof QuickPlannerData>(k: K, v: QuickPlannerData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleStyle = (styleKey: string) => {
    const current = data.travelStyle ?? [];
    set(
      "travelStyle",
      current.includes(styleKey)
        ? current.filter((x) => x !== styleKey)
        : [...current, styleKey]
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    savePlanner({ ...loadPlanner(), ...data });
    navigate({ to: "/planner" });
  };

  return (
    <section id="quick-planner" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles size={14} /> {language === "sl" ? "Hitri načrtovalec" : "Quick Planner"}
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-foreground">
            {language === "sl" ? "Zaupajte nam osnove" : "Tell us the basics"}
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {language === "sl"
              ? "Nekaj kratkih vprašanj, nato pa organizacijo prevzamemo mi."
              : "A few quick questions, then we will take it from here."}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="glass rounded-3xl p-6 md:p-10 shadow-soft space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              icon={<MapPin size={16} />}
              label={language === "sl" ? "Želena destinacija" : "Destination"}
            >
              <input
                value={data.destination}
                onChange={(e) => set("destination", e.target.value)}
                placeholder={language === "sl" ? "npr. Bali, Maldivi, Portugalska" : "e.g. Bali, Maldives, Lisbon"}
                className="input"
              />
            </Field>

            <Field
              icon={<Plane size={16} />}
              label={language === "sl" ? "Država odhoda" : "Departure country"}
            >
              <input
                value={data.departureCountry}
                onChange={(e) => set("departureCountry", e.target.value)}
                placeholder={language === "sl" ? "npr. Slovenija, Avstrija" : "e.g. Slovenia, Austria, Germany"}
                className="input"
              />
            </Field>

            <Field
              icon={<Calendar size={16} />}
              label={language === "sl" ? "Datum začetka" : "Start date"}
            >
              <input
                type="date"
                value={data.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                className="input"
              />
            </Field>

            <Field
              icon={<Calendar size={16} />}
              label={language === "sl" ? "Datum zaključka" : "End date"}
            >
              <input
                type="date"
                value={data.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                className="input"
              />
            </Field>

            <Field
              icon={<Clock size={16} />}
              label={language === "sl" ? "Trajanje (število nočitev)" : "Duration (nights)"}
            >
              <input
                value={data.duration}
                onChange={(e) => set("duration", e.target.value)}
                placeholder={language === "sl" ? "npr. 7 ali 14" : "e.g. 7 or 14"}
                className="input"
              />
            </Field>

            <Field
              icon={<Wallet size={16} />}
              label={language === "sl" ? "Okviren proračun (na osebo)" : "Budget (per person)"}
            >
              <input
                value={data.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder={language === "sl" ? "npr. 1.200 €" : "e.g. €1,200"}
                className="input"
              />
            </Field>

            <Field
              icon={<Users size={16} />}
              label={language === "sl" ? "Število odraslih" : "Adults"}
            >
              <input
                type="number"
                min={1}
                value={data.adults}
                onChange={(e) => set("adults", Number(e.target.value))}
                className="input"
              />
            </Field>

            <Field
              icon={<Users size={16} />}
              label={language === "sl" ? "Število otrok" : "Children"}
            >
              <input
                type="number"
                min={0}
                value={data.children}
                onChange={(e) => set("children", Number(e.target.value))}
                className="input"
              />
            </Field>
          </div>

          <div>
            <div className="mb-3 text-sm font-medium text-foreground">
              {language === "sl" ? "Želen stil potovanja" : "Travel style"}
            </div>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map((s) => {
                const active = data.travelStyle?.includes(s.key);
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => toggleStyle(s.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-white/70 text-foreground/75 hover:bg-accent"
                    }`}
                  >
                    {language === "sl" ? s.labelSl : s.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-accent hover:shadow-lg cursor-pointer"
            >
              {language === "sl" ? "Nadaljuj z načrtovanjem" : "Continue Planning"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid var(--color-border);
          background: rgba(255,255,255,0.75);
          padding: 0.75rem 1rem;
          font-size: 0.925rem;
          transition: all 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 20%, transparent);
        }
      `}</style>
    </section>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}