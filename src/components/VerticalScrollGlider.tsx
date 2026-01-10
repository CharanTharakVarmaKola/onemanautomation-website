import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function VerticalScrollGlider() {
    const { scrollYProgress } = useScroll();

    // Smooth out the raw scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress (0-1) to the vertical travel distance
    // Track Height (300px) - Thumb Height (48px) = 252px travel
    const y = useTransform(smoothProgress, [0, 1], [0, 252]);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[300px] w-1.5 bg-white/5 rounded-full z-50 overflow-hidden backdrop-blur-sm border border-white/10">
            {/* Glider Thumb */}
            <motion.div
                style={{ y }}
                className="w-full h-12 bg-oma-blue rounded-full shadow-[0_0_15px_rgba(56,189,248,0.6)]"
            />
        </div>
    );
}
