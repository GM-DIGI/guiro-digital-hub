import { useEffect, useRef, useState } from "react";
import { PortfolioData } from "@/data/defaultData";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface ProfileProps {
  data: PortfolioData;
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-foreground">{name}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function ProfileSection({ data }: ProfileProps) {
  return (
    <section id="profil" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-foreground mb-3">Mon Profil</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Contact card */}
        <div className="fade-in-up grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <Mail className="w-5 h-5" />, label: "Email", value: data.profile.email },
            { icon: <Phone className="w-5 h-5" />, label: "Téléphone", value: data.profile.phone },
            { icon: <MapPin className="w-5 h-5" />, label: "Localisation", value: data.profile.location },
            { icon: <Globe className="w-5 h-5" />, label: "Site web", value: data.profile.website },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-colors">
              <div className="text-primary">{item.icon}</div>
              <div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="text-sm text-foreground">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences timeline */}
        <div className="fade-in-up mb-16">
          <h3 className="font-syne font-semibold text-xl text-foreground mb-8">Expériences</h3>
          <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 rounded-full bg-primary border-2 border-background" />
                <div className="text-xs text-primary font-semibold mb-1">{exp.period}</div>
                <div className="font-syne font-semibold text-foreground">{exp.title}</div>
                <div className="text-sm text-muted-foreground">{exp.company}</div>
                <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Diplomas */}
        <div className="fade-in-up mb-16">
          <h3 className="font-syne font-semibold text-xl text-foreground mb-6">Diplômes & Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.diplomas.map((d) => (
              <div key={d.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                <div className="font-semibold text-foreground">{d.title}</div>
                <div className="text-sm text-muted-foreground">{d.institution} — {d.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="fade-in-up mb-16">
          <h3 className="font-syne font-semibold text-xl text-foreground mb-6">Compétences</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {data.skills.map((s) => (
              <SkillBar key={s.id} name={s.name} level={s.level} />
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="fade-in-up">
          <h3 className="font-syne font-semibold text-xl text-foreground mb-6">Outils & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {data.tools.map((t) => (
              <div key={t.id} className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 hover:border-primary/30 transition-colors">
                <span className="text-lg">{t.emoji}</span>
                <span className="text-sm text-foreground">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
