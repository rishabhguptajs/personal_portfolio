export type ProjectArtKind =
  | "earshot"
  | "sparebar"
  | "paisa"
  | "harness"
  | "pos"
  | "vectors"
  | "research"
  | "terminal"
  | "rahi"
  | "publishing"
  | "backend"
  | "pantry";
export interface Project {
  id: string;
  name: string;
  github: string;
  live: string;
  desc: string;
  summary: string;
  tech: string[];
  type: string;
  art: ProjectArtKind;
  status: string;
  featured: boolean;
}
// Refreshed from owned GitHub repositories, live product sites, and the supplied résumé.
export const contentUpdated = "12 September 2026";
export const projects: Project[] = [
  {
    id: "earshot",
    name: "Earshot",
    github: "https://github.com/rishabhguptajs/earshot",
    live: "https://raegent.com/earshot",
    desc: "A terminal coding agent built around explicit scope, deny-first permissions, steerable tasks, and persistent session context. A shared agent loop powers the inline terminal UI, headless execution, and editor integrations. Extensible through MCP, skills, hooks, and subagents; currently in public beta.",
    tech: ["TypeScript", "Node.js", "Ink", "MCP", "ACP"],
    type: "AI agents",
    art: "earshot",
    status: "Public beta",
    summary:
      "A coding agent that keeps intent, scope, and human control in the loop.",
    featured: true,
  },
  {
    id: "sparebar",
    name: "Sparebar",
    github: "",
    live: "https://sparebar.xyz",
    desc: "A Claude Code companion that places a clearly labelled sponsor line in the time an agent spends working. Built around reversible CLI setup, an advertiser campaign flow, payment webhooks, and an append-only earnings ledger. Currently invite-only, with developer payouts manually reviewed during beta.",
    tech: ["Claude Code hooks", "CLI", "Dodo Payments", "Webhooks"],
    type: "Products",
    art: "sparebar",
    status: "Invite-only beta",
    summary: "Turning AI wait time into a small, measurable sponsor surface.",
    featured: true,
  },
  {
    id: "paisatrack",
    name: "PaisaTrack",
    github: "https://github.com/rishabhguptajs/finance-tracker",
    live: "https://finance-tracker-omega-azure-42.vercel.app",
    desc: "A personal finance PWA that turns plain-English expenses into categorised transactions, with budgets, trend analytics, and recurring-subscription detection. Its tool-grounded Q&A lets the model select data slices while the server performs every calculation. Built as a single-user app.",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "LLM tool-calling",
    ],
    type: "Products",
    art: "paisa",
    status: "Personal finance PWA",
    summary:
      "Type the expense. Ask the question. Keep the arithmetic on the server.",
    featured: true,
  },
  {
    id: "toolharness",
    name: "toolharness",
    github: "https://github.com/rishabhguptajs/toolharness",
    live: "https://pypi.org/project/toolharness/",
    desc: "An open-source evaluation harness for tool-call reliability in coding agents, including Claude Code, Cursor, and Codex. Scores eight failure modes using deterministic detectors and an independent LLM-judge layer. Includes BFCL validation, JSON reports, an HTML dashboard, and a CI regression gate.",
    tech: ["Python", "LLM-as-Judge", "BFCL", "PyPI", "CI"],
    type: "Developer tools",
    art: "harness",
    status: "Published on PyPI",
    summary: "Testing whether an agent’s tool calls deserve your trust.",
    featured: true,
  },
  {
    id: "china-bazar-pos",
    name: "China Bazar POS",
    github: "",
    live: "",
    desc: "An offline-first Windows retail system replacing a legacy VB6 and MS Access application. Covers 12 modules for four stores, including billing, inventory, purchasing, loyalty, and shifts. Includes double-entry accounting, 50+ PDF and Excel reports, barcode scanning, and Argon2id authentication.",
    tech: ["Tauri v2", "React", "TypeScript", "SQLite", "Drizzle", "Rust"],
    type: "Business systems",
    art: "pos",
    status: "Private client project",
    summary:
      "A retail system rebuilt from the database to the checkout counter.",
    featured: true,
  },
  {
    id: "pgvec-studio",
    name: "pgvec-studio",
    github: "https://github.com/rishabhguptajs/pgvec-studio",
    live: "https://pgvec.raegent.com",
    desc: "A local-first visual explorer for pgvector embeddings in PostgreSQL. UMAP projection turns vectors into a 2D map, with k-NN similarity search, metadata filtering, and cosine-similarity inspection to understand how the data relates.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "UMAP"],
    type: "Developer tools",
    art: "vectors",
    status: "Open source",
    summary:
      "Making high-dimensional embeddings something you can actually inspect.",
    featured: true,
  },
  {
    id: "research-agent",
    name: "Research Agent",
    github: "https://github.com/rishabhguptajs/research-agent",
    live: "",
    desc: "An autonomous research assistant that plans searches, gathers sources through Tavily, and synthesises reports. Qdrant provides vector memory; server-sent events stream progress, and completed reports can be exported to PDF.",
    tech: ["TypeScript", "Next.js", "Express", "Tavily", "Qdrant", "MongoDB"],
    type: "AI agents",
    art: "research",
    status: "Open source",
    summary: "From a research question to a structured, sourced report.",
    featured: false,
  },
  {
    id: "promptsh",
    name: "PromptSH",
    github: "https://github.com/rishabhguptajs/promptsh",
    live: "",
    desc: "A natural-language command shell with OpenRouter translation, local Ollama autocomplete, a dynamic command registry, and session history. Generated commands pass through a whitelist and dangerous-pattern checks before execution.",
    tech: ["JavaScript", "Node.js", "OpenRouter", "Ollama"],
    type: "Developer tools",
    art: "terminal",
    status: "Open source",
    summary: "A natural-language shell with explicit command boundaries.",
    featured: false,
  },
  {
    id: "rahi",
    name: "Rahi App",
    github: "https://github.com/rishabhguptajs/rahiapp",
    live: "https://rahiapp.vercel.app/",
    desc: "Led a team-based travel project during the Headstarter fellowship, reaching 1,000+ waitlist signups and 200+ active users. The application creates personalised itineraries with budgets, maps, and AI-assisted recommendations.",
    tech: ["Next.js", "Express", "MongoDB", "Gemini", "MapLibre", "Clerk"],
    type: "Products",
    art: "rahi",
    status: "Team project",
    summary: "AI-assisted itineraries, built with a cross-functional team.",
    featured: false,
  },
  {
    id: "blame",
    name: "BLAME — Blogging App",
    github: "https://github.com/rishabhguptajs/Blogging-App",
    live: "https://blogwithnoworries.vercel.app",
    desc: "A blogging platform with authentication, post creation and editing, and generative AI-assisted content creation. An earlier full-stack build spanning the publishing interface and backend.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
    type: "Products",
    art: "publishing",
    status: "Earlier work",
    summary: "A full-stack publishing space with AI-assisted writing.",
    featured: false,
  },
  {
    id: "ecommerce-backend",
    name: "Scalable E-commerce Backend",
    github: "https://github.com/rishabhguptajs/scalable-ecommerce-backend",
    live: "",
    desc: "A backend project covering authentication, role-based access control, rate limiting, Redis caching, product CRUD, mail, and payment integration.",
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "Redis", "Docker"],
    type: "Business systems",
    art: "backend",
    status: "Earlier work",
    summary: "The service layer behind an e-commerce application.",
    featured: false,
  },
  {
    id: "pantry",
    name: "AI Pantry Tracker",
    github: "https://github.com/rishabhguptajs/ai-pantry-tracker",
    live: "https://aipantrytracker.vercel.app/",
    desc: "A pantry manager with ingredient tracking and AI recipe suggestions. Built during the Headstarter fellowship using Next.js and Firebase.",
    tech: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    type: "Products",
    art: "pantry",
    status: "Earlier work",
    summary: "Making more of the ingredients already in the kitchen.",
    featured: false,
  },
];

export const funProjects = [
  {
    name: "Neural nets / NumPy notebook",
    github: "https://github.com/rishabhguptajs/neural_nets",
    desc: "A personal learning notebook, currently focused on NumPy foundations. Building intuition from the arrays up, with neural networks as the next step.",
    tech: ["Python", "NumPy", "Learning notes"],
  },
  {
    name: "bolt.rishabh",
    github: "https://github.com/rishabhguptajs/bolt.rishabh",
    desc: "An experimental AI web-development environment inspired by bolt.new, exploring prompt-to-code scaffolding for React and Node.js projects.",
    tech: ["TypeScript", "AI code generation", "Prototype"],
  },
];

export const experiences = [
  {
    title: "Full Stack Developer",
    company: "Stockarea",
    link: "https://stockarea.io",
    period: "May 2025 – present",
    points: [
      "Co-led the Vue.js → Next.js and TypeScript migration: 117 commits across six core modules, including a resizable, drag-reorderable Control Tower and persistent Zustand filters.",
      "Built two-way Zoho Books webhook sync and a Laravel/n8n OCR invoice pipeline with product matching, confidence scoring, retries, and duplicate-job constraints.",
      "Owned the customer-facing portal end-to-end, shipping 10+ modules with typed API hooks, server-side search and pagination, and shared table abstractions.",
      "Developed an AI agreement copilot with CopilotKit, typed lookup/write tools, and human-in-the-loop confirmations; generalised the runtime and chat UI for reuse.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Simule",
    link: "https://simule.com",
    period: "Jan 2025 – Apr 2025",
    points: [
      "Enhanced technical documentation and the company whitepaper, aligning them with core company objectives.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Medireg",
    link: "https://medireg.in",
    period: "Sept 2024 – Oct 2024",
    points: [
      "Developed frontend components with Redux and React Flow to improve state and UI workflows.",
      "Integrated RESTful APIs to streamline data exchange and improve application performance.",
    ],
  },
  {
    title: "SWE Fellow",
    company: "Headstarter AI",
    link: "https://headstarter.co",
    period: "July 2024 – Sept 2024",
    points: [
      "Led development and deployment of five AI projects with React, Next.js, and Firebase.",
      "Co-developed a SaaS solution using Llama 3.1 through OpenRouter, with a Paddle paywall.",
    ],
  },
];

export const technologies = [
  {
    name: "AI Agents",
  },
  {
    name: "LLM Tool-Calling",
  },
  {
    name: "Generative AI",
  },
  {
    name: "CopilotKit",
  },
  {
    name: "OpenAI API",
  },
  {
    name: "TypeScript",
  },
  {
    name: "React",
  },
  {
    name: "Next.js",
  },
  {
    name: "Node.js",
  },
  {
    name: "Express",
  },
  {
    name: "Laravel",
  },
  {
    name: "PostgreSQL",
  },
  {
    name: "pgvector",
  },
  {
    name: "MySQL",
  },
  {
    name: "MongoDB",
  },
  {
    name: "Redis",
  },
  {
    name: "Supabase",
  },
  {
    name: "Docker",
  },
  {
    name: "TanStack Query",
  },
  {
    name: "Zustand",
  },
  {
    name: "Tailwind CSS",
  },
  {
    name: "shadcn/ui",
  },
];

export const languages = ["JavaScript", "TypeScript", "PHP", "Python", "Java"];

export const tools = [
  "Git & GitHub",
  "GitHub Actions",
  "Postman",
  "Docker Compose",
  "Claude Code",
  "Cursor IDE",
];

export const resources = [
  {
    title: "Improving Language Understanding by Generative Pre-Training",
    authors: "Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever",
    link: "https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf",
  },
  {
    title:
      "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks",
    authors: "Mingxing Tan, Quoc V. Le",
    link: "https://arxiv.org/pdf/1905.11946.pdf",
  },
  {
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
    link: "https://arxiv.org/pdf/1810.04805.pdf",
  },
  {
    title: "Attention is All You Need",
    authors:
      "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
    link: "https://arxiv.org/pdf/1706.03762.pdf",
  },
];

export const corePrinciples = [
  {
    id: "ai",
    title: "ai native",
    description: "generative flows. agentic systems. automation at the core.",
  },
  {
    id: "user",
    title: "user obsessed",
    description: "solving real friction. empathy in every pixel.",
  },
  {
    id: "velocity",
    title: "high velocity",
    description: "shipping daily. robust systems. zero compromise.",
  },
  {
    id: "focus",
    title: "ruthless focus",
    description: "signal over noise. impact over output.",
  },
];
