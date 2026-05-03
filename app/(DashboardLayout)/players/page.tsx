"use client";

import { motion } from "framer-motion";
import { PlayerTable } from "@/components/players/PlayerTable";
import { RotateCcw } from "lucide-react";

export default function PlayersPage() {
  return (
    <div className="container mx-auto py-10 px-4 mb-20">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-1 block">
            Player Database
          </span>
          <h1 className="text-[32px] font-semibold text-[#2E004B] tracking-tight">
            Players
          </h1>
        </div>

        <div className="flex items-center gap-2.5 text-gray-400 group cursor-pointer hover:text-cyan-400 transition-all">
          <RotateCcw className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-all duration-500" />
          <span className="text-[12px] font-bold tracking-tight">
            Projections updated 2 mins ago
          </span>
        </div>
      </div>

      {/* Main Content Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PlayerTable />
      </motion.div>
    </div>
  );
}
