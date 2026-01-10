import { motion } from "framer-motion";
import { GlassButton } from "./GlassButton";

const BookingSection = () => {
    return (
        <section className="section-spacing relative bg-black overflow-hidden">
            <div className="container-oma text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-eyebrow mb-6">SCHEDULE A CALL</p>
                    <h2 className="text-section-title mb-8 font-serif">Ready to Automate?</h2>
                    <p className="text-body max-w-prose-narrow mx-auto mb-10">
                        Book a free strategy session to discuss your specific needs and how we can help you scale with AI.
                    </p>
                    <div className="flex justify-center">
                        <GlassButton to="/booking" className="px-10 py-4 text-lg">
                            Book Automation Audit
                        </GlassButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BookingSection;
