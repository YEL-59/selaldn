import { NotFoundContent } from "@/components/NotFoundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Auth Page Not Found | FPL AI",
  description: "The AI Scout couldn't find the coordinates for this section. It might have been transferred or relegated.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
        <NotFoundContent type="auth" />
    </div>
  );
}
