import { useEffect, useRef, useState } from "react";
import { PortfolioData } from "@/data/defaultData";

interface HeroProps {
  data: PortfolioData;
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function HeroSection({ data }: HeroProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-24">
        <div className="fade-in-up">
          <p className="text-primary font-dm text-sm sm:text-base tracking-widest uppercase mb-4">
            Bienvenue
          </p>
          <h1 className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-8xl text-foreground glow-text mb-4">
            {data.profile.name}
          </h1>
          <h2 className="font-syne font-semibold text-xl sm:text-2xl text-primary mb-6">
            {data.profile.role}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            {data.profile.bio}
          </p>
        </div>

        {/* Tags */}
        <div className="fade-in-up flex flex-wrap justify-center gap-2 mb-12">
          {data.heroTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs sm:text-sm border border-primary/20 rounded-full text-primary/80 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="fade-in-up grid grid-cols-3 gap-6 max-w-lg mx-auto mb-12">
          {data.profile.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-syne font-bold text-3xl sm:text-4xl text-primary">
                <AnimatedCounter target={stat.value} />+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("portfolio")}
            className="px-8 py-3 bg-primary text-primary-foreground font-syne font-semibold rounded-lg hover:bg-primary/90 transition-all glow"
          >
            Voir mes projets
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-3 border border-primary/30 text-primary font-syne font-semibold rounded-lg hover:bg-primary/10 transition-all"
          >
            Me contacter
          </button>
        </div>
      </div>
    </section>
  );
}
