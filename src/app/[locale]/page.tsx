"use client";

import { useState, useEffect, useRef, FormEvent, MouseEvent, ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Award, BookOpen, Code2, GraduationCap, Briefcase, ExternalLink, Menu, X, Plus, Lock, Trash2, Sparkles,
} from "lucide-react";
import Hero from "../../../components/Hero";
import About from "../../../components/About";
import Skills from "../../../components/Skills";
import Experience from "../../../components/Experience";
import Projects from "../../../components/Projects";
import Certificates from "../../../components/Certificates";
import Contact from "../../../components/Contact";
import SectionComponent from "../../../components/Section";
import { GithubIcon, LinkedinIcon, InstagramIcon, TelegramIcon } from "../../../components/Icons";
import { useLocale, useTranslations } from 'next-intl';
import { use } from "react";
import { usePathname, useRouter } from "@/src/i18n/navigation";
// small local assets / paths used by Hero and About
const imageMyself = "/image.png";
const img2 = "/ibrohimmmm.jpg";

// ============================================
// DATA
// ============================================
const PERSONAL_INFO = {
  fullName: "Mukhtorov Ibrohim",
  role: "Frontend Developer",
  tagline: "Building clean interfaces, animations, and delightful user experiences.",
  city: "Dushanbe",
  country: "Tajikistan",
  age: 17,
  email: "mukhtorovibrohim@gmail.com",
  phone: "+992944337373",
  github: "https://github.com/ibrohimmmmmmmmmmmmm",
  linkedin: "https://linkedin.com/in/yourhandle",
  instagram: "https://instagram.com/m.ibrohim_o1",
  telegram: "https://t.me/yourhandle",
};
const ABOUT_TEXT =
  "I'm a self-taught frontend developer from Dushanbe, Tajikistan, currently finishing high school and preparing to study IT/Programming at university. I started learning programming in October 2025, and in about 9–10 months I've gone from the fundamentals of C++ to building full production-style applications with React, TypeScript, and Next.js — including their backend logic. My goal is to become a strong Fullstack Developer.";

const SECRET_CODE = "ibrohimjon2009";

type NavLink = {
  label: string;
  href: string;
};

// TiltCard moved to components/TiltCard.tsx

// Section wrapper moved to components/Section.tsx

// ============================================
// MAIN COMPONENT
// ============================================
type Props = {
  params: Promise<{
    locale: string;
  }>;
};
export default function Portfolio({params} : Props) {
  const { locale } = use(params);
  const t = useTranslations('HomePage');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const navLinks: NavLink[] = [
    { label: t('navigation.about'), href: '#about' },
    { label: t('navigation.skills'), href: '#skills' },
    { label: t('navigation.experience'), href: '#experience' },
    { label: t('navigation.projects'), href: '#projects' },
    { label: t('navigation.certificates'), href: '#certificates' },
    { label: t('navigation.contact'), href: '#contact' },
  ];
  const aboutText = t('about.text');
  const skills: Record<string, string[]> = {
    [t('skills.categories.languages')]: ["C++", "JavaScript", "TypeScript", "HTML", "CSS"],
    [t('skills.categories.frameworks')]: ["React", "Next.js", "Redux", "Zustand", "Jotai"],
    [t('skills.categories.styling')]: ["Tailwind CSS", "Chakra UI", "MUI", "shadcn/ui", "Framer Motion"],
    [t('skills.categories.tools')]: ["Git", "GitHub", "Figma", "Swagger", "Axios"],
    [t('skills.categories.forms')]: ["Formik", "React Hook Form", "Yup"],
    [t('skills.categories.other')]: ["Swiper", "Lucide Icons", "Sonner", "i18n (next-intl)"],
  };
  const experience: ExperienceItem[] = [
    {
      role: t('experience.tutor.role'),
      place: t('experience.tutor.place'),
      period: t('experience.tutor.period'),
      description: t('experience.tutor.description'),
      icon: 'briefcase',
    },
    {
      role: t('experience.volunteer.role'),
      place: t('experience.volunteer.place'),
      period: t('experience.volunteer.period'),
      description: t('experience.volunteer.description'),
      icon: 'briefcase',
    },
    {
      role: t('experience.student.role'),
      place: t('experience.student.place'),
      period: t('experience.student.period'),
      description: t('experience.student.description'),
      icon: 'graduation',
    },
  ];
  const defaultProjects: Project[] = [
    {
      id: 'p1',
      title: t('projects.workspace.title'),
      description: t('projects.workspace.description'),
      stack: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      link: '#',
      isCustom: false,
    },
    {
      id: 'p2',
      title: t('projects.fastcard.title'),
      description: t('projects.fastcard.description'),
      stack: ['React', 'TypeScript', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      link: '#',
      isCustom: false,
    },
    {
      id: 'p3',
      title: t('projects.powertime.title'),
      description: t('projects.powertime.description'),
      stack: ['React', 'TypeScript', 'Vite'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      link: '#',
      isCustom: false,
    },
    {
      id: 'p4',
      title: t('projects.linkedin.title'),
      description: t('projects.linkedin.description'),
      stack: ['React', 'TypeScript', 'Backend'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      link: '#',
      isCustom: false,
    },
    {
      id: 'p5',
      title: t('projects.debt.title'),
      description: t('projects.debt.description'),
      stack: ['React', 'TypeScript', 'Zustand', 'React Hook Form'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      link: '#',
      isCustom: false,
    },
  ];
  const certificates: CertificateGroup[] = [
    {
      category: t('certificates.english.category'),
      icon: 'book',
      items: [
        t('certificates.english.beginner'),
        t('certificates.english.elementary'),
        t('certificates.english.preIntermediate'),
        t('certificates.english.intermediate'),
        t('certificates.english.upperIntermediate'),
        t('certificates.english.advanced'),
      ],
    },
    {
      category: t('certificates.olympiad.category'),
      icon: 'award',
      items: [
        t('certificates.olympiad.first'),
        t('certificates.olympiad.second'),
        t('certificates.olympiad.third'),
      ],
    },
    {
      category: t('certificates.programming.category'),
      icon: 'code',
      items: [
        t('certificates.programming.first'),
        t('certificates.programming.second'),
        t('certificates.programming.third'),
      ],
    },
  ];
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [actionMode, setActionMode] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

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

  const resetProjectModal = () => {
    setActionMode(null);
    setActiveProjectId(null);
    setForm({ title: "", description: "", link: "", stack: "", image: "", code: "" });
    setModalOpen(false);
  };

  const openAddModal = () => {
    setActionMode('add');
    setActiveProjectId(null);
    setForm({ title: "", description: "", link: "", stack: "", image: "", code: "" });
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setActionMode('edit');
    setActiveProjectId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      link: project.link,
      stack: project.stack.join(", "),
      image: project.image,
      code: "",
    });
    setModalOpen(true);
  };

  const openDeleteModal = (project: Project) => {
    setActionMode('delete');
    setActiveProjectId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      link: project.link,
      stack: project.stack.join(", "),
      image: project.image,
      code: "",
    });
    setModalOpen(true);
  };

  const handleProjectSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.code !== SECRET_CODE) {
      setToast({ type: "error", message: t('toast.invalidCode') });
      return;
    }

    if (actionMode === 'delete' && activeProjectId) {
      setProjects((prev) => prev.filter((project) => project.id !== activeProjectId));
      setToast({ type: "success", message: t('toast.projectRemoved') });
      resetProjectModal();
      return;
    }

    if (!form.title || !form.description) {
      setToast({ type: "error", message: t('toast.fillRequired') });
      return;
    }

    if (actionMode === 'edit' && activeProjectId) {
      setProjects((prev) => prev.map((project) => project.id === activeProjectId ? {
        ...project,
        title: form.title,
        description: form.description,
        stack: form.stack ? form.stack.split(",").map((s) => s.trim()).filter(Boolean) : [],
        image: form.image || project.image,
        link: form.link || project.link,
        isCustom: project.isCustom,
      } : project));
      setToast({ type: "success", message: t('toast.projectEdited') });
    } else {
      const newProject: Project = {
        id: `custom-${Date.now()}`,
        title: form.title,
        description: form.description,
        stack: form.stack ? form.stack.split(",").map((s) => s.trim()).filter(Boolean) : [],
        image: form.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        link: form.link || "#",
        isCustom: true,
      };
      setProjects((prev) => [newProject, ...prev]);
      setToast({ type: "success", message: t('toast.projectAdded') });
    }

    resetProjectModal();
  };

  const handleDeleteProject = (project: Project) => {
    openDeleteModal(project);
  };

  const contactLinks = [
    { icon: <Mail size={18} />, label: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: <Phone size={18} />, label: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
    { icon: <TelegramIcon size={18} />, label: "Telegram", href: PERSONAL_INFO.telegram },
    { icon: <GithubIcon size={18} />, label: "GitHub", href: PERSONAL_INFO.github },
    { icon: <LinkedinIcon size={18} />, label: "LinkedIn", href: PERSONAL_INFO.linkedin },
    { icon: <InstagramIcon size={18} />, label: "Instagram", href: PERSONAL_INFO.instagram },
  ];

  // scroll-driven motion values for parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, -160]);
  const bubbleY = useTransform(scrollY, [0, 700], [0, 24]);

  const nameContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };
  const charVariant = {
    hidden: { opacity: 0, y: 10, rotateX: -8 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 240, damping: 20 } },
  };

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={currentLocale}
                onChange={(event) => router.replace(pathname, { locale: event.target.value })}
                className="appearance-none rounded-full border border-white/10 bg-white/5 px-3 py-2 pr-8 text-sm text-slate-200 shadow-sm outline-none transition hover:border-emerald-400/50 focus:border-emerald-400"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">⌄</span>
            </div>
            <button
              type="button"
              className="md:hidden text-slate-300"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
                {navLinks.map((link) => (
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

      <Hero personalInfo={PERSONAL_INFO} imageMyself={imageMyself} />

      <SectionComponent id="about" title={t('sections.about')}>
        <About aboutText={aboutText} img2={img2} />
      </SectionComponent>
      <SectionComponent id="experience" title={t('sections.experience')}>
        <Experience experience={experience} />
      </SectionComponent>

      <SectionComponent id="skills" title={t('sections.skills')}>
        <Skills skills={skills} />
      </SectionComponent>

      <SectionComponent id="projects" title={t('sections.projects')}>
        <Projects projects={projects} onDelete={handleDeleteProject} openModal={openAddModal} onEdit={openEditModal} />
      </SectionComponent>

      {/* ADD PROJECT MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={resetProjectModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md border border-white/10 rounded-3xl bg-[#0f172a]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" /> {actionMode === 'delete' ? 'Delete Project' : actionMode === 'edit' ? 'Edit Project' : t('modal.title')}
                </h3>
                <button
                  type="button"
                  onClick={resetProjectModal}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="flex flex-col gap-3">
                {actionMode !== 'delete' && (
                  <>
                    <input
                      type="text"
                      placeholder={t('modal.projectTitle')}
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                    />
                    <textarea
                      placeholder={t('modal.projectDescription')}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors resize-none"
                    />
                    <input
                      type="text"
                      placeholder={t('modal.techStack')}
                      value={form.stack}
                      onChange={(e) => setForm({ ...form, stack: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={t('modal.projectLink')}
                      value={form.link}
                      onChange={(e) => setForm({ ...form, link: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={t('modal.imageUrl')}
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                    />
                  </>
                )}

                {actionMode === 'delete' && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                    <p className="font-medium">This action will permanently remove the selected project.</p>
                    <p className="mt-1 text-red-100/80">Enter the owner code to confirm.</p>
                  </div>
                )}

                <div className="relative mt-2">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder={t('modal.accessCode')}
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-400/50 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 rounded-xl bg-emerald-500 py-2.5 font-semibold text-[#0b1120] transition-transform duration-300 hover:scale-[1.02]"
                >
                  {actionMode === 'delete' ? 'Delete Project' : actionMode === 'edit' ? 'Save Changes' : t('modal.submit')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SectionComponent id="certificates" title={t('sections.certificates')}>
        <Certificates certificates={certificates} />
      </SectionComponent>

      <SectionComponent id="contact" title={t('sections.contact')}>
        <Contact contactLinks={contactLinks} />
      </SectionComponent>

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

        .gradient-glow {
          background: linear-gradient(90deg, #34d399, #06b6d4, #7c3aed, #fb7185);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 6s linear infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes wave {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .wave-letter { display: inline-block; animation: wave 1.6s ease-in-out infinite; }
        .wave-letter:nth-child(odd) { animation-delay: 0.12s; }

        @keyframes sine {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px) rotate(-1deg); }
          100% { transform: translateY(0); }
        }
        .sine-float { animation: sine 6s ease-in-out infinite; }

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
