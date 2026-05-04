"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Trophy, Globe, Activity, CircleDollarSign, ArrowRight, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedId = localStorage.getItem("fpl_team_id");
    if (!savedId) {
      router.push("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://selaldn.thesyndicates.team";
        const res = await fetch(`${API_BASE_URL}/api/fpl/home-page/gameweek-details?team_id=${savedId}`);
        const json = await res.json();
        
        if (json.data) {
          setProfileData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#37003C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profileData || !profileData.team) {
    return (
      <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
        <p className="text-gray-500 font-medium">Failed to load profile data.</p>
        <button onClick={() => window.location.reload()} className="text-[#37003C] font-semibold underline">Retry</button>
      </div>
    );
  }

  const { team, bank, team_value } = profileData;
  const classicLeagues = team.leagues?.classic || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#37003C] to-[#5D1863] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl shrink-0 bg-white/10 flex items-center justify-center">
            {team.club_badge_src ? (
              <img src={team.club_badge_src} alt="Club Badge" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-white/50" />
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{team.name}</h1>
            <p className="text-lg text-white/80 font-medium">
              Manager: {team.player_first_name} {team.player_last_name}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold flex items-center gap-1.5 border border-white/10">
                <Globe className="w-4 h-4 text-[#00FF87]" /> {team.player_region_name}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold flex items-center gap-1.5 border border-white/10">
                <Trophy className="w-4 h-4 text-yellow-400" /> Overall Rank: {team.summary_overall_rank.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-w-[200px] text-center shrink-0">
            <p className="text-white/70 text-sm font-bold uppercase tracking-wider mb-1">Total Points</p>
            <p className="text-5xl font-black text-[#00FF87]">{team.summary_overall_points}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Financials */}
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">GW Points</p>
              <p className="text-2xl font-black text-[#37003C]">{team.summary_event_points}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">GW Rank</p>
              <p className="text-2xl font-black text-[#37003C]">{team.summary_event_rank.toLocaleString()}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <CircleDollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Team Value</p>
              <p className="text-2xl font-black text-[#37003C]">£{(team_value / 10).toFixed(1)}m</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4">
                <CircleDollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">In Bank</p>
              <p className="text-2xl font-black text-[#37003C]">£{(bank / 10).toFixed(1)}m</p>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Leagues */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-[#37003C] flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Classic Leagues
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {classicLeagues.length > 0 ? (
                classicLeagues.map((league: any) => (
                  <div key={league.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#37003C] text-base">{league.name}</h3>
                      {league.short_name && (
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{league.short_name}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-8 sm:min-w-[200px]">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Current Rank</p>
                        <p className="text-lg font-black text-[#37003C] flex items-center gap-1">
                          {league.entry_rank.toLocaleString()}
                          {league.entry_last_rank > league.entry_rank ? (
                            <span className="text-green-500 text-xs flex items-center"><ArrowRight className="w-3 h-3 -rotate-45" /></span>
                          ) : league.entry_last_rank < league.entry_rank ? (
                            <span className="text-red-500 text-xs flex items-center"><ArrowRight className="w-3 h-3 rotate-45" /></span>
                          ) : (
                            <span className="text-gray-400 text-xs flex items-center">-</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Last Rank</p>
                        <p className="text-base font-bold text-gray-700">{league.entry_last_rank === 0 ? '-' : league.entry_last_rank.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No classic leagues found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
