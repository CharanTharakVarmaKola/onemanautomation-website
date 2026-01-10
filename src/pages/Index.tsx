import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentiation from "@/components/Differentiation";
import Trust from "@/components/Trust";
import IdealClients from "@/components/IdealClients";
import BookingSection from "@/components/BookingSection";
import MultiCTA from "@/components/MultiCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
