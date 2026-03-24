"use client";

import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Calendar,
  MessageSquare,
  UserCircle2,
  TrendingUp,
  Search,
  ChevronRight,
  Send,
  MoreHorizontal,
  CircleCheck,
  Zap,
  Bot,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Card Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HomePage = () => {
  const [toggleOptimiser, setToggleOptimiser] = useState(true);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Left Column (Transfer, Captaincy, Optimiser) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Transfer Strategy - Pixel Perfect Refinement */}
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-white/10 bg-white shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop-blur-md p-5"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#1e1b4b]">
              Transfer Strategy
            </h3>
            <button className="p-1 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-stretch gap-0 relative mb-6">
            {/* Player Out Box */}
            <div className="flex-1 rounded border border-[rgba(239,68,68,0.20)] bg-[rgba(239,68,68,0.05)] p-3 flex flex-col items-center gap-3">
              <div className="w-full flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-[#1e1b4b]">
                  Player Out
                </span>
                <div className="w-4 h-4 rounded-full border border-red-400 flex items-center justify-center">
                  <div className="w-2 h-0.5 bg-red-400" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[rgba(255,77,79,0.5)] shadow-sm">
                <img
                  src="https://e0.365dm.com/21/03/1600x900/skysports-declan-rice-england_5321116.jpg?20210328074028"
                  alt="Rice"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-extrabold text-[#1e1b4b] text-base">Rice</p>
                <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                  ARS
                </p>
              </div>
            </div>

            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#CCFBF1] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#134E4A] shadow-sm">
              VS
            </div>

            {/* Player In Box */}
            <div className="flex-1 rounded border border-[rgba(0,255,133,0.20)] bg-[rgba(0,255,133,0.05)] p-3 flex flex-col items-center gap-3">
              <div className="w-full flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-[#1e1b4b]">
                  Player In
                </span>
                <div className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center">
                  <div className="w-[7px] h-0.5 bg-emerald-500 absolute" />
                  <div className="w-0.5 h-[7px] bg-emerald-500 absolute" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[rgba(0,255,133,0.5)] shadow-sm">
                <img
                  src="https://www.caughtoffside.com/wp-content/uploads/2022/09/Foden-City-vs-Sevilla.jpg"
                  alt="Foden"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-extrabold text-[#1e1b4b] text-base">Foden</p>
                <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                  MCI
                </p>
              </div>
            </div>
          </div>

          <div className="text-[#37003C] text-center py-2 text-base font-bold mb-4">
            +5.8 Points Gain (Next 3 GW)
          </div>

          <div className="rounded border border-[rgba(4,245,255,0.4)] bg-[rgba(4,245,255,0.2)] p-4 flex gap-1 text-[12px] leading-relaxed relative overflow-hidden group/box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6V3H6"
                stroke="#37003C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.5 6H13.5C14.3279 6 15 6.67213 15 7.5V13.5C15 14.3279 14.3279 15 13.5 15H4.5C3.67213 15 3 14.3279 3 13.5V7.5C3 6.67213 3.67213 6 4.5 6V6"
                stroke="#37003C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.5 10.5H3M15 10.5H16.5M11.25 9.75V11.25M6.75 9.75V11.25"
                stroke="#37003C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-[#37003C] font-medium">
              Selling Saka for Palmer saves £0.2m and targets a 24% easier
              fixture run.
            </p>
          </div>
        </motion.div>

        {/* Captaincy Suggestion */}
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-[#EAEAEA] bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.02)] p-6 overflow-hidden relative"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#00BC7D_0%,#009689_100%)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M9.63498 2.72156C9.70823 2.58851 9.84809 2.50586 9.99998 2.50586C10.1519 2.50586 10.2917 2.58851 10.365 2.72156L12.825 7.39156C12.9438 7.61052 13.1543 7.76485 13.3988 7.81228C13.6434 7.8597 13.8963 7.79524 14.0883 7.63656L17.6525 4.58323C17.7929 4.46906 17.9909 4.45853 18.1426 4.55718C18.2942 4.65584 18.3649 4.84112 18.3175 5.01573L15.9558 13.5541C15.8568 13.9131 15.5315 14.1628 15.1591 14.1657H4.84164C4.46894 14.1631 4.14328 13.9134 4.04414 13.5541L1.68331 5.01656C1.63586 4.84195 1.70654 4.65667 1.85823 4.55802C2.00991 4.45936 2.20793 4.46989 2.34831 4.58406L5.91164 7.6374C6.10366 7.79608 6.3566 7.86054 6.60114 7.81311C6.84569 7.76569 7.05619 7.61135 7.17498 7.3924L9.63498 2.72156M4.16664 17.4999H15.8333" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
            <h3 className="font-bold text-lg text-[#1e1b4b]">
              Captaincy Suggestion
            </h3>
          </div>

          <div className="flex items-center gap-4 rounded-md bg-[#04F5FF] p-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-white">
              <img
                src="https://assets.sorare.com/playerpicture/b375896f-1d4e-4010-9d07-76e94f3a4f2f/picture/squared-c01f04cada9a79ccca7138e1d1b8ad6b.png"
                alt="Haaland"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-[#37003C]">E. Haaland</p>
              <p className="text-xs text-[#6B7280]">
                Expected: 11.2 pts
              </p>
            </div>
            <div className="bg-[#F8F9FA] border border-[#EAEAEA] text-[#37003C] px-3 py-1.5 rounded-[4px] text-xs font-bold">
              65% 10+ pts
            </div>
          </div>

          <p className="text-sm text-[#6B7280] mb-4">
            Haaland is the standout captain pick with a high floor and ceiling
            against SHU.
          </p>

          <button className="text-[#37003C] text-sm font-semibold flex items-center gap-1 group">
            Why him? AI Breakdown{" "}
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Best XI Optimiser */}
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-white/10 bg-white shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop-blur-[6px] p-6 flex flex-col gap-4"
        >
          <h3 className="font-bold text-lg text-[#1e1b4b]">
            Best XI Optimiser
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Current XI
            </span>
            <button
              onClick={() => setToggleOptimiser(!toggleOptimiser)}
              className={cn(
                "w-12.5 h-6.5 rounded-full transition-all relative border border-gray-100",
                toggleOptimiser ? "bg-[#37003C] shadow-sm" : "bg-[#E9E9FB]",
              )}
            >
              <motion.div
                animate={{ x: toggleOptimiser ? 26 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md shadow-black/10"
              />
            </button>
            <span className="text-sm text-[#37003C] font-bold">
              AI Recommended XI
            </span>
          </div>

          <div className="rounded border border-[rgba(4,245,255,0.2)] bg-[rgba(4,245,255,0.1)] p-2.5 text-[10px] font-bold text-cyan-600 w-fit cursor-help">
            Why?
          </div>
        </motion.div>
      </div>

      {/* Middle Column (Pitch) */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        {/* Gameweek Info */}
        <motion.div
          variants={fadeInUp}
          className=" p-6 rounded-[12px] border border-[#EAEAEA] bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.02)] flex items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#37003C] tracking-tight">
                Gameweek 12
              </h2>
              <span className="bg-[#04F5FF] text-[#37003C] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">Deadline: Fri 18:30 GMT</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest opacity-60">
                AI SQUAD RATING
              </span>
              <div className="flex items-center gap-2 text-[#10B981] font-bold">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm mt-1 uppercase tracking-wide">
                  Top 1% Global
                </span>
              </div>
            </div>

            <div className="relative w-16 h-16 flex items-center justify-center drop-shadow-sm">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  fill="transparent"
                  strokeWidth="6"
                  className="text-gray-50"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  fill="transparent"
                  strokeWidth="6"
                  strokeDasharray={175}
                  strokeDashoffset={175 * (1 - 0.84)}
                  className="text-[#10B981]"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xl font-bold text-[#37003C]">
                84
              </span>
            </div>
          </div>
        </motion.div>

        {/* The Pitch Rendering */}
        <motion.div
          variants={fadeInUp}
          className="rounded-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop-blur-[6px] p-4 relative overflow-hidden flex flex-col min-h-[700px] md:min-h-[800px]"
        >
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-bold text-[#37003C] text-xl md:text-2xl">
              The Pitch
            </h3>
            <div className="flex gap-3">
              <button className="border border-[#DED3F0] backdrop-blur-sm text-[#37003C] px-6 py-2.5 rounded text-sm font-bold hover:bg-white transition-all">
                Save Team
              </button>
              <button className="bg-[#DED3F0] backdrop-blur-sm text-[#37003C] px-6 py-2.5 rounded text-sm font-bold hover:bg-white transition-all">
                Suggest Transfers
              </button>
            </div>
          </div>

          {/* Pitch Layout Container */}
          <div className="flex-1 rounded-lg bg-linear-to-br from-[#00BC7D] to-[#009689] shadow-[0_4px_12px_0_rgba(0,0,0,0.02)] p-4 md:p-10 relative overflow-hidden flex flex-col justify-between">
            {/* Pitch Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 border-2 border-white m-4 rounded-[1rem]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[15%] border-b-2 border-x-2 border-white" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[15%] border-t-2 border-x-2 border-white" />
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] md:w-[180px] h-[120px] md:h-[180px] rounded-full border-2 border-white" />
            </div>

            {/* Players by Position (Modern Layout) */}
            <div className="flex-1 flex flex-col justify-between relative z-10 py-4">
              {/* Goalkeeper (Top) */}
              <PitchRow className="grid-cols-1">
                <PitchPlayer name="Ederson" score={8.5} team="MCI" />
              </PitchRow>

              {/* Defenders */}
              <PitchRow className="grid-cols-3">
                <PitchPlayer name="Saliba" score={8.2} team="ARS" />
                <PitchPlayer name="Gabriel" score={8.2} team="ARS" />
                <PitchPlayer name="Virgil" score={8.8} team="LIV" />
              </PitchRow>
              <PitchRow className="grid-cols-5 mt-20">
                <PitchPlayer name="Saliba" score={8.2} team="ARS" />
                <PitchPlayer name="Gabriel" score={8.2} team="ARS" />
                <PitchPlayer name="Virgil" score={8.8} team="LIV" />
                <PitchPlayer name="Gabriel" score={8.2} team="ARS" />
                <PitchPlayer name="Virgil" score={8.3} team="LIV" />
              </PitchRow>

              {/* Forwards (Bottom) */}
              <PitchRow className="grid-cols-2">
                <PitchPlayer name="Haaland" score={9.5} team="MCI" isCaptain />
                <PitchPlayer name="Watkins" score={8.3} team="AVL" />
              </PitchRow>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column (Chat, Player Details) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* AI Scout Chat */}
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-white/10 bg-white shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop-blur-[6px] p-6 flex flex-col h-[450px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#1e1b4b]">AI Scout Chat</h3>
            <button className="p-1 hover:bg-muted rounded text-muted-foreground">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "Who should I captain?",
              "Is a -4 hit worth it?",
              "Analyze my bench",
            ].map((q) => (
              <button
                key={q}
                className="text-xs font-medium rounded-2xl border border-black/20 px-3 py-1.5 hover:bg-white hover:border-purple-200 hover:shadow-sm transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar mb-4">
            <div className="flex justify-end">
              <div className="text-[#000] text-[11px] py-3 px-4 rounded-tr-none max-w-[85%] rounded-[16px_4px_16px_16px] border border-black/10 bg-white/5">
                Who should I captain?
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#37003C] flex items-center justify-center shrink-0 shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M7.99967 5.33317V2.6665H5.33301" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.99984 5.33325H11.9998C12.7357 5.33325 13.3332 5.9307 13.3332 6.66659V11.9999C13.3332 12.7358 12.7357 13.3333 11.9998 13.3333H3.99984C3.26395 13.3333 2.6665 12.7358 2.6665 11.9999V6.66659C2.6665 5.9307 3.26395 5.33325 3.99984 5.33325V5.33325" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.33301 9.33317H2.66634M13.333 9.33317H14.6663M9.99967 8.6665V9.99984M5.99967 8.6665V9.99984" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
              <div className="rounded-[4px_16px_16px_16px] border border-[rgba(139,92,246,0.3)] bg-[rgba(55,0,60,0.5)] text-white/90 text-[11px] font-medium py-3 px-4 rounded-tl-none leading-relaxed shadow-sm">
                Based on expected minutes and fixture difficulty, Haaland (7.8 xP) is your best option, followed by Palmer (6.4 xP).
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="relative mt-auto">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full rounded-[20px] border border-black/5 bg-white/5 py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-200 transition-all"
            />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black rounded-xl transition-all hover:scale-105 active:scale-95">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        {/* Player Search / Details - Pixel Perfect Refinement */}
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-white/10 bg-white shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop-blur-[6px] p-6 flex flex-col gap-8"
        >
          <h3 className="font-bold text-lg text-[#1e1b4b]">
            Player Search / Details
          </h3>

          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-[20px] border border-black/5 bg-white/5 py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-200 transition-all"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-16 h-16 rounded-full">
                <div className="w-full h-full rounded-full overflow-hidden border border-[#04F5FF]">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Enzo"
                    alt="Enzo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1e1b4b] text-base">
                Enzo Fernández
              </p>
              <p className="text-sm text-[#555]">
                CHE • FWD
              </p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-[#00FF88] text-black font-bold text-sm shadow-md shadow-emerald-100">
              7.2
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <StatItem label="Price" value="$9.0m" />
            <StatItem label="Total Pts" value="128" />
            <StatItem label="Form" isForm data={[1, 3, 5, 2, 4]} />
          </div>

          <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-6">
            <StatItem label="Pts (Next GW)" value="13.5" />
            <StatItem label="Pts (Next 3 GW)" value="27.7" />
            <StatItem label="Expected Mins" value="209" />
          </div>

          <div className="pt-2 flex items-center gap-6">
            <span className="text-xs text-[#666] w-16">
              Next 3
            </span>
            <div className="flex-1 flex gap-3">
              {["MCI(H)", "MCI(H)", "FUL(A)"].map((fix, i) => (
                <div
                  key={i}
                  className="flex-1 text-center bg-[#F1F5F9] px-3 py-2 rounded text-xs font-bold text-[#1e1b4b] shadow-xs border border-transparent hover:border-gray-200 transition-all cursor-default uppercase"
                >
                  {fix}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatItem = ({
  label,
  value,
  isForm,
  data,
}: {
  label: string;
  value?: string;
  isForm?: boolean;
  data?: number[];
}) => (
  <div className="flex flex-col gap-1">
    <p className="text-[10px] font-bold text-muted-foreground tracking-wider">
      {label}
    </p>
    {isForm ? (
      <div className="flex items-end gap-1 h-5 mt-1">
        {data?.map((h, i) => (
          <div
            key={i}
            className="bg-[#10B981] w-1.5 rounded-full transition-all hover:scale-y-110"
            style={{ height: `${h * 20}%` }}
          />
        ))}
      </div>
    ) : (
      <p className="font-bold text-sm text-[#1e1b4b]">{value}</p>
    )}
  </div>
);

const PitchPlayer = ({
  name,
  score,
  isCaptain,
  team,
}: {
  name: string;
  score: number;
  isCaptain?: boolean;
  team: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className="flex flex-col items-center w-[120px] md:w-[120px]"
  >
    {/* Card Container */}
    <div className="rounded-md border border-[#EAEAEA] bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] backdrop-blur-xs w-full py-4 px-2 flex flex-col items-center relative overflow-hidden group">
      {/* Avatar with Neon Cyan Ring */}
      <div className="relative mb-2">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-[0_0_15px_rgba(0,252,255,0.4)] transition-all group-hover:shadow-[0_0_20px_rgba(0,252,255,0.6)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border border-[#04F5FF]">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name + team}`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {isCaptain && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00ff85] text-black rounded-full flex items-center justify-center text-sm font-bold border-2 border-white">
            C
          </div>
        )}
      </div>

      {/* Name - Pixel Perfect Typography */}
      <h4 className="font-extrabold text-[#37003C] text-sm mb-2 tracking-tight text-center w-full">
        {name}
      </h4>

      {/* Fixture/Stat Boxes - Seamless Bar */}
      <div className="flex w-full rounded-b-xl overflow-hidden shadow-sm h-12">
        <FixtureBox val={score} team="BHA" type="emerald" />
        <FixtureBox val={8.7} team="LIV" type="cyan" />
        <FixtureBox val={8.3} team="MCI" type="purple" />
      </div>
    </div>
  </motion.div>
);

const FixtureBox = ({
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
        "flex-1 flex flex-col items-center justify-center gap-0",
        colors[type],
      )}
    >
      <span className="text-[12px] md:text-[14px] font-bold leading-tight tracking-tight">
        {val.toFixed(1)}
      </span>
      <span className="text-[8px] md:text-[10px] font-medium leading-none">
        {team}
      </span>
    </div>
  );
};

const PitchRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("grid grid-cols-3 items-center justify-center w-fit mx-auto gap-6 mb-8", className)}>
    {children}
  </div>
);

export default HomePage;
