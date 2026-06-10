import { 
  Sparkles, 
  Rocket, 
  Bug, 
  Globe, 
  Cpu, 
  Heart, 
  Shield, 
  Award, 
  Flame, 
  Zap, 
  Users, 
  Compass
} from "lucide-react";
import React from "react";

export interface Badge {
  id: string;
  name: string;
  category: "rare" | "tiered" | "custom";
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Special";
  description: string;
  lore: string;
  unlockedAt: string;
  colorName: string; // Tailwind color classes key
  iconName: string; // Lucide icon lookup string
  progressText?: string;
  rarityScore: string; // e.g. "Top 0.1%" or "Legacy"
}

export const BADGES: Badge[] = [
  {
    id: "github-star",
    name: "GitHub Star",
    category: "rare",
    tier: "Special",
    description: "Awarded to members of the GitHub Stars program for outstanding open-source AI community leadership.",
    lore: "Inducted in 2025 for exceptional contributions to the open-source community, particularly surrounding massive MIMO channel modeling and computer vision models.",
    unlockedAt: "Oct 2025",
    colorName: "gold",
    iconName: "Sparkles",
    rarityScore: "Top 0.01%"
  },
  {
    id: "mars-2020",
    name: "Mars Helicopter Contributor",
    category: "rare",
    tier: "Special",
    description: "Awarded to developers who contributed code used in NASA's Ingenuity Mars Helicopter mission.",
    lore: "Contributed mathematical optimizations and digital signal processing routines to open-source libraries that NASA integrated for Mars Ingenuity flight simulations.",
    unlockedAt: "Apr 2021",
    colorName: "mars",
    iconName: "Rocket",
    rarityScore: "Legacy / Unobtainable"
  },
  {
    id: "security-hunter",
    name: "Security Bug Hunter (Gold)",
    category: "rare",
    tier: "Gold",
    description: "Awarded to security researchers who discover and responsibly disclose critical vulnerabilities.",
    lore: "Successfully reported three high-severity memory leak vulnerabilities in network encryption layers, safeguarding open-source communication protocols.",
    unlockedAt: "Dec 2025",
    colorName: "orange",
    iconName: "Bug",
    rarityScore: "Top 0.8%"
  },
  {
    id: "arctic-vault",
    name: "Arctic Code Vault Contributor",
    category: "rare",
    tier: "Special",
    description: "Awarded to developers whose code was archived in the GitHub Arctic Code Vault to preserve open-source software for future generations.",
    lore: "Custom YOLO object tracking layers and PE file scanners were archived in the Arctic World Archive in Longyearbyen, Svalbard, on February 2, 2020.",
    unlockedAt: "Feb 2020",
    colorName: "teal",
    iconName: "Globe",
    rarityScore: "Legacy / Unobtainable"
  },
  {
    id: "pull-shark",
    name: "Pull Shark (Gold)",
    category: "tiered",
    tier: "Gold",
    description: "Awarded to developers who submit and merge a high number of pull requests.",
    lore: "Merged 148 pull requests across 6 major research repositories including MIMO networks, Flask APIs, and malware datasets.",
    unlockedAt: "Jan 2026",
    colorName: "cyan",
    iconName: "GitPullRequest",
    progressText: "148 / 128 PRs",
    rarityScore: "Top 2.5%"
  },
  {
    id: "galaxy-brain",
    name: "Galaxy Brain (Gold)",
    category: "tiered",
    tier: "Gold",
    description: "Awarded to developers whose answers are accepted in GitHub Discussions.",
    lore: "Had 18 answers marked as accepted solutions by community members seeking guidance on OpenCV matrices, PE file formats, and PyTorch tuning.",
    unlockedAt: "Nov 2025",
    colorName: "purple",
    iconName: "Award", // Use Award/Sparkles or separate mapping
    progressText: "18 / 16 answers",
    rarityScore: "Top 1.2%"
  },
  {
    id: "yolo",
    name: "YOLO (Bronze)",
    category: "tiered",
    tier: "Bronze",
    description: "Awarded to developers who merge a pull request without code reviews or CI validations.",
    lore: "Pushed a critical diagnostic patch directly to the PE classifier repository to fix a real-time memory leak during a live demonstration.",
    unlockedAt: "Jul 2025",
    colorName: "yellow",
    iconName: "Flame",
    rarityScore: "Top 45%"
  },
  {
    id: "quickdraw",
    name: "Quickdraw (Bronze)",
    category: "tiered",
    tier: "Bronze",
    description: "Awarded to developers who close an issue or merge a pull request within 5 minutes of creation.",
    lore: "Patched a CVE configuration mismatch and resolved the issue ticket in exactly 2 minutes and 48 seconds from report ingestion.",
    unlockedAt: "Aug 2025",
    colorName: "green",
    iconName: "Zap",
    rarityScore: "Top 15%"
  },
  {
    id: "pair-extraordinaire",
    name: "Pair Extraordinaire (Gold)",
    category: "tiered",
    tier: "Gold",
    description: "Awarded to developers who co-author commits on merged pull requests.",
    lore: "Collaborated on over 45 co-authored commits alongside fellow researchers at IIT Kanpur and IIT Ropar.",
    unlockedAt: "Feb 2026",
    colorName: "indigo",
    iconName: "Users",
    progressText: "45 / 30 commits",
    rarityScore: "Top 3.0%"
  },
  {
    id: "public-sponsor",
    name: "Public Sponsor",
    category: "tiered",
    tier: "Bronze",
    description: "Awarded to users who publicly sponsor open-source developers or projects.",
    lore: "Sponsors developers of open-source annotation software used in tumor boundary mapping pipelines.",
    unlockedAt: "Sep 2025",
    colorName: "pink",
    iconName: "Heart",
    rarityScore: "Top 8.0%"
  },
  {
    id: "luftballon",
    name: "Luftballon",
    category: "tiered",
    tier: "Bronze",
    description: "Awarded for contributing to a repository that uses Git LFS (Large File Storage).",
    lore: "Managed and versioned large model weights (.onnx / .pt) and dataset archives using Git LFS for signal processing pipelines.",
    unlockedAt: "Mar 2025",
    colorName: "sky",
    iconName: "Compass",
    rarityScore: "Top 12%"
  },
  {
    id: "mimo-architect",
    name: "MIMO CSI Architect",
    category: "custom",
    tier: "Special",
    description: "IIT Kanpur wireless communications research badge.",
    lore: "Developed massive MIMO wireless channel state information (CSI) self-attention feedback models.",
    unlockedAt: "Jun 2026",
    colorName: "gold",
    iconName: "Cpu",
    rarityScore: "IIT Research Badge"
  },
  {
    id: "tumor-analyst",
    name: "Breast Cancer Analyst",
    category: "custom",
    tier: "Special",
    description: "SeioPluse medical imaging architecture badge.",
    lore: "Engineered customized YOLOv8 model for clinical segmentation of breast cancer tumors with a 0.98 validated F1 score.",
    unlockedAt: "Nov 2025",
    colorName: "blue",
    iconName: "Heart",
    rarityScore: "Startup Founder Badge"
  },
  {
    id: "malware-dev",
    name: "Malware & SecOps Developer",
    category: "custom",
    tier: "Special",
    description: "SecOps Threat intelligence research badge.",
    lore: "Authored static malware PE-header classifier and automated server vulnerability scanner.",
    unlockedAt: "May 2025",
    colorName: "red",
    iconName: "Shield",
    rarityScore: "Cybersecurity Badge"
  },
  {
    id: "iit-scholar",
    name: "IIT Research Scholar",
    category: "custom",
    tier: "Special",
    description: "IIT Kanpur and IIT Ropar joint internship badge.",
    lore: "Awarded for dual research positions in deep learning, wireless networks, and parameter tuning.",
    unlockedAt: "May 2026",
    colorName: "purple",
    iconName: "Award",
    rarityScore: "Academic Badge"
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case "Sparkles": return Sparkles;
    case "Rocket": return Rocket;
    case "Bug": return Bug;
    case "Globe": return Globe;
    case "Cpu": return Cpu;
    case "Heart": return Heart;
    case "Shield": return Shield;
    case "Award": return Award;
    case "Flame": return Flame;
    case "Zap": return Zap;
    case "Users": return Users;
    case "Compass": return Compass;
    default: return Award;
  }
};

export const badgeStyles: Record<string, {
  border: string;
  bg: string;
  text: string;
  gradient: string;
}> = {
  gold: {
    border: "border-yellow-500/30 hover:border-yellow-500",
    bg: "bg-yellow-400/5 hover:bg-yellow-400/10",
    text: "text-yellow-400",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent"
  },
  mars: {
    border: "border-red-600/30 hover:border-red-500",
    bg: "bg-red-500/5 hover:bg-red-500/10",
    text: "text-red-500",
    gradient: "from-red-600/20 via-orange-600/10 to-transparent"
  },
  orange: {
    border: "border-orange-600/30 hover:border-orange-500",
    bg: "bg-orange-500/5 hover:bg-orange-500/10",
    text: "text-orange-400",
    gradient: "from-orange-500/20 via-amber-600/10 to-transparent"
  },
  teal: {
    border: "border-teal-600/30 hover:border-teal-500",
    bg: "bg-teal-500/5 hover:bg-teal-500/10",
    text: "text-teal-400",
    gradient: "from-teal-500/20 via-emerald-600/10 to-transparent"
  },
  cyan: {
    border: "border-cyan-600/30 hover:border-cyan-500",
    bg: "bg-cyan-500/5 hover:bg-cyan-500/10",
    text: "text-cyan-400",
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent"
  },
  purple: {
    border: "border-purple-600/30 hover:border-purple-500",
    bg: "bg-purple-500/5 hover:bg-purple-500/10",
    text: "text-purple-400",
    gradient: "from-purple-500/20 via-fuchsia-600/10 to-transparent"
  },
  yellow: {
    border: "border-yellow-600/30 hover:border-yellow-500",
    bg: "bg-yellow-500/5 hover:bg-yellow-500/10",
    text: "text-yellow-400",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent"
  },
  green: {
    border: "border-green-600/30 hover:border-green-500",
    bg: "bg-green-500/5 hover:bg-green-500/10",
    text: "text-green-400",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent"
  },
  indigo: {
    border: "border-indigo-600/30 hover:border-indigo-500",
    bg: "bg-indigo-500/5 hover:bg-indigo-500/10",
    text: "text-indigo-400",
    gradient: "from-indigo-500/20 via-blue-600/10 to-transparent"
  },
  pink: {
    border: "border-pink-600/30 hover:border-pink-500",
    bg: "bg-pink-500/5 hover:bg-pink-500/10",
    text: "text-pink-400",
    gradient: "from-pink-500/20 via-rose-600/10 to-transparent"
  },
  sky: {
    border: "border-sky-600/30 hover:border-sky-500",
    bg: "bg-sky-500/5 hover:bg-sky-500/10",
    text: "text-sky-400",
    gradient: "from-sky-500/20 via-cyan-600/10 to-transparent"
  },
  blue: {
    border: "border-blue-600/30 hover:border-blue-500",
    bg: "bg-blue-500/5 hover:bg-blue-500/10",
    text: "text-blue-400",
    gradient: "from-blue-500/20 via-indigo-600/10 to-transparent"
  },
  red: {
    border: "border-red-600/30 hover:border-red-500",
    bg: "bg-red-500/5 hover:bg-red-500/10",
    text: "text-red-500",
    gradient: "from-red-500/20 via-rose-600/10 to-transparent"
  }
};
