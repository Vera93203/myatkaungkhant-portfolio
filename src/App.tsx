import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Layout, 
  Server, 
  Database, 
  Smartphone, 
  Sparkles, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Check, 
  ExternalLink, 
  Code, 
  Send, 
  Cpu, 
  Layers, 
  Sliders, 
  Globe, 
  Terminal, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  MapPin, 
  Phone,
  Copy, 
  Settings, 
  Award, 
  X,
  Play,
  RotateCcw,
  Lock
} from "lucide-react";
import { 
  INITIAL_PROFILE, 
  SKILL_CATEGORIES, 
  PROJECTS, 
  EXPERIENCES, 
  BLOG_POSTS,
  Profile,
  Project
} from "./types";
import Interactive3DCanvas from "./components/Interactive3DCanvas";

// Interactive 3D Card Wrapper using Mouse Coordinates
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  key?: React.Key;
}

function TiltCard({ children, className = "", onClick }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glareRef, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Limits the multi-axis tilt angle to ~8 degrees
    const rx = -((y - yc) / yc) * 8;
    const ry = ((x - xc) / xc) * 8;
    
    setRotateX(rx);
    setRotateY(ry);
    setScale(1.02);

    // Calculate dynamic glare opacity and position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer transition-all duration-200 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glare Reflection overlay */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareRef.x}% ${glareRef.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          opacity: glareRef.opacity,
          zIndex: 10,
        }}
      />
      
      {/* Secondary glow behind card */}
      <div className="absolute inset-0 -z-10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-sky-500/5" />
      
      <div style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </div>
  );
}

// Accent Color Presets
interface ColorPreset {
  id: string;
  name: string;
  glowColor: string; // Tailwind color or custom style
  btnClass: string;
  borderClass: string;
  badgeClass: string;
  textGrad: string;
  iconGlow: string;
  textColor: string;
  bgColor: string;
  bgHover: string;
  bgSoft: string;
  bgSoft10: string;
  borderSoft: string;
  borderSoft20: string;
  glowText: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "cyan",
    name: "Cyber Cyan",
    glowColor: "rgba(14, 165, 233, 0.15)",
    btnClass: "bg-sky-500/90 text-slate-950 hover:bg-sky-400 focus:ring-sky-400/50",
    borderClass: "border-sky-500/30 hover:border-sky-500/60",
    badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/22",
    textGrad: "from-sky-300 via-cyan-400 to-indigo-400",
    iconGlow: "text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]",
    textColor: "text-sky-400",
    bgColor: "bg-sky-400",
    bgHover: "hover:bg-sky-400",
    bgSoft: "bg-sky-500/5",
    bgSoft10: "bg-sky-500/10",
    borderSoft: "border-sky-500/10",
    borderSoft20: "border-sky-500/20",
    glowText: "glow-text-cyan",
  },
  {
    id: "violet",
    name: "Violet Flare",
    glowColor: "rgba(168, 85, 247, 0.15)",
    btnClass: "bg-purple-500/90 text-slate-50 hover:bg-purple-400 focus:ring-purple-400/50",
    borderClass: "border-purple-500/30 hover:border-purple-500/60",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/22",
    textGrad: "from-purple-300 via-fuchsia-400 to-pink-400",
    iconGlow: "text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]",
    textColor: "text-purple-400",
    bgColor: "bg-purple-400",
    bgHover: "hover:bg-purple-400",
    bgSoft: "bg-purple-500/5",
    bgSoft10: "bg-purple-500/10",
    borderSoft: "border-purple-500/10",
    borderSoft20: "border-purple-500/20",
    glowText: "glow-text-violet",
  },
  {
    id: "emerald",
    name: "Neon Emerald",
    glowColor: "rgba(16, 185, 129, 0.15)",
    btnClass: "bg-emerald-500/90 text-slate-950 hover:bg-emerald-400 focus:ring-emerald-400/50",
    borderClass: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/22",
    textGrad: "from-emerald-300 via-teal-400 to-cyan-400",
    iconGlow: "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-400",
    bgHover: "hover:bg-emerald-400",
    bgSoft: "bg-emerald-500/5",
    bgSoft10: "bg-emerald-500/10",
    borderSoft: "border-emerald-500/10",
    borderSoft20: "border-emerald-500/20",
    glowText: "glow-text-emerald",
  },
  {
    id: "amber",
    name: "Gold Rush",
    glowColor: "rgba(245, 158, 11, 0.15)",
    btnClass: "bg-amber-500/90 text-slate-950 hover:bg-amber-400 focus:ring-amber-400/50",
    borderClass: "border-amber-500/30 hover:border-amber-500/60",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/22",
    textGrad: "from-yellow-300 via-amber-400 to-orange-400",
    iconGlow: "text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]",
    textColor: "text-amber-400",
    bgColor: "bg-amber-400",
    bgHover: "hover:bg-amber-400",
    bgSoft: "bg-amber-500/5",
    bgSoft10: "bg-amber-500/10",
    borderSoft: "border-amber-500/10",
    borderSoft20: "border-amber-500/20",
    glowText: "glow-text-amber",
  },
];

export default function App() {
  // Global States
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [preset, setPreset] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "web" | "mobile" | "backend">("all");
  
  // Custom interactive cursor position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  // Active terminal project
  const [terminalProject, setTerminalProject] = useState<Project | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [compilingIndex, setCompilingIndex] = useState(-1);
  const shellIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Typewriter Hooks
  const [typedWord, setTypedWord] = useState("Architect.");
  const typewriterTerms = useMemo(() => ["Full Stack Dev.", "Junior Developer.", "Web Engineer.", "Product Builder."], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(typewriterTerms[0].length);
  const [isDeleting, setIsDeleting] = useState(true);

  // Spotlight Skills Detail
  const [selectedSkill, setSelectedSkill] = useState<{name: string, exp: string} | null>(null);

  // Contact States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "info">("idle");
  const [formFeedback, setFormFeedback] = useState<string[]>([]);

  // Check device capabilities + Mouse track setup
  useEffect(() => {
    // Is client-side touch screen?
    const checkViewport = () => {
      setIsMobileDevice(window.matchMedia("(max-width: 1024px)").matches || 'ontouchstart' in window);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);

    // Track mouse coordinate offsets globally
    const trackMouseGlobal = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", trackMouseGlobal);

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("mousemove", trackMouseGlobal);
    };
  }, []);

  // Soft lag lagger custom cursor loop
  useEffect(() => {
    if (isMobileDevice) return;
    
    let animFrame: number;
    const updateCursor = () => {
      setMousePos(prev => {
        const ease = 0.12; // speed damping
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      animFrame = requestAnimationFrame(updateCursor);
    };
    animFrame = requestAnimationFrame(updateCursor);

    return () => cancelAnimationFrame(animFrame);
  }, [targetPos, isMobileDevice]);

  // Handle live typewriter intervals
  useEffect(() => {
    const currentText = typewriterTerms[wordIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at full status
      speed = 2200;
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typewriterTerms.length);
      speed = 300;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => {
        const next = isDeleting ? prev - 1 : prev + 1;
        setTypedWord(currentText.slice(0, next));
        return next;
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, typewriterTerms]);

  // Simulated project compiler terminal
  const startTerminalSimulator = (proj: Project) => {
    if (shellIntervalRef.current) clearInterval(shellIntervalRef.current);
    setTerminalProject(proj);
    setCompilingIndex(0);
    
    const logsList = [
      `Initializing telemetry pipeline on port 3000...`,
      `[SUCCESS] Established secure handshake client layer.`,
      `Pulling dynamic schemas for schema module...`,
      `Connecting to database server proxy client [POSTGRESQL]...`,
      `Analyzing table index partitions on: "${proj.title.toLowerCase().replace(/ /g, "-")}"`,
      `Found Architecture nodes: ${proj.architecture.join(", ")}`,
      `Building bundles with esbuild Node formats --minify...`,
      `Updating local metrics: DB queries bound successfully (latency < 2ms).`,
      `✓ Dynamic portfolio virtualization simulation successfully running!`
    ];
    
    setTerminalLogs([logsList[0]]);

    let counter = 1;
    setCompilingIndex(counter);
    shellIntervalRef.current = setInterval(() => {
      if (counter < logsList.length) {
        setTerminalLogs(prev => [...prev, logsList[counter]]);
        counter++;
        setCompilingIndex(counter);
      } else {
        if (shellIntervalRef.current) clearInterval(shellIntervalRef.current);
      }
    }, 700);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setFormState("info");
    setFormFeedback(["✓ Success! E-mail copied to clipboard securely.",`Ready to accept proposals at: ${profile.email}`]);
    setTimeout(() => {
      setFormState("idle");
    }, 3500);
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormState("info");
      setFormFeedback(["Form requires essential parameters: Name, Mail, Msg.", "Please audit remaining input areas."]);
      return;
    }

    setFormState("sending");
    setFormFeedback([
      "Establishing link with telemetry receiver SFO-4...",
      "Encrypting message payload headers standard-SSL...",
      "Resolving routing paths..."
    ]);

    let logCounter = 3;
    const contactLogs = [
      "Securing token bounds...",
      "Success! Message packets transmitted.",
      `✓ Handshake completed. Mail successfully delivered to ${profile.name}!`
    ];

    const timer = setInterval(() => {
      if (logCounter - 3 < contactLogs.length) {
        setFormFeedback(prev => [...prev, contactLogs[logCounter - 3]]);
        logCounter++;
      } else {
        clearInterval(timer);
        setFormState("success");
        // Clear input values
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    }, 9500 / 6); // spread the logs cleanly across a couple seconds
  };

  // Filter project lists
  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return PROJECTS;
    return PROJECTS.filter(p => p.category === activeTab);
  }, [activeTab]);

  // Skill Spotlight Handler
  const handleSpotlight = (tag: string) => {
    const proficiencies: Record<string, string> = {
      React: "Master Level (5+ Years). Advanced rendering optimizations, hook state machines, server component caching.",
      "Next.js": "Expert Level (4 Years). Dynamic middleware routes, lazy bundle segments, nested parallel layouts.",
      TypeScript: "Deep Native (5 Years). Direct strict narrowing, discrimination matrix, generic functional structures.",
      "Tailwind CSS": "Expert (6 Years). Native responsive custom classes, clean atomic component overlays.",
      Flutter: "Expert (3+ Years). Single codebase UI rendering, state bindings, Dart performance profiling.",
      Dart: "Proficient. Micro-task scheduling, non-blocking asynchronous loops, sound empty-safety types.",
      PostgreSQL: "Advanced. Stored procedures, dynamic schema optimizations, indexing configurations.",
      Express: "Master. High throughput API gateways, JSON Web Token filters, middleware hooks.",
      "Prisma ORM": "Expert. Complex window selections, relationship queries, auto-migration bindings."
    };
    const desc = proficiencies[tag] || "Experienced Practitioner. Proficient in integrating modular packages & clean code practices.";
    setSelectedSkill({ name: tag, exp: desc });
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden text-[#e0e0e0] bg-[#050505]">
      
      {/* Dynamic Cursor for Desktop view */}
      {!isMobileDevice && (
        <>
          <div 
            className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 select-none pb-0"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: isHovered ? "24px" : "10px",
              height: isHovered ? "24px" : "10px",
              background: `radial-gradient(circle, #fff 0%, ${preset.id === "amber" ? "#f59e0b" : preset.id === "emerald" ? "#10b981" : preset.id === "violet" ? "#a855f7" : "#0ea5e9"} 100%)`,
              opacity: 0.9,
              boxShadow: `0 0 16px ${preset.id === "amber" ? "#f59e0b" : preset.id === "emerald" ? "#10b981" : preset.id === "violet" ? "#a855f7" : "#0ea5e9"}`
            }}
          />
          <div 
            className="fixed pointer-events-none z-[9998] rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 select-none"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: isHovered ? "56px" : "40px",
              height: isHovered ? "56px" : "40px",
              borderColor: preset.id === "amber" ? "rgba(245, 158, 11, 0.4)" : preset.id === "emerald" ? "rgba(16, 185, 129, 0.4)" : preset.id === "violet" ? "rgba(168, 85, 247, 0.4)" : "rgba(14, 165, 233, 0.4)",
              background: isHovered ? `${preset.glowColor}` : "transparent"
            }}
          />
        </>
      )}

      {/* Global Interactive Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Radial blobs centered on tracked mouse coordinates */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full filter blur-[140px] opacity-[0.11] transition-transform duration-700 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: `radial-gradient(circle, ${preset.id === "amber" ? "#f59e0b" : preset.id === "emerald" ? "#10b981" : preset.id === "violet" ? "#a855f7" : "#0ea5e9"} 0%, transparent 70%)`
          }}
        />
        {/* Elegant Dark theme specific blur-glow layers */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-purple-900/20 rounded-full blur-[100px]" />
        
        {/* Techno geometric background pattern grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:6rem_6rem]" />
      </div>

      {/* Profile Live Builder / Dynamic Accent panel */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setCustomizerOpen(!customizerOpen);
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="p-3.5 rounded-full glass-panel flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group shadow-xl"
        >
          <Settings className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
        </button>

        <AnimatePresence>
          {customizerOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="absolute bottom-16 right-0 w-80 glass-panel border border-white/10 rounded-2xl p-5 shadow-2xl z-50 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400" />
              
              <div className="flex items-center justify-between mb-4 mt-1">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <h4 className="text-xs font-semibold tracking-wider uppercase font-mono">Control Panel</h4>
                </div>
                <button 
                  onClick={() => setCustomizerOpen(false)}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Accent Controller */}
              <div className="mb-4">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Accent Aura Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPreset(p)}
                      className={`h-9 rounded-lg border text-xs font-mono font-bold capitalize transition-all flex flex-col justify-center items-center ${
                        preset.id === p.id 
                          ? "bg-white/10 border-sky-400 text-white shadow-md shadow-sky-500/10" 
                          : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/15"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full mb-0.5 ${
                        p.id === 'cyan' ? 'bg-sky-400' : p.id === 'violet' ? 'bg-purple-400' : p.id === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Profile Editing fields */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Modify Profile telemetry</label>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase block">Developer Name</label>
                    <span className="text-[8px] font-mono text-amber-500/80 uppercase tracking-wider flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5 inline" /> Read Only
                    </span>
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    disabled
                    className="w-full bg-slate-950/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 font-mono cursor-not-allowed opacity-60"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase block">Developer Role</label>
                    <span className="text-[8px] font-mono text-amber-500/80 uppercase tracking-wider flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5 inline" /> Read Only
                    </span>
                  </div>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full bg-slate-950/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 font-mono cursor-not-allowed opacity-60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">City Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white font-mono focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Years Exp</label>
                    <input
                      type="number"
                      value={profile.yearsExperience}
                      onChange={(e) => setProfile(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white font-mono focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setProfile(INITIAL_PROFILE);
                    setPreset(COLOR_PRESETS[0]);
                  }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" /> Reset telemetry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modular Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#home"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic flex items-center gap-2.5"
          >
            {profile.name.split(' ').map(n => n[0].toUpperCase()).join('') || 'JV'}.STUDIO
          </a>

          {/* Nav Items */}
          <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/60">
            {["skills", "projects", "experience", "blog"].map((sec) => (
              <li key={sec}>
                <a
                  href={`#${sec}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="hover:text-white transition-colors"
                >
                  {sec}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a
              href="#contact"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#050505] bg-white ${preset.bgHover} rounded-full transition-all duration-300 shrink-0`}
            >
              Contact
            </a>
            
            {/* Elegant luxury circular indicator capsule */}
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative max-w-7xl mx-auto px-6 pt-36 pb-24 z-10 space-y-36">
        
        {/* HERO SECTION */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 xl:pt-16 items-center">
          
          {/* Hero left content info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Subtitle Badge */}
            <div className={`inline-block px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest ${preset.textColor} font-bold mb-2 w-fit`}>
              {profile.role || "Digital Architect"}
            </div>

            {/* Giant Title headings */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tighter text-white uppercase text-left">
              CRAFTING<br />
              <span className="font-medium italic bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">FUTURE</span><br />
              DYNAMICS.
            </h1>

            {/* Interactive console terminal word typing inline */}
            <div className="text-xl sm:text-2xl text-slate-400 font-mono font-light mt-4">
              &gt; <span className="text-white font-medium">{typedWord}</span>
              <span className="animate-[ping_0.9s_infinite] ml-1">_</span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg text-[14px]">
              {profile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full ${preset.bgHover} transition-colors duration-300 font-mono flex items-center gap-2 cursor-pointer`}
              >
                View Cases <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 hover:border-white/20 transition-all font-mono"
              >
                Inquire Telemetry
              </a>
            </div>

            {/* Stat Counters with responsive values */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <dt className="text-3xl font-extrabold font-mono text-white flex items-center">
                  <span>{profile.yearsExperience}+</span>
                  <Award className={`w-4 h-4 ml-1 ${preset.textColor} opacity-60`} />
                </dt>
                <dd className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Years Eng.</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold font-mono text-white flex items-center">
                  <span>{profile.completedProjects}+</span>
                  <Code className="w-4 h-4 ml-1 text-purple-400 opacity-60" />
                </dt>
                <dd className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Core Modules</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold font-mono text-white flex items-center">
                  <span>{profile.happyClients}+</span>
                  <Globe className="w-4 h-4 ml-1 text-emerald-400 opacity-60" />
                </dt>
                <dd className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Happy Clients</dd>
              </div>
            </div>

          </div>

          {/* Hero right: Orbiting Interactive double stacked cards */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[460px] w-full px-4 sm:px-0">
            
            {/* Double card stack */}
            <div className="w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[390px] md:max-w-[400px] h-[460px] xs:h-[490px] sm:h-[510px] relative">
              {/* Back ambient card */}
              <div className={`absolute inset-0 bg-gradient-to-tr from-${preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : preset.id === "amber" ? "amber" : "sky"}-500/10 to-purple-500/10 rounded-[30px] sm:rounded-[40px] border border-white/10 backdrop-blur-2xl shadow-2xl rotate-[-4deg] sm:rotate-[-6deg] z-0`} />
              
              {/* Front central card */}
              <div className="absolute inset-0 bg-white/5 rounded-[30px] sm:rounded-[40px] border border-white/20 backdrop-blur-3xl shadow-2xl flex flex-col p-5 sm:p-8 rotate-2 sm:rotate-3 z-10 overflow-hidden">
                <div className="w-full h-40 xs:h-44 sm:h-56 bg-[#050505] border border-white/10 rounded-2xl mb-4 sm:mb-6 relative overflow-hidden shrink-0">
                  <Interactive3DCanvas colorPreset={preset} />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">{profile.name}</h3>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 font-mono uppercase tracking-widest leading-none">{profile.role}</p>

                {/* Unified Spec tag buttons directly in the 3D layout */}
                <div className="flex flex-wrap gap-1 mt-3.5 mb-2">
                  {["TypeScript", "React 19", "Flutter", "T-SQL", "Prisma"].map((s) => (
                    <span 
                      key={s}
                      onClick={() => handleSpotlight(s)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`text-[9px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full text-slate-300 hover:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/40 hover:text-white cursor-pointer transition-colors`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-3">
                  <div className="flex -space-x-1.5">
                    {["TS", "REACT", "NODE"].map((tag, i) => (
                      <div key={tag} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#121212] flex items-center justify-center text-[8px] font-bold font-mono text-white select-none ${
                        i === 0 ? (preset.id === "violet" ? "bg-purple-500" : preset.id === "emerald" ? "bg-emerald-500" : preset.id === "amber" ? "bg-amber-500" : "bg-sky-500") : i === 1 ? "bg-indigo-500" : "bg-purple-500"
                      }`}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-[#888888] uppercase tracking-[0.2em] font-mono">EST_2026</div>
                </div>
              </div>

              {/* Extra floating detail pill on the right - hidden on mobile, visible on tablets/desktops */}
              <div className="absolute -right-4 sm:-right-8 bottom-12 sm:bottom-16 w-36 sm:w-44 h-24 sm:h-28 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl z-20 shadow-xl p-3 sm:p-4 flex flex-col justify-between transform rotate-12 transition-all hover:scale-105 duration-300 hidden sm:flex">
                <div className="flex justify-between items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 relative">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping" />
                  </div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest font-mono">CYBER_LINK</div>
                </div>
                <div className={`text-xs sm:text-sm font-mono ${preset.textColor} tracking-widest font-bold`}>ACTIVE_04</div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full w-2/3 ${preset.bgColor}`} />
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* Skill Spotlight Modal component overlay if triggered */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#02050b]/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-md glass-panel border border-white/10 rounded-2xl p-6 shadow-2xl relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5">
                    <Cpu className={`w-5 h-5 ${preset.textColor}`} />
                    <h3 className="font-mono text-sm uppercase text-slate-200 tracking-wider">Index Telemetry Spotlight</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedSkill(null)}
                    className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 font-mono">
                    <div className="text-white font-bold text-lg mb-1">{selectedSkill.name}</div>
                    <div className={`text-[10px] ${preset.textColor} uppercase tracking-widest mb-3`}>Compiled dynamic info: OK</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {selectedSkill.exp}
                    </p>
                  </div>

                  <div className={`${preset.bgSoft} ${preset.borderSoft} border rounded-xl p-3 text-[10px] font-mono ${preset.textColor}/80 leading-relaxed`}>
                    🌟 Direct proficiencies are automatically incorporated in Elevate Commerce and Orbit workspaces.
                  </div>
                  
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-mono text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    Close telemetry scope
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-12">
          {/* Section banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-px ${preset.badgeClass.split(' ')[0]} bg-current`} />
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${preset.badgeClass.split(' ')[1]}`}>
                01 // Specialized Tools
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Advanced Skill Modules
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-md">
              Tap any spec modules below to compile exact diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              // Map icons statically
              const IconComp = cat.id === "frontend" ? Layout : cat.id === "backend" ? Server : cat.id === "database" ? Database : Smartphone;
              return (
                <TiltCard key={cat.id}>
                  <div className="glass-panel border-white/10 h-full rounded-2xl p-5 group flex flex-col justify-between">
                    <div>
                      <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/30 group-hover:bg-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/5 transition-all`}>
                        <IconComp className={`w-5 h-5 ${preset.textColor}`} />
                      </div>
                      <h3 className="font-mono text-slate-200 font-bold text-xs uppercase tracking-wider mb-3 leading-tight">
                        {cat.title}
                      </h3>
                      <div className="space-y-1.5 mb-6">
                        {cat.skills.map(s => (
                          <div 
                            key={s} 
                            onClick={() => handleSpotlight(s)}
                            className="flex items-center justify-between group/line hover:bg-white/5 px-2 py-1 rounded-md transition-colors"
                          >
                            <span className="text-[11px] font-mono text-slate-400 group-hover/line:text-white transition-colors">{s}</span>
                            <span className={`text-[8px] font-mono text-slate-600 group-hover/line:${preset.textColor} opacity-0 group-hover/line:opacity-100 transition-all uppercase tracking-wider`}>Inspect</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[9px] font-mono text-slate-500 border-t border-white/5 pt-3 uppercase tracking-wider flex items-center justify-between">
                      <span>Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Online
                      </span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-12">
          {/* Section banner & Filter tabs */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-px ${preset.badgeClass.split(' ')[0]} bg-current`} />
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${preset.badgeClass.split(' ')[1]}`}>
                  02 // Telemetry Works
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
                Featured Workspaces
              </h2>
            </div>

            {/* Selector Categories */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 border border-white/10 rounded-xl self-start">
              {(["all", "web", "mobile", "backend"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsHovered(false);
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid layout of Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <TiltCard className="h-full">
                    <div className="glass-panel border-white/10 hover:border-white/20 h-full rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group">
                      
                      {/* Graphics Header placeholder with dynamic gradient */}
                      <div className="h-32 bg-slate-950/60 border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-b from-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500/5 to-transparent`} />
                        <div className={`absolute -bottom-8 w-24 h-24 rounded-full bg-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500/5 filter blur-xl`} />
                        <span className="text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300 select-none">
                          {p.icon}
                        </span>
                        
                        <div className="absolute top-3 right-3">
                          <span className={`text-[9px] font-mono ${preset.bgSoft10} border ${preset.borderSoft20} ${preset.textColor} px-2 py-0.5 rounded-md uppercase tracking-wider`}>
                            {p.category}
                          </span>
                        </div>
                      </div>

                      {/* Decal Specifications */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className={`text-[9px] font-mono ${preset.textColor} font-bold mb-1 uppercase tracking-wider`}>
                            {p.language}
                          </div>
                          <h3 className={`text-sm font-bold text-white uppercase tracking-wider font-mono mb-2 group-hover:${preset.textColor} transition-colors`}>
                            {p.title}
                          </h3>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-mono mb-4">
                            {p.description}
                          </p>
                        </div>

                        <div className="space-y-4 border-t border-white/5 pt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => startTerminalSimulator(p)}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                              className="px-3 py-1.5 text-[9px] font-mono tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors uppercase flex items-center gap-1 cursor-pointer"
                            >
                              <Terminal className={`w-3.5 h-3.5 ${preset.textColor}`} /> Live Sandbox
                            </button>
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                              className="text-[9px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors uppercase"
                            >
                              <Github className="w-3.5 h-3.5" /> Source
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Interactive Live API terminal logger */}
          <AnimatePresence>
            {terminalProject && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-8 border border-white/10 rounded-2xl overflow-hidden glass-panel"
              >
                {/* Terminal Header status tags */}
                <div className="bg-slate-950/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 ml-2">
                      terminal_telemetry://{terminalProject.id}.sh
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (shellIntervalRef.current) clearInterval(shellIntervalRef.current);
                      setTerminalProject(null);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Screen logs */}
                <div className="p-4 bg-slate-950/40 font-mono text-xs text-slate-300 min-h-[190px] max-h-[300px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-slate-500 select-none">[{idx}]</span>
                      <span className={log.startsWith("[SUCCESS]") || log.startsWith("✓") ? "text-emerald-400" : log.startsWith("Initialize") ? preset.textColor : "text-slate-300"}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {compilingIndex < 9 && (
                    <div className="flex items-center gap-1 text-slate-500">
                      <span>_ compiling telemetry nodes...</span>
                      <span 
                        className="w-2 h-3.5 animate-[ping_0.8s_infinite]" 
                        style={{ backgroundColor: preset.id === 'amber' ? 'rgba(245,158,11,0.8)' : preset.id === 'emerald' ? 'rgba(16,185,129,0.8)' : preset.id === 'violet' ? 'rgba(168,85,247,0.8)' : 'rgba(14,165,233,0.8)' }}
                      />
                    </div>
                  )}
                </div>

                {/* Tech schema detail visualizer chart */}
                <div className="bg-slate-950/60 p-4 border-t border-white/5 space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">System Deployment Schema Map</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
                    {terminalProject.architecture.map((arch, index) => (
                      <div key={index} className={`bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500/20 hover:bg-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500/5 transition-colors`}>
                        <div>
                          <div className={`text-[8px] font-mono ${preset.textColor} font-bold uppercase mb-1`}>Node {index + 1}</div>
                          <div className="text-xs font-mono text-slate-200 line-clamp-2">{arch}</div>
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 text-right mt-2">Telemetry OK</div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </section>

        {/* CAREER TIMELINE SECTION */}
        <section id="experience" className="space-y-12">
          {/* Section banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-px ${preset.badgeClass.split(' ')[0]} bg-current`} />
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${preset.badgeClass.split(' ')[1]}`}>
                03 // Career Path
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Professional Timeline
            </h2>
          </div>

          <div className="max-w-3xl ml-4 relative border-l border-white/10 pl-8 space-y-12 py-3">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                
                {/* Tracker glowing ring */}
                <div className={`absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full border border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/40 bg-slate-950 flex items-center justify-center transition-all group-hover:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400 group-hover:scale-110 shadow-md`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${preset.bgColor} relative`}>
                    <span className={`absolute inset-0 rounded-full ${preset.bgColor} animate-ping group-hover:scale-150 duration-500`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`text-[10px] font-mono font-semibold tracking-wider ${preset.textColor} ${preset.bgSoft} border ${preset.borderSoft} px-2 py-0.5 rounded-md uppercase`}>
                    {exp.period}
                  </span>
                  
                  <h3 className="text-base font-extrabold text-white tracking-tight pt-1">
                    {exp.role} 
                    <span className="font-light text-slate-400 font-mono ml-1.5">&gt; {exp.company}</span>
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-2xl leading-relaxed pt-2">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2.5 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ARTICLES & INSIGHTS BLOG SECTION */}
        <section id="blog" className="space-y-12">
          {/* Section banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-px ${preset.badgeClass.split(' ')[0]} bg-current`} />
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${preset.badgeClass.split(' ')[1]}`}>
                04 // Written Notes
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Insights & Diagnostics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <TiltCard key={post.id} className="h-full">
                <div className={`glass-panel border-white/10 hover:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500/20 h-full rounded-2xl p-5 flex flex-col justify-between group`}>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span className={`${preset.textColor} ${preset.bgSoft} px-2 py-0.5 border ${preset.borderSoft} rounded-md uppercase tracking-wider`}>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className={`text-xs sm:text-sm font-extrabold text-white uppercase tracking-tight group-hover:${preset.textColor} transition-colors leading-snug font-mono`}>
                      {post.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed font-mono">
                      {post.summary}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-500">{post.date}</span>
                    
                    <button
                      onClick={() => {
                        setFormState("info");
                        setFormFeedback([post.title.toUpperCase(),`Category: ${post.category} | ${post.date}`, post.content]);
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`text-[10px] font-mono font-bold ${preset.textColor} hover:text-white transition-colors flex items-center gap-1 uppercase cursor-pointer`}
                    >
                      Inspect Module_ <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SECURE SUBMISSION CONTACT GATE */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-slate-950/40 rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden backdrop-blur-md">
          {/* Graphic reflection light */}
          <div className={`absolute top-0 right-0 w-80 h-80 ${preset.bgSoft} rounded-full blur-[100px] pointer-events-none`} />

          {/* Left panel headers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className={`text-[10px] font-mono font-black ${preset.textColor} uppercase tracking-widest block`}>05 // Secure Pipeline</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-snug">
                Deploy A Message
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-mono">
                Initiate a custom message telemetry envelope. Secure key encryption will apply automatically.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              {/* Telemetry copyable email row */}
              <div 
                onClick={handleCopyEmail}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center gap-3.5 group/row cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/row:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/40 group-hover/row:bg-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/5 transition-all`}>
                  <Mail className={`w-4.5 h-4.5 ${preset.textColor}`} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">E-mail Pipeline</span>
                  <span className="text-xs font-mono text-slate-300 group-hover/row:text-white transition-colors flex items-center gap-1.5">
                    {profile.email} <Copy className={`w-3 h-3 text-slate-500 group-hover/row:${preset.textColor}`} />
                  </span>
                </div>
              </div>

              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center gap-3.5 group/row p-2 rounded-xl transition-colors hover:bg-white/5"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/row:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-400/40 transition-all`}>
                  <Phone className={`w-4.5 h-4.5 ${preset.textColor}`} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">Voice Link</span>
                  <span className="text-xs font-mono text-slate-300 group-hover/row:text-white transition-colors">
                    {profile.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                  <MapPin className={`w-4.5 h-4.5 ${preset.textColor}`} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">Operational Port</span>
                  <span className="text-xs font-mono text-slate-300">
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                title="GitHub Core"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                title="LinkedIn Node"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={profile.twitterUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                title="Twitter Link"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Panel form client */}
          <div className="lg:col-span-7">
            <form onSubmit={handleFormSubmission} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Client Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Smith"
                    className={`w-full bg-slate-950/40 border border-white/10 focus:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 transition-all font-mono`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Sender Email</label>
                  <input
                    type="email"
                    value={email}
                    required
                    placeholder="jane@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-slate-950/40 border border-white/10 focus:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 transition-all font-mono`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Project Subject</label>
                <input
                  type="text"
                  value={subject}
                  placeholder="Full-Stack Proposal"
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full bg-slate-950/40 border border-white/10 focus:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 transition-all font-mono`}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Message Telemetry Payload</label>
                  <span className={`text-[9px] font-mono ${message.length > 500 ? "text-red-400" : "text-slate-500"}`}>
                    {message.length} / 600 characters max
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={message}
                  maxLength={600}
                  required
                  placeholder="Describe the details of your proposal scope..."
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full bg-slate-950/40 border border-white/10 focus:border-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-${preset.id === "cyan" ? "sky" : preset.id === "violet" ? "purple" : preset.id === "emerald" ? "emerald" : "amber"}-500 transition-all font-mono resize-none`}
                />
              </div>

              {/* Character length validator banner warns */}
              {message.length > 550 && (
                <div className="bg-red-500/5 border border-red-500/20 text-red-400 text-[10px] font-mono p-3 rounded-lg uppercase tracking-wide">
                  ⚠️ Danger: Input payload approaching max buffer length of 600.
                </div>
              )}

              {/* Status prompt details */}
              <AnimatePresence>
                {formState !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-slate-950/60 border border-white/10 rounded-xl p-4 font-mono space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/5 pb-2 mb-2">
                      <span className="flex items-center gap-1">
                        <Terminal className={`w-3.5 h-3.5 ${preset.textColor}`} /> secure_uplink_stream
                      </span>
                      <button 
                        type="button"
                        onClick={() => setFormState("idle")}
                        className="text-[9px] text-slate-500 hover:text-white uppercase"
                      >
                        [clear logs]
                      </button>
                    </div>
                    {formFeedback.map((fb, idx) => (
                      <div key={idx} className="text-[11px] text-slate-300">
                        &gt; {fb}
                      </div>
                    ))}
                    {formState === "sending" && (
                      <div className={`text-[11px] ${preset.textColor} flex items-center gap-1.5 pt-1.5`}>
                        <span className={`w-1.5 h-3.5 ${preset.bgColor} inline-block animate-pulse`} />
                        <span>transmitting data packets...</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={formState === "sending"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 glow-btn ${preset.btnClass} ${formState === "sending" ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <Send className="w-4 h-4" /> Deploy Handshake Packet
              </button>

            </form>
          </div>

        </section>

      </main>

      {/* Terminal Grid Footer overlay */}
      <footer className="border-t border-white/5 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium font-sans">
            © 2026 {profile.name.toUpperCase()} STUDIO. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-8 text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium font-sans">
            <span>MODULES x{profile.completedProjects}</span>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>COMMITS x1.2k</span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            <a href="#skills" className="hover:text-white transition-colors">SPEC GRID</a>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="#projects" className="hover:text-white transition-colors">WORKSPACE</a>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="#contact" className="hover:text-white transition-colors">SATELLITE</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
