"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { PlayerHero } from "@/components/players/PlayerHero";
import { PredictionChart } from "@/components/players/PredictionChart";
import { UpcomingFixtures } from "@/components/players/UpcomingFixtures";
import { PlayerProfileCard } from "@/components/players/PlayerProfileCard";
import { usePlayerDetails } from "@/hooks/usePlayers";
import { useParams } from "next/navigation";

export default function PlayerDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, loading, error } = usePlayerDetails(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-[#37003C] animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500 font-semibold">Error: {error?.message || "Player not found"}</p>
        <Link href="/players" className="text-cyan-500 hover:underline">Back to Players</Link>
      </div>
    );
  }

  const { player, player_page } = data.data;

  return (
    <div className="container mx-auto py-10 px-4 mb-20">
      {/* Back Link */}
      <Link
        href="/players"
        className="flex items-center gap-2.5 text-[#2E004B] hover:text-cyan-400 transition-all mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[14px] font-semibold tracking-tight">
          Back to Player
        </span>
      </Link>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PlayerHero
          name={player.name}
          team={player.team?.name}
          pos={player.position_name}
          price={player_page.summary_card.current_price_display}
          pts={player.total_points}
          form={player.form}
          mins={player_page.summary_card.expected_mins_label}
          image={player.photo_url || "/images/jersey-red.png"}
        />
      </motion.div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column - Stats & Charts */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <PredictionChart 
              data={player_page.prediction.series.map((s: any) => ({
                name: s.gameweek_label,
                venue: s.fixture_label.split("  ")[1], // Extracting "CHE (A)" from "GW 35  CHE (A)"
                pts: s.projected_points
              }))}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UpcomingFixtures 
              fixtures={player_page.upcoming_fixtures.map(f => ({
                gw: f.event,
                team: f.opponent_team.name,
                venue: f.is_home ? "H" : "A",
                difficulty: f.difficulty
              }))}
            />
          </motion.div>
        </div>

        {/* Right Column - Profile Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <PlayerProfileCard
              name={player.web_name}
              team={player.team?.short_name}
              pos={player.position_code}
              nationality={player_page.profile.nationality}
              foot={player_page.profile.preferred_foot}
              dob={player_page.profile.date_of_birth}
              apps={player_page.profile.appearances}
              image={player.photo_url || "/images/jersey-red.png"}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
