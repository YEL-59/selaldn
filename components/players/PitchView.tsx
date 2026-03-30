"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
export interface PlayerData {
  name: string;
  score: number;
  team: string;
  isCaptain?: boolean;
}

export interface BenchPlayerData {
  name: string;
  pos: string;
  score: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const FixtureBox = ({
  val,
  team,
  type,
}: {
  val: number;
  team: string;
  type: "emerald" | "cyan" | "purple";
}) => {
  const colors = {
    emerald: "bg-[#00ff85] text-[#202126]",
    cyan: "bg-[#04f5ff] text-[#202126]",
    purple: "bg-[#37003C] text-white",
  };
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-0.5 p-1 h-full",
        colors[type],
      )}
    >
      <span className="text-[10px] font-black leading-none tracking-tighter">
        {val.toFixed(1)}
      </span>
      <span className="text-[8px] font-bold leading-none opacity-90 uppercase">
        {team}
      </span>
    </div>
  );
};

export const PitchPlayer = ({
  name,
  score,
  isCaptain,
  team,
}: PlayerData) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className="flex flex-col items-center w-[85px] md:w-[85px]"
  >
    <div className="rounded-md border border-[#EAEAEA] bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] backdrop-blur-xs w-full pt-2 pb-2 px-1 flex flex-col items-center relative overflow-hidden group">
      <div className="relative mb-1">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full shadow-[0_0_12px_rgba(0,252,255,0.35)] transition-all group-hover:shadow-[0_0_18px_rgba(0,252,255,0.55)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-transparent border-none">
            <img
              src="/images/jersey-red.png"
              alt={name}
              className="w-full h-full object-contain p-1"
            />
          </div>
        </div>
        {isCaptain && (
          <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#00ff85] text-black rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
            C
          </div>
        )}
      </div>
      <h4 className="font-semibold text-[#37003C] text-[12px] mb-1 tracking-tight text-center w-full truncate px-1">
        {name}
      </h4>
      <div className="flex w-full rounded-b-lg overflow-hidden shadow-sm h-8 md:h-9">
        <FixtureBox val={score} team="BHA" type="emerald" />
        <FixtureBox val={8.7} team="LIV" type="cyan" />
        <FixtureBox val={8.3} team="MCI" type="purple" />
      </div>
    </div>
  </motion.div>
);

export const BenchPlayer = ({
  name,
  pos,
  score,
}: BenchPlayerData) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    viewport={{ once: true }}
    className="flex flex-col items-center w-[85px] md:w-[85px]"
  >
    <div className="rounded-md border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full pt-3 pb-2 px-1 flex flex-col items-center relative overflow-hidden group">
      <span className="text-[9px] font-semibold text-[#2E004B] uppercase tracking-widest ">
        {pos}
      </span>
      <div className="relative py-1">
        <div className="w-9 h-9 rounded-full border border-cyan-400 p-0.5 ">
          <div className="w-full h-full rounded-full overflow-hidden bg-transparent">
            <img
              src="/images/jersey-cyan.png"
              alt={name}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
        </div>
      </div>
      <h4 className="font-semibold text-[#37003C] text-[12px] mb-2 tracking-tight truncate w-full text-center">
        {name}
      </h4>
      <div className="flex w-full rounded-b-lg overflow-hidden ">
        <FixtureBox val={score} team="BHA" type="emerald" />
        <FixtureBox val={8.7} team="LIV" type="cyan" />
        <FixtureBox val={8.3} team="MCI" type="purple" />
      </div>
    </div>
  </motion.div>
);

export const PitchRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-center w-full gap-4",
      className,
    )}
  >
    {children}
  </div>
);

interface PitchViewProps {
  title?: string;
  onSave?: () => void;
  onSuggest?: () => void;
  goalkeeper: PlayerData;
  defenders: PlayerData[];
  midfielders: PlayerData[];
  forwards: PlayerData[];
  bench: BenchPlayerData[];
}

const PitchView = ({
  title = "The Pitch",
  onSave,
  onSuggest,
  goalkeeper,
  defenders,
  midfielders,
  forwards,
  bench,
}: PitchViewProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop-blur-[6px] p-2 relative overflow-hidden flex flex-col min-h-[850px]"
    >
      <div className="flex justify-between items-center mb-2 relative z-10">
        <h3 className="font-bold text-[#37003C] text-xl md:text-2xl">
          {title}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="border border-[#DED3F0] backdrop-blur-sm text-[#37003C] px-6 py-2.5 rounded text-sm font-bold hover:bg-white transition-all"
          >
            Save Team
          </button>
          <button
            onClick={onSuggest}
            className="bg-[#DED3F0] backdrop-blur-sm text-[#37003C] px-6 py-2.5 rounded text-sm font-bold hover:bg-white transition-all"
          >
            Suggest Transfers
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-xl bg-emerald-600 shadow-[inset_0_4px_32px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col pt-4 pb-0">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(90deg,#000_50%,transparent_50%)] bg-[length:120px_100%]" />
          <div className="absolute inset-x-6 top-6 bottom-[125px] border-2 border-white/40 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[54%] h-[20%] border-b-2 border-x-2 border-white/40" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[24%] h-[8%] border-b-2 border-x-2 border-white/40" />
          <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[16%] h-[5%] border-b-2 border-white/40 rounded-[0_0_50%_50%]" />
          <div className="absolute bottom-[125px] left-6 right-6 h-0.5 bg-white/40" />
          <div className="absolute bottom-[125px] left-1/2 -translate-x-1/2 translate-y-1/2 w-[160px] h-[160px] border-2 border-white/40 rounded-full" />
          <div className="absolute bottom-[125px] left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        </div>

        <div className="flex-1 flex flex-col justify-around relative z-10 ">
          <PitchRow className="mb-0">
            <PitchPlayer {...goalkeeper} />
          </PitchRow>

          <PitchRow className="gap-10">
            {defenders.map((p, i) => (
              <PitchPlayer key={i} {...p} />
            ))}
          </PitchRow>

          <PitchRow className="gap-10">
            {midfielders.map((p, i) => (
              <PitchPlayer key={i} {...p} />
            ))}
          </PitchRow>

          <PitchRow className="gap-10">
            {forwards.map((p, i) => (
              <PitchPlayer key={i} {...p} />
            ))}
          </PitchRow>
        </div>

        <div className="mt-auto w-full relative z-20 bg-transparent backdrop-blur-md border-t border-white/10 p-2">
          <div className="absolute -top-3 left-6 bg-[#37003C] text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest shadow-lg">
            Bench
          </div>
          <div className="flex items-center justify-between gap-3 w-full max-w-[500px] mx-auto">
            {bench.map((p, i) => (
              <BenchPlayer key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PitchView;
