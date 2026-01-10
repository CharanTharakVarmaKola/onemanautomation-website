import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import omaLogo from "@/assets/oma-logo.png";
import { GlassButton } from "@/components/GlassButton";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-white/5 transition-all duration-300"
    >
      <div className="container-oma h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={omaLogo} alt="One Man Automation" className="h-20" />
        </a>

        {/* Nav Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-12">
          <a href="/#services" className="nav-link">Services</a>
          <a href="/#approach" className="nav-link">Approach</a>
          <a href="/#trust" className="nav-link">Trust</a>
          <a href="/#contact" className="nav-link">Contact</a>
        </div>

        {/* CTA */}
        <GlassButton to="/booking">
          Book Audit
        </GlassButton>
      </div>
    </motion.nav>
  );
};

export default Navigation;
