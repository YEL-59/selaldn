"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Optimiser", href: "/optimiser" },
  { name: "Transfers", href: "#" },//transfers
  { name: "Fixtures", href: "#" },//fixtures
  { name: "AI Chat", href: "#" },//ai-chat
  { name: "Players", href: "#" },//players
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 py-4 h-24 flex items-center">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-[#8E7AB5] to-[#2E004B] rounded-[12px] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[22px] font-black text-[#2E004B] tracking-tight">FPL AI</span>
          </Link>

          {/* Nav Pill Section (Desktop) - Pixel Perfect Refinement */}
          <div className="hidden lg:flex items-center bg-[#EEF2FF] rounded-full p-2 h-[60px] relative z-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-8 h-full flex items-center justify-center text-sm font-medium tracking-wide transition-all rounded-full whitespace-nowrap z-10",
                    isActive
                      ? "text-white"
                      : "text-[#2B003D] hover:text-[#5D3891]/70"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-[#2B003D] rounded-full shadow-[0_10px_30px_-5px_rgba(43,0,61,0.6)] z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-20">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Section (Search & Profile) */}
        <div className="flex items-center gap-6">
          <button className="p-2.5 hover:bg-gray-50 rounded-full transition-colors hidden sm:flex border border-transparent hover:border-gray-100">
            <Search className="w-5 h-5 text-[#2E004B]" strokeWidth={2.5} />
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xl ring-1 ring-gray-100">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#2E004B]" /> : <Menu className="w-6 h-6 text-[#2E004B]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-3 shadow-2xl"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-6 py-4 rounded-2xl text-base font-black transition-all",
                pathname === item.href
                  ? "bg-[#2E004B] text-white shadow-lg shadow-purple-950/20"
                  : "bg-gray-50 text-[#2E004B] hover:bg-gray-100"
              )}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
