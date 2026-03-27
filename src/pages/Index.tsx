import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const { data, updateData } = usePortfolioData();
  const [adminOpen, setAdminOpen] = useState(false);
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onAdminClick={() => setAdminOpen(true)} />
      <HeroSection data={data} />
      <ProfileSection data={data} />
      <ServicesSection data={data} />
      <PortfolioSection data={data} />
      <ContactSection data={data} />

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-primary font-syne font-semibold">{data.profile.name}</span> — {data.profile.role}
          </p>
        </div>
      </footer>

      {adminOpen && (
        <AdminPanel data={data} onUpdate={updateData} onClose={() => setAdminOpen(false)} />
      )}
    </div>
  );
};

export default Index;
