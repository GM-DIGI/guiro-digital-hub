import { useState, useMemo } from "react";
import { PortfolioData } from "@/data/defaultData";

interface PortfolioProps {
  data: PortfolioData;
}

export default function PortfolioSection({ data }: PortfolioProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.projects.map((p) => p.category)));
    return ["Tous", ...cats];
  }, [data.projects]);

  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous" ? data.projects : data.projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-foreground mb-3">Portfolio</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Filters */}
        <div className="fade-in-up flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="fade-in-up bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,157,212,0.1)] transition-all duration-300"
            >
              <div className="text-3xl mb-3">{project.emoji}</div>
              <h3 className="font-syne font-semibold text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
