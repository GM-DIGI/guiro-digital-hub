import { useState } from "react";
import { PortfolioData } from "@/data/defaultData";
import { X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASS_HASH = "guiro2024"; // Simple password for demo

interface AdminProps {
  data: PortfolioData;
  onUpdate: (updater: (prev: PortfolioData) => PortfolioData) => void;
  onClose: () => void;
}

const tabs = ["Profil", "Expériences", "Diplômes", "Compétences", "Outils", "Services", "Projets", "Contacts", "Tags"];

export default function AdminPanel({ data, onUpdate, onClose }: AdminProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const { toast } = useToast();

  const login = () => {
    if (password === ADMIN_PASS_HASH) {
      setAuthenticated(true);
    } else {
      toast({ title: "Erreur", description: "Mot de passe incorrect.", variant: "destructive" });
    }
  };

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm">
          <h2 className="font-syne font-bold text-xl text-foreground mb-6 text-center">Accès Admin</h2>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 mb-4"
          />
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
              Annuler
            </button>
            <button onClick={login} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-syne font-bold text-2xl text-foreground">Panneau Admin</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                activeTab === i ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          {/* Profil */}
          {activeTab === 0 && (
            <div className="space-y-4">
              {(["name", "role", "email", "phone", "location", "website"] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs text-muted-foreground capitalize mb-1 block">{field}</label>
                  <input
                    value={data.profile[field]}
                    onChange={(e) => onUpdate((d) => ({ ...d, profile: { ...d.profile, [field]: e.target.value } }))}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Bio</label>
                <textarea
                  value={data.profile.bio}
                  onChange={(e) => onUpdate((d) => ({ ...d, profile: { ...d.profile, bio: e.target.value } }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Statistiques</label>
                {data.profile.stats.map((stat, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={stat.label}
                      onChange={(e) => onUpdate((d) => {
                        const stats = [...d.profile.stats];
                        stats[i] = { ...stats[i], label: e.target.value };
                        return { ...d, profile: { ...d.profile, stats } };
                      })}
                      className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                      placeholder="Label"
                    />
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => onUpdate((d) => {
                        const stats = [...d.profile.stats];
                        stats[i] = { ...stats[i], value: parseInt(e.target.value) || 0 };
                        return { ...d, profile: { ...d.profile, stats } };
                      })}
                      className="w-24 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expériences */}
          {activeTab === 1 && (
            <ListEditor
              items={data.experiences}
              fields={["title", "company", "period", "description"]}
              labels={["Titre", "Entreprise", "Période", "Description"]}
              onAdd={() => onUpdate((d) => ({ ...d, experiences: [...d.experiences, { id: uid(), title: "", company: "", period: "", description: "" }] }))}
              onRemove={(id) => onUpdate((d) => ({ ...d, experiences: d.experiences.filter((e) => e.id !== id) }))}
              onChange={(id, field, value) => onUpdate((d) => ({
                ...d, experiences: d.experiences.map((e) => e.id === id ? { ...e, [field]: value } : e)
              }))}
            />
          )}

          {/* Diplômes */}
          {activeTab === 2 && (
            <ListEditor
              items={data.diplomas}
              fields={["title", "institution", "year"]}
              labels={["Titre", "Institution", "Année"]}
              onAdd={() => onUpdate((d) => ({ ...d, diplomas: [...d.diplomas, { id: uid(), title: "", institution: "", year: "" }] }))}
              onRemove={(id) => onUpdate((d) => ({ ...d, diplomas: d.diplomas.filter((e) => e.id !== id) }))}
              onChange={(id, field, value) => onUpdate((d) => ({
                ...d, diplomas: d.diplomas.map((e) => e.id === id ? { ...e, [field]: value } : e)
              }))}
            />
          )}

          {/* Compétences */}
          {activeTab === 3 && (
            <div className="space-y-4">
              {data.skills.map((s) => (
                <div key={s.id} className="flex gap-2 items-center">
                  <input
                    value={s.name}
                    onChange={(e) => onUpdate((d) => ({ ...d, skills: d.skills.map((sk) => sk.id === s.id ? { ...sk, name: e.target.value } : sk) }))}
                    className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                    placeholder="Compétence"
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={s.level}
                    onChange={(e) => onUpdate((d) => ({ ...d, skills: d.skills.map((sk) => sk.id === s.id ? { ...sk, level: parseInt(e.target.value) || 0 } : sk) }))}
                    className="w-20 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                  <input
                    value={s.category}
                    onChange={(e) => onUpdate((d) => ({ ...d, skills: d.skills.map((sk) => sk.id === s.id ? { ...sk, category: e.target.value } : sk) }))}
                    className="w-32 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                    placeholder="Catégorie"
                  />
                  <button onClick={() => onUpdate((d) => ({ ...d, skills: d.skills.filter((sk) => sk.id !== s.id) }))} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button
                onClick={() => onUpdate((d) => ({ ...d, skills: [...d.skills, { id: uid(), name: "", level: 50, category: "" }] }))}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
          )}

          {/* Outils */}
          {activeTab === 4 && (
            <div className="space-y-3">
              {data.tools.map((t) => (
                <div key={t.id} className="flex gap-2 items-center">
                  <input
                    value={t.emoji}
                    onChange={(e) => onUpdate((d) => ({ ...d, tools: d.tools.map((to) => to.id === t.id ? { ...to, emoji: e.target.value } : to) }))}
                    className="w-16 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground text-center focus:outline-none focus:border-primary/50"
                  />
                  <input
                    value={t.name}
                    onChange={(e) => onUpdate((d) => ({ ...d, tools: d.tools.map((to) => to.id === t.id ? { ...to, name: e.target.value } : to) }))}
                    className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                  <button onClick={() => onUpdate((d) => ({ ...d, tools: d.tools.filter((to) => to.id !== t.id) }))} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button
                onClick={() => onUpdate((d) => ({ ...d, tools: [...d.tools, { id: uid(), name: "", emoji: "🔧" }] }))}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
          )}

          {/* Services */}
          {activeTab === 5 && (
            <ListEditor
              items={data.services}
              fields={["emoji", "title", "description", "price"]}
              labels={["Emoji", "Titre", "Description", "Tarif"]}
              onAdd={() => onUpdate((d) => ({ ...d, services: [...d.services, { id: uid(), emoji: "✨", title: "", description: "", price: "" }] }))}
              onRemove={(id) => onUpdate((d) => ({ ...d, services: d.services.filter((e) => e.id !== id) }))}
              onChange={(id, field, value) => onUpdate((d) => ({
                ...d, services: d.services.map((e) => e.id === id ? { ...e, [field]: value } : e)
              }))}
            />
          )}

          {/* Projets */}
          {activeTab === 6 && (
            <div className="space-y-6">
              {data.projects.map((p) => (
                <div key={p.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-foreground">{p.title || "Nouveau projet"}</span>
                    <button onClick={() => onUpdate((d) => ({ ...d, projects: d.projects.filter((pr) => pr.id !== p.id) }))} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input value={p.emoji} onChange={(e) => onUpdate((d) => ({ ...d, projects: d.projects.map((pr) => pr.id === p.id ? { ...pr, emoji: e.target.value } : pr) }))} className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="Emoji" />
                    <input value={p.title} onChange={(e) => onUpdate((d) => ({ ...d, projects: d.projects.map((pr) => pr.id === p.id ? { ...pr, title: e.target.value } : pr) }))} className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="Titre" />
                    <input value={p.category} onChange={(e) => onUpdate((d) => ({ ...d, projects: d.projects.map((pr) => pr.id === p.id ? { ...pr, category: e.target.value } : pr) }))} className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="Catégorie" />
                    <input value={p.tags.join(", ")} onChange={(e) => onUpdate((d) => ({ ...d, projects: d.projects.map((pr) => pr.id === p.id ? { ...pr, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) } : pr) }))} className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="Tags (séparés par virgule)" />
                  </div>
                  <textarea value={p.description} onChange={(e) => onUpdate((d) => ({ ...d, projects: d.projects.map((pr) => pr.id === p.id ? { ...pr, description: e.target.value } : pr) }))} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none" rows={2} placeholder="Description" />
                </div>
              ))}
              <button
                onClick={() => onUpdate((d) => ({ ...d, projects: [...d.projects, { id: uid(), emoji: "📌", title: "", category: "", tags: [], description: "" }] }))}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80"
              >
                <Plus className="w-4 h-4" /> Ajouter un projet
              </button>
            </div>
          )}

          {/* Contacts */}
          {activeTab === 7 && (
            <ListEditor
              items={data.contacts}
              fields={["emoji", "type", "value", "url"]}
              labels={["Emoji", "Type", "Valeur", "URL"]}
              onAdd={() => onUpdate((d) => ({ ...d, contacts: [...d.contacts, { id: uid(), emoji: "🔗", type: "", value: "", url: "" }] }))}
              onRemove={(id) => onUpdate((d) => ({ ...d, contacts: d.contacts.filter((e) => e.id !== id) }))}
              onChange={(id, field, value) => onUpdate((d) => ({
                ...d, contacts: d.contacts.map((e) => e.id === id ? { ...e, [field]: value } : e)
              }))}
            />
          )}

          {/* Tags */}
          {activeTab === 8 && (
            <div className="space-y-3">
              {data.heroTags.map((tag, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={tag}
                    onChange={(e) => onUpdate((d) => {
                      const tags = [...d.heroTags];
                      tags[i] = e.target.value;
                      return { ...d, heroTags: tags };
                    })}
                    className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                  <button onClick={() => onUpdate((d) => ({ ...d, heroTags: d.heroTags.filter((_, j) => j !== i) }))} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button
                onClick={() => onUpdate((d) => ({ ...d, heroTags: [...d.heroTags, ""] }))}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80"
              >
                <Plus className="w-4 h-4" /> Ajouter un tag
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button onClick={onClose} className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

// Generic list editor for items with string fields
function ListEditor({
  items,
  fields,
  labels,
  onAdd,
  onRemove,
  onChange,
}: {
  items: { id: string; [key: string]: any }[];
  fields: string[];
  labels: string[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-2 items-start flex-wrap sm:flex-nowrap border border-border rounded-lg p-3">
          {fields.map((field, i) => (
            <input
              key={field}
              value={item[field] || ""}
              onChange={(e) => onChange(item.id, field, e.target.value)}
              placeholder={labels[i]}
              className="flex-1 min-w-[120px] px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
            />
          ))}
          <button onClick={() => onRemove(item.id)} className="text-destructive hover:text-destructive/80 p-2"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={onAdd} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
        <Plus className="w-4 h-4" /> Ajouter
      </button>
    </div>
  );
}
