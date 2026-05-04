import { Bot } from "lucide-react";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar - Landing Specific */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-[#8E7AB5] to-[#2E004B] rounded-[12px] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[22px] font-semibold text-[#2E004B] tracking-tight">
            FPL AI
          </span>
        </Link>
        <Link href={'/login'} className="px-6 py-2 rounded border border-[#37003C] text-sm font-semibold text-[#37003C] cursor-pointer active:scale-95 duration-300 hover:bg-gray-50 transition-all">
          Sign In
        </Link>
      </nav>
      {children}
    </div>
  );
}
