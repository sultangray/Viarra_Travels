import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, PartyPopper, Plus, X, Info } from "lucide-react";
import { loadPlanner, savePlanner, clearPlanner, type PlannerData } from "@/lib/planner-store";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Travel Planner — Viarra Travels" },
      { name: "description", content: "Complete your personalised travel plan. A guided, multi-step questionnaire — with auto-save." },
      { property: "og:title", content: "Travel Planner — Viarra Travels" },
      { property: "og:description", content: "Design your trip in 8 quick steps." },
    ],
  }),
  component: Planner,
});

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
  const hydrated = useRef(false);

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

  // Basic Validation Logic
  const canProceed = () => {
    if (step === 0) return !!data.fullName && !!data.email && !!data.phone;
    if (step === 1) return data.passengers && data.passengers.length > 0;
    if (step === 2) return (!!data.destination || !!data.flexibleDestination) && !!data.duration;
    if (step === 7) return !!data.acknowledged && !!data.supportHoursAck;
    return true;
  };

  const next = () => {
    if (!canProceed()) {
      toast.error("Please fill out all required fields before proceeding.");
      return;
    }
    setStep((s) => Math.min(s + 1, SECTIONS.length - 1));
  };
  
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const jumpToStep = (index: number) => {
    if (index < step) setStep(index);
  };

  const submit = () => {
    if (!canProceed()) {
      toast.error("Please tick all acknowledgements to submit.");
      return;
    }
    setSubmitted(true);
    clearPlanner();
    toast.success("Your travel plan has been submitted!");
  };

  if (submitted) return <SuccessScreen />;

  return (
    <div className="pt-28 pb-24 px-4 md:px-6 gradient-soft min-h-screen">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8 flex flex-col items-center">
          {/* Viarra Logotype Placeholder */}
          <div className="mb-4 text-2xl font-bold tracking-widest text-primary uppercase">
            Viarra
          </div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            Step {step + 1} of {SECTIONS.length} · {SECTIONS[step]}
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold">Design your trip</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your progress is saved automatically. Red asterisks (<span className="text-red-500">*</span>) indicate required fields.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="mt-3 hidden md:flex justify-between text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {SECTIONS.map((s, i) => (
              <span 
                key={s} 
                onClick={() => jumpToStep(i)}
                className={`transition-colors ${i <= step ? "text-foreground cursor-pointer hover:text-primary" : "opacity-50"}`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-soft p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <SectionBasics data={data} set={set} />}
              {step === 1 && <SectionPassengers data={data} set={set} />}
              {step === 2 && <SectionDestination data={data} set={set} />}
              {step === 3 && <SectionPriorities data={data} set={set} />}
              {step === 4 && <SectionTransport data={data} set={set} />}
              {step === 5 && <SectionAccommodation data={data} set={set} />}
              {step === 6 && <SectionItinerary data={data} set={set} />}
              {step === 7 && <SectionSupport data={data} set={set} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium disabled:opacity-50"
            >
              <ArrowLeft size={16} /> Back
            </button>
            {step < SECTIONS.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all"
              >
                Submit plan <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .input, .textarea {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid var(--color-border);
          background: rgba(255,255,255,0.85);
          padding: 0.7rem 0.95rem;
          font-size: 0.925rem;
          transition: all 0.2s;
          font-family: inherit;
        }
        .input:focus, .textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 20%, transparent);
        }
        .label { display:block; margin-bottom:0.4rem; font-size:0.78rem; font-weight:500; color:var(--color-muted-foreground); }
        .req { color: #ef4444; margin-left: 2px; }
        .chip { border-radius:999px; padding:0.55rem 1rem; font-size:0.85rem; font-weight:500; background: rgba(255,255,255,0.7); border:1px solid var(--color-border); cursor:pointer; transition: all 0.15s; }
        .chip:hover { background: var(--color-accent); }
        .chip[data-active="true"] { background: var(--color-primary); color: var(--color-primary-foreground); border-color: transparent; }
      `}</style>
    </div>
  );
}

/* ---------- helpers ---------- */
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
        >{o}</button>
      ))}
    </div>
  );
}

function Field({ label, required, children }: { label: React.ReactNode; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="label">{label}{required && <span className="req">*</span>}</span>{children}</label>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

/* ---------- sections ---------- */
function SectionBasics({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Basic information" desc="Let's start with the essentials." />
      <div className="text-sm font-semibold text-primary/80 uppercase tracking-wide border-b pb-2">Reservation Holder</div>
      <Grid>
        <Field label="Full name" required><input className="input" value={data.fullName ?? ""} onChange={(e) => set("fullName", e.target.value)} /></Field>
        <Field label="Email" required><input className="input" type="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Phone" required><input className="input" value={data.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field label="WhatsApp"><input className="input" value={data.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
      </Grid>
    </div>
  );
}

function SectionPassengers({ data, set }: any) {
  const passengers = data.passengers ?? [{ name: data.fullName || "", nationality: "", gender: "", isChild: false, age: "", needsStroller: false, specialAssistance: false }];
  
  const addPassenger = () => set("passengers", [...passengers, { name: "", nationality: "", gender: "", isChild: false, age: "", needsStroller: false, specialAssistance: false }]);
  
  const updatePassenger = (i: number, k: string, v: any) => {
    const copy = [...passengers]; copy[i] = { ...copy[i], [k]: v }; set("passengers", copy);
  };
  
  const removePassenger = (i: number) => set("passengers", passengers.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-6">
      <SectionHeader title="Passengers" desc="Tell us who's travelling." />
      
      <div className="space-y-5">
        {passengers.map((p: any, i: number) => (
          <div key={i} className="p-4 rounded-xl border bg-secondary/20 space-y-4 relative">
            {i > 0 && (
              <button type="button" onClick={() => removePassenger(i)} className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"><X size={18} /></button>
            )}
            <div className="font-medium text-sm">Passenger {i + 1} {i === 0 && "(Lead)"}</div>
            <Grid>
              <Field label="Full Name" required><input className="input" value={p.name} onChange={(e) => updatePassenger(i, "name", e.target.value)} /></Field>
              <Field label="Nationality" required><input className="input" value={p.nationality} onChange={(e) => updatePassenger(i, "nationality", e.target.value)} /></Field>
              <Field label="Gender"><input className="input" value={p.gender} onChange={(e) => updatePassenger(i, "gender", e.target.value)} /></Field>
            </Grid>
            
            <div className="flex flex-wrap gap-4 pt-2">
               <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.isChild} onChange={(e) => updatePassenger(i, "isChild", e.target.checked)} /> This person is a child</label>
               <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.specialAssistance} onChange={(e) => updatePassenger(i, "specialAssistance", e.target.checked)} /> Needs special assistance</label>
            </div>

            {p.isChild && (
              <div className="bg-white p-3 rounded-lg border mt-2 space-y-3">
                <Field label="Age of child"><input className="input" type="number" value={p.age} onChange={(e) => updatePassenger(i, "age", e.target.value)} /></Field>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.needsStroller} onChange={(e) => updatePassenger(i, "needsStroller", e.target.checked)} /> Needs to transport a stroller/pram</label>
              </div>
            )}
          </div>
        ))}
        
        <button type="button" onClick={addPassenger} className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-primary/40 text-primary px-4 py-2.5 text-sm font-medium hover:bg-primary/5 w-full justify-center transition-all">
          <Plus size={16} /> Add passenger
        </button>
      </div>
    </div>
  );
}

function SectionDestination({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Destination" desc="Where do you want to go?" />
      
      <div className="p-4 rounded-xl border bg-primary/5 mb-4">
        <label className="flex items-center gap-3 text-sm font-medium cursor-pointer mb-2">
          <input type="checkbox" className="w-4 h-4" checked={!!data.flexibleDestination} onChange={(e) => set("flexibleDestination", e.target.checked)} />
          I am flexible with the destination
        </label>
        {data.flexibleDestination && (
          <p className="text-xs text-muted-foreground ml-7">e.g. "My budget is 600€ pp and I don't care where, I just want to go somewhere hot."</p>
        )}
      </div>

      {!data.flexibleDestination && (
        <Grid>
          <Field label="Main Destination" required><input className="input" value={data.destination ?? ""} onChange={(e) => set("destination", e.target.value)} /></Field>
          <Field label="Multiple countries / cities?"><input className="input" placeholder="e.g. 3 days Bangkok, 5 days Phuket" value={data.multipleCountries ?? ""} onChange={(e) => set("multipleCountries", e.target.value)} /></Field>
        </Grid>
      )}

      {data.flexibleDestination && (
        <Field label="Describe your ideal destination (Vibe, Weather, Budget)"><textarea className="textarea" rows={3} placeholder="Somewhere hot, near the beach, around 600€ per person..." value={data.flexibleDesc ?? ""} onChange={(e) => set("flexibleDesc", e.target.value)} /></Field>
      )}

      <div className="border-t pt-4 mt-4 space-y-4">
        <Field label="Are your travel dates flexible?">
          <ChipGroup options={["Yes", "No"]} value={data.flexibleDates ? "Yes" : data.flexibleDates === false ? "No" : undefined} onChange={(v) => set("flexibleDates", v === "Yes")} />
        </Field>
        
        {data.flexibleDates && (
          <div className="space-y-4 bg-secondary/20 p-4 rounded-xl">
             <Field label="How flexible?"><ChipGroup options={["± 1 day", "± 3 days", "± 7 days", "10+ days"]} value={data.flexibilityAmount} onChange={(v) => set("flexibilityAmount", v)} /></Field>
             <Field label="Explain your date flexibility"><textarea className="textarea" rows={2} placeholder="Anytime in August..." value={data.flexibilityNotes ?? ""} onChange={(e) => set("flexibilityNotes", e.target.value)} /></Field>
          </div>
        )}

        <Grid>
          <Field label="Start date"><input className="input" type="date" value={data.startDate ?? ""} onChange={(e) => set("startDate", e.target.value)} /></Field>
          {!data.flexibleDates && <Field label="End date"><input className="input" type="date" value={data.endDate ?? ""} onChange={(e) => set("endDate", e.target.value)} /></Field>}
          <Field label="Duration (nights)" required><input className="input" type="number" placeholder="e.g. 7" value={data.duration ?? ""} onChange={(e) => set("duration", e.target.value)} /></Field>
        </Grid>
      </div>
    </div>
  );
}

function SectionPriorities({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Priorities" desc="What matters most for this trip?" />
      <Field label="Travel style (Select multiple)"><ChipGroup multi options={["Relaxed", "Balanced", "Adventure", "Luxury", "No preference"]} value={data.travelStylePref} onChange={(v) => set("travelStylePref", v)} /></Field>
      <Field label="Accommodation comfort (Select multiple)"><ChipGroup multi options={["Basic", "Medium", "Comfort", "Luxury"]} value={data.accommodationComfort} onChange={(v) => set("accommodationComfort", v)} /></Field>
      <Field label="Budget flexibility"><ChipGroup options={["Maintain strict budget", "Increase comfort if worth it", "Compromise if needed"]} value={data.budgetFlexibility} onChange={(v) => set("budgetFlexibility", v)} /></Field>
      <Field label="Any specific wishes or requirements? (Open question)">
        <textarea className="textarea" rows={3} placeholder="Tell us exactly how you envision this trip..." value={data.specificWishes ?? ""} onChange={(e) => set("specificWishes", e.target.value)} />
      </Field>
    </div>
  );
}

function SectionTransport({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Transport" desc="Getting there and getting around." />
      <Grid>
        <Field label="Departure city"><input className="input" value={data.departureCity ?? ""} onChange={(e) => set("departureCity", e.target.value)} /></Field>
        <Field label="Preferred nearby airport(s)"><input className="input" placeholder="e.g. Vienna, Budapest, Venice" value={data.preferredAirport ?? ""} onChange={(e) => set("preferredAirport", e.target.value)} /></Field>
      </Grid>
      
      <div className="bg-secondary/20 p-4 rounded-xl space-y-3">
         <p className="text-sm font-medium">Extra Transport Logistics</p>
         <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
           <Toggle label="Help transport city to airport" value={data.transportCityToAirport} onChange={(v) => set("transportCityToAirport", v)} />
           <Toggle label="Help me with parking" value={data.parkingRequired} onChange={(v) => set("parkingRequired", v)} />
           <Toggle label="Return to exact same airport?" value={data.returnSameAirport} onChange={(v) => set("returnSameAirport", v)} />
           <Toggle label="Transfer airport to hotel" value={data.transferToHotel} onChange={(v) => set("transferToHotel", v)} />
           <Toggle label="Transfer hotel to airport" value={data.transferToAirport} onChange={(v) => set("transferToAirport", v)} />
         </div>
      </div>

      <Field label="Main transport to destination"><ChipGroup multi options={["Plane", "Bus", "Train", "Self-drive", "Recommend me the best"]} value={data.mainTransport} onChange={(v) => set("mainTransport", v)} /></Field>

      <Field label="Destination transport (How will you get around while there?)">
        <ChipGroup multi options={["Car rental", "Scooter", "Taxi/Uber", "Public transport", "Recommend me what's best"]} value={data.destinationTransport} onChange={(v) => set("destinationTransport", v)} />
      </Field>

      <Grid>
        <Field label="Main Transport Budget (Total)"><input className="input" placeholder="e.g. 500€" value={data.transportBudget ?? ""} onChange={(e) => set("transportBudget", e.target.value)} /></Field>
        {data.transportCityToAirport && (
          <Field label="Budget to get to airport"><input className="input" placeholder="e.g. 50€ for Flixbus" value={data.airportTransportBudget ?? ""} onChange={(e) => set("airportTransportBudget", e.target.value)} /></Field>
        )}
      </Grid>

      <div className="border-t pt-4 mt-4 space-y-4">
        <p className="text-sm font-medium">Flight Preferences & Luggage</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Open for layovers?">
             <select className="input" value={data.layovers ?? ""} onChange={(e) => set("layovers", e.target.value)}>
                <option value="">Select...</option>
                <option value="No, direct only">No, direct only</option>
                <option value="Yes, max 2 hours">Yes, max 2 hours</option>
                <option value="Yes, max 5 hours">Yes, max 5 hours</option>
                <option value="Yes, I don't mind">Yes, I don't mind</option>
             </select>
          </Field>
          <div className="pt-6">
            <Toggle label="Willing to travel with Carry-ons ONLY? (Cheaper)" value={data.carryOnOnly} onChange={(v) => set("carryOnOnly", v)} />
          </div>
        </div>
        {!data.carryOnOnly && (
           <Field label="Checked luggage details (Who needs how much?)"><textarea className="textarea" rows={2} placeholder="e.g. Passenger 1: 20kg, Passenger 2: 10kg" value={data.luggageDetails ?? ""} onChange={(e) => set("luggageDetails", e.target.value)} /></Field>
        )}
        <Field label="Transport specific notes or recommendations you want from us?"><textarea className="textarea" rows={2} placeholder="e.g. I can fly from Budapest, but check if Vienna is cheaper..." value={data.transportNotes ?? ""} onChange={(e) => set("transportNotes", e.target.value)} /></Field>
      </div>
    </div>
  );
}

function SectionAccommodation({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Accommodation" desc="Where would you like to stay?" />
      
      <Field label="Accommodation types (Select multiple)">
        <ChipGroup multi options={["Hotel", "Apartment", "Villa", "Guesthouse", "Hostel (Shared)", "Hostel (Private)", "Hostel (Female Dorm)", "Eco Lodge", "Resort"]} value={data.accommodationTypes} onChange={(v) => set("accommodationTypes", v)} />
      </Field>
      
      <Field label="What matters most for location? (Select multiple)">
        <ChipGroup multi options={["Close to city centre", "Quiet location", "Close to the beach", "Close to nature", "Not too important", "I'll leave it up to you"]} value={data.locationPreference} onChange={(v) => set("locationPreference", v)} />
      </Field>

      <Field label="Meals"><ChipGroup options={["None / Without", "Breakfast", "Half board", "All inclusive"]} value={data.meals} onChange={(v) => set("meals", v)} /></Field>
      
      <Grid>
        <Field label="Budget priority"><ChipGroup options={["Lowest price", "Best value for my budget", "Comfort / Luxury"]} value={data.budgetPriority} onChange={(v) => set("budgetPriority", v)} /></Field>
        <Field label="Budget per night (per person)"><input className="input" placeholder="e.g. 50€" value={data.budgetPerNight ?? ""} onChange={(e) => set("budgetPerNight", e.target.value)} /></Field>
      </Grid>
      
      <Field label="Special requests"><textarea className="textarea" rows={2} placeholder="e.g. Balcony, pool, child's bed, beach view from balcony, pets allowed, wellness, parking..." value={data.specialRequests ?? ""} onChange={(e) => set("specialRequests", e.target.value)} /></Field>

      <div className="border-t pt-4 mt-4 space-y-4">
        <Field label="Booking preference" required>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div 
                className={`p-4 rounded-xl border cursor-pointer transition-all ${data.bookingPreference === "Book yourself" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                onClick={() => set("bookingPreference", "Book yourself")}
             >
                <div className="font-semibold mb-1">Book Yourself</div>
                <div className="text-xs text-muted-foreground">I send you exact steps and direct links on how to book everything.</div>
             </div>
             <div 
                className={`p-4 rounded-xl border cursor-pointer transition-all ${data.bookingPreference === "Transfer to me" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                onClick={() => set("bookingPreference", "Transfer to me")}
             >
                <div className="font-semibold mb-1">Book For Me (Transfer)</div>
                <div className="text-xs text-muted-foreground">You transfer the funds to me, and I handle the exact bookings for you.</div>
             </div>
           </div>
        </Field>

        {/* Dynamic Disclaimer Text based on Preference */}
        {data.bookingPreference === "Book yourself" && (
           <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-sm border border-orange-200">
             <strong>Zadeva: Končna izbira – povezave za rezervacijo</strong><br/><br/>
             Pozdravljeni,<br/>
             na podlagi vaše potrditve spodaj označite končne izbire, nato vam pošljem neposredne povezave za rezervacijo.<br/><br/>
             <strong>Pomembno glede cen:</strong><br/>
             Cene prevozov in nastanitev so dinamične in se lahko spreminjajo tudi večkrat dnevno. Priporočam, da rezervacijo opravite čim prej, saj s tem zmanjšate tveganje spremembe cene ali razpoložljivosti.<br/><br/>
             Po potrditvi vam pošljem povezave, kjer rezervacijo opravite sami. Pred plačilom preverite datume, imena in pogoje odpovedi.
           </div>
        )}

        {data.bookingPreference === "Transfer to me" && (
           <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-200">
             <strong>NAVODILA ZA PLAČILO (če rezerviraš TI)</strong><br/><br/>
             Po potrditvi obrazca nakažite skupni znesek na: <em>[TRR / Revolut]</em><br/><br/>
             Prosimo, da nakazilo izvedete najkasneje v roku [24 ur / do __ ure naslednji delovni dan], - <strong>hitreje, tem bolje - zaradi hitrega spreminjanja cen.</strong> Saj se cene letalskih kart in nastanitev lahko hitro spremenijo.<br/><br/>
             Rezervacija se izvede po prejemu sredstev. Če se cena do trenutka dejanske rezervacije spremeni, vas o tem predhodno obvestim in rezervacijo izvedemo šele po vaši potrditvi.
           </div>
        )}
      </div>
    </div>
  );
}

function SectionItinerary({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Personalised Itinerary" desc="Shape your daily experience." />
      
      <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex gap-3 items-start">
        <Info className="text-primary shrink-0 mt-0.5" size={18} />
        <div className="text-sm">
          <strong>Note:</strong> Personalised itineraries and priority support are <strong>Paid Add-ons</strong>.
        </div>
      </div>

      <Field label="Do you want an itinerary?">
         <ChipGroup options={["Full Service (Transport/Accom + Itinerary)", "JUST Itinerary (I'll book transport/accom myself)", "No Itinerary needed"]} value={data.itineraryType} onChange={(v) => set("itineraryType", v)} />
      </Field>

      {data.itineraryType && data.itineraryType !== "No Itinerary needed" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6 border-t pt-4 mt-4">
          <Field label="Who are you travelling with? (Helps us suggest activities)">
             <ChipGroup options={["Solo", "Partner / Couple", "Family with kids", "Friends", "Business"]} value={data.travelCompanions} onChange={(v) => set("travelCompanions", v)} />
          </Field>
          <Grid>
            <Field label="Travel pace"><ChipGroup options={["Slow", "Balanced", "Packed"]} value={data.travelPace} onChange={(v) => set("travelPace", v)} /></Field>
            <Field label="Daily structure"><ChipGroup options={["Free", "Loose plan", "Detailed plan"]} value={data.dailyStructure} onChange={(v) => set("dailyStructure", v)} /></Field>
          </Grid>
          <Field label="Activities"><ChipGroup multi options={["Sightseeing", "Beach", "Nature", "Shopping", "Culture", "Food", "Nightlife"]} value={data.activities} onChange={(v) => set("activities", v)} /></Field>
          <Field label="Travel vibe"><ChipGroup multi options={["Digital nomad", "Slow travel", "Luxury", "Adventure"]} value={data.travelVibe} onChange={(v) => set("travelVibe", v)} /></Field>
          <Field label="Most important goal"><ChipGroup options={["Stress free", "Experiences", "Organisation", "Time optimisation"]} value={data.importantGoal} onChange={(v) => set("importantGoal", v)} /></Field>
          <Grid>
            <Field label="Must-see places"><textarea className="textarea" rows={2} value={data.mustSee ?? ""} onChange={(e) => set("mustSee", e.target.value)} /></Field>
            <Field label="Activities to avoid"><textarea className="textarea" rows={2} value={data.avoidActivities ?? ""} onChange={(e) => set("avoidActivities", e.target.value)} /></Field>
          </Grid>
        </motion.div>
      )}
    </div>
  );
}

function SectionSupport({ data, set }: any) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Support & Visas" desc="Final details before we get to work." />
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-xl border bg-secondary/20">
           <Field label="Travel support required? (Paid Add-on)"><ChipGroup options={["Yes", "No"]} value={data.travelSupport} onChange={(v) => set("travelSupport", v)} /></Field>
        </div>
        <div className="p-4 rounded-xl border bg-secondary/20 space-y-2">
           <Field label="Do you need help sorting VISAS?">
             <ChipGroup options={["Yes, handle it for me (Extra fee)", "No, I'll do it myself"]} value={data.visaHelp} onChange={(v) => set("visaHelp", v)} />
           </Field>
           <p className="text-xs text-muted-foreground">Checking if you need a visa is free. Having us (or our partner agency) sort the documents for you requires an extra fee.</p>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <p className="text-sm font-semibold">Terms & Declarations <span className="text-red-500">*</span></p>
        
        <label className="flex items-start gap-3 rounded-2xl bg-secondary/40 p-4 cursor-pointer">
          <input type="checkbox" checked={!!data.acknowledged} onChange={(e) => set("acknowledged", e.target.checked)} className="mt-1 h-5 w-5 accent-primary shrink-0" />
          <span className="text-sm">
            I understand Viarra Travels is a travel <strong>planning service</strong>, not an agency. Service fees cover planning only; flights, accommodation, transport and visa fees are paid directly to providers. <strong>We are not responsible for any flight changes, delays, or cancellations made by third parties.</strong>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-2xl bg-secondary/40 p-4 cursor-pointer">
          <input type="checkbox" checked={!!data.supportHoursAck} onChange={(e) => set("supportHoursAck", e.target.checked)} className="mt-1 h-5 w-5 accent-primary shrink-0" />
          <span className="text-sm">
            I understand that while Priority Support is available as a paid add-on, <strong>support is not 24/7</strong>. Communication and emergency support are bound by specified business hours outlined in the final itinerary package.
          </span>
        </label>
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value?: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all w-full ${value ? "bg-primary text-primary-foreground" : "bg-white border hover:border-primary/50"}`}>
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

function SuccessScreen() {
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
        <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold">Your plan is on its way!</h1>
        <p className="mt-3 text-muted-foreground">We've received your travel brief. Our team will review it and send your personalised proposal within 48 hours.</p>
        <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent transition-all">
          Back home
        </a>
      </motion.div>
    </div>
  );
}