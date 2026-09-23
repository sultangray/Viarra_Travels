import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Viarra Travels" },
      { name: "description", content: "A curated gallery of destinations Viarra Travels loves to plan." },
      { property: "og:title", content: "Gallery · Viarra Travels" },
      { property: "og:description", content: "A curated gallery of destinations we love to plan." },
    ],
  }),
  component: Gallery,
});

type Tag = "All" | "Beach" | "Adventure" | "Luxury" | "Nature" | "City" | "Road Trips";

interface GalleryImage {
  src: string;
  altEn: string;
  altSl: string;
  tags: Tag[];
  span?: string;
}

const IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    altEn: "Maldives overwater villas",
    altSl: "Maldivi, vili nad vodo",
    tags: ["Beach", "Luxury"],
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&q=80",
    altEn: "Bali cultural temple",
    altSl: "Bali, tradicionalni tempelj",
    tags: ["Nature", "Adventure"],
  },
  {
    src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&q=80",
    altEn: "Thailand tropical islands",
    altSl: "Tajska, tropski otoki",
    tags: ["Beach", "Adventure"],
  },
  {
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&q=80",
    altEn: "Japan historic streets",
    altSl: "Japonska, zgodovinske ulice",
    tags: ["City"],
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000&q=80",
    altEn: "African wildlife safari",
    altSl: "Afriški safari v naravi",
    tags: ["Adventure", "Nature"],
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1000&q=80",
    altEn: "Santorini coastal view",
    altSl: "Santorini, pogled na obalo",
    tags: ["Beach", "Luxury"],
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80",
    altEn: "Dubai skyline and architecture",
    altSl: "Dubaj, moderna arhitektura",
    tags: ["City", "Luxury"],
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=1000&q=80",
    altEn: "Iceland glacier exploration",
    altSl: "Islandija, ledeniška pokrajina",
    tags: ["Nature", "Adventure"],
  },
  {
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000&q=80",
    altEn: "Swiss Alps panoramic peaks",
    altSl: "Švicarske Alpe, gorski vrhovi",
    tags: ["Nature", "Adventure"],
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80",
    altEn: "Scenic coastal road trip",
    altSl: "Slikovita obalna cesta",
    tags: ["Road Trips", "Nature"],
  },
  {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80",
    altEn: "Paris city atmosphere",
    altSl: "Pariz, mestni utrip",
    tags: ["City"],
  },
];

const TAGS: { key: Tag; labelEn: string; labelSl: string }[] = [
  { key: "All", labelEn: "All", labelSl: "Vse" },
  { key: "Beach", labelEn: "Beach", labelSl: "Plaža" },
  { key: "Adventure", labelEn: "Adventure", labelSl: "Pustolovščina" },
  { key: "Luxury", labelEn: "Luxury", labelSl: "Luksuz" },
  { key: "Nature", labelEn: "Nature", labelSl: "Narava" },
  { key: "City", labelEn: "City", labelSl: "Mesta" },
  { key: "Road Trips", labelEn: "Road Trips", labelSl: "Cestna potovanja" },
];

function Gallery() {
  const [activeTag, setActiveTag] = useState<Tag>("All");
  const { language } = useTranslation();

  const filtered = activeTag === "All"
    ? IMAGES
    : IMAGES.filter((img) => img.tags.includes(activeTag));

  return (
    <div className="pt-32 pb-24 px-6 gradient-soft min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {language === "sl" ? "Kraji, ki jih obožujemo" : "Places we love"}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {language === "sl"
              ? "Vizualni utrinki in navdih s potovanj, ki jih z veseljem načrtujemo."
              : "A visual moodboard from trips we love to plan."}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TAGS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTag(t.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                activeTag === t.key
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "glass hover:bg-accent text-foreground"
              }`}
            >
              {language === "sl" ? t.labelSl : t.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => {
            const label = language === "sl" ? img.altSl : img.altEn;
            return (
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
                  alt={label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-foreground w-fit shadow-sm">
                    {label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}