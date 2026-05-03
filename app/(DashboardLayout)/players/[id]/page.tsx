"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlayerHero } from "@/components/players/PlayerHero";
import { PredictionChart } from "@/components/players/PredictionChart";
import { UpcomingFixtures } from "@/components/players/UpcomingFixtures";
import { PlayerProfileCard } from "@/components/players/PlayerProfileCard";

export default function PlayerDetailsPage() {
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
          name="Erling Haaland"
          team="Manchester City"
          pos="Forward"
          price="£14.3m"
          pts={142}
          form={8.5}
          mins="90%"
          image="/images/jersey-red.png"
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
            <PredictionChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UpcomingFixtures />
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
              name="E. Haaland"
              team="MCI"
              pos="FWD"
              nationality="Norway"
              foot="Left-footed"
              dob="July 21, 2000"
              apps={126}
              image="/images/jersey-red.png"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
