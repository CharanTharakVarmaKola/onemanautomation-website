import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import VerticalScrollGlider from "@/components/VerticalScrollGlider";
import SEO from "@/components/SEO";

export default function Booking() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "voice-agent-strategy-call" });
            cal("ui", {
                theme: "dark",
                styles: { branding: { brandColor: "#666666" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 overflow-hidden">
            <SEO
                title="Book Your Free AI Audit | One Man Automation"
                description="Schedule a 1-on-1 consultation to identify automation opportunities in your business. No fluff, just actionable system architecture."
                keywords="AI Consultation, Automation Audit, Hire AI Agency, Business Efficiency Consultant"
                canonicalUrl="https://onemanautomation.in/booking"
            />
            <Navigation hideAuditButton={true} />
            <VerticalScrollGlider />

            <div className="container-oma relative z-10 animate-fade-up">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">
                    Schedule Your Audit
                </h1>
                <p className="text-white/60 text-center mb-12 max-w-lg mx-auto">
                    Select a time for us to analyze your workflows and propose a custom AI implementation plan.
                </p>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center shadow-2xl relative">
                    {/* Cal Embed - Temporarily Disabled due to Link Issue */}
                    <div className="relative z-10 p-8 text-center bg-black/40 w-full h-full flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-serif text-white mb-4">Scheduling Update</h3>
                        <p className="text-white/70 max-w-md mx-auto mb-6">
                            Our automatic booking system is currently undergoing maintenance.
                            <br /><br />
                            Please contact us directly to schedule your audit:
                        </p>
                        <a href="mailto:neha@onemanautomation.in" className="text-oma-blue hover:text-white text-xl font-medium transition-colors">
                            neha@onemanautomation.in
                        </a>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)] pointer-events-none z-0" />
        </div>
    );
}
