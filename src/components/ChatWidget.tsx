import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Hello! How can we automate your business today?", isUser: false }
    ]);
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { text: inputText, isUser: true }]);
        setInputText("");

        // Mock response delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Thanks for reaching out. An automation expert will be with you shortly.", isUser: false }]);
        }, 1000);
    };

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[100]">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                                <span className="font-semibold text-white">OMA Assistant</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/70" />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="h-[300px] p-4 overflow-y-auto flex flex-col gap-4">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser
                                                ? "bg-oma-blue text-white rounded-tr-none"
                                                : "bg-white/10 text-white rounded-tl-none"
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-white/10 flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-oma-blue transition-colors placeholder:text-white/30"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 bg-oma-blue hover:bg-oma-blue-glow rounded-lg transition-colors"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-oma-blue rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-shadow"
                >
                    {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
                </motion.button>
            </div>
        </>
    );
}
