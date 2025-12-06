"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeProvider";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use quickTo for better performance
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        // Track velocity for ellipse effect
        let lastX = 0;
        let lastY = 0;
        let lastTime = Date.now();

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);

            const currentTime = Date.now();
            const dt = currentTime - lastTime;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            if (dt > 0) {
                const velocity = Math.sqrt(dx * dx + dy * dy) / dt;
                const scaleX = 1 + Math.min(velocity * 0.1, 0.5);
                const scaleY = 1 - Math.min(velocity * 0.05, 0.25);

                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                gsap.to(cursor, {
                    scaleX: isHovering ? 3.5 : scaleX,
                    scaleY: isHovering ? 3.5 : scaleY,
                    rotation: angle,
                    duration: 0.1,
                    overwrite: "auto"
                });
            }

            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = currentTime;
        };

        const resetShape = () => {
            if (!isHovering) {
                gsap.to(cursor, {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.2
                });
            }
        };

        let timeout: NodeJS.Timeout;
        const handleMove = (e: MouseEvent) => {
            moveCursor(e);
            clearTimeout(timeout);
            timeout = setTimeout(resetShape, 50);
        };

        window.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            clearTimeout(timeout);
        };
    }, [isHovering]);

    useEffect(() => {
        document.body.style.cursor = "none";

        const handleMouseEnter = () => {
            setIsHovering(true);
            if (cursorRef.current) {
                gsap.to(cursorRef.current, { scale: 3.5, duration: 0.4, ease: "back.out(1.7)" });
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            if (cursorRef.current) {
                gsap.to(cursorRef.current, { scale: 1, duration: 0.4 });
            }
        };

        const selectors = "a, button, input, textarea, select, [role='button'], .cursor-pointer, label, [onclick]";
        const clickables = document.querySelectorAll(selectors);

        const observer = new MutationObserver((mutations) => {
            const newClickables = document.querySelectorAll(selectors);
            newClickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);

                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);

                (el as HTMLElement).style.cursor = "none";
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        clickables.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
            (el as HTMLElement).style.cursor = "none";
        });

        return () => {
            document.body.style.cursor = "auto";
            observer.disconnect();
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
                (el as HTMLElement).style.cursor = "auto";
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${theme === "dark" ? "bg-white" : "bg-black"
                }`}
            style={{
                transform: "translate(-100px, -100px)",
            }}
        />
    );
}
