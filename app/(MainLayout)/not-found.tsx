import { NotFoundContent } from "@/components/NotFoundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Out of Bounds | FPL AI",
  description: "The AI Scout couldn't find the coordinates for this section. It might have been transferred or relegated.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
      <NotFoundContent type="main" />
    </div>
  );
}
