import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 right-0 z-[100] h-screen w-3 flex flex-col justify-start">
            {/* Background Track with blur */}
            <div className="w-full h-full bg-black/40 backdrop-blur-md border-l border-white/5" />

            {/* Filled Bar */}
            <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-oma-blue to-cyan-400 origin-top"
                style={{ scaleY: scaleY }}
            >
                {/* Glowing tip */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-cyan-300 blur-[6px] opacity-70 translate-y-2" />
            </motion.div>
        </div>
    );
}
