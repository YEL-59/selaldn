"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Fixture {
  gw: number | string;
  team: string;
  venue: string;
  difficulty: number;
}

interface UpcomingFixturesProps {
  fixtures?: Fixture[];
}

const diffColors: Record<number, string> = {
  1: "bg-emerald-300 text-white shadow-emerald-300/20",
  2: "bg-emerald-500 text-white shadow-emerald-500/20",
  3: "bg-cyan-500 text-white shadow-cyan-500/20",
  4: "bg-purple-900 text-white shadow-purple-900/20",
  5: "bg-[#2E004B] text-white shadow-[#2E004B]/20",
};

export const UpcomingFixtures = ({ fixtures }: UpcomingFixturesProps) => {
  if (!fixtures || fixtures.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-[5px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-cyan-400 rounded-full" />
        <h3 className="text-[18px] font-semibold text-[#2E004B] tracking-tight text-center">
          Upcoming Fixtures
        </h3>
      </div>

      <div className="space-y-4">
        {fixtures.map((fixture, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center justify-between bg-cyan-50/30 p-4 px-6 rounded-[5px] border border-cyan-100/50 group hover:border-[#00F5FF]/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest min-w-[50px]">
                GW {fixture.gw}
              </span>
              <span className="font-extrabold text-[#111827] text-[14px]">
                {fixture.team} ({fixture.venue})
              </span>
            </div>

            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[12px] shadow-lg",
                diffColors[fixture.difficulty] || "bg-gray-400",
              )}
            >
              {fixture.difficulty}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
