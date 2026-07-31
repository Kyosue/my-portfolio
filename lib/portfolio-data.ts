export const site = {
  name: "Reymund Abelgas",
  role: "Full-Stack Software Developer",
  location: "City of Mati, Davao Region 8200, Philippines",
  email: "reymund216@gmail.com",
  phone: "+63 9452138300",
  linkedIn: "https://www.linkedin.com/in/reymund-abelgas-590855352",
  tagline:
    "Full-stack developer building responsive web and mobile applications that scale.",
  profile:
    "Full-Stack Developer with hands-on experience developing responsive web and mobile applications using React, React Native, JavaScript, PHP, Firebase, MongoDB, and MySQL. Experienced in building end-to-end software solutions, integrating APIs, optimizing application performance, and collaborating with clients to deliver reliable products. Passionate about creating scalable applications and continuously learning modern technologies.",
} as const;

export type ProjectStack = {
  frontend?: string[];
  backend?: string[];
  infra?: string[];
};

export type ProjectKind = "Capstone" | "Freelance" | "School Project";

export type Project = {
  name: string;
  role: string;
  kind: ProjectKind;
  summary: string;
  stack: ProjectStack;
  highlights: string[];
  logo?: string;
  url?: string;
};

export const stackLayers = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "infra", label: "Infra" },
] as const satisfies ReadonlyArray<{
  key: keyof ProjectStack;
  label: string;
}>;

export function getStackLayers(stack: ProjectStack) {
  return stackLayers.filter(({ key }) => (stack[key]?.length ?? 0) > 0);
}

export function getStackPreview(stack: ProjectStack, limit = 5) {
  const items = [
    ...(stack.frontend ?? []),
    ...(stack.backend ?? []),
    ...(stack.infra ?? []),
  ];
  return items.slice(0, limit);
}

export const projects: Project[] = [
  {
    name: "RESPONDR",
    role: "Full-Stack Developer",
    kind: "Capstone",
    summary:
      "Disaster response for PDRRMO — offline resource ops, live municipal maps, and automated SitReps.",
    stack: {
      frontend: [
        "Expo",
        "React Native",
        "TypeScript",
        "Expo Router",
        "Leaflet",
        "GeoJSON",
        "Reanimated",
        "AsyncStorage",
        "SecureStore",
        "NetInfo",
        "SheetJS",
      ],
      backend: [
        "Firebase Auth",
        "Firestore",
        "Cloud Storage",
        "Cloud Functions",
        "Cloudinary",
      ],
      infra: ["Firebase Hosting", "EAS"],
    },
    logo: "/images/Respondr.png",
    url: "https://respondr-da5cb.web.app/",
    highlights: [
      "Engineered an offline-first sync layer with NetInfo, AsyncStorage operation queues, and SyncManager exponential backoff so responders keep logging resource transactions when cellular coverage drops.",
      "Built municipality-level operations maps on Leaflet + OpenStreetMap (DOM Leaflet on web, WebView-injected on native) with Firestore onSnapshot listeners for live active vs. concluded sites across Davao Oriental.",
      "Implemented admin / supervisor / operator RBAC with Expo SecureStore session restore and Firebase callable Cloud Functions for user provisioning—preventing client-side createUser from hijacking the admin Auth session.",
      "Delivered SitRep Word-compatible HTML .doc export (letterhead, base64 images, multi-section casualty data) and PAGASA-aligned rainfall advisories with on-device multivariate regression plus SheetJS Excel export.",
    ],
  },
  {
    name: "Campus Mobility Platform",
    role: "Full-Stack Developer",
    kind: "Freelance",
    summary:
      "Campus leave and travel authorization for DOrSU — role-gated approvals, gate QR, and weekly balances.",
    stack: {
      frontend: [
        "Expo",
        "React",
        "TypeScript",
        "NativeWind",
        "Axios",
        "Leaflet",
        "Socket.IO",
      ],
      backend: [
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "bcrypt",
        "Socket.IO",
        "Cloudinary",
        "Nodemailer",
      ],
      infra: ["Render", "Vercel", "EAS"],
    },
    logo: "/images/gopass.jpg",
    url: "https://gopassdorsu.vercel.app/",
    highlights: [
      "Architected a split-client platform (Expo mobile for employees/approvers/security; Expo web HR console on Vercel; Express API on Render) with JWT auth, bcrypt credentials, and route-level authorize middleware across nine campus roles.",
      "Implemented seconds-based weekly leave accounting (default 120-minute allotment) with MongoDB balance state, Monday node-cron resets, HR-time reservation on approval, early-return credit/overdue debit, and Asia/Manila server-time sync.",
      "Delivered dual realtime channels—Socket.IO on mobile and SSE via MongoDB Change Streams on web—plus expo-camera QR scans that advance slips Approved → Verified → Returned at the gate while reconciling leave balance.",
      "Enforced city-bounded pass slips with ray-casting against a Mati City PSGC GeoJSON boundary, OSRM driving routes, Leaflet destination maps, canvas signature capture, Cloudinary attachments, and OIC signer delegation.",
    ],
  },
  {
    name: "Attendify",
    role: "Full-Stack Developer",
    kind: "Freelance",
    summary:
      "School attendance for Pantukan NHS — secure QR check-in, campus geofencing, and grade/section reports.",
    stack: {
      frontend: ["Expo", "React", "TypeScript", "Leaflet", "SheetJS", "Jest"],
      backend: ["Firebase", "Firestore"],
    },
    logo: "/images/logo.png",
    url: "https://attendify-pnhs.web.app/",
    highlights: [
      "Engineered campus geofencing and live presence on Leaflet + OpenStreetMap with KML/GeoJSON polygon checks (ray-casting + Haversine), throttled Firestore location writes (~30s / 12m), and expo-task-manager background GPS.",
      "Built HMAC-signed, versioned QR attendance (ATDFY1 payloads) with an Admin-only expo-camera scanner that records morning/afternoon time-in/out—including late cutoffs (7:30 AM / 1:00 PM)—then generates weekday-aware grade/section Excel workbooks via SheetJS.",
      "Implemented SuperAdmin / Admin / Student RBAC with Expo SecureStore session restore, Firestore security rules, and a SuperAdmin-only callable Cloud Function (deleteAuthUser) so privileged deletes stay server-enforced.",
      "Delivered school-scale realtime UX with capped Firestore onSnapshot presence listeners, throttled online/offline sync across AppState and web tab visibility, and role-gated Expo Router navigation unlocked only after a successful profile fetch.",
    ],
  },
  {
    name: "Barangay Business Permit Tracking System",
    role: "Full-Stack Developer",
    kind: "Freelance",
    summary:
      "Barangay business clearance for Marayag — online applications, LGC-aligned renewals, and printable permits.",
    stack: {
      frontend: ["HTML", "CSS", "JavaScript"],
      backend: ["PHP", "MySQL", "PDO"],
    },
    highlights: [
      "Engineered a nine-state permit lifecycle (submitted → under_review → on_hold → for_payment → payment_confirmed → approved / released / rejected / revoked) with PDO status updates that auto-assign BBC-YYYY-MM-NNNNN numbers and force Dec 31 expiry only on approval.",
      "Implemented admin / staff / applicant RBAC with PHP sessions, password_hash / password_verify, and require_role guards, plus admin-safe user CRUD that blocks self-deletion and removal of the last admin while writing changes to a paginated audit log.",
      "Built RA 7160–aligned renewal flows and a schedulable cron_reminders.php endpoint that notifies owners in December before Dec 31 expiry and again during January 1–20 if no renewal application exists.",
      "Delivered printable Barangay Business Clearance certificates (HTML print with O.R. and payment amount), multi-file uploads with basename-sanitized downloads, and near–real-time in-app alerts via 5-second JSON polling.",
    ],
  },
  {
    name: "Vetra",
    role: "Full-Stack Developer",
    kind: "School Project",
    summary:
      "Offline-first POS for small businesses — SQLite inventory & sales, on-device receipts, and printable reports.",
    stack: {
      frontend: [
        "Expo",
        "React Native",
        "TypeScript",
        "Expo Router",
        "Camera",
        "Print",
        "ViewShot",
      ],
      backend: ["SQLite", "AsyncStorage"],
      infra: ["Android"],
    },
    logo: "/images/vetra-app-icon.png",
    highlights: [
      "Architected an offline-first POS data layer on expo-sqlite (products, sales, users, business_profiles) with transactional sale writes that decrement stock and reject under-stocked checkouts when internet is unavailable.",
      "Built a cart-driven checkout flow with category filters, search/sort, and multi-item cart state, then captured receipts via react-native-view-shot + expo-file-system/MediaLibrary/Sharing for on-device PNG save and share.",
      "Implemented local auth and business onboarding (SQLite user validation + AsyncStorage session) with field-level validation for retail profiles, enabling fully device-side registration and login.",
      "Delivered sales analytics (daily/weekly/monthly totals, low-stock and out-of-stock counts) and HTML-to-PDF export through expo-print, with Android Downloads persistence and iOS share-sheet handoff.",
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
