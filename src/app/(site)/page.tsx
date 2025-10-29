
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boss News - Saas platform for jobs, news and blogs ",
  description: "Boss News SaaS  platform for jobs, news and blogs ",
};

export default async function Home() {

  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <Contact />
    </main>
  );
}
