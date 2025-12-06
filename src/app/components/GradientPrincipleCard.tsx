"use client";

import React from "react";
import Image from "next/image";

interface PrincipleCardProps {
    id: string;
    title: string;
    description: string;
}

// Image paths for each principle
const principleImages: Record<string, string> = {
    "ai": "/principles/ai-first.jpeg",
    "user": "/principles/customer-centric.png",
    "velocity": "/principles/fast-delivery.png",
    "focus": "/principles/smart-prioritization.png",
};

export default function GradientPrincipleCard({ id, title, description }: PrincipleCardProps) {
    const imagePath = principleImages[id] || principleImages["ai"];

    return (
        <div className="flex flex-col">
            {/* Gradient Card Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <Image
                    src={imagePath}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                />
            </div>

            {/* Text below card */}
            <div className="mt-4 space-y-2">
                <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {description}
                </p>
            </div>
        </div>
    );
}
