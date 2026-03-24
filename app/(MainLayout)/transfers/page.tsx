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
         <p className="text-base font-semibold text-[#6B7280] uppercase tracking-[0.25em] mb-2 px-1">Transfer Suggestions</p>
         <h1 className="text-[40px] font-bold text-[#37003C] leading-tight tracking-tight">AI Transfer Strategy</h1>
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
            <button className="w-full bg-[#2B003D] text-white py-4 rounded-xl text-xs font-black hover:bg-[#1e002b] transition-all shadow-xl shadow-purple-900/10">
               Apply Transfer
            </button>
         </div>

         {/* Center Interaction */}
         <div className="lg:col-span-3 flex flex-col items-center gap-4 relative py-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="h-0.5 w-8 bg-linear-to-r from-transparent to-[#2E004B] rounded-full opacity-30" />
                <ArrowRight className="w-6 h-6 text-[#2B003D]" />
                <div className="h-0.5 w-8 bg-linear-to-l from-transparent to-[#2E004B] rounded-full opacity-30" />
            </div>
            <div className="bg-[#00FF85]/15 border-2 border-[#00FF85]/20 px-10 py-5 rounded-[2rem] flex flex-col items-center shadow-2xl shadow-emerald-500/5 backdrop-blur-sm">
               <span className="text-2xl font-black text-[#134e4a]">+8.4</span>
            </div>
            <div className="text-center">
               <p className="text-[10px] font-black text-[#1e1b4b] uppercase tracking-widest mb-1">Points Gain</p>
               <p className="text-[9px] font-bold text-gray-400 leading-tight">Estimated over next 3<br />gameweeks</p>
            </div>
         </div>

         {/* Player In */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-center text-[11px] font-black text-[#00E0FF] uppercase tracking-widest">Player In</h4>
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
            <button className="w-full bg-[#2B003D] text-white py-4 rounded-xl text-xs font-black hover:bg-[#1e002b] transition-all shadow-xl shadow-purple-900/10">
               Apply Transfer
            </button>
         </div>
      </div>

      {/* Insight Banner */}
      <motion.div 
        variants={fadeInUp}
        className="bg-[#00E0FF]/25 border border-[#00E0FF]/20 p-5 rounded-2xl mb-12 flex items-center justify-center text-center backdrop-blur-xs"
      >
         <p className="text-[11px] md:text-sm font-bold text-[#1e1b4b] leading-relaxed max-w-[1000px]">
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
    <div className={cn("absolute top-3 right-3 z-20 px-2.5 py-1 rounded text-[9px] font-black text-white shadow-lg", badgeColor)}>
       {badge}
    </div>
    
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
       <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 z-10" />
       <img src={image} alt={name} className="w-full h-full object-cover transition-all" />
       <div className="absolute bottom-3 left-4 z-20">
          <p className="font-extrabold text-white text-base tracking-tight">{name}</p>
          <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{team}</p>
       </div>
    </div>

    <div className="w-full grid grid-cols-2 gap-2.5 mb-5 px-1">
       <div className="bg-[#00E0FF] py-3 rounded-xl flex flex-col items-center shadow-lg shadow-cyan-50/50">
          <p className="text-[7px] font-black text-white/50 uppercase tracking-widest mb-1">POINT</p>
          <p className="text-sm font-black text-white">{points}</p>
       </div>
       <div className="bg-[#EEF2FF] py-3 rounded-xl flex flex-col items-center">
          <p className="text-[7px] font-black text-[#1e1b4b]/30 uppercase tracking-widest mb-1">FORM</p>
          <p className="text-sm font-black text-[#1e1b4b]">{form}</p>
       </div>
    </div>

    <div className="w-full flex">
       <div className="bg-[#FF4D4F]/10 px-4 py-2 rounded-xl border border-red-50">
          <span className="text-[10px] font-black text-red-400">{fixture}</span>
       </div>
    </div>
  </div>
);

const StrategyCard = ({ title, btnText, description, transfers, accentColor }: any) => (
  <div className="bg-[#2B003D] rounded-[1.5rem] p-6 flex flex-col gap-6 shadow-2xl shadow-purple-950/20 relative overflow-hidden group border border-white/5 h-full">
     <h3 className="font-bold text-white text-xs tracking-wide leading-tight px-1">{title}</h3>
     
     <div className="space-y-6 flex-1 px-1">
        {transfers.map((t: any, i: number) => (
           <div key={i} className="relative">
              <div className="flex justify-between items-center mb-1.5 opacity-60">
                 <span className="text-[8px] font-bold text-red-300 uppercase tracking-widest">Player Out</span>
                 <span className="text-[8px] font-bold text-cyan-300 uppercase tracking-widest text-right">Player In</span>
              </div>
              
              <div className="flex justify-between items-center gap-4">
                 <div className="flex-1 bg-white/5 p-2 px-3 rounded-xl flex items-center gap-2 border border-white/5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.out.name}`} alt={t.out.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-white leading-tight">{t.out.name.split(' ').pop()}</p>
                       <p className="text-[7px] font-bold text-white/40 uppercase truncate w-[70px]">{t.out.team}</p>
                    </div>
                 </div>

                 {t.gain && (
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                       <p className="text-[10px] font-black text-[#00FF85]">{t.gain}</p>
                       <p className="text-[6px] font-bold text-white/30 uppercase leading-none mt-0.5">Points Gain<br />Next 3 GW</p>
                    </div>
                 )}

                 <div className="flex-1 bg-cyan-400/15 p-2 px-3 rounded-xl flex items-center justify-end gap-2 border border-cyan-400/20 text-right">
                    <div>
                        <p className="text-[9px] font-black text-white leading-tight">{t.in.name.split(' ').pop()}</p>
                        <p className="text-[7px] font-bold text-cyan-200/50 uppercase truncate w-[70px]">{t.in.team}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/20 shrink-0">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.in.name}`} alt={t.in.name} className="w-full h-full object-cover" />
                    </div>
                 </div>
              </div>
           </div>
        ))}

        <p className="text-[10px] font-bold text-white/30 leading-relaxed mt-4">
           {description}
        </p>
     </div>

     <button className="w-full bg-[#00E0FF] text-[#1e1b4b] py-4 rounded-xl text-xs font-black hover:bg-cyan-200 transition-all shadow-xl shadow-cyan-950/20">
        {btnText}
     </button>
  </div>
);

export default TransfersPage;
