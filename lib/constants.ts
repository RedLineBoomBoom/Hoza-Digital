export interface Capability {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  businessImpact: string;
  previewType: "browser" | "landing" | "dashboard" | "mobile" | "workflow" | "modular" | "press" | "editorial";
  metrics: string;
  deliverables: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites",
    shortDesc: "Clear, credible digital experiences built to earn attention, establish market authority, and create business opportunities.",
    businessImpact: "Fast-loading, SEO-dominant digital flagships that convert high-value corporate and institutional inquiries.",
    previewType: "browser",
    metrics: "< 0.6s LCP • 100/100 CWV",
    deliverables: ["Custom Architecture", "Multi-Region Edge CDN", "Fluid Kinetic Typography", "Headless CMS Integration"],
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Landing Pages",
    shortDesc: "Focused narrative pages that turn campaigns, launches, product releases, and offers into measurable action.",
    businessImpact: "Engineered around proven conversion psychology, zero distraction, and instant sub-second render speeds.",
    previewType: "landing",
    metrics: "+42% Avg. Conversion Lift",
    deliverables: ["A/B Testing Ready", "Micro-Interactions", "Instant Lead Capture", "Precision Analytics Tracking"],
  },
  {
    id: "web-applications",
    number: "03",
    title: "Web Applications",
    shortDesc: "Reliable platforms and dashboards that simplify complex workflows for enterprise teams and customers.",
    businessImpact: "Replaces slow legacy software with reactive, secure cloud interfaces employees and clients love using.",
    previewType: "dashboard",
    metrics: "Realtime Telemetry • 99.99% Uptime",
    deliverables: ["Role-Based Access Control", "Reactive UI States", "GraphQL & REST Pipelines", "Complex State Orchestration"],
  },
  {
    id: "mobile-applications",
    number: "04",
    title: "Mobile Applications",
    shortDesc: "Fast, intuitive mobile products on iOS and Android designed around real user behaviour and gesture ergonomics.",
    businessImpact: "Pocket-sized product engines designed for daily retention, seamless biometric payments, and offline resilience.",
    previewType: "mobile",
    metrics: "120fps Gesture Motion • Native Core",
    deliverables: ["Offline-First Sync", "Biometric Authentication", "Push Notification Lifecycles", "Native Hardware Interop"],
  },
  {
    id: "automation",
    number: "05",
    title: "Automation & AI Agents",
    shortDesc: "Connected systems and autonomous agents that remove repetitive manual work and keep company operations moving 24/7.",
    businessImpact: "Eliminates hundreds of manual hours every month by connecting CRM, WhatsApp, billing, databases, and AI logic.",
    previewType: "workflow",
    metrics: "10,000+ Tasks/Hr • 0% Manual Error",
    deliverables: ["Autonomous AI Agents", "WhatsApp Cloud API Integration", "CRM Ingestion Sync", "Self-Healing Webhook Mesh"],
  },
  {
    id: "custom-software",
    number: "06",
    title: "Custom Software",
    shortDesc: "Purpose-built distributed backends and proprietary algorithms for requirements that off-the-shelf software cannot solve.",
    businessImpact: "Gives your company an unfair technological moat with tailored high-throughput software architecture.",
    previewType: "modular",
    metrics: "Deterministic Architecture • Scaled",
    deliverables: ["Microservices Architecture", "Event-Driven Queues", "Proprietary Data Engines", "Enterprise Audit Logging"],
  },
  {
    id: "press-release",
    number: "07",
    title: "Press Release",
    shortDesc: "Clear, media-ready announcements and digital press hubs for your product launches, investment milestones, and company news.",
    businessImpact: "Positions your company in tier-1 tech publications with journalist-ready assets, interactive press kits, and instant syndication.",
    previewType: "press",
    metrics: "Top-Tier Media Reach • SEO Syndicated",
    deliverables: ["Digital Press Kits", "Media Contact Hubs", "Embargo Systems", "Interactive Asset Vaults"],
  },
  {
    id: "editorial-design",
    number: "08",
    title: "Magazine & Tabloid Design",
    shortDesc: "Editorial layouts, covers, and typography for digital publications, magazines, and tabloids, crafted for print and screens.",
    businessImpact: "Transforms complex reports, research papers, and company catalogues into award-winning editorial experiences.",
    previewType: "editorial",
    metrics: "Art-Directed Layouts • 300+ DPI & Web",
    deliverables: ["Grid Systems", "Cover Typography", "Digital Flippable Editions", "Print-Ready Vector Files"],
  },
];

export interface Project {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  region: string;
  year: string;
  description: string;
  problem: string;
  solution: string;
  services: string[];
  impactStats: { label: string; value: string }[];
  accentColor: string;
}

export const PROJECTS: Project[] = [
  {
    id: "project-01",
    tag: "Project 01",
    title: "Kinetix Global",
    subtitle: "Modern corporate website and high-converting enterprise lead-generation platform.",
    category: "Business Platform",
    client: "Kinetix Capital Partners",
    region: "Singapore / Jakarta",
    year: "2025",
    description: "Replatforming an international investment and cross-border advisory firm into a cinematic, ultra-responsive digital presence that showcases deal flow and captures institutional inquiries.",
    problem: "Outdated legacy site with slow load times, non-responsive layouts, and zero organic lead qualification.",
    solution: "Custom headless Next.js architecture with instant multi-region edge routing, interactive deal graph, and automated investor portal.",
    services: ["Strategy", "UX Architecture", "UI Design", "Full-Stack Development"],
    impactStats: [
      { label: "Pipeline Surge", value: "+340%" },
      { label: "Average Page Load", value: "0.42s" },
      { label: "Institutional Inquiries", value: "180+" },
    ],
    accentColor: "#8B5CFF",
  },
  {
    id: "project-02",
    tag: "Project 02",
    title: "Apex Logistics OS",
    subtitle: "A custom operations platform that replaced 40+ spreadsheets and manual fleet dispatch.",
    category: "Operations System",
    client: "Apex Freight Dynamics",
    region: "Indonesia / Southeast Asia",
    year: "2025",
    description: "A centralized operational nervous system for Southeast Asian logistics, routing over 2,400 daily consignments with real-time telematics and automated dispatching.",
    problem: "Operational friction, fragmented communication over messaging groups, and manual reconciliation errors cost hundreds of man-hours weekly.",
    solution: "Tailor-made web dashboard with live geospatial GPS tracking, automated driver allocation, and instant WhatsApp billing triggers.",
    services: ["Product Design", "Web Application", "Automation Engine", "Cloud Infrastructure"],
    impactStats: [
      { label: "Manual Hours Saved", value: "920 hrs/mo" },
      { label: "Dispatch Velocity", value: "6.8x Faster" },
      { label: "Error Rate Reduction", value: "99.4%" },
    ],
    accentColor: "#A478FF",
  },
  {
    id: "project-03",
    tag: "Project 03",
    title: "Pulse Pay & Mobility",
    subtitle: "Cross-border digital wallet and transport companion connecting 450,000 active urban commuters.",
    category: "Mobile Product",
    client: "Pulse Technologies",
    region: "Indonesia / Regional",
    year: "2026",
    description: "A unified mobile interface allowing users to top-up transport balances, scan QRIS payments in seconds, and track transit schedules across Jakarta, Surabaya, and Singapore.",
    problem: "High abandonment rates during peak commuting hours due to clunky authentication and unstable network connections.",
    solution: "Sub-second offline-first mobile app with localized QRIS caching, biometric 1-tap checkout, and low-latency microservice architecture.",
    services: ["User Research", "Mobile UX/UI", "Cross-Platform Engineering", "Realtime Backend"],
    impactStats: [
      { label: "Daily Active Users", value: "450K+" },
      { label: "Checkout Completion", value: "99.2%" },
      { label: "App Store Rating", value: "4.9 ★" },
    ],
    accentColor: "#00F0FF",
  },
  {
    id: "project-04",
    tag: "Project 04",
    title: "Aura Autonomous AI Mesh",
    subtitle: "AI-driven customer operations engine routing multi-channel inbound inquiries with zero human wait time.",
    category: "AI & Automation",
    client: "Aura Commerce Group",
    region: "Singapore / Global",
    year: "2026",
    description: "An autonomous agent network answering complex order inquiries, parsing invoice PDFs, and orchestrating return logistics via WhatsApp and email around the clock.",
    problem: "Support queues overloaded by 15,000 monthly inquiries causing high churn and delayed sales responses.",
    solution: "Autonomous LLM reasoning engine with real-time inventory API access and human-in-the-loop escalation guardrails.",
    services: ["AI Engineering", "Workflow Automation", "API Integration", "Security Architecture"],
    impactStats: [
      { label: "Instant Resolution", value: "84.6%" },
      { label: "Median Response", value: "1.4s" },
      { label: "Monthly Cost Cut", value: "68%" },
    ],
    accentColor: "#C8B7FF",
  },
];

export const PARTNERS_MARQUEE = [
  { name: "Vercel", type: "Edge Infrastructure", badge: "HOSTING" },
  { name: "Supabase", type: "Postgres & Auth", badge: "DATABASE" },
  { name: "Superteam", type: "Ecosystem Builder", badge: "NETWORK" },
  { name: "Solflare", type: "Web3 Infrastructure", badge: "WALLET" },
  { name: "MonkeDAO", type: "Global Community", badge: "COMMUNITY" },
  { name: "SwissBorg", type: "Digital Wealth", badge: "FINTECH" },
  { name: "Colosseum", type: "Startup Accelerator", badge: "INCUBATOR" },
  { name: "Netlify", type: "Edge Platform", badge: "DEPLOYMENT" },
  { name: "GitHub", type: "Version Control", badge: "CODE" },
  { name: "OpenAI", type: "Intelligence Engine", badge: "AI" },
  { name: "AWS", type: "Cloud Architecture", badge: "CLOUD" },
  { name: "Stripe", type: "Payment Infrastructure", badge: "PAYMENTS" },
];

export const WHY_HOZA = [
  {
    number: "01",
    title: "Fast Execution",
    description: "Clear milestones and efficient delivery without unnecessary agency layers. You talk directly with the engineers and designers building your software.",
    metric: "2-4x",
    metricLabel: "Faster than traditional agency timelines",
  },
  {
    number: "02",
    title: "Design and Development Together",
    description: "The interface and technology are planned as one connected system from day one. No design handoffs that break in production or look different on mobile.",
    metric: "100%",
    metricLabel: "Fidelity between design and production code",
  },
  {
    number: "03",
    title: "Business-Focused Decisions",
    description: "Technology is selected based on business requirements, not trends. We focus on scalability, conversion, speed, and real operational returns.",
    metric: "ROI First",
    metricLabel: "Architecture tailored to revenue and operational efficiency",
  },
  {
    number: "04",
    title: "Clear Communication",
    description: "Clients receive transparent progress updates, working staging builds, and realistic expectations. No radio silence. No technical smoke and mirrors.",
    metric: "24h",
    metricLabel: "Maximum response cadence & daily sprint transparency",
  },
];

export const COMPARISON_DATA = [
  {
    factor: "Delivery Speed",
    traditional: "3 - 6 months of endless slide decks and bloated discovery",
    hoza: "14 - 30 days to live, production-tested software",
  },
  {
    factor: "Communication",
    traditional: "Filtered through account managers who don't write code",
    hoza: "Direct line to senior engineers and product designers",
  },
  {
    factor: "Design vs Code",
    traditional: "Figma mockups look pretty but break in actual production",
    hoza: "Pixel-perfect 1:1 code fidelity with 120fps fluid micro-interactions",
  },
  {
    factor: "Tech Stack",
    traditional: "Outdated WordPress / bloated PHP templates with plugins",
    hoza: "Cutting-edge Next.js, TypeScript, Tailwind, and Edge APIs",
  },
  {
    factor: "Pricing & Scope",
    traditional: "Hourly billing bloat with hidden change-order fees",
    hoza: "Clear milestones, guaranteed velocity, and upfront commercial scope",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    label: "UNDERSTAND",
    title: "Discovery & Architecture",
    description: "We deconstruct your business model, target audience, pain points, and technical constraints to establish a bulletproof baseline.",
    deliverables: ["Product Specification", "Technical Scope", "Success Metrics"],
  },
  {
    step: "02",
    label: "PLAN",
    title: "Sprint Roadmap & Specs",
    description: "We map out precision milestones, sprint cadences, data models, and user journeys so everyone knows what gets shipped when.",
    deliverables: ["Sprint Milestones", "System Architecture", "Interactive Prototype"],
  },
  {
    step: "03",
    label: "DESIGN",
    title: "High-Fidelity Interface",
    description: "We craft an original, art-directed visual system with fluid typography, dark-purple atmospheric depth, and purposeful micro-interactions.",
    deliverables: ["Design System", "Component Library", "Responsive Screen Flows"],
  },
  {
    step: "04",
    label: "BUILD",
    title: "Full-Stack Engineering",
    description: "Clean, maintainable, production-ready code with strong typing, robust APIs, automated tests, and edge-first performance tuning.",
    deliverables: ["Production Codebase", "API Integration", "Automated CI/CD"],
  },
  {
    step: "05",
    label: "LAUNCH",
    title: "QA & Global Deployment",
    description: "Rigorous cross-device testing, Core Web Vitals optimization, zero-downtime server migration, and smooth public release.",
    deliverables: ["Lighthouse 95+ Audit", "DNS & SSL Configuration", "Telemetry Verification"],
  },
  {
    step: "06",
    label: "IMPROVE",
    title: "Telemetry & Iteration",
    description: "We monitor live user metrics, conversion funnels, error tracking, and performance logs to continuously optimize and scale.",
    deliverables: ["Analytics Reports", "Conversion Optimization", "Feature Iterations"],
  },
];

export const REGIONAL_HUBS = [
  {
    city: "Jakarta",
    country: "Indonesia",
    status: "HQ & Engineering Hub",
    coordinates: "6.2088° S, 106.8456° E",
    ping: "12ms",
    statusColor: "#8B5CFF",
  },
  {
    city: "Singapore",
    country: "Singapore",
    status: "Commercial & Regional Node",
    coordinates: "1.3521° N, 103.8198° E",
    ping: "18ms",
    statusColor: "#8B5CFF",
  },
  {
    city: "Tokyo",
    country: "Japan",
    status: "Asia-Pacific Gateway",
    coordinates: "35.6762° N, 139.6503° E",
    ping: "45ms",
    statusColor: "#C8B7FF",
  },
  {
    city: "San Francisco",
    country: "United States",
    status: "International Client Hub",
    coordinates: "37.7749° N, 122.4194° W",
    ping: "138ms",
    statusColor: "#C8B7FF",
  },
  {
    city: "London",
    country: "United Kingdom",
    status: "European Client Node",
    coordinates: "51.5074° N, 0.1278° W",
    ping: "162ms",
    statusColor: "#C8B7FF",
  },
  {
    city: "Sydney",
    country: "Australia",
    status: "Oceania Coverage",
    coordinates: "33.8688° S, 151.2093° E",
    ping: "92ms",
    statusColor: "#C8B7FF",
  },
];

export const TECH_CATEGORIES = [
  {
    category: "Frontend",
    desc: "Lightning-fast, highly responsive user experiences.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "WebGL"],
  },
  {
    category: "Backend",
    desc: "Robust, scalable API engines and distributed systems.",
    tools: ["Node.js", "Go", "Python", "NestJS", "FastAPI", "GraphQL", "REST"],
  },
  {
    category: "Mobile",
    desc: "Native-grade fluid applications with 120fps motion.",
    tools: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)", "Expo EAS"],
  },
  {
    category: "Cloud & DevOps",
    desc: "High-availability, globally distributed infrastructure.",
    tools: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes", "Cloudflare Workers"],
  },
  {
    category: "Databases",
    desc: "Reliable transactional and analytical data stores.",
    tools: ["PostgreSQL", "Supabase", "Redis", "MongoDB", "ClickHouse", "Pinecone"],
  },
  {
    category: "Automation & AI",
    desc: "Autonomous agentic workflows, APIs, and scheduled pipelines.",
    tools: ["OpenAI", "Claude / Anthropic", "n8n", "WhatsApp Cloud API", "LangChain", "Vector Embeddings"],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category: "Strategy" | "Technology" | "Timeline & Pricing";
}

export const FAQS: FAQItem[] = [
  {
    category: "Strategy",
    question: "Can Hoza connect our marketing, sales, and operations into one coherent system?",
    answer: "Yes. When your platforms expose secure APIs or webhooks, Hoza connects landing pages, forms, CRM, WhatsApp, email, payment gateways, and executive dashboards so customer activity flows through one verifiable, traceable pipeline.",
  },
  {
    category: "Technology",
    question: "Where can autonomous AI agents and automation improve our company the most?",
    answer: "The highest ROI opportunities are lead qualification, instant 24/7 customer routing, document parsing, follow-ups, and repetitive operational tasks. We keep strategic human approvals in place while automating the mechanical, high-frequency steps around them.",
  },
  {
    category: "Timeline & Pricing",
    question: "How fast can Hoza ship and launch a useful first release?",
    answer: "After our initial 20-minute architecture alignment call, we map a practical first-release scope within 24 hours. High-converting landing pages and focused automation workflows often launch in 7-14 days; complex web applications typically ship within 3-4 weeks.",
  },
  {
    category: "Technology",
    question: "Can Hoza modernize our existing codebase without rebuilding everything from scratch?",
    answer: "In most cases, yes. We conduct a technical audit of your existing journey, database, and integrations, preserve what functions well, and laser-focus our engineering on conversion bottlenecks, mobile performance leaks, and fragile architecture.",
  },
  {
    category: "Timeline & Pricing",
    question: "How do pricing and project scope work?",
    answer: "We structure pricing around the smallest useful high-impact release, its required integrations, and velocity requirements. We present upfront milestone pricing with zero hidden change-order fees.",
  },
  {
    category: "Strategy",
    question: "How will we measure whether the project generates tangible business return?",
    answer: "Before writing code, we lock in practical commercial metrics: qualified leads, conversion rate lift, sub-second latency, reduced support hours, or direct pipeline influenced. Realtime analytics instrumentation is built into every deployment.",
  },
];

export const HOZA_STATEMENTS = [
  "BUILD FAST.",
  "MOVE FORWARD.",
  "IDEA TO LAUNCH.",
  "LESS TALK. MORE SHIPPED.",
  "SOFTWARE THAT WORKS.",
  "THE RIGHT TOOL FOR THE JOB.",
  "BUILT IN INDONESIA. READY FOR ANYWHERE.",
];

export interface HozaArticle {
  id: string;
  slug: string;
  title: string;
  date: string; // Bulkhead format: DD/MM/YY
  formattedDate: string; // e.g. AUG 20, 2026
  category: string;
  summary: string;
  readTime: string;
  url: string;
  thumbnail: string;
}

export const HOZA_ARTICLES: HozaArticle[] = [
  {
    id: "sales-it-analytics",
    slug: "260820",
    title: "Data-Driven Sales: How IT Analytics Improves Sales Targeting",
    date: "20/08/26",
    formattedDate: "AUG 20, 2026",
    category: "Sales",
    summary:
      "Discover how Business Intelligence and data analytics help companies forecast sales, understand customer behavior, optimize pipelines, and set more accurate sales targets.",
    readTime: "7 min read",
    url: "https://hoza-digital.vercel.app/article/260820/data-driven-sales-it-analytics-sales-targeting",
    thumbnail: "/images/articles/260820.webp",
  },
  {
    id: "free-landing-page-referral",
    slug: "260819",
    title: "Get an Exclusive High-Converting Landing Page FREE from HozaDigital",
    date: "19/08/26",
    formattedDate: "AUG 19, 2026",
    category: "Promotion",
    summary:
      "Share HozaDigital's promotion, refer five businesses, and receive a free high-converting landing page. Domain, hosting, server, and third-party fees are excluded.",
    readTime: "4 min read",
    url: "https://hoza-digital.vercel.app/article/260819/free-landing-page-referral-promotion",
    thumbnail: "/images/articles/260819.webp",
  },
  {
    id: "web-app-vs-mobile-app",
    slug: "260813",
    title: "Web App vs. Mobile App: Which Is Best for Your Business?",
    date: "13/08/26",
    formattedDate: "AUG 13, 2026",
    category: "Web & App",
    summary:
      "Compare web apps and mobile apps to discover which platform best fits your business goals, budget, users, features, and long-term growth strategy.",
    readTime: "5 min read",
    url: "https://hoza-digital.vercel.app/article/260813/web-app-vs-mobile-app-for-business",
    thumbnail: "/images/articles/260813.webp",
  },
  {
    id: "poor-ui-ux-design-sales",
    slug: "260812",
    title: "How Poor UI/UX Design Can Hurt Sales and Conversions",
    date: "12/08/26",
    formattedDate: "AUG 12, 2026",
    category: "Design",
    summary:
      "Understand how user experience flaws, confusing navigation, slow loading times, and poor mobile responsiveness quietly destroy business sales.",
    readTime: "6 min read",
    url: "https://hoza-digital.vercel.app/article/260812/poor-ui-ux-design-hurts-sales",
    thumbnail: "/images/articles/260812.webp",
  },
  {
    id: "website-development-costs",
    slug: "260802",
    title: "Website Development Costs: 3 Key Factors That Affect Pricing",
    date: "02/08/26",
    formattedDate: "AUG 02, 2026",
    category: "Web",
    summary:
      "Explore the core variables that determine professional website costs: scope complexity, custom integrations, and ongoing technical support.",
    readTime: "4 min read",
    url: "https://hoza-digital.vercel.app/article/260802/factors-affecting-website-development-costs",
    thumbnail: "/images/articles/260802.webp",
  },
];

