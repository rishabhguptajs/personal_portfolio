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
  | "pantry"
  | "slm"
  | "recall";
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
export const contentUpdated = "27 October 2026";
export const projects: Project[] = [
  {
    id: "sparebar",
    name: "Sparebar",
    github: "",
    live: "https://sparebar.xyz",
    desc: "you make a character once, from photos or just a description. then you generate ugc style photos, videos and product ads, and the same face shows up every time. there are 55 models to pick from, the credit cost shows before you run anything, and failed runs get refunded.",
    tech: ["Next.js", "Supabase", "Cloudflare R2", "Dodo Payments"],
    type: "Products",
    art: "sparebar",
    status: "live",
    summary: "one character, every shot: ugc photos, videos and ads with the same face.",
    featured: true,
  },
  {
    id: "recall",
    name: "Recall",
    github: "",
    live: "",
    desc: "press ⌥space and type something vague, like the pdf about visa rules. it looks through your files, screenshots and clipboard history by keyword and by meaning. everything stays on your mac. no cloud, no account, no telemetry.",
    tech: ["Swift", "macOS", "Local search"],
    type: "Products",
    art: "recall",
    status: "mac app, free and pro",
    summary: "search your whole mac by what you remember about it.",
    featured: true,
  },
  {
    id: "slm",
    name: "slm",
    github: "https://github.com/rishabhguptajs/slm",
    live: "",
    desc: "a normal transformer gets heavier the longer it runs. i wanted a small model that doesn't. i train these from scratch on a macbook air with mlx. my hybrid, gated deltanet plus a layer of my own, beats a same size transformer at 13.8m parameters on held out text. it gets 44% of tool calls fully correct against 38%, and its state stays around 1 mb where the transformer's grows to 805 mb at 32k tokens.",
    tech: ["Python", "MLX", "Gated DeltaNet"],
    type: "Research",
    art: "slm",
    status: "open source",
    summary: "small language models that use the same memory however long they run.",
    featured: true,
  },
  {
    id: "earshot",
    name: "Earshot",
    github: "https://github.com/rishabhguptajs/earshot",
    live: "https://raegent.com/earshot",
    desc: "a terminal coding agent that actually listens. you set the scope, permissions are deny first, and you can steer it while it works. it keeps context across sessions and works with 19 providers. there's an inline terminal ui, a headless mode and editor integrations, and you can extend it with mcp, skills, hooks and subagents. it's in public beta.",
    tech: ["TypeScript", "Node.js", "Ink", "MCP", "ACP"],
    type: "AI agents",
    art: "earshot",
    status: "Public beta",
    summary: "a coding agent that stays in its lane.",
    featured: true,
  },
  {
    id: "paisatrack",
    name: "PaisaTrack",
    github: "https://github.com/rishabhguptajs/finance-tracker",
    live: "https://finance-tracker-omega-azure-42.vercel.app",
    desc: "a personal finance pwa. you type an expense in plain english and it becomes a categorised transaction. it has budgets, trend charts and finds recurring subscriptions. you can also ask it questions: the model picks which data to look at, but the server does every calculation, so the numbers aren't made up. built for me, single user.",
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
    summary: "type the expense, ask a question, the server does the maths.",
    featured: true,
  },
  {
    id: "toolharness",
    name: "toolharness",
    github: "https://github.com/rishabhguptajs/toolharness",
    live: "https://pypi.org/project/toolharness/",
    desc: "an open source harness that scores how reliable coding agents like claude code, cursor and codex are at tool calls. it checks eight kinds of failures with plain detectors plus a separate llm judge. there's bfcl validation, json reports, an html dashboard and a ci gate for regressions. it's on pypi.",
    tech: ["Python", "LLM-as-Judge", "BFCL", "PyPI", "CI"],
    type: "Developer tools",
    art: "harness",
    status: "Published on PyPI",
    summary: "does your agent make the right tool calls? this checks.",
    featured: true,
  },
  {
    id: "china-bazar-pos",
    name: "China Bazar POS",
    github: "",
    live: "",
    desc: "four stores were running on an old vb6 and ms access app. i rebuilt it as an offline first windows app with 12 modules: billing, inventory, purchasing, loyalty, shifts and more. it has double entry accounting, 50+ pdf and excel reports, barcode scanning and argon2id logins. every store keeps its own local database.",
    tech: ["Tauri v2", "React", "TypeScript", "SQLite", "Drizzle", "Rust"],
    type: "Business systems",
    art: "pos",
    status: "Private client project",
    summary: "a retail system rebuilt from an old vb6 app.",
    featured: true,
  },
  {
    id: "pgvec-studio",
    name: "pgvec-studio",
    github: "https://github.com/rishabhguptajs/pgvec-studio",
    live: "https://pgvec.raegent.com",
    desc: "a visual explorer for pgvector embeddings in postgres, and it runs locally. umap turns the vectors into a 2d map. you can do k-nn search, filter on metadata and check cosine similarity to see how your data actually relates.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "UMAP"],
    type: "Developer tools",
    art: "vectors",
    status: "Open source",
    summary: "see your embeddings instead of guessing.",
    featured: true,
  },
  {
    id: "research-agent",
    name: "Research Agent",
    github: "https://github.com/rishabhguptajs/research-agent",
    live: "",
    desc: "an agent that plans its own searches, pulls sources through tavily and writes a report. qdrant is its memory, progress streams live over sse, and the finished report exports to pdf.",
    tech: ["TypeScript", "Next.js", "Express", "Tavily", "Qdrant", "MongoDB"],
    type: "AI agents",
    art: "research",
    status: "Open source",
    summary: "ask a question, get a sourced report.",
    featured: false,
  },
  {
    id: "promptsh",
    name: "PromptSH",
    github: "https://github.com/rishabhguptajs/promptsh",
    live: "",
    desc: "a shell where you type what you want in english. openrouter turns it into a command, local ollama does autocomplete, and there's a command registry and history. every generated command goes through a whitelist and dangerous pattern checks before it runs.",
    tech: ["JavaScript", "Node.js", "OpenRouter", "Ollama"],
    type: "Developer tools",
    art: "terminal",
    status: "Open source",
    summary: "a shell you talk to, with guard rails.",
    featured: false,
  },
  {
    id: "rahi",
    name: "Rahi App",
    github: "https://github.com/rishabhguptajs/rahiapp",
    live: "https://rahiapp.vercel.app/",
    desc: "a travel app i led with a team during an ai fellowship. it plans itineraries with budgets, maps and ai suggestions. it got 1,000+ waitlist signups and 200+ active users.",
    tech: ["Next.js", "Express", "MongoDB", "Gemini", "MapLibre", "Clerk"],
    type: "Products",
    art: "rahi",
    status: "Team project",
    summary: "an ai trip planner, built with a team.",
    featured: false,
  },
  {
    id: "blame",
    name: "blame",
    github: "https://github.com/rishabhguptajs/Blogging-App",
    live: "https://blogwithnoworries.vercel.app",
    desc: "an early full stack project. a blogging platform with auth, writing and editing posts, and generative ai to help draft them.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
    type: "Products",
    art: "publishing",
    status: "Earlier work",
    summary: "a blogging app with ai help for writing.",
    featured: false,
  },
  {
    id: "ecommerce-backend",
    name: "Scalable E-commerce Backend",
    github: "https://github.com/rishabhguptajs/scalable-ecommerce-backend",
    live: "",
    desc: "a backend with auth, role based access, rate limiting, redis caching, product crud, mail and payments.",
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "Redis", "Docker"],
    type: "Business systems",
    art: "backend",
    status: "Earlier work",
    summary: "the backend behind an online store.",
    featured: false,
  },
  {
    id: "pantry",
    name: "AI Pantry Tracker",
    github: "https://github.com/rishabhguptajs/ai-pantry-tracker",
    live: "https://aipantrytracker.vercel.app/",
    desc: "a pantry app that tracks ingredients and suggests recipes with ai. built with next.js and firebase during an ai fellowship.",
    tech: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    type: "Products",
    art: "pantry",
    status: "Earlier work",
    summary: "use up what's already in the kitchen.",
    featured: false,
  },
];

export const funProjects = [
  {
    name: "wren",
    github: "https://github.com/rishabhguptajs/wren",
    live: "",
    desc: "a hinglish voice companion that runs fully on my mac, so nothing leaves the machine. text chat works. the mic part is flaky and i haven't fixed it yet, so it stays an experiment.",
    tech: ["Python", "MLX", "SwiftUI", "Experiment"],
  },
  {
    name: "littleworld",
    github: "https://github.com/rishabhguptajs/littleworld",
    live: "https://littleworld-lemon.vercel.app",
    desc: "a tiny world in the browser where creatures with neural network brains evolve. they hunt, graze, reproduce and mutate, and none of it is scripted. click one and watch its network fire.",
    tech: ["JavaScript", "Canvas 2D", "Neural nets"],
  },
  {
    name: "Neural nets / NumPy notebook",
    github: "https://github.com/rishabhguptajs/neural_nets",
    live: "",
    desc: "my notebook for learning numpy, from the arrays up. neural nets are next.",
    tech: ["Python", "NumPy", "Learning notes"],
  },
  {
    name: "bolt.rishabh",
    github: "https://github.com/rishabhguptajs/bolt.rishabh",
    live: "",
    desc: "my take on bolt.new. an experiment in turning a prompt into a react and node project.",
    tech: ["TypeScript", "AI code generation", "Prototype"],
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

export const corePrinciples = [
  {
    id: "ai",
    title: "use the model, trust the code",
    description: "let the model do the fuzzy part. anything that has to be exactly right stays in plain code.",
  },
  {
    id: "user",
    title: "fix the real problem",
    description: "talk to the person, find what actually annoys them, fix that first.",
  },
  {
    id: "velocity",
    title: "ship small, ship often",
    description: "something small in prod beats something perfect on my laptop.",
  },
  {
    id: "focus",
    title: "say no a lot",
    description: "most things aren't worth building. i try to pick the one that is.",
  },
];
