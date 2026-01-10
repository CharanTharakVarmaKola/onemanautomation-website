import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AuditFormModal from "./AuditFormModal";
import clientHall from "@/assets/client-hall.png";
import clientMeeting from "@/assets/client-meeting.png";
import clientCoding from "@/assets/client-coding.png";
import clientOffice from "@/assets/client-office.png";

const clientImages = [
  clientHall,
  clientMeeting,
  clientCoding,
  clientOffice,
];

const IdealClients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="section-spacing-large bg-background">
      <div className="container-oma">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {clientImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="aspect-square rounded-2xl overflow-hidden group relative bg-foreground/[0.05]"
                >
                  <img
                    src={image}
                    alt={`Client Environment ${index + 1}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div >

          {/* Content Right */}
          < motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="text-eyebrow mb-6">WHO WE SERVE</p>
            <h2 className="text-section-title mb-8 font-serif">
              Startups. Real estate. Dental practices.
            </h2>
            <p className="text-body max-w-prose-narrow mb-10">
              We work with businesses that have existing workflows suffering from manual repetition. If you value stability over experimentation and need operational efficiency without disruption, we can build your system.
            </p>
            <button
              className="btn-oma-primary"
              onClick={() => setIsModalOpen(true)}
            >
              See If We're a Fit →
            </button>
          </motion.div >
        </div >
      </div >

      <AuditFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerSource="Who We Serve CTA"
      />
    </section >
  );
};

export default IdealClients;
