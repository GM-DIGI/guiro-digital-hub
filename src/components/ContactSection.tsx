import { useState } from "react";
import { PortfolioData } from "@/data/defaultData";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactProps {
  data: PortfolioData;
}

export default function ContactSection({ data }: ContactProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" });
      return;
    }
    toast({ title: "Message envoyé !", description: "Merci pour votre message. Je vous répondrai rapidement." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-foreground mb-3">Contact</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="fade-in-up space-y-6">
            <div className="space-y-4">
              {[
                { icon: <Mail className="w-5 h-5" />, label: data.profile.email },
                { icon: <Phone className="w-5 h-5" />, label: data.profile.phone },
                { icon: <MapPin className="w-5 h-5" />, label: data.profile.location },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-muted-foreground">
                  <div className="text-primary">{item.icon}</div>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="font-syne font-semibold text-foreground mb-4">Réseaux sociaux</h3>
              <div className="flex flex-wrap gap-3">
                {data.contacts.map((c) => (
                  <a
                    key={c.id}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <span>{c.emoji}</span> {c.type}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="fade-in-up space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Sujet"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <textarea
              placeholder="Message *"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-syne font-semibold rounded-lg hover:bg-primary/90 transition-all glow"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
