import { useEffect, useRef, useState } from "react";

export default function ProcessSection({ processSteps }) {
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scroll progress: 0 (top) to 1 (bottom)
      let progress = (windowHeight - rect.top) / (rect.height + windowHeight);
      progress = Math.min(Math.max(progress, 0), 1);

      setLineHeight(progress * rect.height);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 fade-in-scroll">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 neon-text">
            Launch in 4 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our process is designed to simplify digital transformation—helping you move from challenges to lasting solutions with clarity and confidence.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary hidden md:block -translate-x-1/2 origin-top transition-all duration-300"
            style={{ height: `${lineHeight}px` }}
          ></div>

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`process-step opacity-0 translate-y-8 transition-all duration-700 ease-out md:grid md:grid-cols-2 md:gap-x-16 items-center ${
                  index % 2 !== 0 ? "md:text-right" : ""
                }`}
              >
                {/* Card */}
                <div className={`${index % 2 !== 0 ? "md:col-start-2" : ""}`}>
                  <UiCard className="neon-glow glass-effect hover:scale-105 transition-all duration-500 relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black font-bold text-lg neon-glow">
                      {step.step}
                    </div>
                    <CardHeader className="pb-6">
                      <div className={`flex items-center gap-4 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          {step.icon}
                        </div>
                        <div className={`${index % 2 !== 0 ? "md:text-right" : "md:text-left"}`}>
                          <CardTitle className="text-2xl font-bold mb-3">{step.title}</CardTitle>
                          <CardDescription className="text-lg leading-relaxed">{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </UiCard>
                </div>

                {/* Circle indicators */}
                <div
                  className="hidden md:block absolute left-1/2 w-6 h-6 bg-primary rounded-full -translate-x-1/2 neon-glow transition-all duration-300"
                  style={{
                    top: `${(index + 0.5) * 24}rem`, // adjust spacing
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
