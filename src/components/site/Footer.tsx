import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full gradient-beach font-display text-sm font-bold">
              V
            </span>
            <span className="font-display text-lg font-bold">Viarra Travels</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Personal travel planning designed around you. Less planning, more exploring.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-accent transition-colors" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-accent transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-accent transition-colors" aria-label="WhatsApp"><MessageCircle size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/planner" className="hover:text-foreground">Travel Planner</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Viarra Travels. All rights reserved.
      </div>
    </footer>
  );
}
