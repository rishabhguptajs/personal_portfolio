import {
    SiReact,
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiPostgresql,
    SiRedis,
    SiDocker,
    SiFirebase,
    SiExpress,
    SiOpenai,
    SiJavascript,
    SiGit,
    SiSupabase,
    SiMysql,
    SiLaravel,
    SiReactquery,
} from "react-icons/si";
import React from "react";

const SiLangchainReal = (props: any) => {
    return React.createElement(
        "svg",
        { role: "img", viewBox: "0 0 24 24", fill: "currentColor", ...props },
        React.createElement("path", {
            d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
        })
    );
};

export const projects = [
    {
        name: "pgvec-studio",
        github: "https://github.com/rishabhguptajs/pgvec-studio",
        live: "",
        desc: "A visual explorer for pgvector embeddings — lets you query, inspect, and visualize vector data stored in PostgreSQL with pgvector. Built for developers working with AI-native databases.",
        tech: ["TypeScript", "pgvector", "PostgreSQL", "Next.js"],
        type: "AI / Tooling",
    },
    {
        name: "Rahi App",
        github: "https://github.com/rishabhguptajs",
        live: "https://rahiapp.vercel.app",
        desc: "Led this as a team-based startup project during the fellowship resulting in 1000+ waitlist signups and 200+ active users. Conceptualized an innovative travel solution by integrating the MERN stack, AI LLMs, and advanced prompt engineering.",
        tech: ["Next.js", "Node.js", "MongoDB", "Ola Maps", "Clerk"],
        type: "Full-Stack",
    },
    {
        name: "Burg-AI",
        github: "https://github.com/rishabhguptajs",
        live: "https://github.com/apps/burg-ai",
        desc: "Engineered an automated Code Review AI Agent similar to CodeRabbit architecture using ExpressJS and OpenRouter. Implemented secure GitHub App authentication and Webhooks to analyze pull requests and provide intelligent feedback.",
        tech: ["ExpressJS", "OpenRouter", "GitHub Apps", "Webhooks"],
        type: "Back-End",
    },
    {
        name: "PromptSH",
        github: "https://github.com/rishabhguptajs/promptsh",
        live: "",
        desc: "An AI-powered terminal interface that interprets natural language requests and executes shell commands. Focused on creating a seamless CLI experience leveraging Generative AI for command translation and execution.",
        tech: ["GenAI", "CLI", "Node.js", "Shell Integration"],
        type: "CLI / AI",
    },
    {
        name: "Research Agent",
        github: "https://github.com/rishabhguptajs/research-agent",
        live: "",
        desc: "A deep research autonomous agent inspired by Perplexity that conducts comprehensive web searches and synthesizes data. Uses Tavily API for search and a custom job orchestrator for processing results into structured reports.",
        tech: ["Custom Job Orchestrator", "Tavily API", "AI Agents", "TypeScript"],
        type: "AI / Full-Stack",
    },
    {
        name: "BLAME – Blogging App",
        github: "https://github.com/rishabhguptajs/Blogging-App",
        live: "https://blogwithnoworries.vercel.app",
        desc: "A full-featured blogging platform with authentication, CRUD for posts, and generative AI for content creation. Built with Next.js, Firebase, and MongoDB.",
        tech: ["React.js", "Node.js", "ExpressJS", "MongoDB", "TailwindCSS", "Firebase"],
        type: "Full-Stack",
    },
    {
        name: "Scalable E-commerce Backend",
        github: "https://github.com/rishabhguptajs/scalable-ecommerce-backend",
        live: "https://scalable-ecommerce-backend-77zq.onrender.com",
        desc: "A production-grade backend with authentication, RBAC, rate-limiting, Redis caching, CRUD, mailer, and payment gateway integration.",
        tech: ["Node.js", "ExpressJS", "TypeScript", "MongoDB", "Redis", "Docker"],
        type: "Back-End",
    },
    {
        name: "AI Pantry Tracker",
        github: "https://github.com/rishabhguptajs/ai-pantry-tracker",
        live: "https://aipantrytracker.vercel.app/",
        desc: "Manages your pantry and discovers new recipes effortlessly. AI suggests recipes based on your ingredients, reducing food waste and saving time.",
        tech: ["Next.js", "TailwindCSS", "Firebase", "TypeScript"],
        type: "Full-Stack",
    },
];

export const funProjects = [
    {
        name: "WebRTC File Sharing",
        github: "https://github.com/rishabhguptajs/webrtc-file-sharing",
        desc: "Peer-to-peer file sharing directly in the browser using WebRTC data channels — no server upload, no size limit, instant transfer.",
        tech: ["HTML", "JavaScript", "WebRTC"],
        emoji: "📡",
    },
    {
        name: "Cellular Automaton",
        github: "https://github.com/rishabhguptajs/cellular-automaton",
        desc: "Conway's Game of Life and other cellular automata visualized in the browser. A fun exploration of emergent complexity from simple rules.",
        tech: ["HTML", "Canvas API", "JavaScript"],
        emoji: "🧬",
    },
];

export const experiences = [
    {
        title: "Full Stack Developer",
        company: "Stockarea",
        link: "https://stockarea.io",
        period: "may 2025 – present",
        points: [
            "co-led frontend migration from Vue.js to Next.js; owned 40% of codebase across 6 core modules",
            "engineered backend functionalities using Laravel query builders and webhooks",
        ],
    },
    {
        title: "Software Engineering Intern",
        company: "Simule",
        link: "https://simule.com",
        period: "jan 2025 – apr 2025",
        points: [
            "enhanced technical documentation and whitepaper aligned with company objectives",
            "diagnosed and resolved issues across backend, frontend, and smart contract modules",
        ],
    },
    {
        title: "Software Engineering Intern",
        company: "Medireg",
        link: "https://medireg.in",
        period: "sept 2024 – oct 2024",
        points: [
            "developed dynamic frontend components using Redux and React-Flow",
            "integrated RESTful APIs to streamline data exchange and improve performance",
        ],
    },
    {
        title: "SWE Fellow",
        company: "Headstarter AI",
        link: "https://headstarter.co",
        period: "july 2024 – sept 2024",
        points: [
            "spearheaded development of five AI projects using React.js, Next.js, Firebase, and Clerk",
            "co-developed a SaaS solution utilizing Llama 3.1 LLM via OpenRouter API",
        ],
    },
];

export const technologies = [
    { icon: SiOpenai,      name: "Agentic AI" },
    { icon: SiTypescript,  name: "TypeScript" },
    { icon: SiNodedotjs,   name: "Node.js" },
    { icon: SiDocker,      name: "Docker" },
    { icon: SiRedis,       name: "Redis" },
    { icon: SiMongodb,     name: "MongoDB" },
    { icon: SiPostgresql,  name: "PostgreSQL" },
    { icon: SiReact,       name: "React" },
    { icon: SiNextdotjs,   name: "Next.js" },
    { icon: SiExpress,     name: "Express" },
    { icon: SiTailwindcss, name: "TailwindCSS" },
    { icon: SiFirebase,    name: "Firebase" },
    { icon: SiGit,         name: "Git" },
    { icon: SiJavascript,  name: "JavaScript" },
    { icon: SiSupabase,    name: "Supabase" },
    { icon: SiMysql,       name: "MySQL" },
    { icon: SiLaravel,     name: "Laravel" },
    { icon: SiReactquery,  name: "TanStack Query" },
    { icon: SiLangchainReal, name: "LangChain" },
];

export const languages = ["JavaScript", "TypeScript", "Python", "Java", "C"];
export const tools = ["Cursor", "VS Code", "Git & GitHub", "IntelliJ IDEA", "Postman"];

export const resources = [
    {
        title: "Improving Language Understanding by Generative Pre-Training",
        authors: "Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever",
        link: "https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf",
    },
    {
        title: "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks",
        authors: "Mingxing Tan, Quoc V. Le",
        link: "https://arxiv.org/pdf/1905.11946.pdf",
    },
    {
        title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
        link: "https://arxiv.org/pdf/1810.04805.pdf",
    },
    {
        title: "Attention is All You Need",
        authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
        link: "https://arxiv.org/pdf/1706.03762.pdf",
    },
];

export const featuredProjects = [
    {
        name: "pgvec-studio",
        github: "https://github.com/rishabhguptajs/pgvec-studio",
        live: "",
        description: "visual explorer for pgvector embeddings — query, inspect, and visualize vector data in PostgreSQL",
        tag: "AI / Tooling",
    },
    {
        name: "rahi app",
        github: "https://github.com/rishabhguptajs",
        live: "https://rahiapp.vercel.app",
        description: "led the team to build a travel solution with 1000+ waitlist signups using MERN, AI LLMs & prompt engineering",
        tag: "Full-Stack",
    },
    {
        name: "burg-ai",
        github: "https://github.com/rishabhguptajs",
        live: "https://github.com/apps/burg-ai",
        description: "automated code review AI agent using ExpressJS, OpenRouter & GitHub webhooks",
        tag: "Back-End",
    },
    {
        name: "promptsh",
        github: "https://github.com/rishabhguptajs/promptsh",
        live: "",
        description: "AI-powered terminal interface that translates natural language into shell commands",
        tag: "CLI / AI",
    },
];

export const corePrinciples = [
    {
        id: "ai",
        title: "ai native",
        description: "generative flows. agentic systems. automation at the core.",
        gradient: "from-amber-400 via-orange-500 to-yellow-400",
    },
    {
        id: "user",
        title: "user obsessed",
        description: "solving real friction. empathy in every pixel.",
        gradient: "from-blue-500 via-purple-500 to-pink-500",
    },
    {
        id: "velocity",
        title: "high velocity",
        description: "shipping daily. robust systems. zero compromise.",
        gradient: "from-rose-500 via-pink-500 to-red-400",
    },
    {
        id: "focus",
        title: "ruthless focus",
        description: "signal over noise. impact over output.",
        gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    },
];
