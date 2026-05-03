"use client";

import { motion } from "framer-motion";
import {
   ArrowRight,
   Zap,
   Star,
   Plus,
   ArrowRightLeft,
   ChevronRight,
   Loader2,
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

const getHighResImage = (url: string) => {
   if (!url) return "";
   return url.replace("40x40", "250x250");
};

const getFixtureText = (fixtures: any[]) => {
   if (!fixtures || fixtures.length === 0) return "N/A";
   return `${fixtures[0].opponent_team.short_name}(${fixtures[0].is_home ? "H" : "A"})`;
};

const TransfersPage = () => {
   const [teamId, setTeamId] = useState("");
   const [vcData, setVcData] = useState<any>(null);
   const [transferData, setTransferData] = useState<any>(null);
   const [loading, setLoading] = useState(false);

   const handleFetchData = async () => {
      if (!teamId) return;
      setLoading(true);
      try {
         const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://selaldn.thesyndicates.team";
         
         const [vcRes, transRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/fpl/optimizer/recommended-vice-captain?team_id=${teamId}`),
            fetch(`${API_BASE_URL}/api/fpl/transfer-page?team_id=${teamId}`)
         ]);
         
         const vcJson = await vcRes.json();
         const transJson = await transRes.json();
         
         if (vcJson.status) setVcData(vcJson.data);
         if (transJson.status) setTransferData(transJson.data);
         
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

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

         {/* ID Input Section */}
         <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-center max-w-xl">
               <input 
                  type="text" 
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  placeholder="Enter FPL Team ID (e.g. 13048822)"
                  className="w-full sm:flex-1 bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00E0FF] focus:border-transparent shadow-sm"
               />
               <button 
                  onClick={handleFetchData}
                  disabled={loading || !teamId}
                  className="w-full sm:w-auto bg-[linear-gradient(92deg,#37003C_12.8%,#1e002b_139.39%)] text-white px-8 py-4 rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(55,0,60,0.3)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
               >
                  {loading ? (
                     <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                     </>
                  ) : (
                     "Get Recommendations"
                  )}
               </button>
            </div>
         </div>

         {/* Only show these sections if we have transfer data */}
         {transferData ? (
            <>
               {/* Main Comparison Section */}
               <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-6 mb-10">
                  {/* Player Out */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                     <h4 className="text-center text-xl font-semibold text-[#FF7C7C] tracking-widest">Player Out</h4>
                     <div className="relative group">
                        <ComparisonCard
                           name={transferData.primary_transfer.player_out.name}
                           team={`${transferData.primary_transfer.player_out.team.short_name} • ${transferData.primary_transfer.player_out.position_code}`}
                           points={transferData.primary_transfer.player_out.total_points}
                           form={transferData.primary_transfer.player_out.form}
                           fixture={getFixtureText(transferData.primary_transfer.player_out.next_fixtures)}
                           badge="OUT"
                           badgeColor="bg-red-400"
                           image={getHighResImage(transferData.primary_transfer.player_out.photo_url)}
                        />
                     </div>
                     <button className="w-full bg-[#2B003D] text-white py-4 rounded-xl text-xs font-semibold hover:bg-[#1e002b] transition-all shadow-xl shadow-purple-900/10">
                        {transferData.primary_transfer.label || "Apply Transfer"}
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
                        <span className="text-2xl font-semibold text-[#06221A]">+{transferData.primary_transfer.points_gain.toFixed(1)}</span>
                     </div>
                     <div className="text-center">
                        <p className="text-base font-semibold text-[#37003C] tracking-widest mb-1">Points Gain</p>
                        <p className="text-xs font-medium text-[#37003C] leading-tight">Estimated over next 3<br />gameweeks</p>
                     </div>
                  </div>

                  {/* Player In */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                     <h4 className="text-center text-xl font-semibold text-[#00E0FF] tracking-widest">Player In</h4>
                     <div className="relative group">
                        <ComparisonCard
                           name={transferData.primary_transfer.player_in.name}
                           team={`${transferData.primary_transfer.player_in.team.short_name} • ${transferData.primary_transfer.player_in.position_code}`}
                           points={transferData.primary_transfer.player_in.total_points}
                           form={transferData.primary_transfer.player_in.form}
                           fixture={getFixtureText(transferData.primary_transfer.player_in.next_fixtures)}
                           badge="IN"
                           badgeColor="bg-[#00FF85]"
                           image={getHighResImage(transferData.primary_transfer.player_in.photo_url)}
                           isIncoming
                        />
                     </div>
                     <button className="w-full bg-[#2B003D] text-white py-4 rounded-xl text-xs font-semibold hover:bg-[#1e002b] transition-all shadow-xl shadow-purple-900/10">
                        {transferData.primary_transfer.label || "Apply Transfer"}
                     </button>
                  </div>
               </div>

               {/* Insight Banner */}
               <motion.div
                  variants={fadeInUp}
                  className="bg-[#00E0FF]/25 border border-[#00E0FF]/20 p-5 rounded-2xl mb-12 flex items-center justify-center text-center backdrop-blur-xs"
               >
                  <p className="text-[11px] md:text-sm font-semibold text-[#37003C] leading-relaxed max-w-[1000px]">
                     {transferData.transfer_note}
                  </p>
               </motion.div>
               
               {/* Strategy Options Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {transferData.transfer_options.map((option: any, index: number) => (
                     <StrategyCard
                        key={index}
                        title={option.title}
                        btnText={option.action_label}
                        accentColor="cyan"
                        description={option.description}
                        transfers={[
                           { 
                              out: { 
                                 name: option.player_out.name, 
                                 team: `${option.player_out.team.short_name} • ${option.player_out.position_code} • ${option.player_out.form} form`,
                                 image: getHighResImage(option.player_out.photo_url)
                              }, 
                              in: { 
                                 name: option.player_in.name, 
                                 team: `${option.player_in.team.short_name} • ${option.player_in.position_code} • ${option.player_in.form} form`,
                                 image: getHighResImage(option.player_in.photo_url)
                              }, 
                              gain: `+${option.points_gain.toFixed(1)}`
                           }
                        ]}
                     />
                  ))}
               </div>
            </>
         ) : null}

         {/* Vice Captain Optimizer Section */}
         {vcData && (
            <div className="mb-12">
               <h2 className="text-2xl font-bold text-[#37003C] mb-6 tracking-tight">Recommended Vice-Captain</h2>
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#2B003D] rounded-[24px] p-8 flex flex-col lg:flex-row gap-8 shadow-[0_20px_60px_-15px_rgba(43,0,61,0.5)] relative overflow-hidden group border border-white/10"
               >
                  {/* Left Column: Player Info */}
                  <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/3 z-10">
                     <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#00E0FF] bg-white/10 shadow-[0_0_30px_rgba(0,224,255,0.2)]">
                        <img 
                           src={getHighResImage(vcData.player.photo_url)} 
                           alt={vcData.player.name} 
                           className="w-full h-full object-contain pt-2" 
                        />
                     </div>
                     <div className="text-center lg:text-left">
                        <p className="text-[#00E0FF] text-xs font-bold tracking-[0.2em] uppercase mb-1">{vcData.player.position_name} • {vcData.player.team.name}</p>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{vcData.player.name}</h3>
                        <p className="text-white/60 text-sm font-medium">FPL Team: {vcData.team.name}</p>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                           <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase mb-1">Cost</p>
                           <p className="text-white font-bold">£{vcData.player.cost}m</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                           <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase mb-1">Form</p>
                           <p className="text-white font-bold">{vcData.player.form}</p>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Reasoning & Fixtures */}
                  <div className="flex flex-col flex-1 gap-6 z-10">
                     <div className="bg-[linear-gradient(92deg,rgba(0,224,255,0.1)_0%,rgba(0,224,255,0)_100%)] border border-[#00E0FF]/20 rounded-2xl p-6 flex items-start gap-4">
                        <Star className="w-8 h-8 text-[#00E0FF] shrink-0 mt-1" />
                        <div>
                           <p className="text-[#00E0FF] text-xs font-bold tracking-widest uppercase mb-2">Projected Points ({vcData.current_gameweek})</p>
                           <p className="text-3xl font-extrabold text-white mb-3">{vcData.projected_points.toFixed(1)} pts</p>
                           <p className="text-white/80 text-sm leading-relaxed">{vcData.reason}</p>
                        </div>
                     </div>

                     <div>
                        <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">Upcoming Fixtures</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                           {vcData.player.next_fixtures.map((fixture: any, idx: number) => (
                              <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">
                                 <p className="text-white text-sm font-bold mb-1">GW {fixture.event}</p>
                                 <p className="text-white/80 text-xs font-medium mb-3">{fixture.opponent_team.short_name} ({fixture.is_home ? 'H' : 'A'})</p>
                                 <div 
                                    className="w-full py-1.5 rounded text-[10px] font-bold tracking-wider text-black"
                                    style={{ 
                                       backgroundColor: 
                                          fixture.difficulty === 1 ? "#34f5a4" : 
                                          fixture.difficulty === 2 ? "#4af5c2" : 
                                          fixture.difficulty === 3 ? "#0ed7f5" : 
                                          fixture.difficulty === 4 ? "#ff4f8b" : "#ff1f66",
                                       color: fixture.difficulty >= 4 ? '#fff' : '#000'
                                    }}
                                 >
                                    FDR {fixture.difficulty}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </motion.div>
   );
};

/* --- Specific Components --- */

const ComparisonCard = ({ name, team, points, form, fixture, badge, badgeColor, image, isIncoming }: any) => (
   <div className="bg-white rounded-[1.5rem] p-5 shadow-2xl shadow-purple-950/5 border border-white h-fit relative overflow-hidden flex flex-col items-center">
      <div className={cn("absolute top-3 right-3 z-20 px-2.5 py-1 rounded text-[9px] font-semibold text-white shadow-lg", badgeColor)}>
         {badge}
      </div>

      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#f8fafc]">
         <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40 z-10" />
         <img src={image} alt={name} className="w-full h-full object-contain object-bottom pt-4 transition-all" />
         <div className="absolute bottom-3 left-4 z-20">
            <p className="font-extrabold text-white text-base tracking-tight drop-shadow-md">{name}</p>
            <p className="text-[10px] font-semibold text-white/90 tracking-widest drop-shadow-md">{team}</p>
         </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-2.5 mb-5 px-1">
         <div className="bg-[#00E0FF] py-3 rounded-xl flex flex-col items-center shadow-lg shadow-cyan-50/50">
            <p className="text-[7px] font-semibold text-white/60 tracking-widest mb-1">POINT</p>
            <p className="text-sm font-semibold text-white">{points}</p>
         </div>
         <div className="bg-[#EEF2FF] py-3 rounded-xl flex flex-col items-center">
            <p className="text-[7px] font-semibold text-[#37003C]/40 tracking-widest mb-1">FORM</p>
            <p className="text-sm font-semibold text-[#37003C]">{form}</p>
         </div>
      </div>

      <div className="w-full flex">
         <div className="bg-[#FF4D4F]/10 px-4 py-2 rounded-xl border border-red-50">
            <span className="text-[10px] font-semibold text-red-500">{fixture}</span>
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
               <div className="flex items-center justify-between relative gap-1">
                  {/* Player Out Pill */}
                  <div className="flex-1 rounded-[10px] bg-[linear-gradient(92deg,#EDEDFF_12.8%,#04F5FF_139.39%)] p-2 flex items-center gap-2 border border-white/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all min-w-0">
                     <div className="w-9 h-9 rounded-lg overflow-hidden border border-white shrink-0 bg-[#f8fafc] shadow-sm">
                        <img 
                           src={t.out.image} 
                           alt={t.out.name} 
                           onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.out.name) + "&background=random" }}
                           className="w-full h-full object-contain object-bottom" 
                        />
                     </div>
                     <div className="overflow-hidden flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#37003C] leading-tight mb-0.5 truncate" title={t.out.name}>{t.out.name}</p>
                        <p className="text-[8px] font-semibold text-[#37003C]/70 leading-none truncate">{t.out.team}</p>
                     </div>
                  </div>

                  {/* Points Center */}
                  <div className="flex flex-col items-center shrink-0 min-w-[55px] px-1">
                     <p className="text-[20px] font-bold text-white tracking-tighter leading-none mb-1">{t.gain || "+0.0"}</p>
                     <p className="text-[8px] text-white/90 text-center tracking-tighter leading-tight">Points Gain<br />Next 3 GW</p>
                  </div>

                  {/* Player In Pill */}
                  <div className="flex-1 rounded-[10px] bg-[linear-gradient(92deg,#EDEDFF_12.8%,#04F5FF_139.39%)] p-2 flex items-center gap-2 border border-white/30 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all min-w-0">
                     <div className="w-9 h-9 rounded-lg overflow-hidden border border-white shrink-0 bg-[#f8fafc] shadow-sm">
                        <img 
                           src={t.in.image} 
                           alt={t.in.name} 
                           onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.in.name) + "&background=random" }}
                           className="w-full h-full object-contain object-bottom" 
                        />
                     </div>
                     <div className="overflow-hidden flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#37003C] leading-tight mb-0.5 truncate" title={t.in.name}>{t.in.name}</p>
                        <p className="text-[8px] font-semibold text-[#37003C]/70 leading-none truncate">{t.in.team}</p>
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
