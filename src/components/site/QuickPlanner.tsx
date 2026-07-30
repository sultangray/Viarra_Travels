import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { savePlanner, loadPlanner, type QuickPlannerData } from "@/lib/planner-store";
import { ArrowRight, MapPin, Plane, Calendar, Clock, Users, Wallet, Sparkles } from "lucide-react";

const STYLES = ["Relaxing", "Adventure", "Luxury", "Family", "Beach", "Digital Nomad", "Road Trip"];

export function QuickPlanner() {
  const navigate = useNavigate();
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

  const toggleStyle = (s: string) => {
    const current = data.travelStyle ?? [];
    set("travelStyle", current.includes(s) ? current.filter((x) => x !== s) : [...current, s]);
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
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <Sparkles size={14} /> Quick Planner
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">Tell us the basics</h2>
          <p className="mt-3 text-muted-foreground">A few quick questions — then we'll take it from here.</p>
        </div>

        <form
          onSubmit={submit}
          className="glass rounded-3xl p-6 md:p-10 shadow-soft space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field icon={<MapPin size={16} />} label="Destination">
              <input
                value={data.destination}
                onChange={(e) => set("destination", e.target.value)}
                placeholder="e.g. Bali, Maldives"
                className="input"
              />
            </Field>
            <Field icon={<Plane size={16} />} label="Departure country">
              <input
                value={data.departureCountry}
                onChange={(e) => set("departureCountry", e.target.value)}
                placeholder="e.g. Germany"
                className="input"
              />
            </Field>
            <Field icon={<Calendar size={16} />} label="Start date">
              <input type="date" value={data.startDate} onChange={(e) => set("startDate", e.target.value)} className="input" />
            </Field>
            <Field icon={<Calendar size={16} />} label="End date">
              <input type="date" value={data.endDate} onChange={(e) => set("endDate", e.target.value)} className="input" />
            </Field>
            <Field icon={<Clock size={16} />} label="Duration (nights)">
              <input
                value={data.duration}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="e.g. 10"
                className="input"
              />
            </Field>
            <Field icon={<Wallet size={16} />} label="Budget (per person)">
              <input
                value={data.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder="e.g. €2,500"
                className="input"
              />
            </Field>
            <Field icon={<Users size={16} />} label="Adults">
              <input
                type="number"
                min={1}
                value={data.adults}
                onChange={(e) => set("adults", Number(e.target.value))}
                className="input"
              />
            </Field>
            <Field icon={<Users size={16} />} label="Children">
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
            <div className="mb-3 text-sm font-medium">Travel style</div>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => {
                const active = data.travelStyle?.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleStyle(s)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-white/70 text-foreground/70 hover:bg-accent"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-accent hover:shadow-lg"
            >
              Continue Planning
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
          background: rgba(255,255,255,0.7);
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
