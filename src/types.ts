export interface Profile {
  name: string;
  role: string;
  bio: string;
  location: string;
  phone: string;
  avatarEmoji: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  email: string;
  yearsExperience: number;
  completedProjects: number;
  happyClients: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Lucide icon identifier
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "backend" | "all";
  language: string;
  description: string;
  fullDetails: string;
  icon: string; // emoji or string
  liveUrl: string;
  githubUrl: string;
  architecture: string[];
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  content: string;
  readTime: string;
}

export const INITIAL_PROFILE: Profile = {
  name: "Myat Kaung Khant",
  role: "Junior Developer & Full Stack Developer",
  bio: "Junior full stack developer based in East London. I build responsive, high-performance web and mobile products with clean architecture and thoughtful user experience.",
  location: "London, East London",
  phone: "+44 7774414594",
  avatarEmoji: "⚡",
  githubUrl: "https://github.com/mkkbun",
  linkedinUrl: "https://linkedin.com/in/",
  twitterUrl: "https://twitter.com/",
  email: "myatkaungkhant022@gmail.com",
  yearsExperience: 2,
  completedProjects: 12,
  happyClients: 8,
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: "Layout",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "HTML5/CSS3"],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    icon: "Server",
    skills: ["Node.js", "Express", "Prisma ORM", "GraphQL", "REST APIs", "WebSockets", "Docker"],
  },
  {
    id: "database",
    title: "Data Architecture",
    icon: "Database",
    skills: ["PostgreSQL", "SQL Server", "T-SQL", "Redis", "MongoDB", "Firestore"],
  },
  {
    id: "mobile",
    title: "Mobile Platforms",
    icon: "Smartphone",
    skills: ["Flutter", "Dart", "SwiftUI", "React Native", "Cross-Platform Optimization"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "shop-elevate",
    title: "Elevate Commerce App",
    category: "web",
    language: "Next.js · TypeScript · Prisma · PostgreSQL",
    description: "A fast-loading, state-managed storefront featuring checkout pipelines, instantaneous layout resizing, and a secure modular vendor dashboard.",
    fullDetails: "This enterprise-grade application tackles server-side page hydration bottlenecks by caching popular catalogs in global memo-states, resulting under 400ms time-to-first-byte. Database requests are routed dynamically via type-safe Prisma APIs connected to PostgreSQL.",
    icon: "🛒",
    liveUrl: "https://shop-elevate.demo",
    githubUrl: "https://github.com/alexthorne/shop-elevate",
    architecture: ["Dynamic CSR & SSR Hybrid Pipelines", "State Redux Slice Client Store", "Prisma ORM Index Optimization", "Stripe API Webhook Signatures"],
  },
  {
    id: "orbit-mobile",
    title: "Orbit Mobile Workspace",
    category: "mobile",
    language: "Flutter · Dart · WebSockets",
    description: "Multi-platform collaborative workplace application designed for offline synchronization, low-latency live canvas syncing, and custom animations.",
    fullDetails: "A flagship mobile solution leveraging Flutter's Skia rendering engine. Under the hood, custom Dart multi-threading processes direct WebSocket payload updates, allowing fluid peer cursor movements and drawing layouts with zero UI-thread blocking.",
    icon: "📱",
    liveUrl: "https://orbit-workspace.app",
    githubUrl: "https://github.com/alexthorne/orbit-mobile",
    architecture: ["Double-Buffered Canvas Rendering", "WebSocket Backpressure Queues", "SQLite Local Client Synchronization Override", "Smooth Custom Flare Transformations"],
  },
  {
    id: "pulse-metrics",
    title: "Pulse Business Intelligence",
    category: "backend",
    language: "Node.js · Redis · SQL Server · T-SQL",
    description: "Real-time query visualizer that simplifies massive T-SQL analytical jobs, updating metrics and rendering charts dynamically in custom responsive grids.",
    fullDetails: "Pulse ingests data from standard SQL Server transaction tables, executing periodic analytical stored procedures. It implements safe multi-tier caching (Redis, CDN layer, react-query hooks) to maintain high performance and avoid query locks.",
    icon: "📊",
    liveUrl: "https://pulse-metrics.io",
    githubUrl: "https://github.com/alexthorne/pulse-metrics",
    architecture: ["Complex SQL Window Aggregations", "High-frequency Redis Cache Layering", "Adaptive Chart Chunk Rendering Flow", "Express Router Token Authentication"],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-senior",
    period: "2024 — PRESENT",
    role: "Senior Full-Stack Engineer",
    company: "Stripe-Alliance Labs",
    location: "San Francisco / Hybrid",
    description: "Lead developers on critical customer analytics screens. Modernized frontends to strict Tailwind + standard React states, speeding up page interactions by 45%. Oversaw container migrations, CI processes, and Prisma schema definitions.",
    tags: ["React Space", "TypeScript Core", "Next.js 15", "Prisma ORM", "SQL Indexing"],
  },
  {
    id: "exp-mid",
    period: "2022 — 2024",
    role: "Software Solutions Engineer",
    company: "Prismatek Digital",
    location: "Remote",
    description: "Shipped three core production releases written in Node/Express and Flutter. Created a modular UI component library, slashing team engineering delivery times for cross-platform layouts by half.",
    tags: ["Flutter Canvas", "Dart Language", "REST API Modules", "Express", "Tailwind CSS"],
  },
  {
    id: "exp-agency",
    period: "2020 — 2022",
    role: "Frontend Specialist & Developer",
    company: "Solis Agency",
    location: "San Francisco, CA",
    description: "Wired interactive interfaces for high-growth tech firms. Converted Figma mockups to pixel-perfect, accessibly-tested markup with smooth, layout-safe transitions.",
    tags: ["HTML5 Layout", "Vanilla JS", "Tailwind styling", "Responsive Design", "Git Control"],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-ts",
    category: "TypeScript",
    date: "May 24, 2026",
    title: "Level Up Your Type Guard Defenses in Modern React",
    summary: "Discover how smart narrowing, discriminating unions, and automated schema checks can make your client-side states bulletproof against edge cases.",
    content: "When developing complex single-page apps, runtime state bugs often slip through default typing setups. Leveraging discriminant custom properties allows React hooks to conditionally map states perfectly, preventing unexpected renders and missing dependencies.",
    readTime: "4 min read",
  },
  {
    id: "post-flutter",
    category: "Flutter Engine",
    date: "April 12, 2026",
    title: "Optimizing Canvas Draws & Frame Rates in Dart Profiles",
    summary: "Unlock 120 FPS on premium devices by identifying redraw spikes, managing state scopes, and profiling heavy GPU threads.",
    content: "Flutter paints interfaces with absolute pixel-precision. However, wrapping massive widget arrays inside a single parent build function triggers expensive re-layous. By isolating updates using small, local states, we achieve buttery-smooth 120Hz frame rates easily.",
    readTime: "6 min read",
  },
  {
    id: "post-db",
    category: "Databases",
    date: "March 15, 2026",
    title: "Why Prisma + Prepared Indexes Beat Standard SQL Queries",
    summary: "A breakdown of query-compiling routines, index scans, and connection pools, proving that a smart ORM is faster than manually written ad-hoc statements.",
    content: "Developers sometimes fear that abstract layers introduce operational lags. In reality, modern execution engines cache statements perfectly. When coupled with database indexing configured using Prisma schemas, transaction times outperform hand-crafted raw scripts.",
    readTime: "5 min read",
  },
];
