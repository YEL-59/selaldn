"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Star, Info, ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PitchView from "@/components/players/PitchView";

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

const OptimiserPage = () => {
  const router = useRouter();
  const [toggleOptimiser, setToggleOptimiser] = useState(true);
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(true);
  const [captainData, setCaptainData] = useState<any>(null);
  const [vcData, setVcData] = useState<any>(null);
  const [currentBenchData, setCurrentBenchData] = useState<any>(null);
  const [recommendedBenchData, setRecommendedBenchData] = useState<any>(null);
  const [currentXiData, setCurrentXiData] = useState<any>(null);
  const [recommendedXiData, setRecommendedXiData] = useState<any>(null);

  useEffect(() => {
    const savedId = localStorage.getItem("fpl_team_id");
    if (savedId) {
      setTeamId(savedId);
      fetchData(savedId);
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://selaldn.thesyndicates.team";
      const [capRes, vcRes, currBenchRes, recBenchRes, currXiRes, recXiRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/fpl/optimizer/recommended-captain?team_id=${id}`),
        fetch(`${API_BASE_URL}/api/fpl/optimizer/recommended-vice-captain?team_id=${id}`),
        fetch(`${API_BASE_URL}/api/fpl/optimizer/bench?team_id=${id}&view=current`),
        fetch(`${API_BASE_URL}/api/fpl/optimizer/bench?team_id=${id}&view=recommended`),
        fetch(`${API_BASE_URL}/api/fpl/optimizer/starting-xi?team_id=${id}&view=current`),
        fetch(`${API_BASE_URL}/api/fpl/optimizer/starting-xi?team_id=${id}&view=recommended`)
      ]);
      
      const capJson = await capRes.json();
      const vcJson = await vcRes.json();
      const currBenchJson = await currBenchRes.json();
      const recBenchJson = await recBenchRes.json();
      const currXiJson = await currXiRes.json();
      const recXiJson = await recXiRes.json();
      
      if (capJson.status) setCaptainData(capJson.data);
      if (vcJson.status) setVcData(vcJson.data);
      if (currBenchJson.status) setCurrentBenchData(currBenchJson.data);
      if (recBenchJson.status) setRecommendedBenchData(recBenchJson.data);
      if (currXiJson.status) setCurrentXiData(currXiJson.data);
      if (recXiJson.status) setRecommendedXiData(recXiJson.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const activeXiData = toggleOptimiser ? recommendedXiData : currentXiData;
  const activeBenchData = toggleOptimiser ? recommendedBenchData : currentBenchData;

  const mapPlayer = (p: any) => ({
      name: p.web_name || p.name,
      score: p.projected_points || p.search_score || p.points_per_game || 0,
      team: p.team?.short_name || "N/A",
      isCaptain: captainData?.player?.id === p.id
  });

  const activeGoalkeeper = activeXiData?.starting_xi?.find((p:any) => p.position_code === 'GK') 
       ? mapPlayer(activeXiData.starting_xi.find((p:any) => p.position_code === 'GK')) 
       : { name: "Ederson", score: 8.5, team: "MCI" };
       
  const activeDefenders = activeXiData?.starting_xi?.filter((p:any) => p.position_code === 'DEF').map(mapPlayer) || 
       [{ name: "Saliba", score: 8.2, team: "ARS" }, { name: "Gabriel", score: 8.2, team: "ARS" }, { name: "Virgil", score: 8.8, team: "LIV" }];
       
  const activeMidfielders = activeXiData?.starting_xi?.filter((p:any) => p.position_code === 'MID').map(mapPlayer) || 
       [{ name: "Palmer", score: 9.4, team: "CHE" }, { name: "Saka", score: 9.2, team: "ARS" }, { name: "Foden", score: 8.7, team: "MCI" }, { name: "Salah", score: 9.8, team: "LIV" }, { name: "Son", score: 8.5, team: "TOT" }];
       
  const activeForwards = activeXiData?.starting_xi?.filter((p:any) => p.position_code === 'FWD').map(mapPlayer) || 
       [{ name: "Haaland", score: 9.5, team: "MCI", isCaptain: true }, { name: "Watkins", score: 8.3, team: "AVL" }];

  const activeBench = activeBenchData?.players?.map((p: any) => ({
      name: p.web_name || p.name,
      pos: p.position_code,
      score: p.projected_points || p.search_score || p.points_per_game || 0,
      image: p.photo_url || ""
  })) || [
      { name: "Raya", pos: "GK", score: 8.5, image: "https://assets.sorare.com/playerpicture/71542f36-c037-4632-bae6-dcfa9fd42a8b/picture/2cdac350e9ba9ce459952865ffb418a0.png" },
      { name: "Saliba", pos: "DEF", score: 8.2, image: "https://assets.sorare.com/playerpicture/12c1a6fe-f5ab-4c28-9895-1f7c320e8b2b/picture/squared-582ed71569722360f09a96e2be67be44.png" },
      { name: "Virgil", pos: "DEF", score: 8.8, image: "https://assets.sorare.com/playerpicture/8abb6635-f48c-4bc7-9ed7-947f63f3a479/picture/42fbc940a02b66cb44322432bad76a3b.png" },
      { name: "Foden", pos: "MID", score: 8.3, image: "https://assets.sorare.com/playerpicture/43356079-c5c8-47c3-8321-72945d8b2bf3/picture/squared-baad2115167a4432ff2ebae2ad76a3b.png" },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="max-w-[1500px] mx-auto py-6 px-4"
    >
      {/* Header */}
      <div className="mb-10 text-center lg:text-left flex items-center justify-between">
        <h1 className="text-[40px] font-semibold text-[#37003C] leading-tight tracking-tight mb-6">Lineup Optimiser</h1>
        {loading && <div className="flex items-center gap-2 text-[#37003C] font-semibold bg-white px-4 py-2 rounded-full shadow-sm"><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Squad...</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column (Captaincy Cards) */}
        <div className="flex flex-col gap-8">
          {captainData ? (
             <CaptainCard
               title="Recommended Captain"
               name={captainData.player.name}
               team={`${captainData.player.team.short_name} • ${captainData.player.position_code}`}
               points={captainData.player.total_points}
               form={captainData.player.form}
               fixture={`GW${captainData.current_gameweek} ${getFixtureText(captainData.player.next_fixtures)}`}
               image={getHighResImage(captainData.player.photo_url)}
               isCaptain
             />
          ) : (
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
          )}

          {vcData ? (
             <CaptainCard
               title="Recommended Vice-Captain"
               name={vcData.player.name}
               team={`${vcData.player.team.short_name} • ${vcData.player.position_code}`}
               points={vcData.player.total_points}
               form={vcData.player.form}
               fixture={`GW${vcData.current_gameweek} ${getFixtureText(vcData.player.next_fixtures)}`}
               image={getHighResImage(vcData.player.photo_url)}
             />
          ) : (
             <CaptainCard
               title="Recommended Vice-Captain"
               name="Mohamed Salah"
               team="LIV • FWD"
               points="13.5"
               form="8.2"
               fixture="GW24 MCI(H)"
               image="https://assets.sorare.com/playerpicture/a6907409-5a10-444a-8d7b-bc43ceb6c3d9/picture/squared-2487e91547432e3a1f87968367876a3b.png"
             />
          )}
        </div>

        {/* Center Column (Details & Pitch) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Main Selection Detail */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex gap-6 items-center"
          >
            {captainData ? (
              <>
                 <div className="relative shrink-0">
                   <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00E0FF] bg-[#f8fafc] shadow-xl relative">
                     <img
                       src={getHighResImage(captainData.player.photo_url)}
                       alt={captainData.player.name}
                       onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(captainData.player.name) + "&background=random" }}
                       className="w-full h-full object-contain pt-1"
                     />
                   </div>
                   <div className="absolute top-0 right-0 w-6 h-6 bg-[#2B003D] text-white rounded-full flex items-center justify-center text-[10px] font-semibold border-2 border-white">
                     C
                   </div>
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-start mb-1">
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                         Recommended Captain
                       </p>
                       <h3 className="text-xl font-semibold text-[#1e1b4b]">
                         {captainData.player.name}
                       </h3>
                     </div>
                     <div className="text-right">
                       <p className="text-xl font-semibold text-[#00FF85]">
                         {(captainData.projected_points || captainData.player.projected_points || 0).toFixed(1)} pts
                       </p>
                     </div>
                   </div>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4 max-w-[450px]">
                     {captainData.reason || captainData.player.reason || `Expected to perform well in Gameweek ${captainData.current_gameweek}.`}
                   </p>
                   <button className="bg-[#2B003D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#1e002b] transition-all">
                     <Zap
                       className="w-3.5 h-3.5 text-[#00FF85]"
                       fill="currentColor"
                     />{" "}
                     Why Him?
                   </button>
                 </div>
              </>
            ) : (
              <>
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xl relative bg-gray-100">
                    <img
                      src="https://assets.sorare.com/playerpicture/b375896f-1d4e-4010-9d07-76e94f3a4f2f/picture/squared-c01f04cada9a79ccca7138e1d1b8ad6b.png"
                      alt="Haaland"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-[#2B003D] text-white rounded-full flex items-center justify-center text-[10px] font-semibold border-2 border-white">
                    C
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Recommended Captain
                      </p>
                      <h3 className="text-xl font-semibold text-[#1e1b4b]">
                        Erling Haaland
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-[#00FF85]">
                        14.2 pts
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4 max-w-[450px]">
                    Haaland faces a depleted Ipswich defense missing 3 starters. 68%
                    chance of scoring 2+ goals.
                  </p>
                  <button className="bg-[#2B003D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#1e002b] transition-all">
                    <Zap
                      className="w-3.5 h-3.5 text-[#00FF85]"
                      fill="currentColor"
                    />{" "}
                    Why Him?
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Optimised XI Section */}
          <motion.div
            variants={fadeInUp}
            className=" rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-6 flex-1 bg-white"
          >
            <div className="flex justify-between items-center px-2">
              <h3 className="font-semibold text-[#1e1b4b] text-lg">
                {toggleOptimiser ? "Optimised Starting XI" : "Current Starting XI"}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-gray-400">
                  {toggleOptimiser ? "AI Recommended" : "Current Lineup"}
                </span>
                <button
                  onClick={() => setToggleOptimiser(!toggleOptimiser)}
                  className={cn(
                    "w-10 h-5.5 rounded-full transition-all relative border border-gray-100",
                    toggleOptimiser ? "bg-[#00FF85]" : "bg-gray-200",
                  )}
                >
                  <motion.div
                    animate={{ x: toggleOptimiser ? 20 : 2 }}
                    className="w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm"
                  />
                </button>
              </div>
            </div>

            {/* The Pitch Rendering */}
            <PitchView
              goalkeeper={activeGoalkeeper}
              defenders={activeDefenders}
              midfielders={activeMidfielders}
              forwards={activeForwards}
              bench={activeBench}
            />
          </motion.div>
        </div>

        {/* Right Column (Insights & Bench) */}
        <div className="flex flex-col gap-8">
          <motion.div
            variants={fadeInUp}
            className="bg-white h-fit rounded-[1.5rem] p-6 shadow-sm border border-gray-100"
          >
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
                  Your midfield is elite, projected to outscore the global
                  average by{" "}
                  <span className="text-emerald-500 font-semibold">+18%</span>.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-[11px] font-bold text-gray-500 leading-normal">
                  Your midfield is elite, projected to outscore the global
                  average by{" "}
                  <span className="text-amber-500 font-semibold">+18%</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Optimised Bench */}
          <motion.div
            variants={fadeInUp}
            className="bg-white h-fit rounded-[1.5rem] p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-6">
              <ChevronDown
                className="w-5 h-5 text-[#2B003D]"
                strokeWidth={2.5}
              />
              <h3 className="font-bold text-[#1E1B4B]">Optimised Bench</h3>
            </div>
            <div className="space-y-4">
              {activeBench && activeBench.length > 0 ? (
                activeBench.map((player: any, idx: number) => (
                  <OptimisedBenchItem
                    key={idx}
                    num={idx + 1}
                    name={player.name}
                    team={player.pos ? `${player.team || "N/A"} • ${player.pos}` : "N/A"}
                    score={player.score}
                    image={player.image ? getHighResImage(player.image) : "https://ui-avatars.com/api/?name=" + encodeURIComponent(player.name) + "&background=random"}
                  />
                ))
              ) : (
                <>
                  <OptimisedBenchItem
                    num={1}
                    name="Martinez"
                    team="AVL • GK"
                    score={3.2}
                    image="https://assets.sorare.com/playerpicture/71542f36-c037-4632-bae6-dcfa9fd42a8b/picture/2cdac350e9ba9ce459952865ffb418a0.png"
                  />
                  <OptimisedBenchItem
                    num={2}
                    name="Rúben Dias"
                    team="MCI • DEF"
                    score={2.8}
                    image="https://assets.sorare.com/playerpicture/12c1a6fe-f5ab-4c28-9895-1f7c320e8b2b/picture/squared-582ed71569722360f09a96e2be67be44.png"
                  />
                  <OptimisedBenchItem
                    num={3}
                    name="Mac Allister"
                    team="LIV • FWD"
                    score={1.5}
                    image="https://assets.sorare.com/playerpicture/8abb6635-f48c-4bc7-9ed7-947f63f3a479/picture/42fbc940a02b66cb44322432bad76a3b.png"
                  />
                  <OptimisedBenchItem
                    num={4}
                    name="Cristian Romero"
                    team="TOT • DEF"
                    score={1.2}
                    image="https://assets.sorare.com/playerpicture/43356079-c5c8-47c3-8321-72945d8b2bf3/picture/squared-baad2115167a4432ff2ebae2ad76a3b.png"
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* --- Helper Components --- */

const CaptainCard = ({
  title,
  name,
  team,
  points,
  form,
  fixture,
  image,
  isCaptain,
}: any) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-50 group cursor-pointer hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <Star className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" />
      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        {title}
      </h4>
    </div>

    <div className="relative rounded-2xl overflow-hidden mb-5 h-36 bg-[#f8fafc]">
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/50 z-10" />
      <img
        src={image}
        alt={name}
        onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random" }}
        className="w-full h-full object-contain object-bottom pt-4 transition-transform group-hover:scale-105 duration-500"
      />
      <div className="absolute top-2.5 left-2.5 z-20 w-7 h-7 bg-white rounded-full flex items-center justify-center text-[10px] font-semibold text-[#1e1b4b] shadow-lg">
        {isCaptain ? "C" : "VC"}
      </div>
      <div className="absolute top-2.5 right-2.5 z-20 bg-emerald-500 text-white px-2.5 py-0.5 rounded text-[9px] font-semibold shadow-lg uppercase">
        98% Start
      </div>
      <div className="absolute bottom-4 left-4 z-20">
        <p className="font-extrabold text-white text-base tracking-tight drop-shadow-md">
          {name}
        </p>
        <p className="text-[10px] font-bold text-white/90 uppercase tracking-widest drop-shadow-md">
          {team}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-[#00E0FF] p-3 rounded-xl flex flex-col items-center shadow-lg shadow-cyan-100/50">
        <p className="text-xs font-semibold text-[#37003C] uppercase tracking-widest mb-1">
          POINT
        </p>
        <p className="text-lg font-semibold text-[#37003C]">{points}</p>
      </div>
      <div className="bg-[#EEF2FF] p-3 rounded-xl flex flex-col items-center">
        <p className="text-xs font-semibold text-[#37003C] uppercase tracking-widest mb-1">
          FORM
        </p>
        <p className="text-lg font-semibold text-[#37003C]">{form}</p>
      </div>
    </div>

    <div className="bg-emerald-50 py-2 px-4 rounded-xl flex justify-between items-center border border-emerald-100/50">
      <span className="text-xs font-bold text-[#028A4B]">GW{fixture.split(" ")[0].replace("GW", "")}</span>
      <span className="text-xs font-medium text-[#9CA3AF] uppercase">
        {fixture.split(" ").slice(1).join(" ")}
      </span>
    </div>
  </motion.div>
);

const OptimisedBenchItem = ({ num, name, team, score, image }: any) => (
  <div className="flex items-center gap-4 bg-[#F1F5F9]/50 p-3 rounded-2xl border border-transparent hover:border-purple-100 transition-all group cursor-pointer">
    <span className="text-xs font-semibold text-gray-300 w-4">{num}</span>
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg ring-1 ring-gray-100 group-hover:scale-105 transition-transform relative bg-gray-100 shrink-0">
      <img
        src={image}
        alt={name}
        onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random" }}
        className="w-full h-full object-cover pt-1"
      />
    </div>
    <div className="flex-1">
      <p className="text-[12px] font-semibold text-[#1E1B4B] leading-tight">
        {name}
      </p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
        {team}
      </p>
    </div>
    <div className="px-4 py-1.5 bg-[#00FF88] rounded-xl shadow-sm shrink-0">
      <span className="text-[11px] font-semibold text-black">
        {typeof score === "number" ? score.toFixed(1) : score}
      </span>
    </div>
  </div>
);

export default OptimiserPage;
