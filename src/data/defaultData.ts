export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    photo: string;
    stats: { label: string; value: number }[];
  };
  experiences: { id: string; title: string; company: string; period: string; description: string }[];
  diplomas: { id: string; title: string; institution: string; year: string }[];
  skills: { id: string; name: string; level: number; category: string }[];
  tools: { id: string; name: string; emoji: string }[];
  services: { id: string; emoji: string; title: string; description: string; price: string }[];
  projects: { id: string; emoji: string; title: string; category: string; tags: string[]; description: string }[];
  contacts: { id: string; type: string; value: string; url: string; emoji: string }[];
  heroTags: string[];
}

export const defaultData: PortfolioData = {
  profile: {
    name: "GUIRO",
    role: "Référent Digital",
    bio: "Passionné par le numérique, j'accompagne les entreprises dans leur transformation digitale. De la stratégie web au déploiement de solutions innovantes, je crée des expériences numériques qui font la différence.",
    email: "contact@guiro.dev",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    website: "guiro.dev",
    photo: "",
    stats: [
      { label: "Années d'expérience", value: 8 },
      { label: "Projets réalisés", value: 45 },
      { label: "Clients satisfaits", value: 30 },
    ],
  },
  experiences: [
    { id: "exp1", title: "Référent Digital Senior", company: "AgenceDigitale", period: "2021 — Présent", description: "Pilotage de projets de transformation digitale pour des grands comptes." },
    { id: "exp2", title: "Chef de projet Web", company: "WebFactory", period: "2018 — 2021", description: "Gestion d'équipe et livraison de sites e-commerce et applications web." },
    { id: "exp3", title: "Développeur Front-end", company: "StartupLab", period: "2016 — 2018", description: "Développement d'interfaces utilisateurs modernes et responsive." },
  ],
  diplomas: [
    { id: "dip1", title: "Master Marketing Digital", institution: "Université Paris-Dauphine", year: "2016" },
    { id: "dip2", title: "Licence Informatique", institution: "Université Paris-Saclay", year: "2014" },
    { id: "dip3", title: "Certification Google Ads", institution: "Google", year: "2020" },
    { id: "dip4", title: "Certification Meta Blueprint", institution: "Meta", year: "2022" },
  ],
  skills: [
    { id: "sk1", name: "Stratégie Digitale", level: 95, category: "Marketing" },
    { id: "sk2", name: "SEO / SEA", level: 90, category: "Marketing" },
    { id: "sk3", name: "Développement Web", level: 85, category: "Technique" },
    { id: "sk4", name: "UI/UX Design", level: 80, category: "Design" },
    { id: "sk5", name: "Social Media", level: 88, category: "Marketing" },
    { id: "sk6", name: "Gestion de projet", level: 92, category: "Management" },
  ],
  tools: [
    { id: "t1", name: "Figma", emoji: "🎨" },
    { id: "t2", name: "React", emoji: "⚛️" },
    { id: "t3", name: "WordPress", emoji: "📝" },
    { id: "t4", name: "Google Analytics", emoji: "📊" },
    { id: "t5", name: "Photoshop", emoji: "🖌️" },
    { id: "t6", name: "VS Code", emoji: "💻" },
    { id: "t7", name: "Notion", emoji: "📋" },
    { id: "t8", name: "Slack", emoji: "💬" },
    { id: "t9", name: "GitHub", emoji: "🐙" },
    { id: "t10", name: "Tailwind CSS", emoji: "🌊" },
  ],
  services: [
    { id: "srv1", emoji: "🌐", title: "Création de Site Web", description: "Sites vitrines, e-commerce et applications web sur mesure, optimisés pour la performance.", price: "À partir de 2 000€" },
    { id: "srv2", emoji: "📈", title: "Stratégie SEO", description: "Audit, optimisation et suivi de votre référencement naturel pour booster votre visibilité.", price: "À partir de 800€/mois" },
    { id: "srv3", emoji: "📱", title: "Social Media Management", description: "Gestion complète de vos réseaux sociaux : stratégie, création de contenu et community management.", price: "À partir de 600€/mois" },
    { id: "srv4", emoji: "🎨", title: "UI/UX Design", description: "Conception d'interfaces modernes et ergonomiques centrées sur l'expérience utilisateur.", price: "À partir de 1 500€" },
    { id: "srv5", emoji: "📊", title: "Analytics & Reporting", description: "Mise en place de tableaux de bord et analyse de données pour piloter votre croissance.", price: "À partir de 500€/mois" },
    { id: "srv6", emoji: "🚀", title: "Transformation Digitale", description: "Accompagnement global dans la digitalisation de vos processus et outils métier.", price: "Sur devis" },
  ],
  projects: [
    { id: "p1", emoji: "🛒", title: "E-commerce Mode", category: "Web", tags: ["React", "Stripe", "Tailwind"], description: "Boutique en ligne complète avec panier, paiement et gestion de stock." },
    { id: "p2", emoji: "🏥", title: "Portail Santé", category: "Web", tags: ["Next.js", "Supabase"], description: "Plateforme de prise de rendez-vous médicaux en ligne." },
    { id: "p3", emoji: "🎯", title: "Campagne Ads Luxe", category: "Marketing", tags: ["Google Ads", "Meta Ads"], description: "Campagne multi-canal pour une marque de luxe avec +200% de ROI." },
    { id: "p4", emoji: "📱", title: "App Fitness", category: "Design", tags: ["Figma", "Prototyping"], description: "Design complet d'une application mobile de suivi sportif." },
    { id: "p5", emoji: "🏢", title: "Site Corporate", category: "Web", tags: ["WordPress", "SEO"], description: "Refonte complète du site institutionnel d'un groupe immobilier." },
    { id: "p6", emoji: "📸", title: "Branding Restaurant", category: "Design", tags: ["Illustrator", "Branding"], description: "Identité visuelle complète pour un restaurant gastronomique." },
  ],
  contacts: [
    { id: "c1", type: "LinkedIn", value: "linkedin.com/in/guiro", url: "https://linkedin.com/in/guiro", emoji: "💼" },
    { id: "c2", type: "GitHub", value: "github.com/guiro", url: "https://github.com/guiro", emoji: "🐙" },
    { id: "c3", type: "Twitter", value: "@guiro_digital", url: "https://twitter.com/guiro_digital", emoji: "🐦" },
    { id: "c4", type: "Instagram", value: "@guiro.design", url: "https://instagram.com/guiro.design", emoji: "📷" },
  ],
  heroTags: ["Stratégie Digitale", "Web Development", "SEO Expert", "UI/UX Design", "Social Media", "Analytics"],
};
