import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// IDE Syntax Colors (One Dark Pro inspired)
const syntaxColors = {
  keyword: "#c633ff", // Purple
  tag: "#e1237d", // Red
  attr: "#feef2d", // Orange
  string: "#3fa95a", // Green
  function: "#1253ee", // Blue
  comment: "#808080", // Gray
};

const skeletonMapping = [
  {
    id: "header",
    designLabel: "Header",
    codeLines: [0, 1, 2],
    color: "#4dabf7",
  },
  {
    id: "nav",
    designLabel: "Navigation",
    codeLines: [3, 4, 5],
    color: "#38d9a9",
  },
  {
    id: "hero",
    designLabel: "Hero Section",
    codeLines: [6, 7, 8],
    color: "#be4bdb",
  },
  { id: "card1", designLabel: "Card 01", codeLines: [9, 10], color: "#ff922b" },
  {
    id: "card2",
    designLabel: "Card 02",
    codeLines: [11, 12],
    color: "#ff6b6b",
  },
  {
    id: "button",
    designLabel: "Primary Button",
    codeLines: [13, 14],
    color: "#22b8cf",
  },
  {
    id: "footer",
    designLabel: "Footer",
    codeLines: [15, 16, 17],
    color: "#82c91e",
  },
];

const codeSkeletonLines = [
  {
    indent: 0,
    tokens: [
      { w: "15%", c: "keyword" },
      { w: "25%", c: "function" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { w: "20%", c: "keyword" },
      { w: "30%", c: "tag" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { w: "40%", c: "attr" },
      { w: "15%", c: "string" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { w: "12%", c: "tag" },
      { w: "35%", c: "comment" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { w: "20%", c: "attr" },
      { w: "25%", c: "string" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { w: "18%", c: "tag" },
      { w: "40%", c: "attr" },
    ],
  },
  { indent: 2, tokens: [{ w: "30%", c: "string" }] },
  { indent: 2, tokens: [{ w: "10%", c: "keyword" }] },
  {
    indent: 1,
    tokens: [
      { w: "30%", c: "tag" },
      { w: "25%", c: "attr" },
    ],
  },
  { indent: 2, tokens: [{ w: "45%", c: "string" }] },
  { indent: 2, tokens: [{ w: "15%", c: "tag" }] },
  {
    indent: 1,
    tokens: [
      { w: "20%", c: "tag" },
      { w: "25%", c: "comment" },
    ],
  },
  { indent: 2, tokens: [{ w: "25%", c: "attr" }] },
  {
    indent: 1,
    tokens: [
      { w: "15%", c: "keyword" },
      { w: "30%", c: "function" },
    ],
  },
  { indent: 2, tokens: [{ w: "40%", c: "string" }] },
  {
    indent: 0,
    tokens: [
      { w: "12%", c: "keyword" },
      { w: "20%", c: "tag" },
    ],
  },
  { indent: 1, tokens: [{ w: "45%", c: "comment" }] },
  { indent: 2, tokens: [{ w: "30%", c: "tag" }] },
];

// Get color for a code line based on its mapping
const getLineColor = (lineIndex: number, isHighlighted: boolean) => {
  const mapping = skeletonMapping.find((m) => m.codeLines.includes(lineIndex));
  if (isHighlighted && mapping) {
    return mapping.color;
  }
  return undefined;
};

// Get color for design element
const getElementColor = (elementId: string) => {
  const mapping = skeletonMapping.find((m) => m.id === elementId);
  return mapping?.color;
};

// Get label for design element
const getElementLabel = (elementId: string) => {
  const mapping = skeletonMapping.find((m) => m.id === elementId);
  return mapping?.designLabel;
};

const DesignCode = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [hoveredCodeLines, setHoveredCodeLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleDesignHover = (elementId: string | null) => {
    setHoveredElement(elementId);
    if (elementId) {
      const mapping = skeletonMapping.find((m) => m.id === elementId);
      setHoveredCodeLines(mapping?.codeLines || []);
    } else {
      setHoveredCodeLines([]);
    }
  };

  const handleCodeHover = (lineIndex: number | null) => {
    if (lineIndex !== null) {
      const mapping = skeletonMapping.find((m) =>
        m.codeLines.includes(lineIndex),
      );
      setHoveredElement(mapping?.id || null);
      setHoveredCodeLines(mapping?.codeLines || []);
    } else {
      setHoveredElement(null);
      setHoveredCodeLines([]);
    }
  };

  const isElementHighlighted = (elementId: string) =>
    hoveredElement === elementId;
  const isCodeLineHighlighted = (lineIndex: number) =>
    hoveredCodeLines.includes(lineIndex);

  // Shimmer animation keyframes
  const shimmerAnimation = {
    backgroundPosition: ["200% 0", "-200% 0"],
  };

  return (
    <section
      ref={containerRef}
      id="design-code"
      className="py-24 md:py-32 bg-muted/30 "
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            hsl(var(--muted-foreground) / 0.1) 25%,
            hsl(var(--muted-foreground) / 0.2) 50%,
            hsl(var(--muted-foreground) / 0.1) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .skeleton-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Design <span className="text-muted-foreground">×</span> Code
          </h2>
          <p className="text-muted-foreground/70 text-base max-w-2xl mx-auto">
            Understanding structure and component logic before visual polish
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 italic">
            Hover over elements to see code-design relationships
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-fuchsia-300">
          {/* Design Skeleton Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  design.frame
                </span>
              </div>

              {/* Skeleton UI Layout */}
              <div className="space-y-4">
                {/* Header Skeleton */}
                <div
                  onMouseEnter={() => handleDesignHover("header")}
                  onMouseLeave={() => handleDesignHover(null)}
                  className={`relative h-12 rounded-lg border-2 transition-all duration-200 cursor-pointer flex items-center px-4 gap-3 skeleton-pulse ${
                    isElementHighlighted("header")
                      ? "shadow-lg"
                      : "border-transparent bg-muted/60"
                  }`}
                  style={
                    isElementHighlighted("header")
                      ? {
                          borderColor: getElementColor("header"),
                          backgroundColor: `${getElementColor("header")}15`,
                          boxShadow: `0 0 20px ${getElementColor("header")}30`,
                        }
                      : {}
                  }
                >
                  {isElementHighlighted("header") && (
                    <span
                      className="absolute -top-6 left-2 text-xs font-medium px-2 py-0.5 rounded"
                      style={{ color: getElementColor("header") }}
                    >
                      {getElementLabel("header")}
                    </span>
                  )}
                  <div className="w-8 h-4 rounded skeleton-shimmer" />
                  <div className="flex-1" />
                  <div className="w-12 h-3 rounded skeleton-shimmer" />
                  <div className="w-12 h-3 rounded skeleton-shimmer" />
                  <div className="w-12 h-3 rounded skeleton-shimmer" />
                </div>

                {/* Navigation Skeleton */}
                <div
                  onMouseEnter={() => handleDesignHover("nav")}
                  onMouseLeave={() => handleDesignHover(null)}
                  className={`relative h-9 rounded-lg border-2 transition-all duration-200 cursor-pointer flex items-center px-4 gap-4 skeleton-pulse ${
                    isElementHighlighted("nav")
                      ? "shadow-lg"
                      : "border-transparent bg-muted/40"
                  }`}
                  style={
                    isElementHighlighted("nav")
                      ? {
                          borderColor: getElementColor("nav"),
                          backgroundColor: `${getElementColor("nav")}15`,
                          boxShadow: `0 0 20px ${getElementColor("nav")}30`,
                        }
                      : {}
                  }
                >
                  {isElementHighlighted("nav") && (
                    <span
                      className="absolute -top-6 left-2 text-xs font-medium px-2 py-0.5 rounded"
                      style={{ color: getElementColor("nav") }}
                    >
                      {getElementLabel("nav")}
                    </span>
                  )}
                  <div className="w-16 h-2 rounded skeleton-shimmer" />
                  <div className="w-14 h-2 rounded skeleton-shimmer" />
                  <div className="w-18 h-2 rounded skeleton-shimmer" />
                </div>

                {/* Hero Section Skeleton */}
                <div
                  onMouseEnter={() => handleDesignHover("hero")}
                  onMouseLeave={() => handleDesignHover(null)}
                  className={`relative h-36 rounded-xl border-2 transition-all duration-200 cursor-pointer p-5 flex flex-col justify-center skeleton-pulse ${
                    isElementHighlighted("hero")
                      ? "shadow-lg"
                      : "border-transparent bg-muted/50"
                  }`}
                  style={
                    isElementHighlighted("hero")
                      ? {
                          borderColor: getElementColor("hero"),
                          backgroundColor: `${getElementColor("hero")}15`,
                          boxShadow: `0 0 20px ${getElementColor("hero")}30`,
                        }
                      : {}
                  }
                >
                  {isElementHighlighted("hero") && (
                    <span
                      className="absolute -top-6 left-2 text-xs font-medium px-2 py-0.5 rounded"
                      style={{ color: getElementColor("hero") }}
                    >
                      {getElementLabel("hero")}
                    </span>
                  )}
                  <div className="w-3/4 h-5 rounded skeleton-shimmer mb-4" />
                  <div className="w-1/2 h-3 rounded skeleton-shimmer mb-3" />
                  {/* <div className="w-1/4 h-3 rounded skeleton-shimmer mb-3" /> */}
                  <div className="w-2/3 h-3 rounded skeleton-shimmer" />
                </div>

                {/* Cards Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div
                    onMouseEnter={() => handleDesignHover("card1")}
                    onMouseLeave={() => handleDesignHover(null)}
                    className={`relative h-28 rounded-xl border-2 transition-all duration-200 cursor-pointer p-5 skeleton-pulse ${
                      isElementHighlighted("card1")
                        ? "shadow-lg"
                        : "border-transparent bg-muted/45"
                    }`}
                    style={
                      isElementHighlighted("card1")
                        ? {
                            borderColor: getElementColor("card1"),
                            backgroundColor: `${getElementColor("card1")}15`,
                            boxShadow: `0 0 20px ${getElementColor("card1")}30`,
                          }
                        : {}
                    }
                  >
                    {isElementHighlighted("card1") && (
                      <span
                        className="absolute -top-6 left-2 text-xs font-medium px-2 py-0.5 rounded"
                        style={{ color: getElementColor("card1") }}
                      >
                        {getElementLabel("card1")}
                      </span>
                    )}

                    <div className="w-8 h-8 rounded-lg skeleton-shimmer mb-3" />
                    <div className="w-3/4 h-2.5 rounded skeleton-shimmer mb-2" />
                    <div className="w-1/2 h-2 rounded skeleton-shimmer" />
                  </div>

                  {/* Card 2 */}
                  <div
                    onMouseEnter={() => handleDesignHover("card2")}
                    onMouseLeave={() => handleDesignHover(null)}
                    className={`relative h-28 rounded-xl border-2 transition-all duration-200 cursor-pointer p-4 skeleton-pulse ${
                      isElementHighlighted("card2")
                        ? "shadow-lg"
                        : "border-transparent bg-muted/45"
                    }`}
                    style={
                      isElementHighlighted("card2")
                        ? {
                            borderColor: getElementColor("card2"),
                            backgroundColor: `${getElementColor("card2")}15`,
                            boxShadow: `0 0 20px ${getElementColor("card2")}30`,
                          }
                        : {}
                    }
                  >
                    {isElementHighlighted("card2") && (
                      <span
                        className="absolute -top-6 left-2 text-xs font-medium px-2 py-0.5 rounded"
                        style={{ color: getElementColor("card2") }}
                      >
                        {getElementLabel("card2")}
                      </span>
                    )}
                    <div className="w-8 h-8 rounded-lg skeleton-shimmer mb-3" />
                    <div className="w-2/3 h-2.5 rounded skeleton-shimmer mb-2" />
                    <div className="w-1/2 h-2 rounded skeleton-shimmer" />
                  </div>
                </div>

                {/* Button Skeleton */}
                <div
                  onMouseEnter={() => handleDesignHover("button")}
                  onMouseLeave={() => handleDesignHover(null)}
                  className={`relative h-10 w-32 mx-auto rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center skeleton-pulse ${
                    isElementHighlighted("button")
                      ? "shadow-lg"
                      : "border-transparent bg-muted/60"
                  }`}
                  style={
                    isElementHighlighted("button")
                      ? {
                          borderColor: getElementColor("button"),
                          backgroundColor: `${getElementColor("button")}15`,
                          boxShadow: `0 0 20px ${getElementColor("button")}30`,
                        }
                      : {}
                  }
                >
                  {isElementHighlighted("button") && (
                    <span
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap"
                      style={{ color: getElementColor("button") }}
                    >
                      {getElementLabel("button")}
                    </span>
                  )}
                  <div className="w-16 h-2.5 rounded skeleton-shimmer" />
                </div>

                {/* Footer Skeleton */}
                <div
                  onMouseEnter={() => handleDesignHover("footer")}
                  onMouseLeave={() => handleDesignHover(null)}
                  className={`relative h-14 rounded-lg border-2 transition-all duration-200 cursor-pointer flex items-center justify-between px-4 skeleton-pulse ${
                    isElementHighlighted("footer")
                      ? "shadow-lg"
                      : "border-transparent bg-muted/35"
                  }`}
                  style={
                    isElementHighlighted("footer")
                      ? {
                          borderColor: getElementColor("footer"),
                          backgroundColor: `${getElementColor("footer")}15`,
                          boxShadow: `0 0 20px ${getElementColor("footer")}30`,
                        }
                      : {}
                  }
                >
                  {isElementHighlighted("footer") && (
                    <span
                      className="absolute -top-6 left-2 text-xs font-medium px-2 py-0.5 rounded"
                      style={{ color: getElementColor("footer") }}
                    >
                      {getElementLabel("footer")}
                    </span>
                  )}
                  <div className="w-20 h-2 rounded skeleton-shimmer" />
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded skeleton-shimmer" />
                    <div className="w-4 h-4 rounded skeleton-shimmer" />
                    <div className="w-4 h-4 rounded skeleton-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Skeleton Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  component.tsx
                </span>
              </div>

              {/* Code Skeleton Lines */}
              <div className="space-y-1.5 font-mono">
                {codeSkeletonLines.map((line, index) => {
                  const isHighlighted = isCodeLineHighlighted(index);
                  const mapping = skeletonMapping.find((m) =>
                    m.codeLines.includes(index),
                  );
                  const activeColor = mapping?.color;

                  return (
                    <div
                      key={index}
                      onMouseEnter={() => handleCodeHover(index)}
                      onMouseLeave={() => handleCodeHover(null)}
                      className="flex  items-center gap-3 py-1 px-2 rounded transition-all duration-200"
                      style={{
                        // The Line will stay but its background color will change
                        backgroundColor: isHighlighted
                          ? `${activeColor}10`
                          : "transparent",
                      }}
                    >
                      {/* Line number */}
                      <span className="text-[10px] w-5 text-muted-foreground/40">
                        {index + 1}
                      </span>

                      {/* Indent */}
                      <div style={{ width: `${line.indent * 16}px` }} />

                      {/* Line chunks */}
                      <div className="flex gap-1.5 flex-1">
                        {line.tokens.map((token, i) => (
                          <div
                            key={i}
                            className="h-3 rounded transition-all duration-300"
                            style={{
                              width: token.w,
                              backgroundColor: isHighlighted
                                ? activeColor
                                : syntaxColors[token.c],
                              opacity: isHighlighted ? 1 : 0.5,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-muted-foreground/60 mt-8 hidden md:block"
        >
          Hover over elements to see the design-code relationship
        </motion.p>
      </div>
    </section>
  );
};

export default DesignCode;
