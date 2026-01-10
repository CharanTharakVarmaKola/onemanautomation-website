import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dashboardPreview from "@/assets/dashboard-preview.png";


const stats = [
  { number: "100%", label: "Custom Built" },
  { number: "0", label: "Templates" },
  { number: "Real", label: "Pre-Launch Testing" },
];

const Differentiation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="section-spacing-large bg-background">
      <div className="container-oma">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-eyebrow mb-6">WHY OMA</p>
            <h2 className="text-section-title mb-8 font-serif">Built different by design.</h2>

            <div className="space-y-6 max-w-prose-narrow">
              <p className="text-body">
                Most agencies deploy templates and experiment on live clients. We don't.
              </p>
              <p className="text-body">
                Every system at OMA is custom-built and tested on publicly available resources before deployment.
              </p>
              <p className="text-body">
                We design systems you control, not systems that control you.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-12 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.15,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <div className="text-stat-number mb-2">{stat.number}</div>
                  <div className="text-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Right */}
          {/* Visual Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="w-full rounded-3xl border border-foreground/[0.08] overflow-hidden group">
              <img
                src={dashboardPreview}
                alt="OMA Dashboard Interface"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
