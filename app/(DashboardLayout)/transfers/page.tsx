"use client";

import { motion } from "framer-motion";
import {
   ArrowRight,
   Zap,
   Star,
   Plus,
   ArrowRightLeft,
   ChevronRight,
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

const TransfersPage = () => {
   return (
      <motion.div
         initial="initial"
         animate="animate"
         variants={staggerChildren}
         className="container mx-auto py-12 px-6"
      >
         {/* Header Section */}
         <motion.div variants={fadeInUp} className="mb-10 text-center lg:text-left">
            <p className="text-base font-semibold text-[#6B7280] tracking-[0.25em] mb-2 px-1">Transfer Suggestions</p>
            <h1 className="text-[40px] font-semibold text-[#37003C] leading-tight tracking-tight">AI Transfer Strategy</h1>
         </motion.div>

         {/* Main Comparison Section */}
         <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-6 mb-10">
            {/* Player Out */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <h4 className="text-center text-xl font-semibold text-[#FF7C7C] tracking-widest">Player Out</h4>
               <div className="relative group">
                  <ComparisonCard
                     name="E. Haaland"
                     team="MCI • FWD"
                     points="13.5"
                     form="8.2"
                     fixture="MUN(A)"
                     badge="OUT"
                     badgeColor="bg-red-400"
                     image="https://assets.sorare.com/playerpicture/b375896f-1d4e-4010-9d07-76e94f3a4f2f/picture/squared-c01f04cada9a79ccca7138e1d1b8ad6b.png"
                  />
               </div>
               <button className="w-full bg-[#2B003D] text-white py-4 rounded-xl text-xs font-semibold hover:bg-[#1e002b] transition-all shadow-xl shadow-purple-900/10">
                  Apply Transfer
               </button>
            </div>

            {/* Center Interaction */}
            <div className="lg:col-span-3 flex flex-col items-center gap-4 relative py-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="h-1.5 w-15 rounded-full bg-[linear-gradient(90deg,#37003C_0%,#04F5FF_100%)]" />
                  <ArrowRight className="w-6 h-6 text-[#2B003D]" />
                  <div className="h-1.5 w-15 rounded-full bg-[linear-gradient(90deg,#37003C_0%,#04F5FF_100%)]" />
               </div>
               <div className="rounded-[16px] bg-[radial-gradient(218.36%_112.49%_at_0%_0%,rgba(0,255,133,0.55)_0%,rgba(0,255,133,0.18)_100%)] shadow-[0_0_26px_0_rgba(0,255,133,0.35)] flex flex-col items-center px-6 py-3">
                  <span className="text-2xl font-semibold text-[#06221A]">+8.4</span>
               </div>
               <div className="text-center">
                  <p className="text-base font-semibold text-[#37003C]  tracking-widest mb-1">Points Gain</p>
                  <p className="text-xs font-medium text-[#37003C] leading-tight">Estimated over next 3<br />gameweeks</p>
               </div>
            </div>

            {/* Player In */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <h4 className="text-center text-xl font-semibold text-[#00E0FF] tracking-widest">Player In</h4>
               <div className="relative group">
                  <ComparisonCard
                     name="Mohamed Salah"
                     team="LIV • FWD"
                     points="13.5"
                     form="8.2"
                     fixture="BOU(H)"
                     badge="IN"
                     badgeColor="bg-[#00FF85]"
                     image="https://assets.sorare.com/playerpicture/a6907409-5a10-444a-8d7b-bc43ceb6c3d9/picture/squared-2487e91547432e3a1f87968367876a3b.png"
                     isIncoming
                  />
               </div>
               <button className="w-full bg-[#2B003D] text-white py-4 rounded-xl text-xs font-semibold hover:bg-[#1e002b] transition-all shadow-xl shadow-purple-900/10">
                  Apply Transfer
               </button>
            </div>
         </div>

         {/* Insight Banner */}
         <motion.div
            variants={fadeInUp}
            className="bg-[#00E0FF]/25 border border-[#00E0FF]/20 p-5 rounded-2xl mb-12 flex items-center justify-center text-center backdrop-blur-xs"
         >
            <p className="text-[11px] md:text-sm font-semibold text-[#37003C] leading-relaxed max-w-[1000px]">
               Selling Phil Foden for Palmer saves £0.2m, improves fixture quality immediately, and projects a stronger 3-gameweek return through better expected minutes and recent form.
            </p>
         </motion.div>

         {/* Grid Bottom - Strategy Selection */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Combo Strategy */}
            <StrategyCard
               title="Best 2 Transfer Combination"
               btnText="Apply Combo"
               accentColor="cyan"
               description="Aggressive premium reshuffle that upgrades both ceiling and captaincy potential while maintaining reliable minutes."
               transfers={[
                  { out: { name: "Cody Gakpo", team: "LIV • MID • 4.1 form" }, in: { name: "Emi. Martinez", team: "AVL • GK • 8.3 form" }, gain: "+11.8" },
                  { out: { name: "Rodri", team: "MCI • MID • 5.0 form" }, in: { name: "João Pedro", team: "CHE • FWD • 8.1 form" }, gain: "" }
               ]}
            />

            {/* Safe Strategy */}
            <StrategyCard
               title="Safe Transfer Option"
               btnText="Apply Safe"
               accentColor="cyan"
               description="Low-risk move that targets consistent starts and stronger clean sheet odds without disrupting the squad structure."
               transfers={[
                  { out: { name: "Rodri", team: "MCI • MID • 5.0 form" }, in: { name: "João Pedro", team: "CHE • FWD • 8.1 form" }, gain: "+11.8" }
               ]}
            />

            {/* Aggressive Strategy */}
            <StrategyCard
               title="Aggressive/Differential Option"
               btnText="Apply Aggressive"
               accentColor="cyan"
               description="Low-risk move that targets consistent starts and stronger clean sheet odds without disrupting the squad structure."
               transfers={[
                  { out: { name: "kai Havertz", team: "ARS • FWD • 5.0 form" }, in: { name: "Enzo Fernández", team: "CHE • FWD • 8.1 form" }, gain: "+11.8" }
               ]}
            />
         </div>

      </motion.div>
   );
};

/* --- Specific Components --- */

const ComparisonCard = ({ name, team, points, form, fixture, badge, badgeColor, image, isIncoming }: any) => (
   <div className="bg-white rounded-[1.5rem] p-5 shadow-2xl shadow-purple-950/5 border border-white h-fit relative overflow-hidden flex flex-col items-center">
      <div className={cn("absolute top-3 right-3 z-20 px-2.5 py-1 rounded text-[9px] font-semibold text-white shadow-lg", badgeColor)}>
         {badge}
      </div>

      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
         <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 z-10" />
         <img src={image} alt={name} className="w-full h-full object-cover transition-all" />
         <div className="absolute bottom-3 left-4 z-20">
            <p className="font-extrabold text-white text-base tracking-tight">{name}</p>
            <p className="text-[10px] font-semibold text-white/80 tracking-widest">{team}</p>
         </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-2.5 mb-5 px-1">
         <div className="bg-[#00E0FF] py-3 rounded-xl flex flex-col items-center shadow-lg shadow-cyan-50/50">
            <p className="text-[7px] font-semibold text-white/50 tracking-widest mb-1">POINT</p>
            <p className="text-sm font-semibold text-white">{points}</p>
         </div>
         <div className="bg-[#EEF2FF] py-3 rounded-xl flex flex-col items-center">
            <p className="text-[7px] font-semibold text-[#37003C]/30 tracking-widest mb-1">FORM</p>
            <p className="text-sm font-semibold text-[#37003C]">{form}</p>
         </div>
      </div>

      <div className="w-full flex">
         <div className="bg-[#FF4D4F]/10 px-4 py-2 rounded-xl border border-red-50">
            <span className="text-[10px] font-semibold text-red-400">{fixture}</span>
         </div>
      </div>
   </div>
);

const StrategyCard = ({ title, btnText, description, transfers }: any) => (
   <div className="bg-[#2B003D] rounded-[18px] p-5 flex flex-col gap-10 shadow-[0_20px_60px_-15px_rgba(43,0,61,0.5)] relative overflow-hidden group border border-white/5 h-full">
      <h3 className="font-semibold text-white text-[20px] tracking-tight leading-none px-1">{title}</h3>

      <div className="flex flex-col gap-10 flex-1">
         {transfers.map((t: any, i: number) => (
            <div key={i} className="flex flex-col gap-5">
               {/* Header Titles */}
               <div className="flex justify-between items-center px-2">
                  <span className="text-[13px] font-semibold text-[#FF7C7C] tracking-tight opacity-90 ">Player Out</span>
                  <span className="text-[13px] font-semibold text-white tracking-tight opacity-90">Player In</span>
               </div>

               {/* Transfer Pill Row */}
               <div className="flex items-center justify-between  relative">
                  {/* Player Out Pill */}
                  <div className="flex-1 rounded-[10px] bg-[linear-gradient(92deg,#EDEDFF_12.8%,#04F5FF_139.39%)] p-2 flex items-center gap-3 border border-white/30  hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
                     <div className="w-12 h-12 rounded-xl overflow-hidden border border-white shrink-0 bg-white/20 shadow-sm">
                        <img src={t.out.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.out.name}`} alt={t.out.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="overflow-hidden flex-1">
                        <p className="text-[10px] font-semibold text-[#37003C] leading-tight mb-1 truncate">{t.out.name}</p>
                        <p className="text-[8px] font-semibold text-[#37003C]/60 leading-none truncate">{t.out.team}</p>
                     </div>
                  </div>

                  {/* Points Center */}
                  <div className="flex flex-col items-center shrink-0 min-w-[90px] px-1">
                     <p className="text-[24px] font-semibold text-white tracking-tighter leading-none mb-1">{t.gain || "+0.0"}</p>
                     <p className="text-[10px] text-white text-center tracking-tighter">Points Gain<br />Next 3 GW</p>
                  </div>

                  {/* Player In Pill */}
                  <div className="flex-1 rounded-[10px] bg-[linear-gradient(92deg,#EDEDFF_12.8%,#04F5FF_139.39%)] p-2 flex items-center gap-3 border border-white/30 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
                     <div className="w-12 h-12 rounded-xl overflow-hidden border border-white shrink-0 bg-white/20 shadow-sm">
                        <img src={t.in.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.in.name}`} alt={t.in.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="overflow-hidden flex-1">
                        <p className="text-[13px] font-semibold text-[#37003C] leading-tight mb-1 truncate">{t.in.name}</p>
                        <p className="text-[10px] font-semibold text-[#37003C]/60 leading-none truncate">{t.in.team}</p>
                     </div>
                  </div>
               </div>
            </div>
         ))}

         {/* Translucent Description Box */}
         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-auto">
            <p className="text-[13px] font-medium text-white/70 leading-relaxed text-center">
               {description}
            </p>
         </div>
      </div>

      {/* Final Action Button */}
      <button className="w-full rounded-[10px] bg-[linear-gradient(92deg,#EDEDFF_12.8%,#04F5FF_139.39%)] text-[#37003C] py-5 text-[20px] font-semibold hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_-5px_rgba(0,245,255,0.4)]">
         {btnText}
      </button>
   </div>
);

export default TransfersPage;
