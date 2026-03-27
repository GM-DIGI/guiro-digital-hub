import { PortfolioData } from "@/data/defaultData";

interface ServicesProps {
  data: PortfolioData;
}

export default function ServicesSection({ data }: ServicesProps) {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-foreground mb-3">Mes Services</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((srv) => (
            <div
              key={srv.id}
              className="fade-in-up group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,157,212,0.1)] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{srv.emoji}</div>
              <h3 className="font-syne font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {srv.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{srv.description}</p>
              <div className="text-sm font-semibold text-primary">{srv.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
