"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  MapPin, 
  Mail, 
  Link as LinkIcon, 
  Code2, 
  Award, 
  Shield, 
  Cpu, 
  Heart,
  Users,
  Compass,
  ArrowUpRight,
  Globe,
  Zap,
  Trophy,
  Flame,
  Sparkles,
  Rocket,
  Bug
} from "lucide-react";
import confetti from "canvas-confetti";
import { BADGES, badgeStyles, getIcon } from "@/data/badges";

interface SidebarProps {
  onTabChange: (tab: string) => void;
  onBadgeClick?: (badgeId: string) => void;
}

export default function Sidebar({ onTabChange, onBadgeClick }: SidebarProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(148);
  const [isSponsoring, setIsSponsoring] = useState(false);

  const handleFollow = () => {
    if (isFollowed) {
      setFollowers(prev => prev - 1);
    } else {
      setFollowers(prev => prev + 1);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
    setIsFollowed(!isFollowed);
  };

  const handleSponsor = () => {
    setIsSponsoring(true);
    confetti({
      particleCount: 150,
      spread: 80,
      colors: ["#ff58a6", "#ffb3d9", "#ffffff"]
    });
    setTimeout(() => setIsSponsoring(false), 2000);
  };

  return (
    <aside className="w-full md:w-[296px] shrink-0">
      {/* Profile Photo */}
      <div className="relative group">
        <div className="relative h-64 w-64 md:h-[296px] md:w-[296px] overflow-hidden rounded-full border-2 border-card-border bg-card-bg shadow-xl transition-all duration-300 group-hover:border-gh-blue">
          <Image
            src="https://github.com/Shubhdix9.png"
            alt="Shubh Dixit"
            width={296}
            height={296}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback if avatar fails to load
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=400&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center p-4">
            <span className="text-xs font-mono text-gh-blue bg-background/90 border border-card-border px-2 py-1 rounded">
              @Shubhdix9
            </span>
          </div>
        </div>
        
        {/* Status Bubble */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-card-bg border border-card-border px-2.5 py-1 rounded-full text-xs shadow-lg flex items-center gap-1.5 hover:border-gh-blue transition-colors duration-200 cursor-pointer">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gh-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gh-green"></span>
          </span>
          <span className="font-mono text-xs text-foreground">🔬 Researching MIMO</span>
        </div>
      </div>

      {/* Name and Username */}
      <div className="mt-4">
        <h1 className="text-2xl font-semibold leading-tight text-foreground flex items-center gap-1.5">
          Shubh Dixit
        </h1>
        <p className="text-xl font-light text-gh-grey">Shubhdix9</p>
      </div>

      {/* Bio Tagline */}
      <div className="mt-4 text-sm text-foreground/90 font-sans leading-relaxed">
        AI Research Intern • Cybersecurity Developer • Founder
        <p className="mt-2 text-xs text-gh-grey font-mono leading-relaxed border-l-2 border-card-border pl-2">
          Building intelligent systems at the intersection of AI, Computer Vision, Wireless Communication, and Cybersecurity.
        </p>
      </div>

      {/* Follow & Sponsor Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={handleFollow}
          className={`w-full py-1.5 px-3 rounded-md text-sm font-semibold border transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
            isFollowed 
              ? "bg-card-bg border-card-border text-foreground hover:bg-gh-btn-hover" 
              : "bg-gh-btn-hover border-card-border hover:border-gh-blue text-foreground"
          }`}
        >
          <Users size={16} />
          {isFollowed ? "Unfollow" : "Follow"}
        </button>

        <div className="flex gap-2">
          <button 
            onClick={handleSponsor}
            className="flex-1 py-1.5 px-3 rounded-md text-sm font-semibold border border-card-border hover:border-pink-500 hover:text-pink-500 bg-card-bg text-foreground transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Heart size={16} className={isSponsoring ? "fill-pink-500 text-pink-500 scale-125" : ""} />
            Sponsor
          </button>
          
          <a
            href="mailto:shubhdixi9@gmail.com"
            className="flex-1 py-1.5 px-3 rounded-md text-sm font-semibold border border-card-border hover:border-gh-blue bg-card-bg text-foreground transition-all duration-200 flex items-center justify-center gap-1.5 text-center"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Stats - Followers / Star Counts */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gh-grey">
        <span className="hover:text-gh-blue cursor-pointer flex items-center gap-1">
          <Users size={14} />
          <strong className="text-foreground">{followers}</strong> followers
        </span>
        <span>•</span>
        <span className="hover:text-gh-blue cursor-pointer flex items-center gap-1">
          <strong className="text-foreground">87</strong> following
        </span>
        <span>•</span>
        <span className="hover:text-gh-blue cursor-pointer flex items-center gap-1">
          <Award size={14} />
          <strong className="text-foreground">34</strong> badges
        </span>
      </div>

      {/* Profile Details */}
      <div className="mt-6 border-t border-card-border pt-4 flex flex-col gap-3 text-sm text-foreground/90">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gh-grey" />
          <span>Jaipur, Rajasthan, India</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-gh-grey" />
          <a href="mailto:shubhdixi9@gmail.com" className="hover:text-gh-blue truncate">
            shubhdixi9@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gh-grey shrink-0 animate-float" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <a href="https://github.com/Shubhdix9" target="_blank" rel="noreferrer" className="hover:text-gh-blue flex items-center gap-1">
            github/Shubhdix9 <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gh-grey shrink-0 animate-float" fill="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '1s' }}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <a href="https://linkedin.com/in/shubhdixit0912" target="_blank" rel="noreferrer" className="hover:text-gh-blue flex items-center gap-1">
            linkedin/shubhdixit0912 <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-gh-grey" />
          <a href="https://leetcode.com/GhostKernel09" target="_blank" rel="noreferrer" className="hover:text-gh-blue flex items-center gap-1">
            leetcode/GhostKernel09 <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Achievements / Badges Section */}
      <div className="mt-6 border-t border-card-border pt-4">
        <h2 className="text-sm font-semibold mb-2.5 text-foreground flex items-center gap-1">
          Achievements
        </h2>
        <div className="flex flex-wrap gap-2">
          {BADGES.filter(b => [
            "github-star",
            "mars-2020",
            "security-hunter",
            "arctic-vault",
            "mimo-architect",
            "tumor-analyst",
            "malware-dev",
            "iit-scholar"
          ].includes(b.id)).map(badge => {
            const IconComp = getIcon(badge.iconName);
            const style = badgeStyles[badge.colorName] || badgeStyles.gold;
            return (
              <div 
                key={badge.id}
                onClick={() => {
                  if (onBadgeClick) {
                    onBadgeClick(badge.id);
                  } else {
                    onTabChange("stats");
                  }
                }}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-full border ${style.border} ${style.bg} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-foreground/5`}
                title={`${badge.name}: ${badge.description}`}
              >
                <IconComp className={`h-5 w-5 ${style.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`} />
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 scale-90 rounded bg-card-bg border border-card-border p-2 text-center text-xs opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 z-50">
                  <span className={`font-semibold block ${style.text}`}>★ {badge.name}</span>
                  <p className="text-[10px] text-gh-grey mt-0.5">{badge.rarityScore}</p>
                  <p className="text-[10px] text-foreground/90 mt-1">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
