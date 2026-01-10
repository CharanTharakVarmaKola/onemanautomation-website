import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageSquare, Settings, Send, Sparkles } from "lucide-react";
import AuditFormModal from "./AuditFormModal";

const services = [
  {
    icon: Phone,
    title: "AI Voice Agents",
    description: "Human-like voice agents for calls, bookings, and communication. Professional tone with workflow-triggered actions.",
    link: "Explore Voice Systems",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Agents",
    description: "Context-aware chat automation. Real-time responses that reduce manual support while maintaining accuracy.",
    link: "Explore Chat Systems",
  },
  {
    icon: Settings,
    title: "Internal Workflow Automation",
    description: "End-to-end replication of repetitive processes. CRM automation and operations workflows for increased productivity.",
    link: "Explore Internal Systems",
  },
  {
    icon: Send,
    title: "Outbound AI Systems",
    description: "Workflow-driven communication for follow-ups and process execution. Strategic automation, not lead generation.",
    link: "Explore Outbound Systems",
  },
  {
    icon: Sparkles,
    title: "Custom AI Agents",
    description: "Fully bespoke agents designed around unique operational needs. Industry-agnostic solutions for complex workflows.",
    link: "Request Custom Build",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrigger, setCurrentTrigger] = useState("");

  const handleOpenModal = (source: string) => {
    setCurrentTrigger(source);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="section-spacing bg-background">
      <div className="container-oma">
        {/* Section Intro */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-prose-wide mx-auto mb-20 md:mb-28"
        >
          <p className="text-eyebrow mb-6">WHAT WE BUILD</p>
          <h2 className="text-section-title mb-6 font-serif">
            Custom AI systems designed for stability and precision.
          </h2>
          <p className="text-body">
            Every system is built from the ground up. No templates. No experimentation on live environments.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onTrigger={() => handleOpenModal(service.link)}
            />
          ))}
        </div>
      </div>

      <AuditFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerSource={currentTrigger}
      />
    </section>
  );
};

const ServiceCard = ({
  service,
  index,
  onTrigger
}: {
  service: typeof services[0];
  index: number;
  onTrigger: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="card-minimal group cursor-pointer"
      onClick={onTrigger}
    >
      <div className="icon-oma mb-6">
        <Icon className="w-full h-full" />
      </div>
      <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4 font-serif">
        {service.title}
      </h3>
      <p className="text-body-small mb-6">
        {service.description}
      </p>
      <button
        type="button"
        className="link-oma bg-transparent border-none p-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // Avoid double trigger if card is clickable
          onTrigger();
        }}
      >
        {service.link} <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </motion.div>
  );
};

export default Services;
