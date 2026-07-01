import { useRef, useState } from "react";

// Tilt 3D + glare que sigue al cursor, inspirado en beui.dev/components/motion/tilt-card
// pero implementado sin dependencias extra (solo CSS transforms).
export const TiltCard = ({ children, className = "", maxTilt = 3.5 }) => {
    const ref = useRef(null);
    const [style, setStyle] = useState({});
    const frameRef = useRef(null);

    const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const handleMouseMove = (e) => {
        if (prefersReducedMotion || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // requestAnimationFrame evita actualizar el estado más rápido de lo que el navegador pinta,
        // lo que suaviza el movimiento y reduce la sensación de mareo
        if (frameRef.current) cancelAnimationFrame(frameRef.current);

        frameRef.current = requestAnimationFrame(() => {
            const rotateY = (x - 0.5) * maxTilt * 2;
            const rotateX = (0.5 - y) * maxTilt * 2;

            setStyle({
                transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                "--glare-x": `${x * 100}%`,
                "--glare-y": `${y * 100}%`,
                "--glare-opacity": 0.25,
            });
        });
    };

    const handleMouseLeave = () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        setStyle({
            transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)",
            "--glare-opacity": 0,
        });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none ${className}`}
            style={style}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200"
                style={{
                    opacity: "var(--glare-opacity, 0)",
                    background:
                        "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), color-mix(in srgb, var(--color-primary) 45%, transparent), transparent 60%)",
                }}
            />
            {children}
        </div>
    );
};
