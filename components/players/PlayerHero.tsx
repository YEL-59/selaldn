"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlayerHeroProps {
  name: string;
  team: string;
  pos: string;
  price: string;
  pts: number;
  form: number;
  mins: string;
  image: string;
}

export const PlayerHero = ({
  name,
  team,
  pos,
  price,
  pts,
  form,
  mins,
  image,
}: PlayerHeroProps) => {
  return (
    <div className="w-full bg-[#00F5FF]/15 border border-[#00F5FF]/20 rounded-[5px] p-8 mb-8 flex items-center justify-between relative overflow-hidden group">
      {/* Background Gradient/Decor */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-10 relative z-10">
        <div className="w-24 h-24 rounded-[5px] overflow-hidden border-2 border-white shadow-xl bg-white shrink-0 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center p-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-1.5">
          <p className="text-[14px] font-bold tracking-[1px] text-[#37003C]">
            {team} • {pos}
          </p>
          <h1 className="text-[36px] font-bold tracking-[-0.5px] text-[#37003C]">
            {name}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-16 relative z-10 pr-4 ">
        <Stat label="Current Price" value={price} />
        <Stat label="Total Points" value={pts.toString()} />
        <Stat label="Recent Form" value={form.toString()} isPositive />
        <Stat label="Expected Mins" value={mins} />
      </div>
    </div>
  );
};

const Stat = ({
  label,
  value,
  isPositive,
}: {
  label: string;
  value: string;
  isPositive?: boolean;
}) => (
  <div className="text-center">
    <p className="text-[13px] font-semibold text-[#37003C] mb-2">{label}</p>
    <p
      className={cn(
        "text-[28px] font-semibold tracking-tighter leading-none",
        isPositive ? "text-[#00FF88]" : "text-[#2E004B]",
      )}
    >
      {value}
    </p>
  </div>
);
