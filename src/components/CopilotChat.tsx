"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, Bot, RefreshCw } from "lucide-react";

interface ChatMessage {
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
}

export default function CopilotChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "copilot",
      text: "Hi! I'm Shubh's Copilot Assistant. Ask me anything about Shubh's research at IIT Kanpur, computer vision models at IIT Ropar, his startup SeioPluse, or his cybersecurity skills. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    "Tell me about SeioPluse.",
    "What is his research at IIT Kanpur?",
    "What are his cybersecurity skills?",
    "Is Shubh looking for internships?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes("seiopulse") || text.includes("cancer") || text.includes("breast") || text.includes("medical") || text.includes("tumor")) {
      return `### SeioPluse (Founder & AI Engineer)
Shubh is the Founder & AI Engineer of **SeioPluse**, an early-stage healthcare startup building AI diagnostics for breast cancer.
Key Achievements:
- Developed a custom **YOLOv8 segmentation** architecture for tumor identification in ultrasound/mammogram scans.
- Achieved a validated **F1 Score of ~0.98** for boundary segmentation.
- Constructed a deployment pipeline featuring a **Flask microservice inference API** integrated with clinical mockups.
- Currently scaling the solution to assist radiologists in clinical workflows.`;
    }

    if (text.includes("kanpur") || text.includes("mimo") || text.includes("csi") || text.includes("feedback") || text.includes("transformer") || text.includes("wireless")) {
      return `### IIT Kanpur Research: Massive MIMO CSI Feedback
At IIT Kanpur, Shubh is researching **Transformer-Empowered CSI (Channel State Information) Feedback Compression for Massive MIMO Systems**.
Highlights:
- Engineered **Neural Self-Attention Models** in PyTorch to compress high-dimensional CSI matrices.
- Significantly reduced network uplink overhead while maintaining reconstruction quality under low signal-to-noise ratios.
- Optimizing transformer latency profiles for real-time edge execution in next-generation (5G-Advanced/6G) wireless base stations.`;
    }

    if (text.includes("ropar") || text.includes("vision") || text.includes("cv") || text.includes("deep learning") || text.includes("yolo") || text.includes("opencv")) {
      return `### IIT Ropar Research: Deep Learning Optimization
At IIT Ropar, Shubh is working as a **Research Intern** focusing on deep learning and computer vision frameworks:
- Tuning hyperparameter thresholds and pruning deep neural networks for edge deployment.
- Designing high-efficiency custom convolutional networks for image tracking.
- Utilizing **PyTorch**, **OpenCV**, and **YOLO** families to solve real-world industrial and clinical visual tasks.`;
    }

    if (text.includes("security") || text.includes("cyber") || text.includes("malware") || text.includes("kali") || text.includes("nmap") || text.includes("hack") || text.includes("penetration")) {
      return `### Cybersecurity Stack
Shubh has a robust profile in Security Engineering and malware detection:
- **Malware Analysis:** Engineered a **Static Malware Classifier** using Scikit-Learn and XGBoost to categorize PE (Portable Executable) files by extracting headers and structural metadata.
- **Tooling:** Proficient with security suites like Kali Linux, Wireshark, Nmap, Burp Suite, and Ghidra.
- **Threat Intel:** Focuses on secure development lifecycle (DevSecOps) and infrastructure hardening.`;
    }

    if (text.includes("internship") || text.includes("hire") || text.includes("opportunity") || text.includes("job") || text.includes("recruit")) {
      return `### Hiring & Internship Status
**Yes, Shubh is actively open to research and development opportunities!**
- **Availability:** Interested in AI/ML Research Internships, Security Engineering, and Developer roles.
- **Location Prefs:** Open to hybrid/remote roles or on-site roles in India and globally.
- **Contact:** You can reach him directly at **shubhdixi9@gmail.com** or send him a message through the contact form on this site. I can also help compile his resume!`;
    }

    if (text.includes("resume") || text.includes("download") || text.includes("cv")) {
      return `Shubh's resume is available for immediate download in the **Overview** page or via the **Command Palette (Cmd+K)**!
You can click the "Download Resume" CTA button in the hero header. If you'd like a custom summary, his B.Tech is in Computer Science from **JK Lakshmipat University** (with a 50% academic scholarship) and he was a semester exchange scholar at **IIIT Delhi** in 2026.`;
    }

    if (text.includes("contact") || text.includes("email") || text.includes("social") || text.includes("linkedin") || text.includes("github")) {
      return `You can connect with Shubh through the following active nodes:
- ✉️ **Email:** shubhdixi9@gmail.com
- 🐙 **GitHub:** [https://github.com/Shubhdix9](https://github.com/Shubhdix9)
- 💼 **LinkedIn:** [https://linkedin.com/in/shubhdixit0912](https://linkedin.com/in/shubhdixit0912)
- 🖥️ **LeetCode:** [https://leetcode.com/GhostKernel09](https://leetcode.com/GhostKernel09)`;
    }

    if (text.includes("hello") || text.includes("hi ") || text.includes("hey") || text.includes("greetings")) {
      return `Hello! How can I help you explore Shubh's portfolio? You can ask about his publications, coding stack, startups, or research credentials!`;
    }

    return `I apologize, my knowledge base on Shubh is focused on his internships at IIT Kanpur/IIT Ropar, his startup SeioPluse, cybersecurity projects, and academic background. 

Could you try asking:
- *"What is Shubh's massive MIMO research at IIT Kanpur?"*
- *"Tell me about SeioPluse breast cancer detection."*
- *"What is his malware classifier project?"*
- *"What is his email or LinkedIn?"*`;
  }

  const handleSend = async (messageText: string) => {
    if (!messageText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      sender: "user",
      text: messageText,
      timestamp: time
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const replyText = generateResponse(messageText);
    const copilotMsg: ChatMessage = {
      sender: "copilot",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, copilotMsg]);
    setIsTyping(false);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "copilot",
        text: "Hi! I'm Shubh's Copilot Assistant. Ask me anything about Shubh's research at IIT Kanpur, computer vision models at IIT Ropar, his startup SeioPluse, or his cybersecurity skills. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="border border-card-border bg-card-bg rounded-lg shadow-xl flex flex-col h-[520px] font-sans">
      {/* Copilot Header */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-card-border">
        <div className="flex items-center gap-2">
          <div className="bg-gh-blue/10 p-1.5 rounded-lg border border-gh-blue/20">
            <Sparkles size={16} className="text-gh-blue animate-pulse" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              GitHub Copilot
              <span className="bg-gh-blue/10 text-gh-blue text-[10px] px-1.5 py-0.5 rounded font-mono">v2026</span>
            </span>
            <span className="text-[10px] text-gh-grey block">AI assistant for Shubh Dixit</span>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="text-gh-grey hover:text-foreground cursor-pointer transition-colors p-1 rounded hover:bg-gh-btn-hover"
          title="Reset chat"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Messages Window */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-card-border bg-[#0d1117]/60">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
            }`}
          >
            {/* Avatar */}
            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border border-card-border text-xs ${
              msg.sender === "user" ? "bg-gh-blue/10 text-gh-blue" : "bg-gh-green/10 text-gh-green"
            }`}>
              {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-1">
              <div className={`rounded-lg p-3 text-sm leading-relaxed border border-card-border ${
                msg.sender === "user" 
                  ? "bg-gh-btn-hover text-foreground rounded-tr-none" 
                  : "bg-card-bg text-foreground rounded-tl-none"
              }`}>
                {/* Simulated Markdown renderer for responses */}
                {msg.text.split("\n").map((line, lIdx) => {
                  if (line.startsWith("### ")) {
                    return <h3 key={lIdx} className="font-semibold text-sm text-foreground mt-2 first:mt-0 mb-1">{line.replace("### ", "")}</h3>;
                  }
                  if (line.startsWith("- ")) {
                    return <li key={lIdx} className="ml-4 list-disc text-foreground/90">{line.replace("- ", "")}</li>;
                  }
                  // Handle bolding
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  if (boldRegex.test(line)) {
                    const parts = line.split(boldRegex);
                    return (
                      <p key={lIdx} className="text-foreground/90">
                        {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-gh-blue">{part}</strong> : part)}
                      </p>
                    );
                  }
                  return <p key={lIdx} className="text-foreground/90 min-h-[0.5rem]">{line}</p>;
                })}
              </div>
              <span className={`text-[10px] text-gh-grey ${msg.sender === "user" ? "self-end" : "self-start"}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[80%] self-start">
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gh-green/10 text-gh-green border border-card-border">
              <Bot size={14} />
            </div>
            <div className="bg-card-bg border border-card-border rounded-lg rounded-tl-none p-3 text-sm flex items-center gap-1">
              <span className="h-2 w-2 bg-gh-grey rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 bg-gh-grey rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 bg-gh-grey rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-[#0d1117]/80 border-t border-card-border flex flex-wrap gap-2 select-none">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs py-1 px-2.5 rounded-full border border-card-border hover:border-gh-blue hover:text-gh-blue bg-card-bg text-gh-grey cursor-pointer transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <div className="p-3 bg-[#161b22] border-t border-card-border flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-1 bg-[#0d1117] border border-card-border rounded-md py-1.5 px-3 text-sm text-foreground focus:outline-none focus:border-gh-blue placeholder-gh-grey/60"
          placeholder="Ask Copilot about Shubh's projects..."
        />
        <button
          onClick={() => handleSend(input)}
          className="bg-gh-blue/20 hover:bg-gh-blue/30 text-gh-blue border border-gh-blue/30 p-1.5 rounded-md cursor-pointer transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
