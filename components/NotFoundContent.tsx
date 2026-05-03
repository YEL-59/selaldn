"use client";

import { motion } from "framer-motion";
import { MoveLeft, Home, RefreshCcw, Bot, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NotFoundContentProps {
  type?: "main" | "auth";
  title?: string;
  description?: string;
}

export const NotFoundContent = ({
  type = "main",
  title,
  description,
}: NotFoundContentProps) => {
  const isAuth = type === "auth";

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 ${!isAuth ? "min-h-[70vh]" : "w-full py-12"}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className="relative mb-8"
      >
        {/* Decorative elements */}
        <div className="absolute -inset-4 bg-linear-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50 animate-pulse" />

        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
          <Image
            src="/images/404-illustration.png"
            alt="404 - Not Found"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-3 border border-gray-100 hidden md:block"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              Status: 404
            </span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-4 -left-4 bg-[#37003C] shadow-xl rounded-2xl p-4 text-white hidden md:block"
        >
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold leading-none">
              VAR Check: No Page Found
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-8 bg-gray-200" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
            Offside Trap
          </span>
          <div className="h-px w-8 bg-gray-200" />
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4 tracking-tight">
          {title || "Page"}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E004B] to-[#8E7AB5]">
            {title ? "Not Found" : "Out of Bounds"}
          </span>
        </h1>

        <p className="text-[#6B7280] text-base md:text-lg mb-10 leading-relaxed font-medium">
          {description ||
            "The AI Scout couldn't find the coordinates for this section. It might have been transferred or relegated."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#2E004B] hover:bg-[#3d0066] text-white rounded-xl px-10 h-14 font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-all gap-2"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto border-2 border-gray-100 bg-white hover:bg-gray-50 text-[#1e1b4b] rounded-xl px-10 h-14 font-bold active:scale-95 transition-all gap-2"
          >
            <MoveLeft className="w-5 h-5" />
            Previous
          </Button>
        </div>

        {!isAuth && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            {[
              { name: "Dashboard", href: "/" },
              { name: "Optimiser", href: "/optimiser" },
              { name: "AI Chat", href: "/ai-chat" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-bold text-gray-500 hover:text-[#2E004B] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
