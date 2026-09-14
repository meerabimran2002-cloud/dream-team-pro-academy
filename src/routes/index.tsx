import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { StatsBar } from "@/components/StatsBar";
import { PromptStudio } from "@/components/PromptStudio";
import { Founder } from "@/components/Founder";
import { Curriculum } from "@/components/Curriculum";
import { Journey } from "@/components/Journey";
import { FAQ } from "@/components/FAQ";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Feedback } from "@/components/Feedback";
import { Contact, Footer } from "@/components/Contact";
import { ScrollTop } from "@/components/ScrollTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dream Team Academy — Prompt Engineering & AI Cartoon Creation" },
      { name: "description", content: "Join Dream Team Academy: Prompt Engineering Batch 3 and the new AI Cartoon Creation course. Live online classes with certificate." },
      { property: "og:title", content: "Dream Team Academy — AI Courses" },
      { property: "og:description", content: "Prompt Engineering Batch 3 and AI Cartoon Creation. Live classes. Certificate." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <StatsBar />
        <PromptStudio />
        <Founder />
        <Curriculum />
        <Journey />
        <FAQ />
        <RegistrationForm />
        <Feedback />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
