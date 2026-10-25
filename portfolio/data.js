/* ============================================================
   AUTODEV AGENCY — LOCAL PORTFOLIO CONTENT
   ------------------------------------------------------------
   Used when no Supabase project is configured in config.js.
   Add / edit / remove projects here — every text field accepts
   { ar: "...", fr: "...", en: "..." }.
============================================================ */

const AUTODEV_CATEGORIES = [
  { id: "c1", slug: "mobile",    name: { ar: "تطبيقات موبايل", fr: "Apps Mobiles", en: "Mobile Apps" },  is_visible: true },
  { id: "c2", slug: "web",       name: { ar: "مواقع ويب",      fr: "Sites Web",    en: "Websites" },      is_visible: true },
  { id: "c3", slug: "ui",        name: { ar: "واجهات UI/UX",   fr: "UI/UX",        en: "UI/UX" },         is_visible: true },
  { id: "c4", slug: "dashboard", name: { ar: "لوحات تحكم",     fr: "Dashboards",   en: "Dashboards" },    is_visible: true },
  { id: "c5", slug: "automation", name: { ar: "أتمتة", fr: "Automatisation", en: "Automation" }, is_visible: true },
];

const AUTODEV_PROJECTS = [
  {
    id: "p1",
    featured: true,
    badge: { ar: "المشروع الأبرز", fr: "Projet Phare", en: "Flagship Project" },
    title: { ar: "لوحة تحكم Donezo", fr: "Dashboard Donezo", en: "Donezo Dashboard" },
    short_description: {
      ar: "لوحة تحكم تحليلية لإدارة المشاريع والفرق مع إحصائيات حية وتقارير في الوقت الفعلي.",
      fr: "Tableau de bord analytique pour la gestion de projets et d'équipes, avec statistiques et rapports en temps réel.",
      en: "Analytics dashboard for project and team management with live statistics and real-time reports.",
    },
    description: {
      ar: "نظام إدارة متكامل يجمع المشاريع، المهام، الفريق وتتبع الوقت في مكان واحد. يعرض تقدم كل مشروع، توزيع المهام بين الأعضاء، ورسوماً بيانية تتحدث لحظياً.",
      fr: "Système de gestion complet réunissant projets, tâches, équipe et suivi du temps au même endroit — progression, répartition des tâches et graphiques mis à jour en direct.",
      en: "A complete management system bringing projects, tasks, team and time tracking together — progress per project, task distribution and charts that update live.",
    },
    features: {
      ar: ["إحصائيات حية للمشاريع", "إدارة الفريق والصلاحيات", "تتبع الوقت", "تقارير ورسوم بيانية", "تذكيرات واجتماعات"],
      fr: ["Statistiques live", "Gestion d'équipe et rôles", "Suivi du temps", "Rapports et graphiques", "Rappels et réunions"],
      en: ["Live project statistics", "Team & role management", "Time tracking", "Reports and charts", "Reminders and meetings"],
    },
    year: "2026",
    cover_image_url: "assets/project-dashboard.webp",
    project_category_links: [{ category_id: "c4" }, { category_id: "c2" }],
    project_technologies: [
      { technologies: { name: "React" } },
      { technologies: { name: "TypeScript" } },
      { technologies: { name: "Chart.js" } },
      { technologies: { name: "Supabase" } },
    ],
    project_media: [{ url: "assets/project-dashboard.webp", media_type: "image", is_cover: true, sort_order: 0 }],
    likes_count: 0,
  },
  {
    id: "p2",
    title: { ar: "منصة Nexcent للويب", fr: "Plateforme Web Nexcent", en: "Nexcent Web Platform" },
    short_description: {
      ar: "موقع شركة متكامل بصفحة هبوط عصرية، إدارة محتوى، وأقسام للعملاء والخدمات.",
      fr: "Site d'entreprise complet : landing page moderne, gestion de contenu, sections clients et services.",
      en: "Complete corporate site with a modern landing page, content management, clients and services sections.",
    },
    description: {
      ar: "منصة ويب للشركات والجمعيات: صفحة هبوط سريعة، مدونة، عرض العملاء والخدمات، ونموذج تواصل — متجاوبة بالكامل مع كل الشاشات.",
      fr: "Plateforme web pour entreprises et associations : landing rapide, blog, clients, services et formulaire de contact — entièrement responsive.",
      en: "Web platform for companies and organizations: fast landing page, blog, clients, services and contact form — fully responsive.",
    },
    features: {
      ar: ["تصميم متجاوب بالكامل", "مدونة وإدارة محتوى", "تحسين لمحركات البحث", "أداء وسرعة عالية"],
      fr: ["Design 100% responsive", "Blog & gestion de contenu", "Optimisation SEO", "Performance élevée"],
      en: ["Fully responsive design", "Blog & content management", "SEO optimized", "High performance"],
    },
    year: "2026",
    cover_image_url: "assets/project-webapp.webp",
    project_category_links: [{ category_id: "c2" }, { category_id: "c3" }],
    project_technologies: [
      { technologies: { name: "Next.js" } },
      { technologies: { name: "Tailwind" } },
      { technologies: { name: "PostgreSQL" } },
    ],
    project_media: [{ url: "assets/project-webapp.webp", media_type: "image", is_cover: true, sort_order: 0 }],
    likes_count: 0,
  },
  {
    id: "p3",
    title: { ar: "تطبيق مقهى JavaGem", fr: "App JavaGem Coffee", en: "JavaGem Coffee App" },
    short_description: {
      ar: "تطبيق موبايل أنيق لطلب القهوة مع واجهة عصرية وتتبع الطلبات ودفع إلكتروني.",
      fr: "App mobile élégante de commande de café : UI moderne, suivi des commandes et paiement en ligne.",
      en: "Elegant coffee ordering mobile app with modern UI, order tracking and online payments.",
    },
    description: {
      ar: "تطبيق كامل للمقاهي: قائمة المنتجات، التخصيص، السلة، الدفع، تتبع الطلب لحظياً، وبرنامج ولاء للعملاء.",
      fr: "App complète pour cafés : catalogue, personnalisation, panier, paiement, suivi en direct et programme de fidélité.",
      en: "Complete café app: catalog, customization, cart, payment, live order tracking and a loyalty program.",
    },
    features: {
      ar: ["طلب وتخصيص المشروبات", "دفع إلكتروني آمن", "تتبع الطلب لحظياً", "برنامج نقاط الولاء"],
      fr: ["Commande et personnalisation", "Paiement sécurisé", "Suivi en temps réel", "Programme de fidélité"],
      en: ["Ordering & customization", "Secure online payment", "Real-time order tracking", "Loyalty points"],
    },
    year: "2025",
    cover_image_url: "assets/project-coffee.png",
    project_category_links: [{ category_id: "c1" }],
    project_technologies: [
      { technologies: { name: "Flutter" } },
      { technologies: { name: "Firebase" } },
      { technologies: { name: "Stripe" } },
    ],
    project_media: [{ url: "assets/project-coffee.png", media_type: "image", is_cover: true, sort_order: 0 }],
    likes_count: 0,
  },
  {
    id: "p4",
    title: { ar: "واجهات توصيل الطعام", fr: "UI Kit Livraison de Repas", en: "Food Delivery UI Kit" },
    short_description: {
      ar: "أكثر من 50 شاشة عالية الجودة لتطبيقات توصيل الطعام والمطاعم.",
      fr: "Plus de 50 écrans haute qualité pour applications de livraison et restaurants.",
      en: "50+ high-quality screens for food delivery and restaurant apps.",
    },
    description: {
      ar: "مجموعة واجهات جاهزة تغطي رحلة المستخدم كاملة: التصفح، المطاعم، تفاصيل الطبق، السلة، الدفع، والتتبع.",
      fr: "Kit d'interfaces couvrant tout le parcours : navigation, restaurants, détail du plat, panier, paiement et suivi.",
      en: "A UI kit covering the full journey: browsing, restaurants, dish details, cart, checkout and tracking.",
    },
    features: {
      ar: ["أكثر من 50 شاشة", "نظام ألوان وخطوط متكامل", "مكوّنات قابلة لإعادة الاستخدام", "وضع فاتح وداكن"],
      fr: ["Plus de 50 écrans", "Design system complet", "Composants réutilisables", "Mode clair et sombre"],
      en: ["50+ screens", "Complete design system", "Reusable components", "Light & dark mode"],
    },
    year: "2025",
    cover_image_url: "assets/project-food.png",
    project_category_links: [{ category_id: "c3" }, { category_id: "c1" }],
    project_technologies: [
      { technologies: { name: "Figma" } },
      { technologies: { name: "UI/UX" } },
      { technologies: { name: "Design System" } },
    ],
    project_media: [{ url: "assets/project-food.png", media_type: "image", is_cover: true, sort_order: 0 }],
    likes_count: 0,
  },
  {
    id: "p5",
    title: { ar: "تطبيق الطقس الذكي", fr: "App Météo Intelligente", en: "Smart Weather App" },
    short_description: {
      ar: "تطبيق طقس بتصميم داكن أنيق، توقعات ساعة بساعة ورسوم متحركة سلسة.",
      fr: "App météo au design sombre élégant, prévisions horaires et animations fluides.",
      en: "Weather app with an elegant dark design, hourly forecasts and smooth animations.",
    },
    description: {
      ar: "واجهة بسيطة وسريعة تعرض الطقس الحالي، التوقعات الساعية والأسبوعية، مع تنبيهات وموقع تلقائي.",
      fr: "Interface simple et rapide : météo actuelle, prévisions horaires et hebdomadaires, alertes et géolocalisation.",
      en: "A fast, simple interface: current weather, hourly and weekly forecasts, alerts and auto-location.",
    },
    features: {
      ar: ["توقعات ساعية وأسبوعية", "تحديد الموقع تلقائياً", "تنبيهات الطقس", "رسوم متحركة سلسة"],
      fr: ["Prévisions horaires & hebdo", "Géolocalisation automatique", "Alertes météo", "Animations fluides"],
      en: ["Hourly & weekly forecasts", "Automatic geolocation", "Weather alerts", "Smooth animations"],
    },
    year: "2025",
    cover_image_url: "assets/project-weather.png",
    project_category_links: [{ category_id: "c1" }],
    project_technologies: [
      { technologies: { name: "React Native" } },
      { technologies: { name: "REST API" } },
      { technologies: { name: "Animation" } },
    ],
    project_media: [{ url: "assets/project-weather.png", media_type: "image", is_cover: true, sort_order: 0 }],
    likes_count: 0,
  },
];

/* ---- Inject into the page when Supabase isn't configured ---- */
(function useLocalData() {
  if (typeof sbClient !== "undefined" && sbClient) return; // real backend wins
  if (typeof DYN === "undefined") return;

  DYN.categories = AUTODEV_CATEGORIES;
  DYN.projects = AUTODEV_PROJECTS;

  const paint = () => {
    try { paintProjects(); } catch (e) { console.warn(e); }
    document.dispatchEvent(new CustomEvent("portfolio-data-loaded", {
      detail: { projects: AUTODEV_PROJECTS, services: [] },
    }));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", paint);
  } else {
    paint();
  }

  // Re-render project cards when the visitor switches language
  document.addEventListener("language-changed", () => { try { paintProjects(); } catch (e) {} });
})();
