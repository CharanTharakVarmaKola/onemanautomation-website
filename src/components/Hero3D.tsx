import { useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
// Import the local asset URL
import sceneUrl from "@/assets/scene.splinecode?url";

interface Hero3DProps {
    className?: string;
}

export default function Hero3D({ className = "" }: Hero3DProps) {
    const robotRef = useRef<any>(null);
    const splineAppRef = useRef<any>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const onLoad = (splineApp: any) => {
        splineAppRef.current = splineApp;
        // Find the Robot object
        const robot = splineApp.findObjectByName("Robot");
        if (robot) {
            robotRef.current = robot;
            console.log("Robot object found:", robot);
        } else {
            console.warn("Robot object not found in scene");
        }
    };

    const triggerWave = () => {
        // Attempt to trigger 'Wave' animation
        // Note: In Spline, specific animations are usually triggered by Events or States.
        // We'll try to emit a custom event or generic interaction if configured.
        // If 'Wave' is a State Machine state, we might need setVariable.
        // For now, we'll try sending a 'mouseDown' event which is common,
        // or log that we are attempting to trigger 'Wave'.
        if (splineAppRef.current) {
            // If the scene has an event listener for "Wave", we can emit it
            // splineAppRef.current.emitEvent("Wave", "Robot"); 

            // Alternatively, try to find all animations and play 'Wave' if exposed
            // (Spline runtime API varies on access level)
            console.log("Mouse re-entered viewport - Triggering Greeting/Wave");
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouseRef.current = { x, y };
        };

        const handleMouseEnter = () => {
            triggerWave();
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    // Animation Loop for Smooth Lerp
    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (robotRef.current) {
                const { x, y } = mouseRef.current;
                const currentPos = robotRef.current.position;
                const currentRot = robotRef.current.rotation;

                // Target positions (Adjust "100" and "50" based on scene scale)
                const targetX = x * 200;
                const targetY = y * 100;

                // Target rotation (Subtle look-at effect)
                const targetRotY = x * 0.5;
                const targetRotX = -y * 0.3;

                // Linear interpolation (Lerp) for smoothness
                const lerpFactor = 0.05;

                // Update Position
                currentPos.x += (targetX - currentPos.x) * lerpFactor;
                currentPos.y += (targetY - currentPos.y) * lerpFactor;

                // Update Rotation (Optional but adds life)
                currentRot.y += (targetRotY - currentRot.y) * lerpFactor;
                currentRot.x += (targetRotX - currentRot.x) * lerpFactor;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <Spline
                scene={sceneUrl}
                onLoad={onLoad}
                className="w-full h-full"
            />
            {/* Loading fallback overlay could be added here */}
        </div>
    );
}
