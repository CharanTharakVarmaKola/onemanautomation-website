import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import sceneUrl from "@/assets/scene.splinecode?url";

export default function HeroRobot() {
    const [isLoaded, setIsLoaded] = useState(false);
    const splineAppRef = useRef<any>(null);
    const robotRef = useRef<any>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>();

    // Utility: Linear Interpolation for smooth movement
    const lerp = (start: number, end: number, t: number) => {
        return start * (1 - t) + end * t;
    };

    const onLoad = (splineApp: any) => {
        splineAppRef.current = splineApp;
        setIsLoaded(true);

        // 1. Find the main Robot object
        // Try finding "Robot" or fallbacks if specific bones are needed
        const robot = splineApp.findObjectByName("Robot");

        if (robot) {
            robotRef.current = robot;

            // 2. The "Sketch" Tilt - Casual resting pose
            // value in radians usually
            robot.rotation.z = 0.1; // Slight tilt to the side
            robot.rotation.x = 0.05; // Slightly look down/forward
        }

        // 3. The "Greeting"
        // Trigger "Wave" animation on load
        // Note: Spline API depends on how the scene is set up. 
        // We try to emit an event designed for it, or just generic start.
        try {
            splineApp.emitEvent("mouseDown", "Robot"); // Common trigger
            // Or if there is a specific 'Wave' state:
            // splineApp.setVariable("Shape State", "Wave");
        } catch (e) {
            console.log("Could not trigger greeting automatically", e);
        }
    };

    // Mouse Interaction Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize X/Y between -1 and 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouseRef.current = { x, y };
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Animation Loop for Look-At
    useEffect(() => {
        // Only run if robot is found
        const animate = () => {
            if (robotRef.current) {
                const { x, y } = mouseRef.current;
                const robot = robotRef.current;

                // Target rotations based on mouse position
                // Scale factors determine how much it turns (sensitivity)
                const targetRotY = x * 0.5; // Look left/right
                // offset 0.05 to maintain the "Sketch Tilt" causal look
                const targetRotX = 0.05 - y * 0.3; // Look up/down

                // Smoothly interpolate current rotation to target
                // Factor 0.1 gives a nice weighted feel (not too instant, not too laggy)
                robot.rotation.y = lerp(robot.rotation.y, targetRotY, 0.1);
                robot.rotation.x = lerp(robot.rotation.x, targetRotX, 0.1);
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        if (isLoaded) {
            animate();
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isLoaded]);

    return (
        <div className="w-full h-full relative flex items-center justify-center">
            {/* High-fidelity loading state placeholder could go here */}
            <Spline
                scene={sceneUrl}
                onLoad={onLoad}
                className="w-full h-full"
            />
        </div>
    );
}
