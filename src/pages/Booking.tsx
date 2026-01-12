import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Loader2 } from "lucide-react";
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
            <Navigation />
            <VerticalScrollGlider />

            <div className="container-oma relative z-10 animate-fade-up">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">
                    Schedule Your Audit
                </h1>
                <p className="text-white/60 text-center mb-12 max-w-lg mx-auto">
                    Select a time for us to analyze your workflows and propose a custom AI implementation plan.
                </p>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-[700px] shadow-2xl relative">
                    {/* Loading Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                            <p className="text-sm text-foreground/50 font-medium">Loading Calendar...</p>
                        </div>
                    </div>

                    {/* Cal Embed */}
                    <div className="relative z-10 h-full bg-background/0"> {/* Initially transparent to show loader if needed, but Cal iframe is opaque */}
                        <Cal
                            key="cal-embed"
                            namespace="voice-agent-strategy-call"
                            calLink="oneman-automation-dkxxo4/voice-agent-strategy-call"
                            style={{ width: "100%", height: "100%", overflow: "scroll" }}
                            config={{ layout: "month_view" }}
                        />
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)] pointer-events-none z-0" />
        </div>
    );
}
