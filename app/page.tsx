"use client";

import { useState, useEffect, useRef, FormEvent, MouseEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Award, BookOpen, Code2, GraduationCap, Briefcase, ExternalLink, Menu, X, Plus, Lock, Trash2, Sparkles,
} from "lucide-react";
import Image from "next/image";
const imageMyself = "/image.png"; // просто строка-путь, не импортimport Image from "next/image";
const img2  ="/ibrohimmmm.jpg"
// ============================================
// TYPES
// ============================================

interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  link: string;
  isCustom: boolean;
}

interface ExperienceItem {
  role: string;
  place: string;
  period: string;
  description: string;
  icon: "briefcase" | "graduation";
}

interface CertificateGroup {
  category: string;
  icon: "book" | "award" | "code";
  items: string[];
}

interface ToastState {
  type: "success" | "error";
  message: string;
}

interface ProjectForm {
  title: string;
  description: string;
  link: string;
  stack: string;
  image: string;
  code: string;
}

interface NavLink {
  label: string;
  href: string;
}

// ============================================
// SOCIAL ICONS
// ============================================

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.2.66.79.55C20.71 21.38 24 17.07 24 12 24 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9a3.75 3.75 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.14 1.39A5.9 5.9 0 0 0 .61 4.16C.31 4.92.11 5.79.05 7.07.01 8.35 0 8.76 0 12s.01 3.65.07 4.93c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.14.67.67 1.35 1.08 2.14 1.39.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.93.07s3.65-.01 4.93-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.14-1.39 5.9 5.9 0 0 0 1.39-2.14c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.93s-.01-3.65-.07-4.93c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.14A5.9 5.9 0 0 0 19.84.63c-.76-.3-1.63-.5-2.91-.56C15.65.01 15.24 0 12 0Z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM18.41 4.6a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  );
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.57 8.16-1.79 8.45c-.13.6-.49.75-1 .47l-2.75-2.03-1.33 1.28c-.15.15-.27.27-.56.27l.2-2.83 5.15-4.65c.22-.2-.05-.31-.35-.11l-6.37 4.01-2.74-.86c-.6-.19-.61-.6.12-.88l10.71-4.13c.5-.18.94.11.78.86Z" />
    </svg>
  );
}

// ============================================
// DATA
// ============================================

const PERSONAL_INFO = {
  fullName: "Mukhtorov Ibrohim",
  role: "Frontend Developer",
  tagline:
    "Building clean, modern interfaces — on my way to becoming a Fullstack Developer.",
  age: 17,
  country: "Tajikistan",
  city: "Dushanbe",
  email: "mukhtorovibrohim209@gmail.com",
  phone: "+992 944337373",
  telegram: "https://t.me/your_telegram_username",
  github: "https://github.com/your_github_username",
  linkedin: "https://linkedin.com/in/your_linkedin_username",
  instagram: "https://instagram.com/m.ibrohim_o1",
};

const ABOUT_TEXT =
  "I'm a self-taught frontend developer from Dushanbe, Tajikistan, currently finishing high school and preparing to study IT/Programming at university. I started learning programming in October 2025, and in about 9–10 months I've gone from the fundamentals of C++ to building full production-style applications with React, TypeScript, and Next.js — including their backend logic. My goal is to become a strong Fullstack Developer.";

const SKILLS: Record<string, string[]> = {
  Languages: ["C++", "JavaScript", "TypeScript", "HTML", "CSS"],
  Frameworks: ["React", "Next.js", "Redux", "Zustand", "Jotai"],
  Styling: ["Tailwind CSS", "Chakra UI", "MUI", "shadcn/ui", "Framer Motion"],
  Tools: ["Git", "GitHub", "Figma", "Swagger", "Axios"],
  Forms: ["Formik", "React Hook Form", "Yup"],
  Other: ["Swiper", "Lucide Icons", "Sonner", "i18n (next-intl)"],
};

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Tutor",
    place: "GEO_Delta Learning Center",
    period: "2025",
    description:
      "Taught English at Beginner through Intermediate levels while holding an Upper-Intermediate proficiency myself. Joined after volunteering, when my former teacher opened this center.",
    icon: "briefcase",
  },
  {
    role: "Volunteer",
    place: "Intellect Learning Center",
    period: "2025",
    description:
      "Volunteered as part of the English learning community, supporting students and gaining early teaching experience.",
    icon: "briefcase",
  },
  {
    role: "Student",
    place: "Softclub Academy",
    period: "2025 — Present",
    description:
      "Studying programming fundamentals and modern frontend development, from C++ basics to full React/Next.js applications.",
    icon: "graduation",
  },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Workspace",
    description:
      "A project/task management platform (inspired by Plane/Linear) with role-based access — leaders assign tasks, workers complete them and move them through a Kanban-style workflow. Full backend included.",
    stack: ["React", "TypeScript", "Tailwind", "Zustand"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    link: "#",
    isCustom: false,
  },
  {
    id: "p2",
    title: "FastCard",
    description:
      "An e-commerce frontend rebuilt across three iterations — JavaScript, then JSX, then fully migrated to TypeScript — refining architecture and UI each time.",
    stack: ["React", "TypeScript", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    link: "#",
    isCustom: false,
  },
  {
    id: "p3",
    title: "PowerTime",
    description:
      "A calculator application for radio stations, focused on precise, practical calculations behind a clean single-page interface.",
    stack: ["React", "TypeScript", "Vite"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    link: "#",
    isCustom: false,
  },
  {
    id: "p4",
    title: "LinkedIn Clone",
    description:
      "A full-featured clone of LinkedIn's core UI and functionality, built with complete backend integration.",
    stack: ["React", "TypeScript", "Backend"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    link: "#",
    isCustom: false,
  },
  {
    id: "p5",
    title: "Debt Management System",
    description:
      "A debt-tracking application (DebtFlow) for managing folders, contacts, debts, and payments — redesigned end-to-end for a premium UI.",
    stack: ["React", "TypeScript", "Zustand", "React Hook Form"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    link: "#",
    isCustom: false,
  },
];

const CERTIFICATES: CertificateGroup[] = [
  {
    category: "English Certificates",
    icon: "book",
    items: [
      "Beginner",
      "Elementary",
      "Pre-Intermediate",
      "Intermediate",
      "Upper-Intermediate",
      "Advanced",
    ],
  },
  {
    category: "Olympiad Awards",
    icon: "award",
    items: [
      "1st Place — School English Olympiad",
      "2nd Place — District (Nohiya) English Olympiad",
      "3rd Place — City English Olympiad",
    ],
  },
  {
    category: "Programming Achievements",
    icon: "code",
    items: [
      "Completed C++ fundamentals",
      "Completed HTML/CSS, JavaScript, TypeScript",
      "Completed React — currently mastering Next.js",
    ],
  },
];

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const SECRET_CODE = "ibrohimjon2009";

// ============================================
// 3D TILT CARD WRAPPER
// ============================================

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{ transform: string }>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transition: "transform 0.2s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}

// ============================================
// SECTION WRAPPER
// ============================================

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center mb-12"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    description: "",
    link: "",
    stack: "",
    image: "",
    code: "",
  });

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.code !== SECRET_CODE) {
      setToast({
        type: "error",
        message: "Invalid access code. Only the owner can add projects.",
      });
      return;
    }
    if (!form.title || !form.description) {
      setToast({
        type: "error",
        message: "Please fill in the title and description.",
      });
      return;
    }

    const newProject: Project = {
      id: `custom-${Date.now()}`,
      title: form.title,
      description: form.description,
      stack: form.stack
        ? form.stack.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      image:
        form.image ||
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      link: form.link || "#",
      isCustom: true,
    };

    setProjects((prev) => [newProject, ...prev]);
    setForm({ title: "", description: "", link: "", stack: "", image: "", code: "" });
    setModalOpen(false);
    setToast({ type: "success", message: "Project added successfully!" });
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setToast({ type: "success", message: "Project removed." });
  };

  const contactLinks = [
    { icon: <Mail size={18} />, label: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: <Phone size={18} />, label: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
    { icon: <TelegramIcon size={18} />, label: "Telegram", href: PERSONAL_INFO.telegram },
    { icon: <GithubIcon size={18} />, label: "GitHub", href: PERSONAL_INFO.github },
    { icon: <LinkedinIcon size={18} />, label: "LinkedIn", href: PERSONAL_INFO.linkedin },
    { icon: <InstagramIcon size={18} />, label: "Instagram", href: PERSONAL_INFO.instagram },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-5 left-1/2 z-[100] px-5 py-3 rounded-xl border backdrop-blur-xl shadow-lg text-sm font-medium ${
              toast.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0b1120]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-extrabold text-lg bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            MI
          </span>

          <nav className="hidden md:flex gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-slate-300"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-400 hover:text-emerald-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-40 h-40 mx-auto mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 blur-md opacity-40 animate-pulse-slow" />
          <div className="relative w-full h-full rounded-full bg-white/5 border-2 border-emerald-400/30 overflow-hidden">
            <Image src={imageMyself} alt="Profile" width={160} height={160} className="rounded-full object-cover" />

          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          {PERSONAL_INFO.fullName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-emerald-400 font-semibold text-lg"
        >
          {PERSONAL_INFO.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-slate-400 max-w-lg mx-auto"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {PERSONAL_INFO.city}, {PERSONAL_INFO.country}
          </span>
          <span>Age {PERSONAL_INFO.age}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-[#0b1120] font-semibold hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors duration-300"
          >
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex justify-center gap-5 text-slate-400"
        >
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
          >
            <GithubIcon />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
          >
            <LinkedinIcon />
          </a>
          <a
            href={PERSONAL_INFO.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
          >
            <InstagramIcon />
          </a>
          <a
            href={PERSONAL_INFO.telegram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
          >
            <TelegramIcon />
          </a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About Me">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-48 h-56 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0"
          >
            <Image src = {img2} alt="About" width={192} height={224} className="rounded-2xl" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-slate-400 leading-relaxed"
          >
            {ABOUT_TEXT}
          </motion.p>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <TiltCard className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-emerald-400/30">
                <h3 className="text-emerald-400 font-semibold mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience & Education">
        <div className="flex flex-col gap-5 max-w-2xl mx-auto">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={`${exp.role}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-emerald-400/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                {exp.icon === "briefcase" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-2 justify-between">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-xs text-slate-500">{exp.period}</span>
                </div>
                <p className="text-emerald-400 text-sm mt-0.5">{exp.place}</p>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors duration-300 text-sm font-medium"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <TiltCard className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-400/30">
                {project.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-44 w-full overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </a>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.isCustom && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  {project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 text-sm hover:gap-2 transition-all duration-300"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ADD PROJECT MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#111a2e] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" /> Add New Project
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Project title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                />
                <textarea
                  placeholder="Project description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors resize-none"
                />
                <input
                  type="text"
                  placeholder="Tech stack (comma separated)"
                  value={form.stack}
                  onChange={(e) => setForm({ ...form, stack: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Project link (optional)"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                />

                <div className="relative mt-2">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Access code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-emerald-500 text-[#0b1120] font-semibold rounded-xl py-2.5 hover:scale-[1.02] transition-transform duration-300"
                >
                  Add Project
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CERTIFICATES */}
      <Section id="certificates" title="Certificates & Achievements">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-emerald-400/30">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  {cert.icon === "book" && <BookOpen size={20} />}
                  {cert.icon === "award" && <Award size={20} />}
                  {cert.icon === "code" && <Code2 size={20} />}
                </div>
                <h3 className="font-semibold mb-3">{cert.category}</h3>
                <ul className="text-slate-400 text-sm space-y-1.5">
                  {cert.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-emerald-400">›</span> {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Get In Touch">
        <p className="text-center text-slate-400 mb-8 -mt-4">
          Open to opportunities, collaboration, and interesting conversations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contactLinks.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 hover:border-emerald-400/40 hover:-translate-y-0.5 transition-all duration-300 text-slate-300"
            >
              <span className="text-emerald-400">{c.icon}</span>
              <span className="text-sm truncate">{c.label}</span>
            </a>
          ))}
        </div>
      </Section>

      <footer className="text-center py-8 border-t border-white/5 text-slate-500 text-sm">
        © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 12s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
