import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Viarra Travels" },
      { name: "description", content: "A curated gallery of destinations Viarra Travels loves to plan." },
      { property: "og:title", content: "Gallery — Viarra Travels" },
      { property: "og:description", content: "A curated gallery of destinations we love to plan." },
    ],
  }),
  component: Gallery,
});

type Tag = "All" | "Beach" | "Adventure" | "Luxury" | "Nature" | "City" | "Road Trips";

const IMAGES: { src: string; alt: string; tags: Tag[]; span?: string }[] = [
  { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80", alt: "Maldives overwater", tags: ["Beach", "Luxury"], span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&q=80", alt: "Bali temple", tags: ["Nature", "Adventure"] },
  { src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&q=80", alt: "Thailand islands", tags: ["Beach", "Adventure"] },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&q=80", alt: "Japan streets", tags: ["City"], span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000&q=80", alt: "African safari", tags: ["Adventure", "Nature"] },
  { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1000&q=80", alt: "Santorini", tags: ["Beach", "Luxury"] },
  
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80", alt: "Dubai skyline", tags: ["City", "Luxury"], span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=1000&q=80", alt: "Iceland glacier", tags: ["Nature", "Adventure"] },
  { src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000&q=80", alt: "Swiss Alps", tags: ["Nature", "Adventure"] },
  { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80", alt: "Coastal road", tags: ["Road Trips", "Nature"] },
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80", alt: "Paris", tags: ["City"] },
];

const TAGS: Tag[] = ["All", "Beach", "Adventure", "Luxury", "Nature", "City", "Road Trips"];

function Gallery() {
  const [tag, setTag] = useState<Tag>("All");
  const filtered = tag === "All" ? IMAGES : IMAGES.filter((i) => i.tags.includes(tag));

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">Places we love</h1>
          <p className="mt-4 text-muted-foreground">A visual moodboard from trips we've planned.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                tag === t ? "bg-primary text-primary-foreground shadow-soft" : "glass hover:bg-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              className={`group relative overflow-hidden rounded-3xl shadow-soft ${img.span ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium">{img.alt}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
