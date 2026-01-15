import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Brain, Blocks, Workflow, Zap, RefreshCw } from "lucide-react";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Problem First",
    description: "I start by deeply understanding the problem before writing a single line of code. I focus on the user's pain points, edge cases, and real-world constraints.",
    icon: Brain,
  },
  {
    id: 2,
    title: "Component Thinking",
    description: "I break the solution into reusable, scalable components, thinking in terms of structure, responsibility, and long-term maintainability.",
    icon: Blocks,
  },
  {
    id: 3,
    title: "Logic Before UI",
    description: "I design the data flow and state logic first, ensuring the system works correctly before making it visually appealing.",
    icon: Workflow,
  },
  {
    id: 4,
    title: "Performance Awareness",
    description: "I actively consider performance from the beginning — minimizing re-renders, optimizing assets, and avoiding unnecessary complexity.",
    icon: Zap,
  },
  {
    id: 5,
    title: "Iteration & Refinement",
    description: "I improve the solution through iteration, refactoring, and feedback until it feels simple, clear, and reliable.",
    icon: RefreshCw,
  },
];

const TimelineCard = ({ step, index }: { step: TimelineStep; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative flex items-center gap-4 md:gap-8 group"
    >
      {/* Timeline dot - left on mobile, center on desktop */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-2 md:border-4 border-background shadow-lg"
        />
      </div>

      {/* Horizontal connector line - mobile (left to card) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        className="absolute left-[22px] top-1/2 -translate-y-1/2 w-[26px] h-[2px] bg-gradient-to-r from-primary to-primary/30 origin-left md:hidden"
      />

      {/* Horizontal connector line - desktop (dot to card) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        className={`
          hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-[calc(2rem-8px)]
          ${index % 2 === 0 
            ? 'right-1/2 mr-2 bg-gradient-to-l from-primary to-primary/30 origin-right' 
            : 'left-1/2 ml-2 bg-gradient-to-r from-primary to-primary/30 origin-left'
          }
        `}
      />

      {/* Arrow indicator on connector */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
        className={`
          hidden md:flex absolute top-1/2 -translate-y-1/2 w-2 h-2 items-center justify-center
          ${index % 2 === 0 
            ? 'right-[calc(50%+2rem-12px)]' 
            : 'left-[calc(50%+2rem-12px)]'
          }
        `}
      >
        <div className={`w-0 h-0 border-t-[4px] border-b-[4px] border-t-transparent border-b-transparent
          ${index % 2 === 0 
            ? 'border-r-[6px] border-r-primary/50' 
            : 'border-l-[6px] border-l-primary/50'
          }
        `} />
      </motion.div>

      {/* Card - full width on mobile, alternating sides on desktop */}
      <div className={`
        w-full pl-12 pr-4
        md:w-[calc(50%-2rem)] md:pl-0 md:pr-0
        ${index % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'}
      `}>
        <motion.div
          whileHover={{ 
            y: -4,
            boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)"
          }}
          transition={{ duration: 0.3 }}
          className="group/card relative p-4 md:p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
          
          <div className={`relative flex items-start gap-3 md:gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover/card:bg-primary/20 transition-colors duration-300">
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            
            <div className={`flex-1 text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <span className="text-xs font-mono text-muted-foreground">0{step.id}</span>
              </div>
              <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-1 md:mb-2">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HowMyBrainWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="min-h-screen py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Transition */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground/70 text-sm font-medium tracking-wide mb-8"
        >
          This is how I approach every problem I face.
        </motion.p>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-primary mb-4">
            My Approach
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            How My Brain Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A glimpse into my engineering mindset and problem-solving approach
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Static timeline line background - left on mobile, center on desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-border/30" />
          
          {/* Animated timeline line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 bg-primary origin-top"
            style={{ height: lineHeight }}
          />

          {/* Timeline cards */}
          <div className="space-y-8 md:space-y-16 relative">
            {timelineSteps.map((step, index) => (
              <TimelineCard key={step.id} step={step} index={index} />
            ))}
          </div>

          {/* End dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 bottom-0 translate-y-8"
          >
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-background" />
            </div>
          </motion.div>
        </div>

        {/* Grounding note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground/60 text-sm mt-16 italic"
        >
          This exact flow is applied in my real projects.
        </motion.p>
      </div>
    </div>
  );
};

export default HowMyBrainWorks;
