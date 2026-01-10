import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import omaLogo from "@/assets/oma-logo.png";
import AuditFormModal from "./AuditFormModal";

const services = [
  "AI Voice Agents",
  "AI Chat Agents",
  "Internal Automations",
  "Outbound Systems",
  "Custom Agents",
];

const connect = [
  { label: "LinkedIn", link: "https://www.linkedin.com/in/one-man-automation-tharak" },
  { label: "Email", link: "mailto:robin@onemanautomation.in" },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrigger, setCurrentTrigger] = useState("");

  const handleOpenModal = (source: string) => {
    setCurrentTrigger(source);
    setIsModalOpen(true);
  };

  return (
    <footer ref={ref} className="bg-background border-t border-foreground/[0.08] pt-20 pb-10 mt-32">
      <div className="container-oma">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20"
        >
          {/* Brand Column */}
          <div>
            <img src={omaLogo} alt="One Man Automation" className="h-20 mb-4" />
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              Stable AI automation systems designed for control, accuracy, and operational efficiency.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-[0.05em] text-foreground mb-5">
              Services
            </h5>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleOpenModal(`Footer - ${service}`)}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-[0.05em] text-foreground mb-5">
              Connect
            </h5>
            <ul className="space-y-3">
              {connect.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.link}
                    target={item.label === "LinkedIn" ? "_blank" : undefined}
                    rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-foreground/[0.06]"
        >
          <p className="text-xs text-foreground/50">
            © 2026 One Man Automation. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-foreground/50 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="text-foreground/30">|</span>
            <a href="#" className="text-xs text-foreground/50 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      <AuditFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerSource={currentTrigger}
      />
    </footer>
  );
};

export default Footer;
