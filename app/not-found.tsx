import { NotFoundContent } from "@/components/NotFoundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Out of Bounds | FPL AI",
  description: "The AI Scout couldn't find the coordinates for this section. It might have been transferred or relegated.",
};

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ededff]">
        <NotFoundContent type="main" />
    </div>
  );
}
