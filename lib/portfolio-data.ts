export const site = {
  name: "Reymund Abelgas",
  role: "Software / Application Developer",
  location: "City of Mati, Davao Region 8200, Philippines",
  email: "reymund216@gmail.com",
  phone: "+63 9452138300",
  linkedIn: "https://www.linkedin.com/in/reymund-abelgas-590855352",
  tagline:
    "Full-stack developer building responsive web and mobile applications that scale.",
  profile:
    "Full-Stack Developer with hands-on experience developing responsive web and mobile applications using React, React Native, JavaScript, PHP, Firebase, MongoDB, and MySQL. Experienced in building end-to-end software solutions, integrating APIs, optimizing application performance, and collaborating with clients to deliver reliable products. Passionate about creating scalable applications and continuously learning modern technologies.",
} as const;

export const expertise = [
  "UI/UX Design",
  "Full-Stack Development",
  "Database Design & Management",
  "Mobile Application Development",
  "Web Application Development",
  "REST API Integration",
  "Responsive Web Design",
  "Cloud Deployment",
] as const;

export type Project = {
  name: string;
  role: string;
  summary: string;
  stack: string[];
  highlights: string[];
  logo?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    name: "RESPONDR",
    role: "Full-Stack Developer",
    summary:
      "Cross-platform disaster response for agencies — live ops, maps, IoT weather, offline field sync.",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Cloudinary"],
    logo: "/images/Respondr.png",
    url: "https://respondr-da5cb.web.app/",
    highlights: [
      "Engineered a cross-platform disaster response system for emergency agencies to coordinate resources, operations, and situation reports in real time.",
      "Built map-driven incident workflows with resource borrowing, personnel assignment, and automated SitRep document generation.",
      "Integrated custom IoT weather stations over Firebase Realtime Database with live sensor ingestion, threshold alerting, and historical analytics.",
      "Shipped iOS, Android, and web builds with Firestore sync, offline-first queuing, and resilient field operations in low-connectivity environments.",
    ],
  },
  {
    name: "Campus Mobility Platform",
    role: "Full-Stack Developer",
    summary:
      "Digitized gate passes and travel requests with multi-stage approvals across campus sites.",
    stack: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    logo: "/images/gopass.jpg",
    highlights: [
      "Developed a production-ready platform for digitizing employee gate passes and official travel requests across multiple campus sites.",
      "Implemented supervisor-to-HR-to-security approval pipelines with digital signatures, QR verification, and policy-based time balances.",
      "Delivered real-time dashboards and notifications; deployed mobile, web, and API tiers to cloud hosting.",
    ],
  },
  {
    name: "Attendify",
    role: "Full-Stack Developer",
    summary:
      "QR attendance for 70 school sections with geofenced presence and exportable reports.",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Leaflet"],
    logo: "/images/logo.png",
    url: "https://attendify-pnhs.web.app/",
    highlights: [
      "Built a cross-platform attendance platform for high-school admins and students across 70 sections with role-gated SuperAdmin, Admin, and Student workflows.",
      "Delivered QR scan check-in/out, morning/afternoon session tracking, and Excel report exports filtered by date, grade, and section.",
      "Integrated signed QR validation, KML geofence campus maps, Firestore real-time presence, and background location tracking.",
      "Deployed via Firebase Hosting and EAS with Cloud Functions for privileged user ops, throttled writes, and exponential backoff retry logic.",
    ],
  },
  {
    name: "Barangay Business Permit Tracking System",
    role: "Full-Stack Developer",
    summary:
      "End-to-end permit workflow for applicants and BLPO staff on a LAMP stack.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "PDO"],
    highlights: [
      "Developed a digital business permit management platform for a Barangay serving business applicants and BLPO staff through centralized application management.",
      "Designed a multi-status workflow from submission through payment and approval with document uploads and role-scoped dashboards.",
      "Built automated permit numbering, RA 7160 compliant renewal rules, and on-demand printable permit certificates.",
      "Delivered on LAMP with full audit trails, cron-based renewal reminders, and live notifications via AJAX polling.",
    ],
  },
  {
    name: "Vetra",
    role: "Full-Stack Developer",
    summary:
      "Offline-first mobile POS for retailers — cart, inventory, and PDF sales reports.",
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Expo Router"],
    logo: "/images/vetra-app-icon.png",
    highlights: [
      "Built an offline-first mobile POS for small retailers to manage sales and inventory without network dependency.",
      "Delivered cart-based checkout with stock validation, inventory decrement, and shareable receipt capture.",
      "Designed SQLite schema and service layer for products, sales, authentication, and business profiles.",
      "Shipped native Android build with PDF report export for daily, weekly, and monthly sales insights.",
    ],
  },
];

export type Experience = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    title: "Full-Stack Developer",
    org: "Self-Employed",
    location: "Mati City",
    period: "2024 to 2026",
    bullets: [
      "Designed and deployed custom web and mobile applications tailored to client requirements.",
      "Developed responsive interfaces that improved usability across desktop and mobile devices.",
      "Integrated Firebase, MongoDB, MySQL, and third-party REST APIs to support secure data management.",
      "Diagnosed and resolved software issues through testing and debugging, improving application stability.",
      "Collaborated directly with clients from requirements gathering through deployment while meeting project deadlines.",
    ],
  },
  {
    title: "Management Information Systems Intern",
    org: "DICT - DOrSU",
    location: "Mati City",
    period: "Feb 2026 to Mar 2026",
    bullets: [
      "Assisted in the management, organization, and updating of digital records and information systems.",
      "Participated in system monitoring, documentation, and data management activities.",
      "Collaborated with the MIS team to support daily ICT operations and ensure efficient technology services.",
    ],
  },
  {
    title: "Illumedia Intern",
    org: "Illumedia Outsourcing Inc.",
    location: "Davao City",
    period: "Mar 2026 to Jun 2026",
    bullets: [
      "Designed and developed responsive client websites from concept to deployment using WordPress and Elementor.",
      "Created website layouts, user interfaces, and content structures tailored to business and marketing requirements.",
      "Developed branding materials, graphic designs, and multimedia content using Adobe Photoshop, Illustrator, Canva, and CapCut.",
      "Collaborated with mentors and team members to deliver client projects within established deadlines and quality standards.",
    ],
  },
];

export const education = {
  school: "Davao Oriental State University, Mati City",
  degree:
    "Bachelor of Science in Information Technology Major in Mobile Systems Development",
  period: "2022 to Jun 2026",
  photo: "/images/Abelgas,-Reymund-Angelo-M.png",
} as const;

export const skills = {
  languages: [
    "JavaScript",
    "PHP",
    "Java",
    "Kotlin",
    "HTML5",
    "CSS3",
    "Google Apps Script",
  ],
  frameworks: ["React Native", "Expo", "React (Vite)", "Laravel"],
  databases: ["Firebase", "MongoDB", "MySQL"],
  cloud: ["Vercel", "Netlify", "Render"],
  tools: ["Git/GitHub", "WordPress", "Elementor", "MySQL Workbench"],
} as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
] as const;
