import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Quote = () => {
  const quotes = [
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
      category: "Wisdom"
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
      category: "Philosophy"
    },
    {
      text: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs",
      category: "Design"
    },
    {
      text: "Simplicity is the soul of efficiency.",
      author: "Austin Freeman",
      category: "Principle"
    },
    {
      text: "Make it work, make it right, make it fast.",
      author: "Kent Beck",
      category: "Process"
    },
    {
      text: "Perfect is the enemy of good.",
      author: "Voltaire",
      category: "Mindset"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuote = quotes[currentQuoteIndex];

  const handleNextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextQuote();
    }, 8000); // Auto-rotate every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Decorative Elements - constrained to prevent overflow */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow translate-x-1/2" />
      
      {/* Floating Sparkles */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <Sparkles className="text-primary/30 w-6 h-6" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float-slow">
        <Sparkles className="text-accent/30 w-8 h-8" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float">
        <Sparkles className="text-primary/40 w-5 h-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            {/* Quote Card */}
            <div className="relative">
              {/* Main Quote Container */}
              <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden group hover-lift">
                {/* Decorative Quote Marks */}
                <div className="absolute top-8 left-8 text-8xl md:text-9xl text-primary/10 font-serif leading-none select-none">
                  "
                </div>
                <div className="absolute bottom-8 right-8 text-8xl md:text-9xl text-primary/10 font-serif leading-none rotate-180 select-none">
                  "
                </div>

                {/* Category Badge */}
                <div className="flex justify-center mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium tracking-wider uppercase">
                    <Sparkles className="w-4 h-4" />
                    {currentQuote.category}
                  </span>
                </div>

                {/* Quote Text */}
                <div 
                  className={`relative z-10 transition-all duration-300 ${
                    isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <blockquote className="text-center">
                    <p 
                      className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {currentQuote.text}
                    </p>
                    
                    {/* Author */}
                    <footer className="flex flex-col items-center gap-4">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                      <cite 
                        className="not-italic text-xl md:text-2xl text-muted-foreground font-medium"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        — {currentQuote.author}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Progress Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentQuoteIndex(index);
                        setIsAnimating(false);
                      }, 300);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex 
                        ? 'w-12 bg-primary' 
                        : 'w-2 bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Quote;
