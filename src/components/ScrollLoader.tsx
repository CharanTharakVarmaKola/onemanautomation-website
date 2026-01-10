import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { useScroll, useMotionValueEvent } from "framer-motion";
import sceneUrl from "@/assets/scene.splinecode?url";

export default function ScrollLoader() {
    const [isLoaded, setIsLoaded] = useState(false);
    const splineRef = useRef<any>(null);
    const robotRef = useRef<any>(null);

    // Track page scroll progress (0 to 1)
    const { scrollYProgress } = useScroll();

    const onLoad = (splineApp: any) => {
        splineRef.current = splineApp;
        setIsLoaded(true);

        // Find the object to control - usually "Robot" in our current scene
        const robot = splineApp.findObjectByName("Robot");
        if (robot) {
            robotRef.current = robot;
            // Set initial scale smaller if it's too big for a loader
            robot.scale.x = 0.5;
            robot.scale.y = 0.5;
            robot.scale.z = 0.5;
        }
    };

    // React to scroll changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        /* 
        if (splineRef.current) {
            // Option 1: Try to drive a "Scroll" variable if configured in Spline
            try {
                splineRef.current.setVariable("Scroll", latest * 100);
            } catch (e) {
                // Variable might not exist, ignore
            }
        }
        */

        if (robotRef.current) {
            // Option 2: Visually map scroll to rotation (0 to 360 degrees)
            // This serves as a reliable visual indicator even if timeline scrubbing isn't available
            robotRef.current.rotation.y = latest * Math.PI * 2;
        }
    });

    return (
        <div className="fixed bottom-8 right-8 z-50 w-24 h-24 pointer-events-none">
            <Spline
                scene={sceneUrl}
                onLoad={onLoad}
                className="w-full h-full"
            />
        </div>
    );
}
