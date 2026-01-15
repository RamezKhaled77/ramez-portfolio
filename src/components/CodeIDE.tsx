import { useState, useEffect, useRef } from "react";
import { Code2, Terminal, Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type TabType = 'react' | 'html' | 'css' | 'javascript';

const CodeIDE = () => {
  const [activeTab, setActiveTab] = useState<TabType>('react');
  const [displayedCode, setDisplayedCode] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const codeExamples = {
    react: [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "",
      "const Portfolio = () => {",
      "  const skills = [",
      "    'React', 'TypeScript', 'Tailwind CSS'",
      "  ];",
      "",
      "  return (",
      "    <motion.div className='portfolio'>",
      "      <h1>Building Amazing Experiences</h1>",
      "      {skills.map(skill => (",
      "        <span key={skill}>{skill}</span>",
      "      ))}",
      "    </motion.div>",
      "  );",
      "};",
      "",
      "export default Portfolio;",
    ],
    html: [
      "<!DOCTYPE html>",
      "<html lang='en'>",
      "<head>",
      "  <meta charset='UTF-8'>",
      "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>",
      "  <title>Portfolio - Modern Design</title>",
      "  <link rel='stylesheet' href='styles.css'>",
      "</head>",
      "<body>",
      "  <header class='hero'>",
      "    <nav class='navbar'>",
      "      <div class='logo'>Portfolio</div>",
      "      <ul class='nav-links'>",
      "        <li><a href='#about'>About</a></li>",
      "        <li><a href='#projects'>Projects</a></li>",
      "        <li><a href='#contact'>Contact</a></li>",
      "      </ul>",
      "    </nav>",
      "    <div class='hero-content'>",
      "      <h1>Creative Developer</h1>",
      "      <p>Crafting beautiful digital experiences</p>",
      "    </div>",
      "  </header>",
      "</body>",
      "</html>",
    ],
    css: [
      "/* Modern Portfolio Styles */",
      "",
      ":root {",
      "  --primary-color: #6366f1;",
      "  --secondary-color: #8b5cf6;",
      "  --text-color: #1f2937;",
      "  --bg-color: #ffffff;",
      "}",
      "",
      "* {",
      "  margin: 0;",
      "  padding: 0;",
      "  box-sizing: border-box;",
      "}",
      "",
      ".hero {",
      "  min-height: 100vh;",
      "  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));",
      "  color: white;",
      "  display: flex;",
      "  flex-direction: column;",
      "}",
      "",
      ".navbar {",
      "  display: flex;",
      "  justify-content: space-between;",
      "  align-items: center;",
      "  padding: 2rem 4rem;",
      "}",
    ],
    javascript: [
      "// Interactive Portfolio Features",
      "",
      "class Portfolio {",
      "  constructor() {",
      "    this.projects = [];",
      "    this.skills = ['JavaScript', 'React', 'Node.js'];",
      "    this.init();",
      "  }",
      "",
      "  init() {",
      "    this.setupAnimations();",
      "    this.loadProjects();",
      "    this.handleScrollEffects();",
      "  }",
      "",
      "  setupAnimations() {",
      "    const cards = document.querySelectorAll('.project-card');",
      "    ",
      "    cards.forEach((card, index) => {",
      "      card.style.animationDelay = `${index * 0.2}s`;",
      "      card.classList.add('fade-in');",
      "    });",
      "  }",
      "",
      "  async loadProjects() {",
      "    const response = await fetch('/api/projects');",
      "    this.projects = await response.json();",
      "    this.renderProjects();",
      "  }",
      "}",
      "",
      "new Portfolio();",
    ]
  };

  const tabs = [
    { id: 'react' as TabType, label: 'Portfolio.tsx', icon: Code2, color: '#61dafb' },
    { id: 'html' as TabType, label: 'index.html', icon: Code2, color: '#e34c26' },
    { id: 'css' as TabType, label: 'styles.css', icon: Code2, color: '#264de4' },
    { id: 'javascript' as TabType, label: 'script.js', icon: Code2, color: '#f0db4f' },
  ];

  const codeLines = codeExamples[activeTab];
  const fullCode = codeLines.join("\n");

  // Intersection Observer to trigger typing when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
          setCharIndex(0);
          setDisplayedCode("");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing animation - plays once on viewport entry, restarts on tab change
  useEffect(() => {
    if (!isTyping) return;
    if (charIndex >= fullCode.length) {
      setIsTyping(false);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedCode(prev => prev + fullCode[charIndex]);
      setCharIndex(prev => prev + 1);
    }, 30); // Consistent 30ms typing speed

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, fullCode]);

  // Handle tab change - reset and restart typing
  const handleTabChange = (tabId: TabType) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setDisplayedCode("");
    setCharIndex(0);
    setIsTyping(true);
  };

  // Enhanced syntax highlighting
  const highlightCode = (code: string) => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (line.trim() === "") {
        return <div key={lineIndex}>&nbsp;</div>;
      }

      // Comment highlighting
      if (line.trim().startsWith("//")) {
        return <div key={lineIndex} className="text-[#6a9955] italic">{line}</div>;
      }
      if (line.trim().startsWith("/*") || line.trim().startsWith("*")) {
        return <div key={lineIndex} className="text-[#6a9955] italic">{line}</div>;
      }

      // Enhanced syntax highlighting with regex
      let highlightedLine = line;
      
      // JSX/HTML tags
      highlightedLine = highlightedLine.replace(/(&lt;\/?)(\w+)([^&gt;]*?)(&gt;)/g, 
        (match, open, tag, attrs, close) => {
          return `<span class="text-[#4ec9b0]">${open}${tag}</span><span class="text-[#9cdcfe]">${attrs}</span><span class="text-[#4ec9b0]">${close}</span>`;
        });
      
      // Keywords
      const keywords = ['import', 'export', 'default', 'from', 'const', 'let', 'var', 'function', 
                       'class', 'return', 'if', 'else', 'for', 'while', 'async', 'await', 
                       'new', 'this', 'constructor', 'extends', 'typeof', 'instanceof'];
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlightedLine = highlightedLine.replace(regex, 
          `<span class="text-[#c586c0]">$1</span>`);
      });
      
      // Strings
      highlightedLine = highlightedLine.replace(/(['"`])(.*?)\1/g, 
        '<span class="text-[#ce9178]">$1$2$1</span>');
      
      // Numbers
      highlightedLine = highlightedLine.replace(/\b(\d+)\b/g, 
        '<span class="text-[#b5cea8]">$1</span>');
      
      // Functions
      highlightedLine = highlightedLine.replace(/(\w+)(\s*)\(/g, 
        '<span class="text-[#dcdcaa]">$1</span>$2(');
      
      // Properties
      highlightedLine = highlightedLine.replace(/\.(\w+)/g, 
        '.<span class="text-[#9cdcfe]">$1</span>');
      
      // CSS properties
      if (activeTab === 'css') {
        highlightedLine = highlightedLine.replace(/(\w+[-\w]*)(\s*):/g, 
          '<span class="text-[#9cdcfe]">$1</span>$2:');
        highlightedLine = highlightedLine.replace(/:\s*([^;]+);/g, 
          ': <span class="text-[#ce9178]">$1</span>;');
      }

      return (
        <div 
          key={lineIndex}
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
          className="text-[#d4d4d4]"
        />
      );
    });
  };

  const displayedLines = displayedCode.split('\n');

  // Highlight code with typing cursor
  const highlightCodeWithCursor = (code: string) => {
    const highlighted = highlightCode(code);
    return (
      <>
        {highlighted}
        {isTyping && (
          <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5 align-middle" />
        )}
      </>
    );
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Live Coding
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-heading mb-4">
                Watch Code <span className="text-gradient">Come to Life</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how I craft beautiful, functional components in real-time
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2 italic">
                Hover over code to see labels like "This animation" or "This state logic"
              </p>
            </div>

            {/* IDE Container with visual frame for light/dark transition */}
            <div className="relative group">
              {/* Code Preview Label */}
              <div className="flex items-center justify-center mb-4">
                <div className="px-4 py-1.5 bg-foreground/5 border border-card-border rounded-full">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Code Preview</span>
                </div>
              </div>
              
              {/* IDE Window */}
              <div className="bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden border-2 border-card-border dark:border-primary/20">
                {/* Window Header */}
                <div className="bg-[#2d2d2d] px-6 py-3 flex items-center justify-between border-b border-[#3e3e3e]">
                  <div className="flex items-center gap-3">
                    {/* Traffic Lights */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors cursor-pointer" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors group/btn">
                      <Play size={16} className="text-primary group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors group/btn">
                      <Terminal size={16} className="text-muted-foreground group-hover/btn:text-primary transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-[#252526] border-b border-[#3e3e3e] flex items-center gap-1 px-2 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-mono transition-all duration-300 border-b-2 whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'bg-[#1e1e1e] text-white border-primary'
                            : 'text-muted-foreground hover:text-white border-transparent hover:bg-[#2d2d2d]'
                        }`}
                      >
                        <Icon size={14} style={{ color: activeTab === tab.id ? tab.color : undefined }} />
                        <span>{tab.label}</span>
                        {activeTab === tab.id && (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Code Editor with fixed height container */}
                <div className="relative flex flex-col" style={{ minHeight: '600px' }}>
                  {/* Code Area - takes remaining space */}
                  <div className="flex flex-1 pb-10">
                    {/* Line Numbers */}
                    <div className="bg-[#1e1e1e] py-6 px-4 select-none border-r border-[#3e3e3e]">
                      {codeLines.map((_, index) => (
                        <div
                          key={index}
                          className="text-right font-mono text-sm leading-6 text-primary/60"
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 py-6 px-6 overflow-x-auto">
                      <pre className="font-mono text-sm leading-6 whitespace-pre-wrap">
                        <code>
                          {highlightCodeWithCursor(displayedCode)}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Status Bar - Always visible at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#007acc] px-6 py-2 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-4">
                      <span className="text-white">
                        {activeTab === 'react' && 'TypeScript React'}
                        {activeTab === 'html' && 'HTML'}
                        {activeTab === 'css' && 'CSS'}
                        {activeTab === 'javascript' && 'JavaScript'}
                      </span>
                      <span className="text-white/70">UTF-8</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/70">Ln {displayedCode.split('\n').length}, Col {(displayedCode.split('\n').pop()?.length || 0) + 1}</span>
                      <span className="text-white/70">Spaces: 2</span>
                      <span className="text-white font-semibold">{isTyping ? '● Typing...' : '● Ready'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CodeIDE;
