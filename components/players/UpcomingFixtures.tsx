"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FIXTURES = [
  { gw: 24, team: "Everton", venue: "H", difficulty: 2 },
  { gw: 25, team: "Chelsea", venue: "A", difficulty: 3 },
  { gw: 26, team: "Brentford", venue: "H", difficulty: 2 },
];

const diffColors: Record<number, string> = {
  2: "bg-emerald-400 text-white shadow-emerald-400/20",
  3: "bg-purple-900 text-white shadow-purple-900/20",
  4: "bg-red-500 text-white shadow-red-500/20",
};

export const UpcomingFixtures = () => {
  return (
    <div className="w-full bg-white rounded-[5px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 mt-8">
      <div className="flex items-center gap-3 mb-8">
         <div className="w-1.5 h-6 bg-cyan-400 rounded-full" />
         <h3 className="text-[18px] font-black text-[#2E004B] tracking-tight text-center">Upcoming Fixtures</h3>
      </div>

      <div className="space-y-4">
        {FIXTURES.map((fixture, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center justify-between bg-cyan-50/30 p-4 px-6 rounded-[5px] border border-cyan-100/50 group hover:border-[#00F5FF]/40 transition-all cursor-pointer"
          >
             <div className="flex items-center gap-4">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest min-w-[50px]">GW {fixture.gw}</span>
                <span className="font-extrabold text-[#111827] text-[14px]">{fixture.team} ({fixture.venue})</span>
             </div>
             
             <div className={cn(
               "w-8 h-8 rounded-full flex items-center justify-center font-black text-[12px] shadow-lg",
               diffColors[fixture.difficulty] || "bg-gray-400"
             )}>
                {fixture.difficulty}
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
