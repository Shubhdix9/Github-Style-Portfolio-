"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal as TerminalIcon, FileText, ArrowRight, X, Mail } from "lucide-react";

interface CommandPaletteProps {
  onTabChange: (tab: string) => void;
  triggerTerminalCommand?: (cmd: string) => void;
  onViewResume?: () => void;
}

export default function CommandPalette({ onTabChange, triggerTerminalCommand, onViewResume }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items = [
    { name: "Go to Overview Tab", category: "Navigation", action: () => onTabChange("overview") },
    { name: "Go to Research & Experience", category: "Navigation", action: () => onTabChange("research") },
    { name: "Go to Repositories & Projects", category: "Navigation", action: () => onTabChange("projects") },
    { name: "Go to Publications & Notes", category: "Navigation", action: () => onTabChange("publications") },
    { name: "Go to Stats & Impact Metrics", category: "Navigation", action: () => onTabChange("stats") },
    { name: "Go to Developer Terminal", category: "Navigation", action: () => onTabChange("terminal") },
    { name: "Run system specs (neofetch)", category: "Terminal Command", action: () => { onTabChange("terminal"); triggerTerminalCommand?.("neofetch"); } },
    { name: "Scan open ports (nmap scan)", category: "Terminal Command", action: () => { onTabChange("terminal"); triggerTerminalCommand?.("nmap"); } },
    { name: "View & Download Shubh's Resume", category: "Downloads", action: () => onViewResume?.() },
    { name: "Contact Shubh via Email", category: "Contact", action: () => { window.location.href = "mailto:shubhdixi9@gmail.com"; } },
  ];

  const triggerResumeDownload = () => {
    // Generate a simple text file representing Shubh's details as a resume download simulation
    const resumeText = `
=========================================
SHUBH DIXIT - AI RESEARCHER & FOUNDER
=========================================
Email: shubhdixi9@gmail.com
GitHub: https://github.com/Shubhdix9
LinkedIn: https://linkedin.com/in/shubhdixit0912

EXPERIENCE:
- Research Intern @ IIT Kanpur (CSI Feedback Massive MIMO Systems)
- Research Intern @ IIT Ropar (Computer Vision Optimization)
- Founder & AI Engineer @ SeioPluse (Breast cancer tumor segmentation)

EDUCATION:
- B.Tech CSE @ JK Lakshmipat University (Academic Merit Scholarship)
- Semester Exchange @ IIIT Delhi (2026)

SKILLS:
PyTorch, YOLOv8, Transformers, Python, Kali Linux, Docker, Next.js, AWS.
=========================================
    `;
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shubh_Dixit_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-24 px-4 select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
      />

      {/* Palette Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-card-border bg-card-bg shadow-2xl glass animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Area */}
        <div className="flex items-center gap-2 border-b border-card-border px-3 py-3.5">
          <Search size={18} className="text-gh-grey shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder-gh-grey/60"
            placeholder="Type a command or search tabs..."
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gh-grey hover:text-foreground cursor-pointer rounded p-1 hover:bg-gh-btn-hover"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[320px] overflow-y-auto p-2 flex flex-col gap-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              let icon = <ArrowRight size={14} className="text-gh-grey" />;
              if (item.category === "Terminal Command") icon = <TerminalIcon size={14} className="text-purple-400" />;
              else if (item.category === "Downloads") icon = <FileText size={14} className="text-gh-green" />;
              else if (item.category === "Contact") icon = <Mail size={14} className="text-gh-blue" />;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm cursor-pointer hover:bg-gh-btn-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gh-grey bg-background border border-card-border px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-sm text-gh-grey">
              No matching commands or navigation options found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-card-border bg-[#0d1117]/60 px-4 py-2 flex items-center justify-between text-[11px] text-gh-grey font-mono">
          <span>Tip: Press <kbd className="bg-card-bg border border-card-border px-1 rounded">esc</kbd> to exit</span>
          <span>Search with <kbd className="bg-card-bg border border-card-border px-1 rounded">/</kbd> or <kbd className="bg-card-bg border border-card-border px-1 rounded">⌘K</kbd></span>
        </div>
      </div>
    </div>
  );
}
