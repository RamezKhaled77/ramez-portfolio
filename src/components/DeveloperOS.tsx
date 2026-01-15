import { useState, useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Code2, Lightbulb, Bug, FolderKanban, ArrowRight, Sparkles, Zap, Terminal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  tooltip: string;
}

const BentoCard = ({ children, className = "", index, tooltip }: BentoCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -5;
    const rotateYValue = (mouseX / (rect.width / 2)) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
            className={`
              group relative overflow-hidden rounded-2xl
              bg-gradient-to-br from-card/80 to-card/40
              backdrop-blur-sm border border-border/50
              transition-all duration-300 ease-out
              hover:shadow-2xl hover:shadow-primary/10
              hover:border-primary/30 hover:-translate-y-1
              ${className}
            `}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full p-6 flex flex-col">
              {children}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-popover/95 backdrop-blur-sm border-border/50 text-popover-foreground max-w-[250px] text-center"
        >
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Animated Brain Icon with pulsing neurons
const AnimatedBrainIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Brain className="w-6 h-6" />
    </motion.div>
    {/* Neural sparks */}
    <motion.div
      className="absolute -top-1 -right-1"
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
    >
      <Sparkles className="w-3 h-3 text-primary" />
    </motion.div>
  </div>
);

// Animated Code Icon with typing effect
const AnimatedCodeIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ rotateY: [0, 10, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Code2 className="w-5 h-5" />
    </motion.div>
    {/* Cursor blink */}
    <motion.div
      className="absolute -bottom-0.5 right-0 w-0.5 h-3 bg-current"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  </div>
);

// Animated Lightbulb with glow
const AnimatedLightbulbIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ 
        filter: ["drop-shadow(0 0 0px rgba(234, 179, 8, 0))", "drop-shadow(0 0 8px rgba(234, 179, 8, 0.6))", "drop-shadow(0 0 0px rgba(234, 179, 8, 0))"]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Lightbulb className="w-5 h-5" />
    </motion.div>
    {/* Light rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.div
        key={angle}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full"
        style={{ 
          transformOrigin: "center",
        }}
        animate={{ 
          opacity: [0, 0.8, 0],
          x: [0, Math.cos(angle * Math.PI / 180) * 12],
          y: [0, Math.sin(angle * Math.PI / 180) * 12],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: i * 0.1,
          ease: "easeOut"
        }}
      />
    ))}
  </div>
);

// Animated Bug with scanning effect
const AnimatedBugIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ x: [-1, 1, -1] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    >
      <Bug className="w-5 h-5" />
    </motion.div>
    {/* Scan line */}
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute w-full h-0.5 bg-red-400/50"
        animate={{ y: [-10, 30, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  </div>
);

// Animated Folder with floating files
const AnimatedFolderIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <FolderKanban className="w-6 h-6" />
    </motion.div>
    {/* Floating mini elements */}
    <motion.div
      className="absolute -top-2 -right-1"
      animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    >
      <Zap className="w-2.5 h-2.5 text-primary" />
    </motion.div>
  </div>
);

// Floating particles for Thinking Mode card
const ThinkingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + (i % 3) * 20}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Terminal typing animation for Debugging card - fixed height to prevent layout shift
const TerminalAnimation = () => (
  <div className="mt-3 font-mono text-xs text-red-400/70 flex items-center gap-1 h-4">
    <Terminal className="w-3 h-3 flex-shrink-0" />
    <span className="relative overflow-hidden">
      <motion.span
        className="inline-block"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        finding root cause...
      </motion.span>
      <motion.span
        className="inline-block w-1.5 h-3 bg-red-400/70 ml-0.5 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </span>
  </div>
);

// Animated Focus Icon
const AnimatedFocusIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ scale: [1, 0.95, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Zap className="w-5 h-5" />
    </motion.div>
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-current"
      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
    />
  </div>
);

// Animated Improvement Icon with refresh/cycle effect
const AnimatedImprovementIcon = () => (
  <div className="relative">
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      <ArrowRight className="w-5 h-5" style={{ transform: "rotate(-45deg)" }} />
    </motion.div>
    <motion.div
      className="absolute -top-0.5 -right-0.5"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <Sparkles className="w-2.5 h-2.5 text-green-400" />
    </motion.div>
  </div>
);

const DeveloperOS = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const techStack = ["React", "TypeScript", "JavaScript", "Tailwind CSS", "APIs"];

  return (
    <section
      ref={sectionRef}
      id="developer-os"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">My Developer</span>{" "}
            <span className="text-primary">OS</span>
          </h2>
          <p className="text-muted-foreground/70 text-base max-w-2xl mx-auto">
            A glimpse into how I think, work, and build as a Frontend Engineer
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 max-w-6xl mx-auto">
          
          {/* Large Card - Thinking Mode */}
          <BentoCard
            className="md:col-span-2 lg:col-span-3 lg:row-span-2 min-h-[280px]"
            index={0}
            tooltip="I prioritize architecture and clarity before code."
          >
            <ThinkingParticles />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <AnimatedBrainIcon />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                Thinking Mode
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
              Problem → System → Solution
            </h3>
            <p className="text-muted-foreground/70 text-sm md:text-base leading-relaxed flex-1">
              I analyze the problem, design a system, then implement the solution.
            </p>
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2 text-sm text-primary/80">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>Always active</span>
              </div>
            </div>
          </BentoCard>

          {/* Medium Card - Tech Stack */}
          <BentoCard
            className="md:col-span-2 lg:col-span-3 min-h-[180px]"
            index={1}
            tooltip="Tools are chosen based on project needs, not trends."
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-accent/20 text-accent-foreground">
                <AnimatedCodeIcon />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-lg bg-secondary/50 text-secondary-foreground text-sm font-medium
                    border border-border/30 hover:border-primary/40 hover:bg-primary/10 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </BentoCard>

          {/* Small Card - Learning Mode */}
          <BentoCard
            className="md:col-span-2 lg:col-span-1 min-h-[160px]"
            index={2}
            tooltip="I prefer building and breaking things to truly understand them."
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                <AnimatedLightbulbIcon />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                Learning
              </span>
            </div>
            <p className="text-foreground font-medium text-sm">
              Real projects, not tutorials.
            </p>
            <motion.div 
              className="mt-auto pt-3 flex items-center gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3 text-yellow-500/60" />
              <span className="text-xs text-muted-foreground">Curious</span>
            </motion.div>
          </BentoCard>

          {/* Small Card - Focus Mode */}
          <BentoCard
            className="md:col-span-2 lg:col-span-2 min-h-[160px]"
            index={3}
            tooltip="Deep work sessions with zero distractions."
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <AnimatedFocusIcon />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                Focus
              </span>
            </div>
            <p className="text-foreground font-medium text-sm">
              Deep work, zero distractions.
            </p>
            <motion.div 
              className="mt-auto pt-3 flex items-center gap-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-muted-foreground/60">In the zone</span>
            </motion.div>
          </BentoCard>

          {/* Medium Card - Debugging Mode */}
          <BentoCard
            className="md:col-span-2 lg:col-span-2 min-h-[160px]"
            index={4}
            tooltip="I debug methodically, not emotionally."
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                <AnimatedBugIcon />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                Debug
              </span>
            </div>
            <p className="text-foreground font-medium text-sm">
              Logs & breakpoints. Methodical.
            </p>
            <TerminalAnimation />
          </BentoCard>

          {/* Medium Card - Improvement Mode (NEW) */}
          <BentoCard
            className="md:col-span-2 lg:col-span-4 min-h-[160px]"
            index={5}
            tooltip="Continuous refinement is part of the craft."
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                <AnimatedImprovementIcon />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                Improvement
              </span>
            </div>
            <p className="text-foreground font-medium text-sm">
              Refactoring and continuous improvement.
            </p>
            <motion.div 
              className="mt-auto pt-3 flex items-center gap-1"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-3 h-3 text-green-500/60" />
              <span className="text-[10px] text-muted-foreground/60">Iterating</span>
            </motion.div>
          </BentoCard>

          {/* Wide Card - Projects Built */}
          <BentoCard
            className="md:col-span-4 lg:col-span-6 min-h-[140px]"
            index={6}
            tooltip="Every project solves a real problem."
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <AnimatedFolderIcon />
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                    Projects Built
                  </span>
                  <p className="text-foreground font-semibold text-lg">
                    Real-world projects, not tutorials.
                  </p>
                </div>
              </div>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-primary/10 text-primary font-medium text-sm
                  hover:bg-primary hover:text-primary-foreground
                  transition-all duration-300 w-fit"
              >
                View Projects
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default DeveloperOS;
