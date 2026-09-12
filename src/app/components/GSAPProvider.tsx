"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = () =>
      setPaused(document.documentElement.dataset.motion === "paused");
    sync();
    window.addEventListener("portfolio-motion-change", sync);
    return () => window.removeEventListener("portfolio-motion-change", sync);
  }, []);
  useEffect(() => {
    if (paused) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ duration: 0.9, smoothWheel: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.from("[data-reveal]", {
        y: 38,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>("[data-scroll]").forEach((el) =>
        gsap.from(el, {
          y: 45,
          opacity: 0,
          duration: 0.7,
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        }),
      );
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
        gsap.to(el, {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }),
      );
      const magnetic = Array.from(
        document.querySelectorAll<HTMLElement>(".round-link, .send-button"),
      );
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const el = event.currentTarget as HTMLElement;
        const box = el.getBoundingClientRect();
        gsap.to(el, {
          x: (event.clientX - box.left - box.width / 2) * 0.13,
          y: (event.clientY - box.top - box.height / 2) * 0.13,
          duration: 0.35,
        });
      };
      const leave = (event: PointerEvent) =>
        gsap.to(event.currentTarget, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1,.5)",
        });
      magnetic.forEach((el) => {
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
      });
      const refresh = () => ScrollTrigger.refresh();
      document.addEventListener("toggle", refresh, true);
      return () => {
        document.removeEventListener("toggle", refresh, true);
        magnetic.forEach((el) => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => mm.revert();
  }, [pathname, paused]);
  return <>{children}</>;
}
