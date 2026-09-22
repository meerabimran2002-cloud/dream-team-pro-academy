import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Certificates } from "@/components/Certificates";
import { Contact, Footer } from "@/components/Contact";
import { ScrollTop } from "@/components/ScrollTop";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Prompt Engineering Batch 1 Certificates | Dream Team Academy" },
      { name: "description", content: "View and download certificates for Dream Team Academy Prompt Engineering Batch 1 students." },
      { property: "og:title", content: "Prompt Engineering Batch 1 Certificates | Dream Team Academy" },
      { property: "og:description", content: "View and download certificates for Dream Team Academy Prompt Engineering Batch 1 students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 min-h-screen">
        <div className="mx-auto max-w-6xl px-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Prompt Engineering</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">Batch 1 Student Certificates</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Celebrate our first graduating class. Open any certificate to view it, then download it to your device.</p>
        </div>
        <Certificates hideHeading />
      </main>
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}
