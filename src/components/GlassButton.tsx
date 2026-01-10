import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    className?: string;
}

export const GlassButton = ({ children, to, onClick, className }: GlassButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();
        if (to) navigate(to);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={cn(
                "relative px-6 py-2.5 rounded-lg overflow-hidden group",
                "bg-white/5 backdrop-blur-md border border-white/10",
                "text-white font-medium transition-all duration-300",
                "hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
                className
            )}
        >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};
