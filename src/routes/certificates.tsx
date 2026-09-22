import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Certificates } from "@/components/Certificates";
import { Contact, Footer } from "@/components/Contact";
import { ScrollTop } from "@/components/ScrollTop";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Alumni Certificates | Dream Team Academy" },
      { name: "description", content: "Verify and view certificates for graduates of Dream Team Academy's AI and Prompt Engineering courses." },
      { property: "og:title", content: "Dream Team Academy - Alumni Verification" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="mx-auto max-w-6xl px-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <Certificates />
      </main>
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}
