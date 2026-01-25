import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassButton } from "./GlassButton";

declare const puter: any;

interface AuditFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    triggerSource?: string;
}

const AuditFormModal = ({ isOpen, onClose, triggerSource }: AuditFormModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Step A: AI Generation (Silent)
            const prompt = `You are an automation expert. Analyze this workflow for inefficiencies and suggest 3 automations: ${formData.description}`;

            // Wait for AI response
            const aiResponse = await puter.ai.chat(prompt, { model: 'claude-3-5-sonnet' });

            // Step B: Data Sync
            const payload = {
                name: formData.name,
                email: formData.email,
                company: formData.company,
                description: formData.description,
                analysis: aiResponse.message.content[0].text
            };

            // Send to Google Apps Script
            const scriptUrl = "https://script.google.com/macros/s/AKfycbxH20iYw2grUp39LZUUhLOaQPqwV0SRsqQFeFEG4-_zqsspHqzRGiA8do-u8zeMj7GE9g/exec";

            await fetch(scriptUrl, {
                method: "POST",
                mode: "no-cors", // Google Apps Script often requires no-cors for simple submission
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            // Step C: Unlock
            setIsSuccess(true);

            // Trigger exit animation and reveal website
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                setFormData({ name: "", email: "", company: "", description: "" });
            }, 1000);

        } catch (error) {
            console.error("Submission error:", error);
            // Optional: Handle error state visually
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent click through
                            className="glass-panel w-full max-w-2xl rounded-3xl p-8 relative overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {!isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                            <span className="text-eyebrow text-primary tracking-wider">AUTOMATION AUDIT</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
                                            Let's build your system.
                                        </h2>
                                        <p className="text-foreground/60">
                                            Briefly describe your current manual workflow.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground/80">Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground/80">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@company.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Company / Website</label>
                                            <input
                                                type="text"
                                                placeholder="company.com"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Workflow Description</label>
                                            <textarea
                                                required
                                                rows={4}
                                                placeholder="e.g. We manually follow up with real estate leads via email and then add them to a spreadsheet..."
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary/50 transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto px-8 py-3.5 rounded-full bg-primary/20 hover:bg-primary/30 text-white font-medium border border-primary/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            {isSubmitting ? "AI is analyzing your workflow..." : "Generate Free Analysis"}
                                            {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif mb-2">Request Received</h3>
                                    <p className="text-foreground/60 max-w-sm">
                                        We've received your workflow details. Our team will analyze it and get back to you shortly.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuditFormModal;
