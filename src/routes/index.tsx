import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme-context";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Founder } from "@/components/Founder";
import { Curriculum } from "@/components/Curriculum";
import { Journey } from "@/components/Journey";
import { FAQ } from "@/components/FAQ";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Feedback } from "@/components/Feedback";
import { Contact, Footer } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dream Team — Prompt Engineering Course | Premium AI Academy" },
      { name: "description", content: "Master Prompt Engineering with Dream Team Academy. Live online classes, certificate, beginner-to-advanced. Starts 10 July." },
      { property: "og:title", content: "Dream Team — Prompt Engineering Course" },
      { property: "og:description", content: "Premium AI academy. Live classes. Certificate. Starts 10 July." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <ThemeProvider>
      <Toaster theme="dark" position="top-center" />
      <Navbar />
      <main>
        <Hero />
        <Founder />
        <Curriculum />
        <Journey />
        <FAQ />
        <RegistrationForm />
        <Feedback />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
