import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentiation from "@/components/Differentiation";
import Trust from "@/components/Trust";
import IdealClients from "@/components/IdealClients";
import BookingSection from "@/components/BookingSection";
import MultiCTA from "@/components/MultiCTA";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Automation Agency | One Man Automation"
        description="Scale your business with custom AI workflows and intelligent agents. We replace manual tasks with 24/7 automation systems. Book a free audit."
        keywords="AI Automation Agency, Business Automation India, Custom Chatbots, Workflow Automation, One Man Automation, Voice Agnets experts, n8n experts"
        canonicalUrl="https://onemanautomation.in/"
      />
      <Navigation />
      <Hero />
      <Services />
      <Differentiation />
      <Trust />
      <IdealClients />
      <BookingSection />
      <MultiCTA />
      <Footer />
    </div>
  );
};

export default Index;
