"use client";

import React, { useState, useRef, useEffect } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "info" | "ascii";
}

interface TerminalProps {
  onViewResume?: () => void;
}

export default function Terminal({ onViewResume }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Shubh Dixit Portfolio OS [Version 2.0.26]", type: "info" },
    { text: "Type 'help' to see all available terminal commands.", type: "info" },
    { text: "", type: "output" }
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Save to command history
    const newCmdHistory = [...commandHistory, trimmed];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);

    const newHistory = [...history, { text: `shubh@portfolio ~ % ${trimmed}`, type: "input" as const }];

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "help":
        newHistory.push(
          { text: "Available commands:", type: "info" },
          { text: "  about            Show biography overview", type: "output" },
          { text: "  neofetch         Display portfolio system info & specifications", type: "output" },
          { text: "  skills           Output technical capabilities matrix", type: "output" },
          { text: "  projects         List featured repositories & active links", type: "output" },
          { text: "  nmap             Simulate cybersecurity vulnerability scanning on localhost", type: "output" },
          { text: "  deploy-seiopulse Run diagnostic pipeline build for SeioPluse AI diagnostics", type: "output" },
          { text: "  resume           Launch print-friendly PDF Resume Viewer modal", type: "output" },
          { text: "  contact          Print email & social connections", type: "output" },
          { text: "  clear            Reset terminal screen lines", type: "output" }
        );
        break;

      case "resume":
      case "cv":
        if (onViewResume) {
          onViewResume();
          newHistory.push({ text: "Opening Shubh's Interactive Resume Viewer Modal...", type: "success" });
        } else {
          newHistory.push({ text: "Resume viewer modal handler is not mounted.", type: "error" });
        }
        break;

      case "about":
        newHistory.push(
          { text: "Shubh Dixit is an AI Research Intern and Cybersecurity Developer.", type: "success" },
          { text: "Currently developing computer vision and deep learning architectures at IIT Ropar, and self-attention MIMO communication layers at IIT Kanpur.", type: "output" },
          { text: "Founder of SeioPluse, working on early-stage breast cancer diagnostic tools using YOLOv8 frameworks.", type: "output" }
        );
        break;

      case "neofetch":
        newHistory.push({
          text: `
    /\\_/\\          shubh@portfolio
   ( o.o )         ---------------
    > ^ <          OS: ShubhDixit-OS v2026.1
   /     \\         Host: MacBook Pro / Wireless CSI Module
  ((     ))        Kernel: 5.10.0-CV-DeepLearning
  /       \\        Uptime: 26 hours, 14 mins
  \\_______/        Shell: zsh 5.8
                   Compiler: PyTorch 2.3 + CUDA 12.1
                   GPU: NVIDIA RTX A6000 48GB (Virtual)
                   Active Dev: Python / TypeScript / Kali Linux
                   Current Lab: IIT Kanpur & IIT Ropar Lab
          `,
          type: "ascii"
        });
        break;

      case "skills":
        newHistory.push(
          { text: "--- TECHNICAL CAPABILITIES ---", type: "info" },
          { text: "Programming Languages: Python, C, C++, Java, JavaScript, PHP", type: "output" },
          { text: "AI & ML Frameworks:    YOLOv8, PyTorch, OpenCV, Transformers, CNN, MediaPipe", type: "output" },
          { text: "Cybersecurity:         Kali Linux, Wireshark, Nmap, Burp Suite, PE Malware Analysis", type: "output" },
          { text: "Web Architecture:      Next.js, React, Tailwind CSS, Flask, MySQL, Git", type: "output" },
          { text: "DevOps & Cloud:        Docker, AWS, Kubernetes, Linux, GitHub Actions", type: "output" }
        );
        break;

      case "projects":
        newHistory.push(
          { text: "--- FEATURED WORK ---", type: "info" },
          { text: "1. AI Breast Cancer Detector (YOLOv8, Flask, OpenCV) -> Tumor segmentation", type: "success" },
          { text: "2. CSI Feedback Compression Layer (PyTorch, Transformers) -> Massive MIMO systems", type: "success" },
          { text: "3. Static PE Malware Classifier (Scikit-Learn, XGBoost) -> Executable parsing", type: "success" },
          { text: "4. Hand Tracking Virtual Guitar (OpenCV, MediaPipe, Python) -> CV gesture interface", type: "success" }
        );
        break;

      case "contact":
        newHistory.push(
          { text: "Email:    shubhdixi9@gmail.com", type: "output" },
          { text: "GitHub:   https://github.com/Shubhdix9", type: "output" },
          { text: "LinkedIn: https://linkedin.com/in/shubhdixit0912", type: "output" },
          { text: "LeetCode: https://leetcode.com/GhostKernel09", type: "output" }
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "nmap":
        newHistory.push(
          { text: "Starting Nmap 7.92 ( https://nmap.org ) at 2026-06-08 21:56 IST", type: "info" },
          { text: "Nmap scan report for shubh-dixit.portfolio (127.0.0.1)", type: "output" },
          { text: "Host is up (0.000084s latency).", type: "output" },
          { text: "Not shown: 994 closed ports", type: "output" },
          { text: "PORT     STATE SERVICE", type: "info" },
          { text: "22/tcp   open  ssh (Key-based auth)", type: "output" },
          { text: "80/tcp   open  http (Next.js Portfolio)", type: "output" },
          { text: "443/tcp  open  https (TLS 1.3)", type: "output" },
          { text: "5000/tcp open  flask (SeioPluse Inference API)", type: "success" },
          { text: "8080/tcp open  pytorch-mimo (Transformer CSI Feed)", type: "success" },
          { text: "9000/tcp open  kali-pentest (Threat intel nodes)", type: "error" },
          { text: "", type: "output" },
          { text: "Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds", type: "info" }
        );
        break;

      case "deploy-seiopulse":
        newHistory.push({ text: "Initializing SeioPluse medical deployment pipeline...", type: "info" });
        setHistory(newHistory);
        setInput("");
        
        // Custom animation sequences
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
        await sleep(600);
        setHistory(prev => [...prev, { text: "[1/4] Pulling docker image: pytorch-cuda12.1-yolov8-runtime...", type: "info" }]);
        
        await sleep(800);
        setHistory(prev => [...prev, { text: "[2/4] Initializing Flask microservice inference router...", type: "info" }]);
        
        await sleep(600);
        setHistory(prev => [...prev, { text: "[3/4] Compiling breast_cancer_segmentation_v8s.pt weights into TensorRT...", type: "info" }]);
        
        await sleep(1000);
        setHistory(prev => [...prev, 
          { text: "  | Precision optimization: INT8 calibration mode", type: "output" },
          { text: "  | F1-Score validated: 0.9824", type: "success" },
          { text: "  | Mean Average Precision (mAP@50): 0.9688", type: "success" }
        ]);
        
        await sleep(700);
        setHistory(prev => [...prev, 
          { text: "[4/4] Deploying to AWS ECS Kubernetes clusters...", type: "info" },
          { text: "🚀 SeioPluse Clinical Assistance API online at https://api.seiopulse.ai", type: "success" }
        ]);
        return;

      default:
        newHistory.push({ text: `zsh: command not found: ${command}. Type 'help' to view commands.`, type: "error" });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    }
  };

  return (
    <div className="border border-card-border bg-black rounded-lg shadow-2xl overflow-hidden font-mono text-sm leading-relaxed flex flex-col h-[480px]">
      {/* Terminal Title Bar */}
      <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-card-border shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gh-grey font-mono">shubh@portfolio: ~ (zsh)</span>
        <div className="w-10" />
      </div>

      {/* Terminal Terminal Output Scroll Area */}
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-1 select-text scrollbar-thin scrollbar-thumb-card-border">
        {history.map((line, idx) => {
          if (line.type === "ascii") {
            return (
              <pre key={idx} className="text-[#39d353] leading-tight whitespace-pre text-xs py-1 select-none font-mono">
                {line.text}
              </pre>
            );
          }
          let colorClass = "text-foreground";
          if (line.type === "input") colorClass = "text-[#58a6ff] font-semibold";
          else if (line.type === "error") colorClass = "text-red-400";
          else if (line.type === "success") colorClass = "text-[#39d353]";
          else if (line.type === "info") colorClass = "text-purple-400";
          
          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Row */}
      <div className="p-3 bg-[#0d1117] border-t border-card-border flex items-center gap-2 shrink-0">
        <span className="text-[#58a6ff] font-semibold shrink-0">shubh@portfolio ~ %</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder-gh-grey/50"
          placeholder="type 'help'..."
          autoFocus
        />
      </div>
    </div>
  );
}
