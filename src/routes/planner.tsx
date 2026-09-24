import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, PartyPopper, Plus, X, Info, ShieldCheck, FileText, Lock } from "lucide-react";
import heroImg from "@/assets/hero-beach.jpg";
import { loadPlanner, savePlanner, clearPlanner, type PlannerData } from "@/lib/planner-store";
import { useTranslation } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Travel Planner · Viarra Travels" },
      { name: "description", content: "Complete your personalised travel plan. A guided, multi step questionnaire with auto save." },
      { property: "og:title", content: "Travel Planner · Viarra Travels" },
      { property: "og:description", content: "Design your trip in 8 quick steps." },
    ],
  }),
  component: Planner,
});

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPx9Gv-srBSGYYPuMDpJVVw4qsXt5ThL045TZ7yW-DyzT2vPctmQ2iORRILPXF2qBYfw/exec";

const SECTIONS = [
  "Basics",
  "Passengers",
  "Destination",
  "Priorities",
  "Transport",
  "Accommodation",
  "Itinerary",
  "Support",
] as const;

function Planner() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const hydrated = useRef(false);
  const { language } = useTranslation();

  useEffect(() => {
    setData(loadPlanner() || {});
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    savePlanner(data);
  }, [data]);

  const set = (k: string, v: any) => setData((d: any) => ({ ...d, [k]: v }));

  const progress = useMemo(() => ((step + 1) / SECTIONS.length) * 100, [step]);

  // Strict Validation: Prevents clicking Next or Submitting if required fields are missing
  const canProceed = () => {
    if (step === 0) return !!data.fullName && !!data.email && !!data.phone;
    if (step === 1) {
      if (!data.passengers || data.passengers.length === 0) return false;
      return data.passengers.every((p: any) => p.name && p.nationality);
    }
    if (step === 2) {
      const destFilled = !!data.destination || (data.flexibleDestination && !!data.flexibleDesc);
      return destFilled && !!data.duration && data.flexibleDates !== undefined;
    }
    if (step === 4) {
      return (
        !!data.departureCity &&
        !!data.mainTransport &&
        !!data.destinationTransport &&
        !!data.transportBudget &&
        !!data.layovers
      );
    }
    if (step === 5) {
      return (
        !!data.accommodationTypes &&
        !!data.locationPreference &&
        !!data.meals &&
        !!data.budgetPriority &&
        !!data.budgetPerNight &&
        !!data.bookingPreference
      );
    }
    if (step === 7) {
      return !!data.acknowledged && !!data.supportHoursAck && !!data.termsAck;
    }
    return true;
  };

  const next = () => {
    if (!canProceed()) {
      toast.error(
        language === "sl"
          ? "Prosimo, izpolnite vsa obvezna polja (*) pred nadaljevanjem."
          : "Please fill out all required fields (*) before proceeding."
      );
      return;
    }
    setStep((s) => Math.min(s + 1, SECTIONS.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const jumpToStep = (index: number) => {
    if (index < step) setStep(index);
  };

  const submit = async () => {
    if (!canProceed()) {
      if (!data.termsAck) {
        toast.error(
          language === "sl"
            ? "Pred oddajo morate potrditi pogoje poslovanja s klikom na spodnji gumb."
            : "Please accept the Terms of Service button before completing your booking."
        );
        return;
      }
      toast.error(
        language === "sl"
          ? "Prosimo, potrdite vsa obvezna polja in izjave pred oddajo."
          : "Please ensure all required declarations are accepted before submitting."
      );
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading(
      language === "sl" ? "Pošiljanje vašega načrta..." : "Submitting your travel plan..."
    );

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      toast.dismiss(loadingToast);
      setSubmitting(false);
      setSubmitted(true);
      clearPlanner();
      toast.success(
        language === "sl"
          ? "Vaš potovalni načrt je bil uspešno oddan!"
          : "Your travel plan has been submitted!"
      );
    } catch (err) {
      toast.dismiss(loadingToast);
      setSubmitting(false);
      toast.error(
        language === "sl"
          ? "Prišlo je do napake pri pošiljanju. Poskusite znova ali nam pišite na WhatsApp."
          : "Could not submit form. Please try again or reach out on WhatsApp."
      );
    }
  };

  if (submitted) return <SuccessScreen language={language} />;

  const isTermsReady = !!data.acknowledged && !!data.supportHoursAck && !!data.termsAck;

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 md:px-6">
      {/* Crisp background photo without the white fog overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src={heroImg}
          alt="Tropical beach background"
          className="h-full w-full object-cover"
        />
        {/* Cinematic gradient tint ensuring the tropical photo is vibrant while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1 text-xs font-bold tracking-widest text-white uppercase border border-white/30 shadow-sm">
            Viarra
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white border border-white/25 shadow-sm">
            {language === "sl" ? "Korak" : "Step"} {step + 1} / {SECTIONS.length} · {SECTIONS[step]}
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white drop-shadow-md">
            {language === "sl" ? "Oblikujte svoje potovanje" : "Design your trip"}
          </h1>
          <p className="mt-2 text-sm text-white/90 drop-shadow">
            {language === "sl"
              ? "Vaš napredek se samodejno shranjuje. Rdeča zvezdica (*) označuje obvezna polja."
              : "Your progress is saved automatically. Red asterisks (*) indicate required fields."}
          </p>
        </div>

        {/* Progress Bar and Step Labels */}
        <div className="mb-8">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/30 backdrop-blur-sm border border-white/20">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="mt-3 hidden md:flex justify-between text-[10px] font-semibold text-white/85 uppercase tracking-wider">
            {SECTIONS.map((s, i) => (
              <span
                key={s}
                onClick={() => jumpToStep(i)}
                className={`transition-colors drop-shadow-sm ${
                  i <= step
                    ? "text-white cursor-pointer hover:text-white font-bold underline underline-offset-4"
                    : "text-white/50 cursor-not-allowed"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Questionnaire Card */}
        <div className="rounded-3xl bg-white/98 shadow-2xl p-6 md:p-10 border border-white/60 text-foreground">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <SectionBasics data={data} set={set} language={language} />}
              {step === 1 && <SectionPassengers data={data} set={set} language={language} />}
              {step === 2 && <SectionDestination data={data} set={set} language={language} />}
              {step === 3 && <SectionPriorities data={data} set={set} language={language} />}
              {step === 4 && <SectionTransport data={data} set={set} language={language} />}
              {step === 5 && <SectionAccommodation data={data} set={set} language={language} />}
              {step === 6 && <SectionItinerary data={data} set={set} language={language} />}
              {step === 7 && <SectionSupport data={data} set={set} language={language} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between pt-4 border-t border-border/40">
            <button
              onClick={prev}
              disabled={step === 0 || submitting}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium disabled:opacity-50 cursor-pointer"
            >
              <ArrowLeft size={16} /> {language === "sl" ? "Nazaj" : "Back"}
            </button>
            {step < SECTIONS.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all cursor-pointer"
              >
                {language === "sl" ? "Naprej" : "Next"} <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!isTermsReady || submitting}
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold shadow-soft transition-all cursor-pointer ${
                  isTermsReady && !submitting
                    ? "bg-primary text-primary-foreground hover:bg-accent hover:shadow-lg"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                }`}
              >
                {!isTermsReady && <Lock size={15} />}
                {submitting
                  ? (language === "sl" ? "Pošiljanje..." : "Submitting...")
                  : (language === "sl" ? "Potrdi in oddaj načrt" : "Complete booking and submit")}
                {isTermsReady && !submitting && <Check size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .input, .textarea, .select {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid var(--color-border);
          background: rgba(255,255,255,0.95);
          padding: 0.7rem 0.95rem;
          font-size: 0.925rem;
          transition: all 0.2s;
          font-family: inherit;
        }
        .input:focus, .textarea:focus, .select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 20%, transparent);
        }
        .label { display: block; margin-bottom: 0.4rem; font-size: 0.78rem; font-weight: 500; color: var(--color-muted-foreground); }
        .req { color: #ef4444; margin-left: 3px; font-weight: bold; }
        .chip { border-radius: 999px; padding: 0.55rem 1rem; font-size: 0.85rem; font-weight: 500; background: rgba(245,247,246,0.9); border: 1px solid var(--color-border); cursor: pointer; transition: all 0.15s; }
        .chip:hover { background: var(--color-accent); }
        .chip[data-active="true"] { background: var(--color-primary); color: var(--color-primary-foreground); border-color: transparent; }
      `}</style>
    </div>
  );
}

/* ---------- UI Helper Components ---------- */
function ChipGroup({ options, value, onChange, multi = false }: {
  options: string[]; value?: string | string[]; onChange: (v: any) => void; multi?: boolean;
}) {
  const active = (o: string) => multi ? (value as string[] | undefined)?.includes(o) ?? false : value === o;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          data-active={active(o)}
          className="chip"
          onClick={() => {
            if (multi) {
              const arr = ((value as string[]) ?? []);
              onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
            } else onChange(o);
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Field({ label, required, children }: { label: React.ReactNode; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && <span className="req">*</span>}
      </span>
      {children}
    </label>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

/* ---------- Section 1: Basics ---------- */
function SectionBasics({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Osnovni podatki" : "Basic information"}
        desc={language === "sl" ? "Začnimo z osnovnimi podatki za rezervacijo." : "Let's start with the essentials."}
      />
      <div className="text-sm font-semibold text-primary/80 uppercase tracking-wide border-b pb-2">
        {language === "sl" ? "Nosilec rezervacije" : "Reservation Holder"}
      </div>
      <Grid>
        <Field label={language === "sl" ? "Ime in priimek" : "Full name"} required>
          <input className="input" value={data.fullName ?? ""} onChange={(e) => set("fullName", e.target.value)} />
        </Field>
        <Field label={language === "sl" ? "E-poštni naslov" : "Email"} required>
          <input className="input" type="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label={language === "sl" ? "Telefonska številka" : "Phone"} required>
          <input className="input" value={data.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="WhatsApp">
          <input className="input" value={data.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} />
        </Field>
      </Grid>
    </div>
  );
}

/* ---------- Section 2: Passengers ---------- */
function SectionPassengers({ data, set, language }: any) {
  const passengers = data.passengers ?? [
    { name: data.fullName || "", nationality: "", gender: "", isChild: false, age: "", needsStroller: false, specialAssistance: false }
  ];

  const addPassenger = () =>
    set("passengers", [
      ...passengers,
      { name: "", nationality: "", gender: "", isChild: false, age: "", needsStroller: false, specialAssistance: false }
    ]);

  const updatePassenger = (i: number, k: string, v: any) => {
    const copy = [...passengers];
    copy[i] = { ...copy[i], [k]: v };
    set("passengers", copy);
  };

  const removePassenger = (i: number) =>
    set("passengers", passengers.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Potniki" : "Passengers"}
        desc={language === "sl" ? "Vnesite podatke o vseh potnikih." : "Tell us who's travelling."}
      />

      <datalist id="country-list">
        <option value="Slovenia" />
        <option value="Croatia" />
        <option value="Austria" />
        <option value="Germany" />
        <option value="Italy" />
        <option value="Hungary" />
        <option value="United Kingdom" />
        <option value="United States" />
        <option value="Other" />
      </datalist>

      <div className="space-y-5">
        {passengers.map((p: any, i: number) => (
          <div key={i} className="p-4 rounded-xl border bg-secondary/20 space-y-4 relative">
            {i > 0 && (
              <button
                type="button"
                onClick={() => removePassenger(i)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
            <div className="font-semibold text-sm">
              {language === "sl" ? "Potnik" : "Passenger"} {i + 1} {i === 0 && (language === "sl" ? "(Nosilec rezervacije)" : "(Lead Traveler)")}
            </div>
            <Grid>
              <Field label={language === "sl" ? "Ime in priimek" : "Full Name"} required>
                <input className="input" value={p.name} onChange={(e) => updatePassenger(i, "name", e.target.value)} />
              </Field>
              <Field label={language === "sl" ? "Državljanstvo" : "Nationality"} required>
                <input
                  className="input"
                  list="country-list"
                  placeholder={language === "sl" ? "Izberite ali vpišite..." : "Select or start typing..."}
                  value={p.nationality}
                  onChange={(e) => updatePassenger(i, "nationality", e.target.value)}
                />
              </Field>
              <Field label={language === "sl" ? "Spol" : "Gender"}>
                <select className="select" value={p.gender} onChange={(e) => updatePassenger(i, "gender", e.target.value)}>
                  <option value="">{language === "sl" ? "Izberite spol..." : "Select gender..."}</option>
                  <option value="Male">{language === "sl" ? "Moški" : "Male"}</option>
                  <option value="Female">{language === "sl" ? "Ženska" : "Female"}</option>
                  <option value="Other">{language === "sl" ? "Drugo" : "Other"}</option>
                  <option value="Prefer not to say">{language === "sl" ? "Ne želim opredeliti" : "Prefer not to say"}</option>
                </select>
              </Field>
            </Grid>

            <div className="flex flex-wrap gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={p.isChild}
                  onChange={(e) => updatePassenger(i, "isChild", e.target.checked)}
                />
                {language === "sl" ? "Ta oseba je otrok" : "This person is a child"}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={p.specialAssistance}
                  onChange={(e) => updatePassenger(i, "specialAssistance", e.target.checked)}
                />
                {language === "sl" ? "Potrebuje posebno pomoč" : "Needs special assistance"}
              </label>
            </div>

            {p.isChild && (
              <div className="bg-white p-4 rounded-lg border mt-2 space-y-3">
                <Field label={language === "sl" ? "Starost otroka" : "Age of child"}>
                  <input
                    className="input"
                    type="number"
                    min={0}
                    max={17}
                    placeholder="e.g. 4"
                    value={p.age}
                    onChange={(e) => updatePassenger(i, "age", e.target.value)}
                  />
                </Field>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.needsStroller}
                    onChange={(e) => updatePassenger(i, "needsStroller", e.target.checked)}
                  />
                  {language === "sl" ? "Potreben je prevoz otroškega vozička" : "Needs to transport a stroller or pram"}
                </label>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addPassenger}
          className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-primary/40 text-primary px-4 py-2.5 text-sm font-medium hover:bg-primary/5 w-full justify-center transition-all cursor-pointer"
        >
          <Plus size={16} /> {language === "sl" ? "Dodaj potnika" : "Add passenger"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Section 3: Destination ---------- */
function SectionDestination({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Destinacija" : "Destination"}
        desc={language === "sl" ? "Kam si želite odpotovati?" : "Where do you want to go?"}
      />

      <div className="p-4 rounded-xl border bg-primary/5 mb-4">
        <label className="flex items-center gap-3 text-sm font-medium cursor-pointer mb-2">
          <input
            type="checkbox"
            className="w-4 h-4 accent-primary"
            checked={!!data.flexibleDestination}
            onChange={(e) => set("flexibleDestination", e.target.checked)}
          />
          {language === "sl" ? "Destinacija mi je prilagodljiva" : "I am flexible with the destination"}
        </label>
        {data.flexibleDestination && (
          <p className="text-xs text-muted-foreground ml-7">
            {language === "sl"
              ? "primer: »Moj proračun je 600€ na osebo in lokacija ni pomembna, le da je toplo in ob morju.«"
              : "e.g. \"My budget is €600 per person and I don't mind the exact spot, as long as it's warm and by the coast.\""}
          </p>
        )}
      </div>

      {!data.flexibleDestination && (
        <Grid>
          <Field label={language === "sl" ? "Glavna destinacija" : "Main Destination"} required>
            <input className="input" placeholder="e.g. Lisbon, Portugal" value={data.destination ?? ""} onChange={(e) => set("destination", e.target.value)} />
          </Field>
          <Field label={language === "sl" ? "Več mest ali držav?" : "Multiple countries or cities?"}>
            <input className="input" placeholder="e.g. 3 days Bangkok, 5 days Phuket" value={data.multipleCountries ?? ""} onChange={(e) => set("multipleCountries", e.target.value)} />
          </Field>
        </Grid>
      )}

      {data.flexibleDestination && (
        <Field label={language === "sl" ? "Opišite vašo idealno destinacijo (Vreme, vibe, proračun)" : "Describe your ideal destination (Vibe, Weather, Budget)"} required>
          <textarea
            className="textarea"
            rows={3}
            placeholder={language === "sl" ? "Nekje na toplem, blizu plaže, sproščen oddih, proračun cca 600€ na osebo..." : "Somewhere hot, near the beach, relaxing atmosphere, budget around €600 pp..."}
            value={data.flexibleDesc ?? ""}
            onChange={(e) => set("flexibleDesc", e.target.value)}
          />
        </Field>
      )}

      <div className="border-t pt-4 mt-4 space-y-4">
        <Field label={language === "sl" ? "Ali so datumi potovanja prilagodljivi?" : "Are your travel dates flexible?"} required>
          <ChipGroup
            options={language === "sl" ? ["Da", "Ne"] : ["Yes", "No"]}
            value={data.flexibleDates ? (language === "sl" ? "Da" : "Yes") : data.flexibleDates === false ? (language === "sl" ? "Ne" : "No") : undefined}
            onChange={(v) => set("flexibleDates", v === "Yes" || v === "Da")}
          />
        </Field>

        {data.flexibleDates && (
          <div className="space-y-4 bg-secondary/20 p-4 rounded-xl">
            <Field label={language === "sl" ? "Koliko so prilagodljivi datumi?" : "How flexible are your dates?"}>
              <ChipGroup
                options={["± 1 day", "± 3 days", "± 7 days", "10+ days"]}
                value={data.flexibilityAmount}
                onChange={(v) => set("flexibilityAmount", v)}
              />
            </Field>
            <Field label={language === "sl" ? "Pojasnite prilagodljivost datumov" : "Explain your date flexibility"}>
              <textarea
                className="textarea"
                rows={2}
                placeholder={language === "sl" ? "Kadarkoli v prvih dveh tednih avgusta..." : "e.g. Anytime within the first two weeks of August..."}
                value={data.flexibilityNotes ?? ""}
                onChange={(e) => set("flexibilityNotes", e.target.value)}
              />
            </Field>
          </div>
        )}

        <Grid>
          <Field label={language === "sl" ? "Datum začetka" : "Start date"} required>
            <input className="input" type="date" value={data.startDate ?? ""} onChange={(e) => set("startDate", e.target.value)} />
          </Field>
          {!data.flexibleDates && (
            <Field label={language === "sl" ? "Datum zaključka" : "End date"} required>
              <input className="input" type="date" value={data.endDate ?? ""} onChange={(e) => set("endDate", e.target.value)} />
            </Field>
          )}
          <Field label={language === "sl" ? "Trajanje (število nočitev)" : "Duration (nights)"} required>
            <input className="input" type="number" min={1} placeholder="e.g. 7" value={data.duration ?? ""} onChange={(e) => set("duration", e.target.value)} />
          </Field>
        </Grid>
      </div>
    </div>
  );
}

/* ---------- Section 4: Priorities ---------- */
function SectionPriorities({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Prioritete" : "Priorities"}
        desc={language === "sl" ? "Kaj vam je na potovanju najpomembneje?" : "What matters most for this trip?"}
      />
      <Field label={language === "sl" ? "Stil potovanja (možna večkratna izbira)" : "Travel style (Select multiple)"}>
        <ChipGroup multi options={["Relaxed", "Balanced", "Adventure", "Luxury", "No preference"]} value={data.travelStylePref} onChange={(v) => set("travelStylePref", v)} />
      </Field>
      <Field label={language === "sl" ? "Nivo udobja nastanitve (možna večkratna izbira)" : "Accommodation comfort (Select multiple)"}>
        <ChipGroup multi options={["Basic", "Medium", "Comfort", "Luxury"]} value={data.accommodationComfort} onChange={(v) => set("accommodationComfort", v)} />
      </Field>
      <Field label={language === "sl" ? "Prilagodljivost proračuna" : "Budget flexibility"}>
        <ChipGroup options={["Maintain strict budget", "Increase comfort if worth it", "Compromise if needed"]} value={data.budgetFlexibility} onChange={(v) => set("budgetFlexibility", v)} />
      </Field>
      <Field label={language === "sl" ? "Posebne želje ali zahteve? (Odprto vprašanje)" : "Any specific wishes or requirements? (Open question)"}>
        <textarea
          className="textarea"
          rows={3}
          placeholder={language === "sl" ? "Opišite točno, kako si predstavljate vaše potovanje..." : "Tell us exactly how you envision your trip..."}
          value={data.specificWishes ?? ""}
          onChange={(e) => set("specificWishes", e.target.value)}
        />
      </Field>
    </div>
  );
}

/* ---------- Section 5: Transport ---------- */
function SectionTransport({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Prevoz" : "Transport"}
        desc={language === "sl" ? "Prihod na destinacijo in prevozi po njej." : "Getting there and getting around."}
      />
      <Grid>
        <Field label={language === "sl" ? "Mesto odhoda" : "Departure city"} required>
          <input className="input" placeholder="e.g. Ljubljana, Maribor" value={data.departureCity ?? ""} onChange={(e) => set("departureCity", e.target.value)} />
        </Field>
        <Field label={language === "sl" ? "Želeno bližnje letališče" : "Preferred nearby airport(s)"}>
          <input className="input" placeholder="e.g. Vienna, Budapest, Venice, Zagreb" value={data.preferredAirport ?? ""} onChange={(e) => set("preferredAirport", e.target.value)} />
        </Field>
      </Grid>

      <div className="bg-secondary/20 p-4 rounded-xl space-y-3">
        <p className="text-sm font-semibold">{language === "sl" ? "Dodatna logistika prevozov" : "Extra Transport Logistics"}</p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <Toggle
            label={language === "sl" ? "Pomoč s prevozom od doma do letališča" : "Help transport from your city to airport"}
            value={data.transportCityToAirport}
            onChange={(v) => set("transportCityToAirport", v)}
          />
          <Toggle
            label={language === "sl" ? "Pomoč s prevozom z letališča do doma" : "Help transport from airport to your city"}
            value={data.transportAirportToCity}
            onChange={(v) => set("transportAirportToCity", v)}
          />
          <Toggle label={language === "sl" ? "Pomoč s parkiranjem" : "Help me with parking"} value={data.parkingRequired} onChange={(v) => set("parkingRequired", v)} />
          <Toggle label={language === "sl" ? "Vrnitev na isto letališče?" : "Return to exact same airport?"} value={data.returnSameAirport} onChange={(v) => set("returnSameAirport", v)} />
          <Toggle label={language === "sl" ? "Transfer letališče do hotela" : "Transfer airport to hotel"} value={data.transferToHotel} onChange={(v) => set("transferToHotel", v)} />
          <Toggle label={language === "sl" ? "Transfer hotel do letališča" : "Transfer hotel to airport"} value={data.transferToAirport} onChange={(v) => set("transferToAirport", v)} />
        </div>
      </div>

      <Field label={language === "sl" ? "Glavni prevoz do destinacije (izberite enega)" : "Main transport to destination (Select only one)"} required>
        <ChipGroup multi={false} options={["Plane", "Bus", "Train", "Self-drive", "Recommend me the best"]} value={data.mainTransport} onChange={(v) => set("mainTransport", v)} />
      </Field>

      <Field label={language === "sl" ? "Prevoz na destinaciji" : "Transport at the destination"} required>
        <ChipGroup multi options={["Car rental", "Scooter", "Taxi / Uber", "Public transport", "Recommend me what's best"]} value={data.destinationTransport} onChange={(v) => set("destinationTransport", v)} />
      </Field>

      <Grid>
        <Field label={language === "sl" ? "Proračun za glavni prevoz (na osebo)" : "Main Transport Budget (per person)"} required>
          <input className="input" placeholder="e.g. €500" value={data.transportBudget ?? ""} onChange={(e) => set("transportBudget", e.target.value)} />
        </Field>
        {(data.transportCityToAirport || data.transportAirportToCity) && (
          <Field label={language === "sl" ? "Proračun za prevoz do ali z letališča (na osebo)" : "Budget for transport to or from airport (per person)"} required>
            <input className="input" placeholder="e.g. €50 for Flixbus / train / shuttle" value={data.airportTransportBudget ?? ""} onChange={(e) => set("airportTransportBudget", e.target.value)} />
          </Field>
        )}
      </Grid>

      <div className="border-t pt-4 mt-4 space-y-4">
        <p className="text-sm font-semibold">{language === "sl" ? "Preference glede letov in prtljage" : "Flight Preferences & Luggage"}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={language === "sl" ? "Število postankov (prestopov)" : "Amount of layovers"} required>
            <select className="select" value={data.layovers ?? ""} onChange={(e) => set("layovers", e.target.value)}>
              <option value="">{language === "sl" ? "Izberite število..." : "Select amount..."}</option>
              <option value="Direct flight only (0)">Direct flight only (0)</option>
              <option value="Max 1 layover">Max 1 layover</option>
              <option value="Max 2 layovers">Max 2 layovers</option>
              <option value="I don't mind (Cheapest route)">I don't mind (Cheapest route)</option>
            </select>
          </Field>
          <div className="pt-6">
            <Toggle label={language === "sl" ? "Le ročna prtljaga? (Ceneje)" : "Willing to travel with Carry-ons ONLY? (Cheaper)"} value={data.carryOnOnly} onChange={(v) => set("carryOnOnly", v)} />
          </div>
        </div>

        {!data.carryOnOnly && (
          <Field label={language === "sl" ? "Oddana prtljaga (Kdo potrebuje koliko?)" : "Checked luggage details (Who needs how much?)"}>
            <textarea className="textarea" rows={2} placeholder="e.g. Passenger 1: 20kg, Passenger 2: 10kg..." value={data.luggageDetails ?? ""} onChange={(e) => set("luggageDetails", e.target.value)} />
          </Field>
        )}

        <Field label={language === "sl" ? "Dodatne opombe glede prevozov ali priporočila" : "Transport specific notes or recommendations you want from us?"}>
          <textarea className="textarea" rows={2} placeholder="e.g. We can depart from Budapest if flights are cheaper than Vienna..." value={data.transportNotes ?? ""} onChange={(e) => set("transportNotes", e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Section 6: Accommodation ---------- */
function SectionAccommodation({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Nastanitev" : "Accommodation"}
        desc={language === "sl" ? "Kje bi želeli bivati?" : "Where would you like to stay?"}
      />

      <Field label={language === "sl" ? "Vrste nastanitve (možna večkratna izbira)" : "Accommodation types (Select multiple)"} required>
        <ChipGroup
          multi
          options={["Hotel", "Apartment", "Villa", "Guesthouse", "Hostel (Shared)", "Hostel (Private)", "Hostel (Female Dorm)", "Eco Lodge", "Resort"]}
          value={data.accommodationTypes}
          onChange={(v) => set("accommodationTypes", v)}
        />
      </Field>

      <Field label={language === "sl" ? "Kaj je najpomembnejše za lokacijo?" : "What matters most for location? (Select multiple)"} required>
        <ChipGroup
          multi
          options={["Close to city centre", "Quiet location", "Close to the beach", "Close to nature", "Not too important", "I'll leave it up to you"]}
          value={data.locationPreference}
          onChange={(v) => set("locationPreference", v)}
        />
      </Field>

      <Field label={language === "sl" ? "Prehrana" : "Meals"} required>
        <ChipGroup
          options={["None / Without", "Breakfast", "Half board", "All inclusive", "Leave it up to me to check if worth it"]}
          value={data.meals}
          onChange={(v) => set("meals", v)}
        />
      </Field>

      <Grid>
        <Field label={language === "sl" ? "Prioriteta proračuna za nastanitev" : "Budget priority for accommodation"} required>
          <ChipGroup options={["Lowest price", "Best value for my budget", "Comfort / Luxury"]} value={data.budgetPriority} onChange={(v) => set("budgetPriority", v)} />
        </Field>
        <Field label={language === "sl" ? "Proračun na nočitev (na osebo)" : "Budget per night (per person)"} required>
          <input className="input" placeholder="e.g. €50" value={data.budgetPerNight ?? ""} onChange={(e) => set("budgetPerNight", e.target.value)} />
        </Field>
      </Grid>

      <Field label={language === "sl" ? "Posebne želje pri nastanitvi" : "Special requests"}>
        <textarea
          className="textarea"
          rows={2}
          placeholder="e.g. Balcony, pool, child's bed, sea view, pets allowed, wellness, parking..."
          value={data.specialRequests ?? ""}
          onChange={(e) => set("specialRequests", e.target.value)}
        />
      </Field>

      <div className="border-t pt-4 mt-4 space-y-4">
        <Field label={language === "sl" ? "Izbira načina rezervacije" : "Booking preference"} required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                data.bookingPreference === "Book yourself" ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
              onClick={() => set("bookingPreference", "Book yourself")}
            >
              <div className="font-semibold mb-1">
                {language === "sl" ? "Rezervirate sami" : "Book Yourself"}
              </div>
              <div className="text-xs text-muted-foreground">
                {language === "sl"
                  ? "Pošljem vam neposredne povezave in navodila za samostojno rezervacijo."
                  : "I send you exact steps and direct links on how to book everything."}
              </div>
            </div>
            <div
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                data.bookingPreference === "Transfer to me" ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
              onClick={() => set("bookingPreference", "Transfer to me")}
            >
              <div className="font-semibold mb-1">
                {language === "sl" ? "Rezervacijo opravimo mi (nakazilo)" : "Book For Me (Transfer)"}
              </div>
              <div className="text-xs text-muted-foreground">
                {language === "sl"
                  ? "Sredstva nakažete meni, jaz pa v vašem imenu opravim natančne rezervacije."
                  : "You transfer the funds to me, and I handle the exact bookings for you."}
              </div>
            </div>
          </div>
        </Field>

        {data.bookingPreference === "Book yourself" && (
          <div className="bg-orange-50 text-orange-950 p-5 rounded-2xl text-sm border border-orange-200 leading-relaxed space-y-3">
            <div className="font-bold tracking-wide">
              {language === "sl"
                ? "NAVODILA ZA PLAČILO (če rezervacije opravite sami)"
                : "PAYMENT INSTRUCTIONS (if booking yourself)"}
            </div>
            <p>
              {language === "sl"
                ? "Po oddaji obrazca bomo preverili vaše želje, razpoložljivost in aktualne cene ter vam po e-pošti poslali predlog potovanja. Če bodo potrebne spremembe, jih bomo z vami uskladili pred plačilom."
                : "After submitting the form, we will review your preferences, availability, and live prices, and email you a tailored travel proposal. If adjustments are required, we will coordinate them together before payment."}
            </p>
            <p>
              {language === "sl"
                ? "Ko potrdite predlog, vam bomo poslali znesek in podatke za plačilo naše storitve. Po prejemu plačila vam bomo poslali neposredne povezave in navodila, s katerimi boste rezervacije opravili sami."
                : "Once you confirm the proposal, we will send you the invoice and payment details for our planning service. Upon receipt of payment, we will deliver direct booking links and clear instructions for you to finalize the bookings yourself."}
            </p>
            <p>
              {language === "sl"
                ? "Ker se cene in razpoložljivost lahko hitro spremenijo, priporočamo, da rezervacije opravite čim prej. Pred plačilom pri posameznem ponudniku preverite končno ceno, datume, podatke potnikov in pogoje odpovedi."
                : "Because fares and availability fluctuate dynamically, we recommend completing your bookings promptly. Before confirming payment with each provider, please double check the final fare, dates, passenger details, and cancellation terms."}
            </p>
          </div>
        )}

        {data.bookingPreference === "Transfer to me" && (
          <div className="bg-blue-50 text-blue-900 p-5 rounded-2xl text-sm border border-blue-200 leading-relaxed space-y-3">
            <div className="font-bold tracking-wide">
              {language === "sl"
                ? "NAVODILA ZA PLAČILO (če rezervacije opravimo za vas)"
                : "PAYMENT INSTRUCTIONS (if we book for you)"}
            </div>
            <p>
              {language === "sl"
                ? "Po oddaji obrazca bomo preverili razpoložljivost in aktualne cene ter vam po e-pošti poslali ponudbo."
                : "After submitting the form, we will check availability and live pricing, then send you a complete proposal via email."}
            </p>
            <p>
              {language === "sl"
                ? "Ker se cene in razpoložljivost lahko hitro spremenijo, priporočamo, da smo med rezervacijo v stiku prek sporočil na WhatsAppu. Poslali vam bomo nekaj možnih terminov, vi pa boste izbrali tistega, ko boste dosegljivi. Če vam WhatsApp ne ustreza, lahko komuniciramo tudi po e-pošti ali Viberju."
                : "Because prices and capacity shift rapidly, we recommend staying in touch via WhatsApp during booking coordination. We will suggest several time slots for you to choose when you are reachable. If you prefer, we can also communicate via email or Viber."}
            </p>
            <p>
              {language === "sl"
                ? "Pred rezervacijo vam bomo poslali končni znesek in podatke za plačilo. Rezervacije bomo opravili, ko bo plačilo vidno na našem računu. Če se cena medtem spremeni, vas bomo o tem obvestili in rezervacijo opravili šele po vaši potrditvi."
                : "Before executing the booking, we will provide the final amount and transfer details. Bookings are made once the payment clears on our account. Should fares change in the meantime, we will notify you and only proceed upon your confirmation."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Section 7: Itinerary ---------- */
function SectionItinerary({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Personaliziran itinerar" : "Personalised Itinerary"}
        desc={language === "sl" ? "Oblikujte svoje dnevno doživetje." : "Shape your daily experience."}
      />

      <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex gap-3 items-start">
        <Info className="text-primary shrink-0 mt-0.5" size={18} />
        <div className="text-sm">
          <strong>{language === "sl" ? "Opomba:" : "Note:"}</strong>{" "}
          {language === "sl"
            ? "Personalizirani itinerar in prednostna podpora med potovanjem sta plačljiva dodatka."
            : "Personalised itineraries and priority travel support are Paid Add-ons."}
        </div>
      </div>

      <Field label={language === "sl" ? "Želite dnevni itinerar?" : "Do you want a daily itinerary?"}>
        <ChipGroup
          options={[
            "Full Service (Transport/Accommodation + Itinerary)",
            "JUST Itinerary (I'll book transport/accommodation myself)",
            "No Itinerary needed"
          ]}
          value={data.itineraryType}
          onChange={(v) => set("itineraryType", v)}
        />
      </Field>

      {data.itineraryType && data.itineraryType !== "No Itinerary needed" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6 border-t pt-4 mt-4">
          <Field label={language === "sl" ? "S kom potujete? (Pomaga pri predlogih aktivnosti)" : "Who are you travelling with? (Helps us suggest suitable activities)"}>
            <ChipGroup options={["Solo", "Partner / Couple", "Family with kids", "Friends", "Business"]} value={data.travelCompanions} onChange={(v) => set("travelCompanions", v)} />
          </Field>
          <Grid>
            <Field label={language === "sl" ? "Tempo potovanja" : "Travel pace"}>
              <ChipGroup options={["Slow", "Balanced", "Packed"]} value={data.travelPace} onChange={(v) => set("travelPace", v)} />
            </Field>
            <Field label={language === "sl" ? "Dnevna struktura" : "Daily structure"}>
              <ChipGroup options={["Free", "Loose plan", "Detailed plan"]} value={data.dailyStructure} onChange={(v) => set("dailyStructure", v)} />
            </Field>
          </Grid>
          <Field label={language === "sl" ? "Želene aktivnosti" : "Activities (Select multiple)"}>
            <ChipGroup multi options={["Sightseeing", "Beach", "Nature", "Shopping", "Culture", "Food", "Nightlife"]} value={data.activities} onChange={(v) => set("activities", v)} />
          </Field>
          <Field label={language === "sl" ? "Vibe potovanja" : "Travel vibe (Select multiple)"}>
            <ChipGroup multi options={["Digital nomad", "Slow travel", "Luxury", "Adventure"]} value={data.travelVibe} onChange={(v) => set("travelVibe", v)} />
          </Field>
          <Field label={language === "sl" ? "Najpomembnejši cilj potovanja" : "Most important goal"}>
            <ChipGroup options={["Stress free", "Experiences", "Organisation", "Time optimisation"]} value={data.importantGoal} onChange={(v) => set("importantGoal", v)} />
          </Field>
          <Grid>
            <Field label={language === "sl" ? "Znamenitosti, ki jih morate videti" : "Must-see places"}>
              <textarea className="textarea" rows={2} placeholder="Attractions you definitely want to visit..." value={data.mustSee ?? ""} onChange={(e) => set("mustSee", e.target.value)} />
            </Field>
            <Field label={language === "sl" ? "Aktivnosti, ki se jim želite izogniti" : "Activities to avoid"}>
              <textarea className="textarea" rows={2} placeholder="Things you do not enjoy or want to skip..." value={data.avoidActivities ?? ""} onChange={(e) => set("avoidActivities", e.target.value)} />
            </Field>
          </Grid>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Section 8: Support, Visas & Terms Agreement ---------- */
function SectionSupport({ data, set, language }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={language === "sl" ? "Podpora, vizumi in potrditev pogojev" : "Support, Visas & Booking Agreement"}
        desc={language === "sl" ? "Zadnji korak pred oddajo načrta v pregled." : "Final details before we get to work."}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col justify-between">
          <Field label={language === "sl" ? "Potrebujete podporo med potovanjem? (Dodatek)" : "Travel support required? (Paid Add-on)"} required>
            <ChipGroup
              options={language === "sl" ? ["Da", "Ne"] : ["Yes", "No"]}
              value={data.travelSupport ? (language === "sl" ? "Da" : "Yes") : data.travelSupport === false ? (language === "sl" ? "Ne" : "No") : undefined}
              onChange={(v) => set("travelSupport", v === "Yes" || v === "Da")}
            />
          </Field>
          <div className="mt-3 text-xs text-muted-foreground bg-white/60 p-3 rounded-lg border leading-relaxed">
            <strong>{language === "sl" ? "Paket podpore:" : "Support Package:"}</strong>{" "}
            {language === "sl"
              ? "Vključuje prednostno komunikacijo med vašim potovanjem za logistična vprašanja, nujne spremembe ali reševanje nepredvidenih situacij."
              : "Covers priority communication during your trip for logistical questions, re-routing, or emergency support."}
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col justify-between space-y-2">
          <Field label={language === "sl" ? "Potrebujete pomoč pri urejanju vizumov?" : "Do you need help sorting VISAS?"} required>
            <ChipGroup
              options={
                language === "sl"
                  ? ["Da, uredite zame (doplačilo)", "Odločim se kasneje (ko preverite pogoje)", "Ne, uredim sam/a"]
                  : ["Yes, handle it for me (Extra fee)", "Decide later (once regulations checked)", "No, I'll do it myself"]
              }
              value={data.visaHelp}
              onChange={(v) => set("visaHelp", v)}
            />
          </Field>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {language === "sl"
              ? "Preverjanje, ali potrebujete vizum, je brezplačno. Vizumsko pomoč lahko naročite zdaj ali kasneje, ko vas obvestimo o točnih pogojih za vašo destinacijo."
              : "Checking if you need a visa is free. You can request visa assistance now or decide later once we check and inform you about the regulations."}
          </p>
        </div>
      </div>

      {/* Interactive Terms & Agreement Button Module */}
      <div className="border-t pt-6 space-y-4">
        <div className="rounded-3xl border-2 border-primary/20 bg-primary/5 p-6 space-y-5 shadow-soft">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="text-primary shrink-0" size={22} />
                {language === "sl" ? "Pogoji poslovanja in potrditev pred rezervacijo" : "Terms of Service & Booking Agreement"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                {language === "sl"
                  ? "Pred oddajo obrazca vas prosimo, da preberete spodnje obvestilo, da bomo lahko imeli jasno in prijetno sodelovanje."
                  : "Before submitting, please review our terms and disclaimers to ensure transparent and reliable cooperation."}
              </p>
            </div>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              <FileText size={14} />
              {language === "sl" ? "Preberi celotne pogoje in opozorila" : "Read full terms & disclaimer"}
            </a>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 rounded-2xl bg-white/90 p-4 border border-border/80 cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                checked={!!data.acknowledged}
                onChange={(e) => set("acknowledged", e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-primary shrink-0 cursor-pointer"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                {language === "sl"
                  ? "Razumem, da je Viarra Travels storitev načrtovanja in svetovanja ter ne nastopa kot turistična agencija. Plačila se izvedejo neposredno ponudnikom, Viarra ne odgovarja za odpovedi ali zamude tretjih ponudnikov."
                  : "I understand Viarra Travels is a travel planning service, not an agency. Service fees cover planning only; flights, accommodation, transport and visa fees are paid directly to providers. We are not responsible for third-party changes or cancellations."}
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-2xl bg-white/90 p-4 border border-border/80 cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                checked={!!data.supportHoursAck}
                onChange={(e) => set("supportHoursAck", e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-primary shrink-0 cursor-pointer"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                {language === "sl"
                  ? "Razumem, da podpora med potovanjem ni na voljo 24 ur na dan, temveč poteka v okviru določenega delovnega časa."
                  : "I understand that while Priority Support is available as a paid add-on, support is not 24/7. Communication and emergency support are bound by specified business hours."}
              </span>
            </label>
          </div>

          {/* Dedicated Terms Acceptance Button */}
          <button
            type="button"
            onClick={() => set("termsAck", !data.termsAck)}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm ${
              data.termsAck
                ? "bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700"
                : "bg-white border-2 border-primary/40 text-foreground hover:bg-primary/5 hover:border-primary"
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                data.termsAck ? "bg-white text-emerald-600" : "border-2 border-primary/40"
              }`}
            >
              {data.termsAck && <Check size={14} strokeWidth={3} />}
            </div>
            <span>
              {data.termsAck
                ? (language === "sl" ? "Pogoji poslovanja in pravila so sprejeti ✓" : "Terms of Service & Disclaimer Accepted ✓")
                : (language === "sl" ? "Kliknite tukaj za sprejem pogojev poslovanja in politike zasebnosti *" : "Click here to agree to Terms of Service & Privacy Policy *")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shared Toggle Switch ---------- */
function Toggle({ label, value, onChange }: { label: string; value?: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all w-full cursor-pointer ${
        value ? "bg-primary text-primary-foreground" : "bg-white border hover:border-primary/50"
      }`}
    >
      <span>{label}</span>
      <span className={`h-5 w-9 rounded-full transition-all ${value ? "bg-white/40" : "bg-secondary-foreground/20"} relative shrink-0`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-sm ${value ? "left-4" : "left-0.5"}`} />
      </span>
    </button>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

/* ---------- Submission Screen ---------- */
function SuccessScreen({ language }: { language: string }) {
  return (
    <div className="min-h-screen grid place-items-center px-6 gradient-soft pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg text-center rounded-3xl bg-white p-12 shadow-soft"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-beach bg-primary/10 text-primary"
        >
          <PartyPopper size={36} />
        </motion.div>
        <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold">
          {language === "sl" ? "Vaš načrt je na poti!" : "Your plan is on its way!"}
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {language === "sl"
            ? "Prejeli smo vaš vprašalnik. Naša ekipa ga bo pregledala in vam pripravila celotno ponudbo v roku od 3 do 7 delovnih dni."
            : "We've received your travel brief. Our team will review it and send your personalised proposal within 48 hours."}
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all cursor-pointer"
        >
          {language === "sl" ? "Nazaj na domačo stran" : "Back home"}
        </a>
      </motion.div>
    </div>
  );
}