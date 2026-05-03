"use client";

import { motion } from "framer-motion";

interface PlayerProfileCardProps {
  name: string;
  team: string;
  pos: string;
  nationality?: string | null;
  foot?: string | null;
  dob?: string | null;
  apps?: number | string | null;
  image: string;
}

export const PlayerProfileCard = ({
  name,
  team,
  pos,
  nationality,
  foot,
  dob,
  apps,
  image,
}: PlayerProfileCardProps) => {
  return (
    <div className="w-full bg-white rounded-[20px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 flex flex-col gap-8">
      {/* Top Profile Section */}
      <div className="w-full rounded-[15px] overflow-hidden bg-gradient-to-b from-cyan-400/5 to-cyan-400/20 border border-cyan-100/30">
        <div className="w-full h-[220px] relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-6"
          />
          {/* Subtle overlay gradient to blend image with the bottom area */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/40 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <h4 className="text-[20px] font-semibold text-[#2E004B] tracking-tight mb-1">
            {name}
          </h4>
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
            {team} • {pos}
          </p>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-6 px-2 pb-4">
        {nationality && <ProfileStat label="Nationality" value={nationality} />}
        {foot && <ProfileStat label="Preferred Foot" value={foot} />}
        {dob && <ProfileStat label="Date of Birth" value={dob} />}
        {apps !== undefined && apps !== null && <ProfileStat label="Appearances" value={apps.toString()} />}
      </div>
    </div>
  );
};

const ProfileStat = ({
  label,
  value,
  flag,
}: {
  label: string;
  value: string;
  flag?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <h5 className="text-[16px] font-semibold text-[#2E004B] tracking-tight">
      {label}
    </h5>
    <div className="flex items-center gap-2">
      {flag && <span className="text-[14px] grayscale opacity-80">{flag}</span>}
      <span className="text-[13px] font-semibold text-gray-400/80">
        {value}
      </span>
    </div>
  </div>
);
