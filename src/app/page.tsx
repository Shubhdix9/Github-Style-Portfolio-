"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Heatmap from "@/components/Heatmap";
import { BADGES, badgeStyles, getIcon } from "@/data/badges";
import Terminal from "@/components/Terminal";
import CopilotChat from "@/components/CopilotChat";
import NeuralBackground from "@/components/NeuralBackground";
import CommandPalette from "@/components/CommandPalette";
import { 
  BookOpen, 
  GitFork, 
  Star, 
  FolderGit2, 
  FileCode, 
  Award, 
  Terminal as TermIcon, 
  Sparkles,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Sun,
  Moon,
  ExternalLink,
  Clipboard,
  Check,
  ChevronRight,
  TrendingUp,
  Sliders,
  FileCheck,
  Users,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  langColor: string;
  updatedAt: string;
  isStarred?: boolean;
  isForked?: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Custom states for starring and copying citations
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState(384);

  // Global lifted heatmap and resume modal states
  const [extraCommits, setExtraCommits] = useState<Record<string, number>>({});
  const [totalSimulated, setTotalSimulated] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Selected badge state for the achievements showcase
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [badgeFilter, setBadgeFilter] = useState<"all" | "rare" | "tiered" | "custom">("all");
  const [shareToastOpen, setShareToastOpen] = useState(false);

  const celebrateBadge = (badgeColor: string) => {
    let colors = ["#ff58a6", "#ffb3d9", "#ffffff"]; // fallback pink
    if (badgeColor === "gold") colors = ["#ffd700", "#ffaa00", "#ffffff"];
    else if (badgeColor === "mars") colors = ["#ff4500", "#ff8c00", "#ff0000"];
    else if (badgeColor === "orange") colors = ["#ff8c00", "#ffa500", "#ffffff"];
    else if (badgeColor === "teal") colors = ["#008080", "#20b2aa", "#e0ffff"];
    else if (badgeColor === "cyan") colors = ["#00ffff", "#00bfff", "#ffffff"];
    else if (badgeColor === "purple") colors = ["#800080", "#da70d6", "#ffffff"];
    else if (badgeColor === "yellow") colors = ["#ffff00", "#ffd700", "#f0e68c"];
    else if (badgeColor === "green") colors = ["#008000", "#00ff00", "#adff2f"];
    else if (badgeColor === "indigo") colors = ["#4b0082", "#8a2be2", "#ffffff"];
    else if (badgeColor === "pink") colors = ["#ffc0cb", "#ff69b4", "#ff1493"];
    else if (badgeColor === "sky") colors = ["#87ceeb", "#00bfff", "#ffffff"];
    else if (badgeColor === "blue") colors = ["#0000ff", "#1e90ff", "#ffffff"];
    else if (badgeColor === "red") colors = ["#ff0000", "#dc143c", "#ffffff"];

    confetti({
      particleCount: 100,
      spread: 70,
      colors: colors,
      origin: { y: 0.7 }
    });
  };

  const handleCellClick = (dateStr: string) => {
    setExtraCommits(prev => ({
      ...prev,
      [dateStr]: (prev[dateStr] || 0) + 1
    }));
    setTotalSimulated(prev => prev + 1);

    const currentTotal = (extraCommits[dateStr] || 0) + 1;
    if (currentTotal % 5 === 0) {
      confetti({
        particleCount: 20,
        spread: 30,
        colors: ["#39d353", "#26a641", "#58a6ff"]
      });
    }
  };

  const handleSimulateCommit = () => {
    const endDate = new Date(2026, 5, 8); // June 8, 2026
    const randomOffset = Math.floor(Math.random() * 365);
    const targetDate = new Date(endDate);
    targetDate.setDate(endDate.getDate() - randomOffset);
    const dateStr = targetDate.toISOString().split("T")[0];
    handleCellClick(dateStr);
  };

  // Initial repositories data state
  const [repos, setRepos] = useState<Repository[]>([
    {
      id: "cancer-det",
      name: "ai-breast-cancer-detector",
      description: "Clinical-grade tumor segmentation platform using YOLOv8 and Flask. Features edge inference mapping, diagnostic verification, and micro-service triggers.",
      stars: 48,
      forks: 12,
      language: "Python",
      langColor: "#3572A5",
      updatedAt: "3 days ago"
    },
    {
      id: "csi-mimo",
      name: "mimo-csi-feedback-transformer",
      description: "Transformer-based compression layer for Massive MIMO communication systems. Implements self-attention channels and compression encoding.",
      stars: 36,
      forks: 8,
      language: "Jupyter Notebook",
      langColor: "#DA5B0B",
      updatedAt: "1 week ago"
    },
    {
      id: "malware-cls",
      name: "pe-static-malware-classifier",
      description: "Machine learning classifier designed to analyze executable metadata (PE files) and detect malicious signatures using XGBoost and Scikit-Learn.",
      stars: 24,
      forks: 5,
      language: "Python",
      langColor: "#3572A5",
      updatedAt: "2 weeks ago"
    },
    {
      id: "gest-guitar",
      name: "hand-gesture-virtual-guitar",
      description: "Computer vision virtual music controller tracking hand gestures via MediaPipe and OpenCV, translating vector coordinates to midi audio.",
      stars: 18,
      forks: 3,
      language: "Python",
      langColor: "#3572A5",
      updatedAt: "1 month ago"
    }
  ]);

  // Visitor counter loader
  useEffect(() => {
    const stored = localStorage.getItem("shubh_portfolio_visitors");
    if (stored) {
      const num = parseInt(stored, 10) + 1;
      setVisitorCount(num);
      localStorage.setItem("shubh_portfolio_visitors", num.toString());
    } else {
      localStorage.setItem("shubh_portfolio_visitors", "384");
    }
  }, []);

  const handleStarRepo = (id: string) => {
    setRepos(prev => prev.map(r => {
      if (r.id === id) {
        const nextStarred = !r.isStarred;
        if (nextStarred) {
          confetti({
            particleCount: 15,
            spread: 20,
            origin: { y: 0.6 }
          });
        }
        return {
          ...r,
          stars: nextStarred ? r.stars + 1 : r.stars - 1,
          isStarred: nextStarred
        };
      }
      return r;
    }));
  };

  const handleForkRepo = (id: string) => {
    setRepos(prev => prev.map(r => {
      if (r.id === id && !r.isForked) {
        confetti({
          particleCount: 30,
          spread: 40
        });
        return {
          ...r,
          forks: r.forks + 1,
          isForked: true
        };
      }
      return r;
    }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const copyCitation = (bibtex: string, id: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter repositories based on search queries and language dropdown
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = langFilter === "All" || repo.language === langFilter;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="min-h-screen relative flex flex-col pb-16">
      {/* Decorative Particle Network Background */}
      <NeuralBackground />

      {/* GLOBAL COMMAND PALETTE LAUNCHER */}
      <CommandPalette onTabChange={setActiveTab} onViewResume={() => setIsResumeOpen(true)} />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-[100] border-b border-card-border bg-[#161b22] px-4 py-2.5 flex items-center justify-between text-sm select-none">
        <div className="flex items-center gap-3 w-full max-w-xl">
          {/* Logo link */}
          <div className="cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab("overview")}>
            <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" className="fill-foreground">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.47.01.84.01.93 0 .22-.15.47-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </div>

          {/* Search Trigger */}
          <div className="relative flex-1 group hidden sm:block">
            <div 
              onClick={() => {
                // Focus command palette via hotkey simulation
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
              }}
              className="w-full flex items-center justify-between border border-card-border rounded-md px-3 py-1.5 bg-[#0d1117] text-gh-grey hover:border-gh-blue cursor-pointer select-none text-xs"
            >
              <span className="flex items-center gap-1.5">
                <Search size={14} />
                Search or jump to...
              </span>
              <kbd className="border border-card-border bg-card-bg px-1.5 py-0.5 rounded font-mono text-[9px]">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Action Panel Icons */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <div className="relative">
            <button 
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUnreadNotifications(0);
              }}
              className="text-foreground hover:text-gh-blue cursor-pointer p-1.5 rounded hover:bg-gh-btn-hover transition-colors relative"
            >
              <Bell size={18} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-gh-blue rounded-full" />
              )}
            </button>

            {/* Notification Drawer */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-card-bg border border-card-border rounded-lg shadow-2xl p-3 z-[110] text-xs leading-relaxed animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-card-border pb-2 mb-2 font-semibold">
                  <span>Inbox Notifications</span>
                  <span className="text-[10px] text-gh-grey font-normal">Mark all read</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="border-b border-card-border/50 pb-2">
                    <span className="font-semibold block text-gh-blue">IIT Kanpur Research Gate</span>
                    <p className="text-foreground/90 mt-0.5">MIMO CSI feedback compression transformer module weights validated successfully.</p>
                  </div>
                  <div>
                    <span className="font-semibold block text-gh-green">SeioPluse Health Diagnostics</span>
                    <p className="text-foreground/90 mt-0.5">Inference calibration maps for breast cancer diagnostics updated to YOLOv8s.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* New Item Dropdown */}
          <button className="text-foreground hover:text-gh-blue cursor-pointer p-1.5 rounded hover:bg-gh-btn-hover transition-colors hidden sm:block">
            <Plus size={18} />
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="text-foreground hover:text-gh-blue cursor-pointer p-1.5 rounded hover:bg-gh-btn-hover transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Profile dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              <div className="h-6 w-6 rounded-full border border-card-border overflow-hidden bg-card-bg">
                <img src="https://github.com/Shubhdix9.png" alt="Shubh Dixit" className="h-full w-full object-cover" />
              </div>
              <ChevronDown size={14} className="text-gh-grey" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-card-border rounded-lg shadow-2xl z-[110] py-1 text-xs select-none animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-card-border">
                  <p className="text-gh-grey">Signed in as</p>
                  <p className="font-semibold text-foreground truncate">Shubhdix9</p>
                </div>
                <div className="py-1">
                  <a href="#overview" onClick={() => { setActiveTab("overview"); setProfileDropdownOpen(false); }} className="block px-3 py-2 hover:bg-gh-btn-hover text-foreground">Your Profile</a>
                  <a href="#projects" onClick={() => { setActiveTab("projects"); setProfileDropdownOpen(false); }} className="block px-3 py-2 hover:bg-gh-btn-hover text-foreground">Your Repositories</a>
                  <a href="#research" onClick={() => { setActiveTab("research"); setProfileDropdownOpen(false); }} className="block px-3 py-2 hover:bg-gh-btn-hover text-foreground">Research Works</a>
                </div>
                <div className="border-t border-card-border py-1">
                  <span className="block px-3 py-2 text-gh-grey">v2026.06.08</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CORE PORTFOLIO BODY CONTAINER */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-8 mt-6 flex-1 flex flex-col md:flex-row gap-6 relative z-10 w-full">
        {/* Profile Sidebar */}
        <Sidebar 
          onTabChange={setActiveTab} 
          onBadgeClick={(badgeId) => {
            setActiveTab("stats");
            setSelectedBadgeId(badgeId);
          }}
        />

        {/* Tab Content & Subheaders */}
        <div className="flex-1 min-w-0">
          
          {/* PREMIUM HERO BANNER (VERCEL/GITHUB AESTHETIC) */}
          <div className="border border-card-border bg-[#161b22]/40 rounded-xl p-6 mb-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
            {/* Ambient background glow */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-gh-blue/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <span className="text-[10px] font-mono text-gh-blue bg-gh-blue/5 border border-gh-blue/20 rounded px-2.5 py-0.5 tracking-wider uppercase font-semibold">
              Research Portfolio & Developer Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-3 tracking-tight">
              Shubh Dixit
            </h2>
            <p className="text-sm text-gh-grey mt-1 font-semibold">
              AI Research Intern • Cybersecurity Developer • Founder
            </p>
            <p className="text-xs sm:text-sm text-foreground/85 mt-3 leading-relaxed max-w-2xl font-sans">
              Building intelligent systems at the intersection of Artificial Intelligence, Computer Vision, Wireless Communication, and Cybersecurity.
            </p>
            
            {/* HERO CTA BUTTONS */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setActiveTab("projects")}
                className="bg-gh-blue hover:bg-gh-blue/90 text-white text-xs font-bold py-2 px-4 rounded border border-transparent cursor-pointer transition-all flex items-center gap-1.5"
              >
                <FolderGit2 size={14} />
                View Projects
              </button>
              <button 
                onClick={() => setIsResumeOpen(true)}
                className="bg-gh-btn-hover hover:border-gh-blue border border-card-border text-foreground text-xs font-bold py-2 px-4 rounded cursor-pointer transition-all flex items-center gap-1.5"
              >
                <FileCode size={14} className="text-gh-blue" />
                View / Export Resume
              </button>
              <button 
                onClick={() => setActiveTab("assistant")}
                className="bg-gh-btn-hover hover:border-gh-blue border border-card-border text-foreground text-xs font-bold py-2 px-4 rounded cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-gh-green" />
                Contact Me (AI Chat)
              </button>
            </div>
          </div>

          {/* TAB SELECTION STRIP (GITHUB STYLE) */}
          <nav className="flex items-center gap-1 border-b border-card-border pb-px overflow-x-auto select-none no-scrollbar mb-6">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "overview" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <BookOpen size={16} />
              <span>Overview</span>
            </button>

            <button 
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "projects" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <FolderGit2 size={16} />
              <span>Repositories & Projects</span>
              <span className="bg-card-border text-foreground px-1.5 py-0.5 rounded-full text-xs font-semibold">{repos.length}</span>
            </button>

            <button 
              onClick={() => setActiveTab("research")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "research" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <Sliders size={16} />
              <span>Research & Experience</span>
            </button>

            <button 
              onClick={() => setActiveTab("publications")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "publications" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <FileCode size={16} />
              <span>Publications & Notes</span>
            </button>

            <button 
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "stats" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <Award size={16} />
              <span>Stats & Impact</span>
            </button>

            <button 
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "terminal" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <TermIcon size={16} />
              <span>Terminal CLI</span>
            </button>

            <button 
              onClick={() => setActiveTab("assistant")}
              className={`flex items-center gap-2 px-3 py-2.5 border-b-2 text-sm font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === "assistant" 
                  ? "border-orange-500 text-foreground" 
                  : "border-transparent text-gh-grey hover:text-foreground hover:border-card-border/80"
              }`}
            >
              <Sparkles size={16} className="text-gh-blue" />
              <span>Copilot Chat</span>
            </button>
          </nav>

          {/* ACTIVE TAB VIEWS */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* README PROFILE INTRO */}
              <div className="border border-card-border bg-card-bg rounded-lg overflow-hidden font-sans">
                <div className="bg-[#161b22] px-4 py-2 border-b border-card-border flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-gh-grey flex items-center gap-1.5">
                    <FileCode size={14} />
                    README.md
                  </span>
                  <span className="text-[10px] text-gh-blue bg-gh-blue/5 border border-gh-blue/20 rounded px-1.5 py-0.5">
                    Active
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Hello there, I'm Shubh Dixit! 👋</h2>
                    <p className="text-sm leading-relaxed text-foreground/95">
                      I am an AI Research Intern and Cybersecurity Developer focused on Computer Vision, Deep Learning, Wireless Communication Systems, and Security Engineering. My work bridges the gap between deep mathematical modeling and production-level microservice delivery.
                    </p>
                  </div>

                  {/* TECH RADAR BADGES */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Python", "PyTorch", "YOLOv8", "Transformers", "OpenCV", "Next.js", "React", "Docker", "Linux", "Cybersecurity", "AWS", "Kubernetes"].map((badge, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded bg-[#0d1117] border border-card-border font-mono text-gh-blue select-none">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-card-border pt-4 text-sm space-y-2.5">
                    <p className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-gh-grey" />
                      <span>Currently conducting computer vision & signal compression research with <strong>IIT Kanpur</strong> and <strong>IIT Ropar</strong>.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-gh-grey" />
                      <span>Building clinical diagnostics workflows for cancer segmentation through <strong>SeioPluse</strong>.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-gh-grey" />
                      <span>Experienced with Kali Linux environments, static malware disassembly, and network traffic parsing.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* PINNED REPOSITORIES (FEATURED PROJECTS) */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Pinned repositories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {repos.slice(0, 4).map(repo => (
                    <div key={repo.id} className="border border-card-border bg-card-bg rounded-lg p-4 flex flex-col justify-between hover:border-gh-blue transition-colors group">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gh-blue text-sm hover:underline cursor-pointer flex items-center gap-1">
                            <FolderGit2 size={14} className="text-foreground shrink-0" />
                            {repo.name}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-gh-grey">
                            <button 
                              onClick={() => handleStarRepo(repo.id)} 
                              className={`flex items-center gap-1 px-1.5 py-0.5 border border-card-border bg-background rounded hover:bg-gh-btn-hover cursor-pointer transition-colors ${
                                repo.isStarred ? "text-yellow-500 border-yellow-500/30" : "text-gh-grey"
                              }`}
                            >
                              <Star size={12} className={repo.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
                              <span>{repo.stars}</span>
                            </button>
                            <button 
                              onClick={() => handleForkRepo(repo.id)} 
                              className="flex items-center gap-1 px-1.5 py-0.5 border border-card-border bg-background rounded hover:bg-gh-btn-hover cursor-pointer transition-colors"
                            >
                              <GitFork size={12} />
                              <span>{repo.forks}</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gh-grey mb-4 leading-relaxed font-sans line-clamp-2">
                          {repo.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gh-grey">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full inline-block" style={{ backgroundColor: repo.langColor }} />
                          {repo.language}
                        </span>
                        <span>Updated {repo.updatedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTERACTIVE HEATMAP */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Contributions</h3>
                <Heatmap 
                  extraCommits={extraCommits}
                  onCellClick={handleCellClick}
                  onSimulateCommit={handleSimulateCommit}
                  totalSimulated={totalSimulated}
                />
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Repos Search & Filters Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-card-border pb-4 select-none">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0d1117] border border-card-border rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-gh-blue placeholder-gh-grey/60 text-foreground"
                    placeholder="Find a repository..."
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gh-grey" />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={langFilter}
                    onChange={(e) => setLangFilter(e.target.value)}
                    className="bg-card-bg border border-card-border rounded-md px-3 py-1.5 text-xs text-foreground font-mono focus:outline-none focus:border-gh-blue cursor-pointer"
                  >
                    <option value="All">Language: All</option>
                    <option value="Python">Python</option>
                    <option value="Jupyter Notebook">Jupyter Notebook</option>
                  </select>
                </div>
              </div>

              {/* Repositories grid */}
              <div className="divide-y divide-card-border">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map(repo => (
                    <div key={repo.id} className="py-6 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="font-semibold text-lg text-gh-blue hover:underline cursor-pointer flex items-center gap-1.5">
                            <FolderGit2 size={16} className="text-foreground" />
                            {repo.name}
                          </span>
                          <span className="text-[10px] font-mono text-gh-grey border border-card-border px-1.5 py-0.5 rounded bg-background">
                            Public
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gh-grey leading-relaxed mb-3 font-sans">
                          {repo.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gh-grey flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                            {repo.language}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={14} />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={14} />
                            {repo.forks}
                          </span>
                          <span>Updated {repo.updatedAt}</span>
                        </div>
                      </div>

                      {/* Side buttons */}
                      <div className="flex items-start gap-2 shrink-0 select-none">
                        <button
                          onClick={() => handleStarRepo(repo.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold bg-background hover:bg-gh-btn-hover transition-colors cursor-pointer ${
                            repo.isStarred ? "text-yellow-500 border-yellow-500/30" : "text-foreground border-card-border"
                          }`}
                        >
                          <Star size={14} className={repo.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
                          <span>{repo.isStarred ? "Starred" : "Star"}</span>
                        </button>
                        <button
                          onClick={() => handleForkRepo(repo.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-card-border text-xs font-semibold bg-background hover:bg-gh-btn-hover transition-colors cursor-pointer text-foreground ${
                            repo.isForked ? "opacity-60" : ""
                          }`}
                          disabled={repo.isForked}
                        >
                          <GitFork size={14} />
                          <span>{repo.isForked ? "Forked" : "Fork"}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gh-grey font-mono text-xs">
                    No matching repositories found.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "research" && (
            <div className="space-y-6 animate-in fade-in duration-300 font-sans">
              
              {/* STARTUP SHOWCASE (SEIOPLUSE) */}
              <div className="border border-card-border bg-card-bg rounded-lg overflow-hidden relative">
                {/* Neon blue gradient glow border overlay */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gh-blue" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <span className="text-[10px] font-mono text-gh-blue bg-gh-blue/5 border border-gh-blue/20 rounded px-2 py-0.5 uppercase tracking-wider font-semibold">
                        Startup Initiative
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-2">SeioPluse</h3>
                      <p className="text-sm font-semibold text-gh-grey mt-0.5">Founder & AI Engineer • 2025 - Present</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gh-blue bg-gh-blue/5 border border-gh-blue/20 rounded px-2.5 py-1">
                      Healthcare AI
                    </span>
                  </div>

                  <p className="text-sm text-foreground/90 mt-4 leading-relaxed">
                    Building AI-powered healthcare technologies targeting early breast cancer diagnostics and oncology assistance. Engineered a custom **YOLOv8 boundary-segmentation pipeline** deployed in diagnostic interfaces.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
                    <div className="border border-card-border/50 bg-[#0d1117]/60 rounded p-3 text-center">
                      <span className="text-xs text-gh-grey block">Algorithm</span>
                      <span className="font-mono text-sm font-semibold text-gh-blue">YOLOv8 Segmentation</span>
                    </div>
                    <div className="border border-card-border/50 bg-[#0d1117]/60 rounded p-3 text-center">
                      <span className="text-xs text-gh-grey block">F1-Score</span>
                      <span className="font-mono text-sm font-semibold text-gh-green">~0.98 accuracy</span>
                    </div>
                    <div className="border border-card-border/50 bg-[#0d1117]/60 rounded p-3 text-center">
                      <span className="text-xs text-gh-grey block">Stack</span>
                      <span className="font-mono text-sm font-semibold text-purple-400">Flask + PyTorch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE SECTION */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Work Experience & Internships</h3>
                <div className="relative pl-6 border-l border-card-border space-y-8 select-text">
                  
                  {/* IIT ROPAR */}
                  <div className="relative">
                    {/* Circle Node */}
                    <div className="absolute -left-[30px] top-1 h-2 w-2 rounded-full bg-gh-blue ring-4 ring-[#0d1117]" />
                    <div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">IIT Ropar</h4>
                        <span className="text-xs font-mono text-gh-grey">May 2026 – Present</span>
                      </div>
                      <p className="text-xs text-gh-blue font-mono font-medium">Research Intern • Computer Vision Lab</p>
                      
                      <ul className="text-xs text-foreground/90 mt-3 list-disc pl-4 space-y-1.5 leading-relaxed">
                        <li>Conducting core **Computer Vision Research** and custom CNN architecture building.</li>
                        <li>Implementing **deep learning optimizations** including parameter tuning, layer pruning, and quantization scripts in PyTorch.</li>
                        <li>Automating dataset pipelines using OpenCV libraries to handle large scale object segmentation.</li>
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                        {["PyTorch", "YOLO", "OpenCV", "Python"].map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] border border-card-border text-gh-grey">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* IIT KANPUR */}
                  <div className="relative">
                    {/* Circle Node */}
                    <div className="absolute -left-[30px] top-1 h-2 w-2 rounded-full bg-gh-blue ring-4 ring-[#0d1117]" />
                    <div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">IIT Kanpur</h4>
                        <span className="text-xs font-mono text-gh-grey">May 2026 – Present</span>
                      </div>
                      <p className="text-xs text-gh-blue font-mono font-medium">Research Intern • Wireless Communications Dept.</p>
                      
                      <ul className="text-xs text-foreground/90 mt-3 list-disc pl-4 space-y-1.5 leading-relaxed">
                        <li>Researching **Transformer-Empowered CSI Feedback Compression** frameworks for Massive MIMO wireless networks.</li>
                        <li>Building **Neural Self-Attention Models** to compress high-dimensional CSI channel data to minimize latency.</li>
                        <li>Conducting tensor computation profiling and signal reconstruction benchmarks in PyTorch environments.</li>
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                        {["PyTorch", "Transformers", "Wireless Communications", "Deep Learning"].map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] border border-card-border text-gh-grey">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* EDUCATIONTIMELINE */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Education</h3>
                <div className="relative pl-6 border-l border-card-border space-y-8 select-text">
                  
                  {/* JKLU */}
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 h-2 w-2 rounded-full bg-gh-grey ring-4 ring-[#0d1117]" />
                    <div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">JK Lakshmipat University (JKLU)</h4>
                        <span className="text-xs font-mono text-gh-grey">2025 – Present</span>
                      </div>
                      <p className="text-xs text-gh-blue font-mono">B.Tech Computer Science & Engineering</p>
                      <p className="text-xs text-gh-grey mt-1">Highlights: 50% Academic Merit Scholarship • Specialized focus in AI and Machine Learning models.</p>
                    </div>
                  </div>

                  {/* IIIT DELHI */}
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 h-2 w-2 rounded-full bg-gh-grey ring-4 ring-[#0d1117]" />
                    <div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">IIIT Delhi</h4>
                        <span className="text-xs font-mono text-gh-grey">2026</span>
                      </div>
                      <p className="text-xs text-gh-blue font-mono">Semester Exchange Program</p>
                      <p className="text-xs text-gh-grey mt-1">Focus on advanced communication systems, signal processing and networking architectures.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {activeTab === "publications" && (
            <div className="space-y-6 animate-in fade-in duration-300 select-text">
              
              {/* RESEARCH PAPERS SECTION */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Research Publication Showcase</h3>
                <div className="space-y-4">
                  {/* Paper 1 */}
                  <div className="border border-card-border bg-card-bg rounded-lg p-5 flex flex-col justify-between hover:border-gh-blue transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                        <span className="text-[10px] font-mono text-gh-green bg-gh-green/5 border border-gh-green/20 rounded px-2 py-0.5">
                          IEEE Wireless Communications
                        </span>
                        <span className="text-[10px] font-mono text-gh-grey">Submitted / Peer Review</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-base leading-snug">
                        Transformer-Empowered CSI Feedback Compression for Massive MIMO Systems
                      </h4>
                      <p className="text-xs text-gh-grey mt-1">
                        Shubh Dixit, et al. • IIT Kanpur Research Initiative
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/80 mt-3 font-sans leading-relaxed">
                        Abstract: Compressing high-dimensional Channel State Information (CSI) matrices is vital to lower spatial encoding overhead in Massive MIMO routers. We introduce a spatial self-attention network leveraging custom transformer encoders that maps CSI tensors into lower latent spaces.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-card-border/50 pt-4 mt-4 select-none">
                      <div className="flex flex-wrap gap-1.5">
                        {["MIMO", "Transformers", "CSI feedback", "PyTorch"].map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] border border-card-border text-gh-grey">{t}</span>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => copyCitation(
                          `@article{dixit2026csi,
  title={Transformer-Empowered CSI Feedback Compression for Massive MIMO Systems},
  author={Dixit, Shubh and others},
  journal={IIT Kanpur Technical Reports},
  year={2026}
}`, "paper1"
                        )}
                        className="text-xs py-1.5 px-3 rounded border border-card-border hover:border-gh-blue hover:text-gh-blue bg-background flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
                      >
                        {copiedId === "paper1" ? <Check size={14} className="text-gh-green" /> : <Clipboard size={14} />}
                        <span>{copiedId === "paper1" ? "Copied BibTeX" : "Copy BibTeX"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Paper 2 */}
                  <div className="border border-card-border bg-card-bg rounded-lg p-5 flex flex-col justify-between hover:border-gh-blue transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                        <span className="text-[10px] font-mono text-gh-green bg-gh-green/5 border border-gh-green/20 rounded px-2 py-0.5">
                          Oncology & CV Internals
                        </span>
                        <span className="text-[10px] font-mono text-gh-grey">Working Draft</span>
                      </div>
                      <h4 className="font-semibold text-foreground text-base leading-snug">
                        Ultralytic Tumor Boundary Segmentation: Clinical Diagnostics via Tuned YOLOv8 Model Sets
                      </h4>
                      <p className="text-xs text-gh-grey mt-1">
                        Shubh Dixit • SeioPluse Oncology Research
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/80 mt-3 font-sans leading-relaxed">
                        Abstract: Diagnostic verification of early breast cancer is accelerated using boundary segmentation models. This paper details the performance metrics of custom calibrated YOLOv8 segmentation algorithms, validating a robust F1 metric score of 0.98.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-card-border/50 pt-4 mt-4 select-none">
                      <div className="flex flex-wrap gap-1.5">
                        {["YOLOv8", "Oncology AI", "Flask segmentation", "OpenCV"].map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] border border-card-border text-gh-grey">{t}</span>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => copyCitation(
                          `@article{dixit2026yolo,
  title={Ultralytic Tumor Boundary Segmentation: Clinical Diagnostics via Tuned YOLOv8 Model Sets},
  author={Dixit, Shubh},
  journal={SeioPluse Healthcare Tech},
  year={2026}
}`, "paper2"
                        )}
                        className="text-xs py-1.5 px-3 rounded border border-card-border hover:border-gh-blue hover:text-gh-blue bg-background flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
                      >
                        {copiedId === "paper2" ? <Check size={14} className="text-gh-green" /> : <Clipboard size={14} />}
                        <span>{copiedId === "paper2" ? "Copied BibTeX" : "Copy BibTeX"}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* BLOG NOTES / MARKDOWN WORKSPACE */}
              <div className="border border-card-border bg-[#0d1117] rounded-lg overflow-hidden font-sans mt-6">
                <div className="bg-[#161b22] px-4 py-2 border-b border-card-border">
                  <h4 className="text-xs font-mono font-semibold text-gh-grey flex items-center gap-1.5">
                    <BookOpen size={14} />
                    Research Notes Workspace
                  </h4>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
                  {/* Blog 1 */}
                  <div className="border border-card-border bg-card-bg rounded p-4 hover:border-gh-blue cursor-pointer transition-colors">
                    <span className="text-[10px] font-mono text-purple-400 block mb-1">June 2, 2026</span>
                    <h5 className="font-semibold text-foreground text-sm hover:underline">Self-Attention CSI Matrices in Base-Stations</h5>
                    <p className="text-xs text-gh-grey mt-2 line-clamp-2">Explaining spatial correlation matrices in massive MIMO feedback channels and why vanilla transformer layers require specific positional tags.</p>
                  </div>
                  {/* Blog 2 */}
                  <div className="border border-card-border bg-card-bg rounded p-4 hover:border-gh-blue cursor-pointer transition-colors">
                    <span className="text-[10px] font-mono text-purple-400 block mb-1">May 24, 2026</span>
                    <h5 className="font-semibold text-foreground text-sm hover:underline">Feature Engineering on PE Malware Headers</h5>
                    <p className="text-xs text-gh-grey mt-2 line-clamp-2">How we parse PE file structures to train an XGBoost malware classifier. Extracting DLL directories, section sizes, and import tables.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6 animate-in fade-in duration-300 font-sans">
              
              {/* METRICS DASHBOARD CARD */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
                  <TrendingUp className="mx-auto text-gh-blue mb-2" size={24} />
                  <span className="text-2xl font-bold text-foreground font-mono block">2+</span>
                  <span className="text-[11px] text-gh-grey uppercase tracking-wider font-semibold">Research Internships</span>
                </div>
                <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
                  <FolderGit2 className="mx-auto text-gh-green mb-2" size={24} />
                  <span className="text-2xl font-bold text-foreground font-mono block">12+</span>
                  <span className="text-[11px] text-gh-grey uppercase tracking-wider font-semibold">Models Trained</span>
                </div>
                <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
                  <FileCheck className="mx-auto text-purple-400 mb-2" size={24} />
                  <span className="text-2xl font-bold text-foreground font-mono block">2</span>
                  <span className="text-[11px] text-gh-grey uppercase tracking-wider font-semibold">Research Papers</span>
                </div>
                <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
                  <Award className="mx-auto text-yellow-500 mb-2" size={24} />
                  <span className="text-2xl font-bold text-foreground font-mono block">4</span>
                  <span className="text-[11px] text-gh-grey uppercase tracking-wider font-semibold">Scholarships</span>
                </div>
                <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
                  <GitFork className="mx-auto text-pink-400 mb-2" size={24} />
                  <span className="text-2xl font-bold text-foreground font-mono block">{450 + totalSimulated}+</span>
                  <span className="text-[11px] text-gh-grey uppercase tracking-wider font-semibold">Commits / Year</span>
                </div>
                <div className="border border-card-border bg-card-bg rounded-lg p-4 text-center">
                  <Users className="mx-auto text-teal-400 mb-2" size={24} />
                  <span className="text-2xl font-bold text-foreground font-mono block">{visitorCount}</span>
                  <span className="text-[11px] text-gh-grey uppercase tracking-wider font-semibold">Site Visitors</span>
                </div>
              </div>

              {/* SIMULATED GITHUB README STATS CARD */}
              <div className="border border-card-border bg-card-bg rounded-lg p-6 font-mono text-xs select-none">
                <h3 className="text-sm font-semibold text-foreground mb-4 font-sans">GitHub Readme Stats Overview</h3>
                <div className="border border-card-border bg-[#0d1117] rounded-lg p-5 max-w-lg mx-auto shadow-inner relative overflow-hidden flex flex-col gap-3.5">
                  {/* Decorative glowing gradient */}
                  <div className="absolute right-0 top-0 w-32 h-32 bg-gh-blue/5 rounded-full filter blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-card-border/60 pb-2.5">
                    <span className="text-base font-semibold text-gh-blue">ShubhDix9's GitHub Stats</span>
                    <span className="text-xs font-bold text-[#39d353] border border-[#39d353]/30 px-2 py-0.5 rounded bg-[#39d353]/5">
                      Rank: A++
                    </span>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gh-grey">Total Stars Earned:</span>
                      <span className="text-foreground font-semibold">126</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gh-grey">Total Commits (2026):</span>
                      <span className="text-foreground font-semibold">{482 + totalSimulated}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gh-grey">PR Contributions:</span>
                      <span className="text-foreground font-semibold">68</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gh-grey">Issues Opened/Resolved:</span>
                      <span className="text-foreground font-semibold">32</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gh-grey">Research Models Published:</span>
                      <span className="text-foreground font-semibold">6</span>
                    </div>
                  </div>

                  {/* Languages usage distribution */}
                  <div className="mt-4 pt-3 border-t border-card-border/60">
                    <span className="text-xs text-gh-grey block mb-2 font-sans font-semibold">Most Used Languages</span>
                    <div className="flex h-3 w-full rounded-full overflow-hidden bg-card-border">
                      <div className="bg-[#3572A5] h-full" style={{ width: '68%' }} title="Python: 68%" />
                      <div className="bg-[#f1e05a] h-full" style={{ width: '15%' }} title="JavaScript: 15%" />
                      <div className="bg-[#DA5B0B] h-full" style={{ width: '12%' }} title="Jupyter Notebook: 12%" />
                      <div className="bg-[#3178c6] h-full" style={{ width: '5%' }} title="TypeScript: 5%" />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[11px] font-sans text-gh-grey">
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#3572A5]" /> Python (68%)</span>
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#f1e05a]" /> JavaScript (15%)</span>
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#DA5B0B]" /> Jupyter (12%)</span>
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#3178c6]" /> TypeScript (5%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Certifications & Accreditations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-card-border bg-card-bg rounded-lg p-4 flex gap-3 hover:border-gh-blue transition-all">
                    <div className="bg-yellow-500/10 p-2 h-10 w-10 rounded-lg flex items-center justify-center border border-yellow-500/20 shrink-0">
                      <Award className="text-yellow-500" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">AWS Cloud Practitioner</h4>
                      <p className="text-xs text-gh-grey mt-0.5">Amazon Web Services Verification</p>
                      <span className="inline-block text-[9px] font-mono border border-card-border px-1.5 py-0.5 mt-2 bg-background rounded text-gh-blue">
                        Verified Credentials
                      </span>
                    </div>
                  </div>

                  <div className="border border-card-border bg-card-bg rounded-lg p-4 flex gap-3 hover:border-gh-blue transition-all">
                    <div className="bg-red-500/10 p-2 h-10 w-10 rounded-lg flex items-center justify-center border border-red-500/20 shrink-0">
                      <Award className="text-red-500" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Static PE Malware Analyst</h4>
                      <p className="text-xs text-gh-grey mt-0.5">SecOps Threat Academy</p>
                      <span className="inline-block text-[9px] font-mono border border-card-border px-1.5 py-0.5 mt-2 bg-background rounded text-gh-blue">
                        Verified Credentials
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GITHUB ACHIEVEMENTS & BADGES SHOWCASE */}
              <div className="border border-card-border bg-[#161b22]/40 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-card-border/60 pb-4 mb-6 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Award className="text-gh-blue" size={20} />
                      GitHub Achievements & Special Badges
                    </h3>
                    <p className="text-xs text-gh-grey mt-0.5 font-sans">
                      Rare, legacy, and custom badges earned by Shubh Dixit. Click any badge to view its verification details.
                    </p>
                  </div>
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {(["all", "rare", "tiered", "custom"] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setBadgeFilter(cat)}
                        className={`px-3 py-1 rounded-md border font-medium capitalize cursor-pointer transition-colors ${
                          badgeFilter === cat
                            ? "bg-gh-blue text-white border-transparent"
                            : "bg-[#0d1117] border-card-border text-gh-grey hover:border-gh-grey/40 hover:text-foreground"
                        }`}
                      >
                        {cat === "all" ? "All Badges" : cat === "custom" ? "Research & IIT" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {BADGES.filter(b => badgeFilter === "all" || b.category === badgeFilter).map(badge => {
                    const IconComp = getIcon(badge.iconName);
                    const style = badgeStyles[badge.colorName] || badgeStyles.gold;
                    return (
                      <div
                        key={badge.id}
                        onClick={() => setSelectedBadgeId(badge.id)}
                        className="group border border-card-border bg-[#0d1117]/60 hover:bg-[#0d1117] hover:border-gh-blue rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gh-blue/5"
                      >
                        {/* Outer Glow Circle */}
                        <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border ${style.border} ${style.bg} transition-all duration-300 group-hover:scale-105 shadow-inner`}>
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${style.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
                          <IconComp className={`h-8 w-8 ${style.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`} />
                        </div>
                        <span className="font-semibold text-foreground text-xs mt-3 block group-hover:text-gh-blue transition-colors line-clamp-1">
                          {badge.name}
                        </span>
                        <span className="text-[10px] text-gh-grey font-mono mt-1 flex items-center gap-1 justify-center">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${badge.category === "rare" ? "bg-red-500" : badge.category === "custom" ? "bg-purple-500" : "bg-cyan-500"}`} />
                          {badge.rarityScore}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {activeTab === "terminal" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Terminal onViewResume={() => setIsResumeOpen(true)} />
            </div>
          )}

          {activeTab === "assistant" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <CopilotChat />
            </div>
          )}

        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-card-border bg-[#0d1117]/80 mt-16 py-6 text-xs text-gh-grey relative z-10 w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 select-none">
            <svg height="18" viewBox="0 0 16 16" version="1.1" width="18" className="fill-gh-grey hover:fill-foreground transition-colors">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.47.01.84.01.93 0 .22-.15.47-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <span>© 2026 Shubh Dixit. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="https://github.com/Shubhdix9" target="_blank" rel="noreferrer" className="hover:text-gh-blue hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/shubhdixit0912" target="_blank" rel="noreferrer" className="hover:text-gh-blue hover:underline">LinkedIn</a>
            <a href="https://leetcode.com/GhostKernel09" target="_blank" rel="noreferrer" className="hover:text-gh-blue hover:underline">LeetCode</a>
            <a href="mailto:shubhdixi9@gmail.com" className="hover:text-gh-blue hover:underline">Contact</a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE RESUME PDF VIEWER MODAL */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-10 sm:pt-20 select-text no-print">
          {/* Modal Card */}
          <div className="bg-card-bg border border-card-border rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative">
            
            {/* Modal Controls (Sticky/Fixed topbar) */}
            <div className="bg-[#161b22] px-6 py-4 border-b border-card-border flex items-center justify-between no-print select-none">
              <div className="flex items-center gap-2">
                <FileCheck size={18} className="text-gh-blue" />
                <span className="font-semibold text-foreground text-sm">Interactive Resume Exporter</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-gh-green text-white hover:bg-gh-green/90 border border-transparent px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5"
                >
                  Save as PDF / Print
                </button>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="text-gh-grey hover:text-foreground hover:bg-gh-btn-hover rounded-md p-1.5 cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Document sheet view (Styled Resume mockup) */}
            <div className="p-8 sm:p-12 bg-white text-black font-sans leading-relaxed select-text shadow-inner overflow-x-auto">
              <div className="min-w-[650px] mx-auto text-black print-resume-container">
                {/* Resume Header */}
                <div className="text-center border-b border-gray-300 pb-5">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">SHUBH DIXIT</h1>
                  <p className="text-sm font-semibold text-blue-600 mt-1 uppercase tracking-wide">
                    AI Researcher • Cybersecurity Developer • Founder
                  </p>
                  <div className="flex justify-center gap-4 text-xs text-gray-600 mt-3 flex-wrap">
                    <span>Jaipur, Rajasthan, India</span>
                    <span>•</span>
                    <a href="mailto:shubhdixi9@gmail.com" className="hover:underline text-blue-600">shubhdixi9@gmail.com</a>
                    <span>•</span>
                    <a href="https://github.com/Shubhdix9" target="_blank" rel="noreferrer" className="hover:underline text-blue-600">github.com/Shubhdix9</a>
                    <span>•</span>
                    <a href="https://linkedin.com/in/shubhdixit0912" target="_blank" rel="noreferrer" className="hover:underline text-blue-600">linkedin.com/in/shubhdixit0912</a>
                  </div>
                </div>

                {/* Resume Body */}
                <div className="mt-6 space-y-6">
                  {/* Summary */}
                  <div>
                    <h2 className="text-xs font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase tracking-wider">Professional Summary</h2>
                    <p className="text-[11px] text-gray-700 mt-2">
                      Passionate AI Research Intern and Cybersecurity Developer building intelligent deep learning frameworks at the intersection of computer vision, wireless signal analysis (Massive MIMO), and static threat classification. Founder of SeioPluse, optimizing medical diagnostic pipelines to improve cancer detection thresholds.
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-xs font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase tracking-wider">Research & Work Experience</h2>
                    <div className="space-y-4 mt-2">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-bold text-gray-900">IIT Kanpur — Research Intern</h3>
                          <span className="text-[10px] text-gray-500 font-mono">May 2026 – Present</span>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-600 italic">Massive MIMO Signal CSI Encoding Models</p>
                        <ul className="list-disc pl-4 text-[10px] text-gray-700 mt-1 space-y-0.5">
                          <li>Researching self-attention Transformer compression layers to lower encoding overhead in base-stations.</li>
                          <li>Developing tensor computation benchmarks and training models using PyTorch.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-bold text-gray-900">IIT Ropar — Research Intern</h3>
                          <span className="text-[10px] text-gray-500 font-mono">May 2026 – Present</span>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-600 italic">Computer Vision & Parameter Tuning Lab</p>
                        <ul className="list-disc pl-4 text-[10px] text-gray-700 mt-1 space-y-0.5">
                          <li>Optimizing custom convolutional layers and hyperparameter calibration profiles in YOLO weights.</li>
                          <li>Automating data labeling pipelines with OpenCV, speeding up model testing cycles.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-bold text-gray-900">SeioPluse — Founder & AI Engineer</h3>
                          <span className="text-[10px] text-gray-500 font-mono">2025 – Present</span>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-600 italic">Clinical Breast Cancer Image Segmentation Inference Platform</p>
                        <ul className="list-disc pl-4 text-[10px] text-gray-700 mt-1 space-y-0.5">
                          <li>Developed a custom YOLOv8 segmentation model for early breast tumor boundary classification.</li>
                          <li>Achieved a validated F1-score accuracy of 0.98.</li>
                          <li>Constructed web interfaces using Next.js/React coupled with Flask-based microservice architectures.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xs font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase tracking-wider">Education</h2>
                    <div className="space-y-3 mt-2">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-bold text-gray-900">JK Lakshmipat University</h3>
                          <span className="text-[10px] text-gray-500 font-mono">2025 – Present</span>
                        </div>
                        <p className="text-[10px] text-gray-700">B.Tech in Computer Science & Engineering • 50% Academic Merit Scholarship</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-bold text-gray-900">IIIT Delhi</h3>
                          <span className="text-[10px] text-gray-500 font-mono">2026</span>
                        </div>
                        <p className="text-[10px] text-gray-700">Semester Exchange Program • Advanced Communications and Signal processing focus</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-xs font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase tracking-wider">Technical Capabilities</h2>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-[10px] text-gray-700">
                      <div>
                        <strong>AI & ML Frameworks:</strong> PyTorch, YOLOv8, OpenCV, Transformers, MediaPipe, Scikit-Learn
                      </div>
                      <div>
                        <strong>Development & SecOps:</strong> Next.js, Flask, Kali Linux, Docker, Kubernetes, AWS, Git
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal footer info */}
            <div className="bg-[#161b22] px-6 py-4 border-t border-card-border flex items-center justify-between no-print text-xs text-gh-grey select-none">
              <span>Ready for high-quality single-sheet printing.</span>
              <button
                onClick={() => setIsResumeOpen(false)}
                className="bg-card-bg border border-card-border hover:bg-gh-btn-hover text-foreground px-4 py-1.5 rounded-md font-semibold cursor-pointer transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DETAILED BADGE MODAL VIEW */}
      {selectedBadgeId && (() => {
        const badge = BADGES.find(b => b.id === selectedBadgeId);
        if (!badge) return null;
        const IconComp = getIcon(badge.iconName);
        const style = badgeStyles[badge.colorName] || badgeStyles.gold;
        return (
          <div className="fixed inset-0 z-[1100] overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print animate-in fade-in duration-200">
            {/* Modal Body */}
            <div className="bg-card-bg border border-card-border rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative p-6 flex flex-col items-center text-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedBadgeId(null)}
                className="absolute top-4 right-4 text-gh-grey hover:text-foreground hover:bg-gh-btn-hover rounded-md p-1.5 cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>

              {/* Glowing decorative background based on color */}
              <div className={`absolute -top-20 w-64 h-64 bg-gradient-to-b ${style.gradient} rounded-full filter blur-3xl pointer-events-none opacity-60`} />

              {/* Big Badge Circle (GitHub Achievement Style) */}
              <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 ${style.border} ${style.bg} shadow-inner mt-4 group`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${style.gradient} opacity-40`} />
                <IconComp className={`h-12 w-12 ${style.text} animate-float`} />
              </div>

              {/* Badge info */}
              <h3 className="text-xl font-bold text-foreground mt-4 flex items-center justify-center gap-1.5">
                {badge.name}
              </h3>
              
              <div className="mt-1.5 flex flex-wrap gap-2 justify-center items-center">
                <span className="bg-card-border text-foreground px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider">
                  Tier: {badge.tier}
                </span>
                <span className="bg-[#0d1117] border border-card-border text-gh-grey px-2 py-0.5 rounded text-[10px] font-mono">
                  {badge.rarityScore}
                </span>
              </div>

              <p className="text-sm text-foreground/80 mt-4 leading-relaxed font-sans px-2">
                {badge.description}
              </p>

              {/* Custom verification lore */}
              <div className="bg-[#0d1117] border border-card-border rounded-lg p-3.5 mt-4 text-left w-full relative group">
                <span className="text-[9px] font-mono text-gh-blue uppercase tracking-wider font-semibold block border-b border-card-border/60 pb-1 mb-1.5">
                  ✓ Verified Developer Achievement
                </span>
                <p className="text-xs text-foreground/90 font-mono leading-relaxed">
                  {badge.lore}
                </p>
                <div className="flex justify-between items-center mt-2.5 pt-1.5 border-t border-card-border/40 text-[9px] text-gh-grey font-mono">
                  <span>Unlocked: {badge.unlockedAt}</span>
                  {badge.progressText && <span className="text-gh-green font-semibold">{badge.progressText}</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3 w-full">
                <button
                  onClick={() => celebrateBadge(badge.colorName)}
                  className="flex-1 bg-gh-blue hover:bg-gh-blue/90 text-white text-xs font-bold py-2.5 px-4 rounded-md cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} />
                  Celebrate
                </button>
                <button
                  onClick={() => {
                    const textToCopy = `[![GitHub Achievement - ${badge.name}](https://github-achievements.vercel.app/badges/${badge.id})](https://github.com/Shubhdix9)`;
                    navigator.clipboard.writeText(textToCopy);
                    setShareToastOpen(true);
                    setTimeout(() => setShareToastOpen(false), 2000);
                  }}
                  className="flex-1 bg-gh-btn-hover hover:border-gh-blue border border-card-border text-foreground text-xs font-bold py-2.5 px-4 rounded-md cursor-pointer transition-colors flex items-center justify-center gap-1.5 relative"
                >
                  <ExternalLink size={14} className="text-gh-blue" />
                  {shareToastOpen ? "Copied Snippet!" : "Share Badge"}
                </button>
              </div>

              <span className="text-[10px] text-gh-grey/80 mt-4 block">
                Verified Cryptographically by GitHub Octocat Signatures
              </span>
            </div>
          </div>
        );
      })()}
      
    </div>
  );
}
