"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Zap,
  Star,
  Info,
  ChevronDown,
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

const OptimiserPage = () => {
  const [toggleOptimiser, setToggleOptimiser] = useState(true);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="max-w-[1500px] mx-auto py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column (Captaincy Cards) */}
        <div className="flex flex-col gap-8">
          <CaptainCard 
            title="Recommended Captain" 
            name="E. Haaland" 
            team="MCI • FWD"
            points="13.5"
            form="8.2"
            fixture="GW24 MUN(H)"
            image="https://assets.sorare.com/playerpicture/b375896f-1d4e-4010-9d07-76e94f3a4f2f/picture/squared-c01f04cada9a79ccca7138e1d1b8ad6b.png"
            isCaptain
          />
          <CaptainCard 
            title="Recommended Vice-Captain" 
            name="Mohamed Salah" 
            team="LIV • FWD"
            points="13.5"
            form="8.2"
            fixture="GW24 MCI(H)"
            image="https://assets.sorare.com/playerpicture/a6907409-5a10-444a-8d7b-bc43ceb6c3d9/picture/squared-2487e91547432e3a1f87968367876a3b.png"
          />
        </div>

        {/* Center Column (Details & Pitch) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Main Selection Detail */}
          <motion.div variants={fadeInUp} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex gap-6 items-center">
             <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xl">
                    <img src="https://assets.sorare.com/playerpicture/b375896f-1d4e-4010-9d07-76e94f3a4f2f/picture/squared-c01f04cada9a79ccca7138e1d1b8ad6b.png" alt="Haaland" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 bg-[#2B003D] text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">C</div>
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Recommended Captain</p>
                      <h3 className="text-xl font-black text-[#1e1b4b]">Erling Haaland</h3>
                   </div>
                   <div className="text-right">
                      <p className="text-xl font-black text-[#00FF85]">14.2 pts</p>
                   </div>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4 max-w-[450px]">
                   Haaland faces a depleted Ipswich defense missing 3 starters. 68% chance of scoring 2+ goals.
                </p>
                <button className="bg-[#2B003D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#1e002b] transition-all">
                   <Zap className="w-3.5 h-3.5 text-[#00FF85]" fill="currentColor" /> Why Him?
                </button>
             </div>
          </motion.div>

          {/* Optimised XI Section */}
          <motion.div variants={fadeInUp} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-6 flex-1">
             <div className="flex justify-between items-center px-2">
                <h3 className="font-black text-[#1e1b4b] text-lg">Optimised Starting XI</h3>
                <div className="flex items-center gap-3">
                   <span className="text-[11px] font-bold text-gray-400">AI Recommended</span>
                   <button 
                     onClick={() => setToggleOptimiser(!toggleOptimiser)}
                     className={cn(
                       "w-10 h-5.5 rounded-full transition-all relative border border-gray-100",
                       toggleOptimiser ? "bg-[#00FF85]" : "bg-gray-200"
                     )}
                   >
                      <motion.div 
                        animate={{ x: toggleOptimiser ? 20 : 2 }}
                        className="w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm"
                      />
                   </button>
                </div>
             </div>

             <div className="bg-[#00BFA5] rounded-[1.5rem] p-10 flex-1 relative overflow-hidden flex flex-col justify-between border-8 border-white/5 shadow-2xl select-none min-h-[500px]">
                 {/* Pitch Lines */}
                 <div className="absolute inset-0 pointer-events-none opacity-20 border-2 border-white m-4 rounded-[1.25rem]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[20%] border-b-2 border-x-2 border-white" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[20%] border-t-2 border-x-2 border-white" />
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border-2 border-white" />
                 </div>

                 {/* Players */}
                 <div className="relative z-10 flex flex-col justify-around h-full gap-8">
                    <PitchRow>
                       <PitchPlayer name="Ederson" score={8.2} team="MCI" />
                    </PitchRow>
                    <PitchRow className="gap-12">
                       <PitchPlayer name="Saliba" score={8.1} team="ARS" />
                       <PitchPlayer name="Gabriel" score={8.1} team="ARS" />
                       <PitchPlayer name="Virgil" score={9.1} team="LIV" />
                    </PitchRow>
                    <PitchRow className="gap-6 translate-x-1">
                       <PitchPlayer name="Enzo" score={7.2} team="CHE" />
                       <PitchPlayer name="Palmer" score={8.4} team="CHE" />
                       <PitchPlayer name="Foden" score={8.9} team="MCI" />
                       <PitchPlayer name="Salah" score={9.1} team="LIV" />
                       <PitchPlayer name="Rodri" score={6.9} team="MCI" />
                    </PitchRow>
                    <PitchRow className="gap-12">
                       <PitchPlayer name="Haaland" score={9.2} team="MCI" isCaptain />
                       <PitchPlayer name="Watkins" score={8.5} team="AVL" />
                    </PitchRow>
                 </div>
             </div>
          </motion.div>
        </div>

        {/* Right Column (Insights & Bench) */}
        <div className="flex flex-col gap-8">
          <motion.div variants={fadeInUp} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-[#2B003D]" strokeWidth={2.5} />
                <h3 className="font-bold text-[#1E1B4B]">AI Insights</h3>
             </div>
             <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                   </div>
                   <p className="text-[11px] font-bold text-gray-500 leading-normal">
                      Your midfield is elite, projected to outscore the global average by <span className="text-emerald-500 font-black">+18%</span>.
                   </p>
                </div>
                <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                      <Info className="w-4 h-4 text-amber-500" />
                   </div>
                   <p className="text-[11px] font-bold text-gray-500 leading-normal">
                      Your midfield is elite, projected to outscore the global average by <span className="text-amber-500 font-black">+18%</span>.
                   </p>
                </div>
             </div>
          </motion.div>

          {/* Optimised Bench */}
          <motion.div variants={fadeInUp} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex-1">
             <div className="flex items-center gap-2 mb-6">
                <ChevronDown className="w-5 h-5 text-[#2B003D]" strokeWidth={2.5} />
                <h3 className="font-bold text-[#1E1B4B]">Optimised Bench</h3>
             </div>
             <div className="space-y-4">
                <BenchPlayer num={1} name="Martinez" team="AVL • GK" score={3.2} image="https://assets.sorare.com/playerpicture/71542f36-c037-4632-bae6-dcfa9fd42a8b/picture/2cdac350e9ba9ce459952865ffb418a0.png" />
                <BenchPlayer num={2} name="Rúben Dias" team="MCI • DEF" score={2.8} image="https://assets.sorare.com/playerpicture/12c1a6fe-f5ab-4c28-9895-1f7c320e8b2b/picture/squared-582ed71569722360f09a96e2be67be44.png" />
                <BenchPlayer num={3} name="Mac Allister" team="LIV • FWD" score={1.5} image="https://assets.sorare.com/playerpicture/8abb6635-f48c-4bc7-9ed7-947f63f3a479/picture/42fbc940a02b66cb44322432bad76a3b.png" />
                <BenchPlayer num={4} name="Cristian Romero" team="TOT • DEF" score={1.2} image="https://assets.sorare.com/playerpicture/43356079-c5c8-47c3-8321-72945d8b2bf3/picture/squared-baad2115167a4432ff2ebae2ad76a3b.png" />
             </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

/* --- Helper Components --- */

const CaptainCard = ({ title, name, team, points, form, fixture, image, isCaptain }: any) => (
  <motion.div variants={fadeInUp} className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-4">
       <Star className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" />
       <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</h4>
    </div>
    
    <div className="relative rounded-2xl overflow-hidden mb-5 h-36">
       <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/50 z-10" />
       <img src={image} alt={name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
       <div className="absolute top-2.5 left-2.5 z-20 w-7 h-7 bg-white rounded-full flex items-center justify-center text-[10px] font-black text-[#1e1b4b] shadow-lg">
          {isCaptain ? 'C' : 'VC'}
       </div>
       <div className="absolute top-2.5 right-2.5 z-20 bg-emerald-500 text-white px-2.5 py-0.5 rounded text-[9px] font-black shadow-lg uppercase">98% Start</div>
       <div className="absolute bottom-4 left-4 z-20">
          <p className="font-extrabold text-white text-base tracking-tight">{name}</p>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{team}</p>
       </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
       <div className="bg-[#00E0FF] p-3 rounded-xl flex flex-col items-center shadow-lg shadow-cyan-100/50">
          <p className="text-[7px] font-black text-white/80 uppercase tracking-widest mb-1">POINT</p>
          <p className="text-sm font-black text-white">{points}</p>
       </div>
       <div className="bg-[#EEF2FF] p-3 rounded-xl flex flex-col items-center">
          <p className="text-[7px] font-black text-[#1E1B4B]/40 uppercase tracking-widest mb-1">FORM</p>
          <p className="text-sm font-black text-[#1E1B4B]">{form}</p>
       </div>
    </div>

    <div className="bg-emerald-50 py-2 px-4 rounded-xl flex justify-between items-center border border-emerald-100/50">
       <span className="text-[10px] font-bold text-emerald-500">GW24</span>
       <span className="text-[10px] font-black text-emerald-600 uppercase">{fixture.split(' ')[1]}</span>
    </div>
  </motion.div>
);

const BenchPlayer = ({ num, name, team, score, image }: any) => (
  <div className="flex items-center gap-4 bg-[#F1F5F9]/50 p-3 rounded-2xl border border-transparent hover:border-purple-100 transition-all group cursor-pointer">
     <span className="text-xs font-black text-gray-300 w-4">{num}</span>
     <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg ring-1 ring-gray-100 group-hover:scale-105 transition-transform">
        <img src={image} alt={name} className="w-full h-full object-cover" />
     </div>
     <div className="flex-1">
        <p className="text-[12px] font-black text-[#1E1B4B] leading-tight">{name}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{team}</p>
     </div>
     <div className="px-4 py-1.5 bg-[#00FF88] rounded-xl shadow-sm">
        <span className="text-[11px] font-black text-black">{score.toFixed(1)}</span>
     </div>
  </div>
);

const PitchPlayer = ({ name, score, isCaptain, team }: { name: string, score: number, isCaptain?: boolean, team: string }) => (
  <div className="flex flex-col items-center group cursor-pointer transition-all duration-300">
    <div className="relative mb-3">
       <div className={cn(
         "w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/80 shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 relative ring-4 ring-transparent",
         isCaptain ? "ring-purple-900/10" : "ring-white/5"
       )}>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name + team}`} alt={name} className="w-full h-full object-cover" />
       </div>
       {isCaptain && (
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#2B003D] text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-lg z-20">C</div>
       )}
    </div>
    <div className="flex flex-col items-center">
       <p className="text-[10px] font-black text-white uppercase tracking-tight antialiased mb-1 drop-shadow-md">{name}</p>
       <div className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xl flex items-center justify-center min-w-[38px] border border-white/50 gap-1.5">
          <span className="text-[10px] font-black text-[#1E1B4B]">{score.toFixed(1)}</span>
          {isCaptain && (
            <div className="w-3.5 h-3.5 bg-[#00FF85] rounded-full flex items-center justify-center shadow-xs">
                <div className="w-1.5 h-1.5 bg-[#2B003D] rounded-full" />
            </div>
          )}
       </div>
    </div>
  </div>
);

const PitchRow = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("flex justify-center items-end flex-nowrap", className)}>
    {children}
  </div>
);

export default OptimiserPage;