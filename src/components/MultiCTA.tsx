import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail } from "lucide-react";

const ctaOptions = [
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect professionally",
    action: "View Profile →",
    link: "https://www.linkedin.com/in/one-man-automation-tharak",
  },
  {
    icon: Mail,
    title: "Direct Email",
    description: "Reach Out Directly to Send Your Requirements to Us",
    action: "Send Email →",
    link: "mailto:robin@onemanautomation.in",
  },
];

const MultiCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-spacing-large bg-background">
      <div className="container-oma">
        {/* Section Intro */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-prose-wide mx-auto mb-16 md:mb-20"
        >
          <h2 className="text-section-title mb-6 font-serif">
            Ready to automate your workflows?
          </h2>
          <p className="text-body">
            Book an automation audit, reach out directly, or explore how we can build your custom system.
          </p>
        </motion.div>

        {/* CTA Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {ctaOptions.map((cta, index) => {
            const Icon = cta.icon;
            return (
              <motion.div
                key={cta.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="card-minimal text-center cursor-pointer group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-5">
                  <Icon className="w-8 h-8 text-primary stroke-[1.5] transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {cta.title}
                </h3>
                <p className="text-sm text-foreground/60 mb-5">
                  {cta.description}
                </p>
                <a
                  href={cta.link}
                  target={cta.title === "LinkedIn" ? "_blank" : undefined}
                  rel={cta.title === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="btn-oma-secondary text-sm px-6 py-2.5 inline-block"
                >
                  {cta.action}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MultiCTA;
