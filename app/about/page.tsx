import type { Metadata } from "next";
import { AboutReference } from "@/components/about/AboutReference";

export const metadata: Metadata = {
  title: "About Paul",
  description:
    "Meet Paul E., a second-generation Realtor helping buyers, sellers and relocating clients navigate Central Florida with confidence.",
};

export default function AboutPage() {
  return <AboutReference />;
}
