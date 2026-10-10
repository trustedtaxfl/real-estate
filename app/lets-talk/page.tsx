import type { Metadata } from "next";
import { LetsTalkReference } from "@/components/contact/LetsTalkReference";

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    "Schedule a consultation or send Paul E. a message. Buying, selling, building or relocating in Central Florida, every great move starts with a conversation.",
};

export default function LetsTalkPage() {
  return <LetsTalkReference />;
}
