import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Viarra Travels" },
      { name: "description", content: "Get in touch with Viarra Travels. Phone, WhatsApp, email — we're here to help you plan." },
      { property: "og:title", content: "Contact — Viarra Travels" },
      { property: "og:description", content: "Get in touch with our travel planners." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent — we'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 px-6 gradient-soft min-h-screen">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">Let's talk</h1>
          <p className="mt-4 text-muted-foreground">
            Have a question before you start planning? We reply within one business day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 items-start">
          {/* Left — Contact Details */}
          <div className="rounded-3xl bg-card p-8 md:p-10 shadow-soft space-y-6">
            <h2 className="font-display text-xl font-bold mb-4">Direct channels</h2>

            <RowLink
              href="tel:+38640973329"
              icon={<Phone size={18} />}
              label="Phone"
              value="+386 40 973 329"
            />
            <RowLink
              href="https://wa.me/38640973329"
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value="+386 40 973 329"
              isExternal
            />
            <RowLink
              href="mailto:viarratravels@gmail.com"
              icon={<Mail size={18} />}
              label="Email"
              value="viarratravels@gmail.com"
            />
            <Row
              icon={<Clock size={18} />}
              label="Office hours"
              value="Mon – Fri · 9:00 – 17:00 (GMT+2)"
            />

            <div className="mt-6 overflow-hidden rounded-2xl aspect-[16/10] relative gradient-beach">
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass rounded-2xl px-5 py-3 flex items-center gap-2 text-sm font-medium shadow-sm">
                  <MapPin size={16} className="text-primary" /> Slovenia · Serving worldwide
                </div>
              </div>
            </div>
          </div>

          {/* Right — Inquiry Form */}
          <form onSubmit={submit} className="glass rounded-3xl p-8 md:p-10 shadow-soft space-y-4">
            <h2 className="font-display text-xl font-bold mb-2">Send us a message</h2>
            <Field label="Name">
              <input required name="name" className="input" placeholder="Your full name" />
            </Field>
            <Field label="Email">
              <input required type="email" name="email" className="input" placeholder="you@email.com" />
            </Field>
            <Field label="Subject">
              <input required name="subject" className="input" placeholder="How can we help?" />
            </Field>
            <Field label="Message">
              <textarea
                required
                name="message"
                rows={5}
                className="input"
                placeholder="Tell us a little about your trip, dates, or questions..."
              />
            </Field>
            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-accent disabled:opacity-70 cursor-pointer"
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <span>Send message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid var(--color-border);
          background: rgba(255,255,255,0.8);
          padding: 0.75rem 1rem;
          font-size: 0.925rem;
          transition: all 0.2s;
          font-family: inherit;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 20%, transparent);
        }
      `}</style>
    </div>
  );
}

function RowLink({
  icon,
  label,
  value,
  href,
  isExternal = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
}) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 group p-2 rounded-2xl transition-colors hover:bg-black/5"
    >
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/20 text-foreground shrink-0 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium truncate group-hover:text-primary transition-colors">{value}</div>
      </div>
    </a>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-2">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/20 text-foreground shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}