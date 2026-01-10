import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, CheckCircle, Hand } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "No Live Testing",
    description: "Systems validated on public resources before deployment to your business.",
  },
  {
    icon: CheckCircle,
    title: "Reduced Hallucinations",
    description: "Designed with accuracy controls to minimize AI errors and maintain reliability.",
  },
  {
    icon: Hand,
    title: "Human Control",
    description: "Every system includes human oversight where required. You maintain authority.",
  },
];

const Trust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trust" className="section-spacing bg-background">
      <div className="container-oma">
        {/* Section Intro */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-prose-wide mx-auto mb-20 md:mb-28"
        >
          <p className="text-eyebrow mb-6">STABILITY & CONTROL</p>
          <h2 className="text-section-title mb-6 font-serif">
            Human-controlled automation with reduced hallucination risk.
          </h2>
          <p className="text-body">
            Designed for accuracy and reliability. Human-in-the-loop controls, reduced AI error rates, and zero experimentation on live environments.
          </p>
        </motion.div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                  <Icon className="w-12 h-12 text-primary stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-body-small">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trust;
