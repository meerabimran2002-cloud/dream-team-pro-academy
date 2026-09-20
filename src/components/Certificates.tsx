import { useState } from "react";
import { X, Award } from "lucide-react";
import { SectionHead } from "./Curriculum";
import c1 from "@/assets/certificates/IMG-20260921-WA0010.jpg.asset.json";
import c2 from "@/assets/certificates/IMG-20260921-WA0008.jpg.asset.json";
import c3 from "@/assets/certificates/IMG-20260921-WA0006.jpg.asset.json";
import c4 from "@/assets/certificates/IMG-20260921-WA0004.jpg.asset.json";
import c5 from "@/assets/certificates/IMG-20260921-WA0002.jpg.asset.json";
import c6 from "@/assets/certificates/IMG-20260921-WA0011.jpg.asset.json";
import c7 from "@/assets/certificates/IMG-20260921-WA0007.jpg.asset.json";
import c8 from "@/assets/certificates/IMG-20260921-WA0003.jpg.asset.json";
import c9 from "@/assets/certificates/IMG-20260921-WA0009.jpg.asset.json";
import c10 from "@/assets/certificates/IMG-20260921-WA0001.jpg.asset.json";

const CERTS = [
  { name: "Neha Sham", id: "DTA-2026-R1", src: c1.url },
  { name: "Javeria Javed", id: "DTA-2026-R2", src: c2.url },
  { name: "Sana Shoukat", id: "DTA-2026-R3", src: c3.url },
  { name: "Zainab Rizvii", id: "DTA-2026-R4", src: c4.url },
  { name: "Rabbiya Rashid", id: "DTA-2026-R5", src: c5.url },
  { name: "Eman Fatima", id: "DTA-2026-R6", src: c6.url },
  { name: "Dil Awaiz", id: "DTA-2026-R7", src: c7.url },
  { name: "Ghazia Malik hussain", id: "DTA-2026-R8", src: c8.url },
  { name: "Zoona Aslam", id: "DTA-2026-R9", src: c9.url },
  { name: "Fahat Ali", id: "DTA-2026-R10", src: c10.url },
];

export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="certificates" className="px-4 py-20 relative">
      <div className="mx-auto max-w-6xl relative">
        <SectionHead
          kicker="Batch 1 — Prompt Engineering"
          title="Certified Students"
          body="Congratulations to our Batch 1 graduates. Tap any certificate to view it full size."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setOpen(i)}
              className="glass rounded-2xl p-3 text-left transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="overflow-hidden rounded-xl border border-border">
                <img
                  src={c.src}
                  alt={`Certificate of ${c.name}`}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-3 flex items-center gap-2 px-1 pb-1">
                <Award className="h-4 w-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{c.id}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full glass p-2"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={CERTS[open].src}
            alt={`Certificate of ${CERTS[open].name}`}
            className="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
