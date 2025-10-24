// src/components/Portfolio.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaExternalLinkAlt,
  FaDownload,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGithubSquare,
} from "react-icons/fa";
import { SiJavascript, SiTensorflow, SiFigma, SiBootstrap } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";

/* ---------- DATA (unchanged) ---------- */
const projects = [
  {
    id: 1,
    title: "AgroAI – Plant Disease Detection",
    description:
      "ML-based app detects plant diseases from leaf images and provides treatment & fertilizer suggestions.",
    tech: ["Python", "TensorFlow", "Flask", "React.js", "MySQL"],
    github: "https://github.com/Shirkesneha22/Plant-disease-web-application",
    live: "#",
    img: "https://bizclik-cms-prod.s3.eu-west-2.amazonaws.com/images/404no22rkhc9854c101120203432.jpeg",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "Modern portfolio showcasing skills, projects, and contact details. Responsive + SEO optimized.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: "https://github.com/Shirkesneha22",
    live: "https://snehashirke.netlify.app/",
    img: "Portfolio.png",
  },
  {
    id: 3,
    title: "Tours & Travels Website",
    description:
      "Responsive travel booking site with package galleries, itineraries, and user login/signup (MySQL).",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    github: "https://github.com/Shirkesneha22/Swarali---Tours-Travels",
    live: "https://swarali-cabsevices.netlify.app/",
    img: "tourist.png",
  },
  {
    id: 4,
    title: "To-Do List App",
    description:
      "Task manager to add/edit/complete/delete tasks with data persistence using Local Storage.",
    tech: ["React.js", "JavaScript", "CSS"],
    github: "https://github.com/Shirkesneha22/react-todo-app",
    live: "https://to-do-list-wb.netlify.app/",
    img: "http://www.clipartbest.com/cliparts/di7/Lgd/di7Lgd4xT.png",
  },
  {
    id: 5,
    title: "Quiz App",
    description:
      "Interactive quiz app with multiple-choice questions, score tracking and responsive UI.",
    tech: ["React.js", "JavaScript", "CSS"],
    github: "https://github.com/Shirkesneha22/my-quiz-app",
    live: "https://quizhackers.netlify.app/",
    img: "quiz.png",
  },
];

const skillGroups = [
  {
    group: "Frontend",
    items: [
      { name: "React.js", level: 90, Icon: FaReact },
      { name: "JavaScript (ES6+)", level: 88, Icon: SiJavascript },
      { name: "HTML5", level: 95, Icon: FaHtml5 },
      { name: "CSS3 / SCSS / Tailwind", level: 90, Icon: FaCss3Alt },
    ],
  },
  {
    group: "Backend & DB",
    items: [
      { name: "MySQL / PHP", level: 75, Icon: FaGithubSquare },
      { name: "REST APIs", level: 80, Icon: FaGithubSquare },
      { name: "Python", level: 80, Icon: FaPython },
    ],
  },
  {
    group: "ML & Tools",
    items: [
      { name: "TensorFlow / Keras", level: 70, Icon: SiTensorflow },
      { name: "Git & GitHub", level: 85, Icon: FaGithubSquare },
      { name: "CI/CD, Netlify", level: 70, Icon: SiBootstrap },
    ],
  },
  {
    group: "Design",
    items: [
      { name: "Figma", level: 70, Icon: SiFigma },
      { name: "UI/UX & Prototyping", level: 75, Icon: MdDesignServices },
    ],
  },
];

const experience = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Nearby Rooms, Pune",
    period: "Feb 2025 – Jul 2025",
    details: `Delivered front-end solutions using React, Redux, HTML, CSS. Collaborated on REST API integration and participated in code reviews.`,
  },
  {
    id: 2,
    role: "Freelance Developer",
    company: "Client Projects",
    period: "Sep 2024 – Present",
    details: "Built landing pages and small web apps for clients; handled deployments and version control.",
  },
];

const publications = [
  {
    id: 1,
    title:
      "AI-Driven Plant Disease Diagnosis: A Deep Learning Approach to Precision Agriculture",
    authors: "Sneha Balu Shirke, Prof. B.B. Deshmukh",
    venue: "IRE Journals, Volume 8, Issue 11, May 2025",
    issn: "2456-8880",
  },
  {
    id: 2,
    title:
      "Review Paper: AI-Driven Plant Disease Diagnosis – A Deep Learning Approach in Precision Agriculture",
    authors: "Sneha Shirke, Prof. B.B. Deshmukh",
    venue: "IRE Journals, Volume 2, Issue 9, March 2019",
    issn: "2456-8880",
  },
];

const CONTACT = {
  name: "Sneha Balu Shirke",
  title: "Software Developer",
  location: "Pune, India",
  email: "snehashirke221@gmail.com",
  phone: "+91 7888 076 881",
  linkedin: "https://www.linkedin.com/in/sneha-shirke-1b060428a/",
  portfolio: "https://snehashirke.netlify.app/",
  resumePath: "/Sneha-Shirke-Resume.pdf",
};

const TYPE_PHRASES = [
  "Software Developer",
  "ReactJS Developer",
  "UI/UX Designer",
  "Web Designer / Freelancer",
];

/* ---------- NEW: achievements data ---------- */
/* Put the certificate image at public/certificates/hackerrank-sql-basic.png */
const achievements = [
  {
    id: "hr-sql-basic-2025",
    title: "SQL (Basic)",
    issuer: "HackerRank",
    date: "22 Sep, 2025",
    image: "/certificates/hackerrank-sql-basic.png", // add this file in public/
    url: "https://www.hackerrank.com/certificates/50bc897a8f54",
    description: "HackerRank Skill Certification — SQL (Basic)",
  },
];

export default function Portfolio() {
  const formRef = useRef(null);
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // Typewriter
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [active, setActive] = useState("home");
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  // NEW: menuOpen for mobile hamburger
  const [menuOpen, setMenuOpen] = useState(false);

  // Inject CSS (updated to include achievements)
  useEffect(() => {
    const id = "portfolio-inline-styles-fixed-contact";
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      :root{
        --bg:#071023;
        --card:#0f1728;
        --text:#e6eef8;
        --muted:#9aa6b2;
        --accent:#7c9bff;
      }
      /* Light fallback variables for pages not in dark mode */
      html:not(.dark) {
        --bg:#f7f7fb;
        --card:#ffffff;
        --text:#0f1724;
        --muted:#6b7280;
        --accent:#4f46e5;
      }

      html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial}
      /* top padding so sticky nav doesn't overlap hero on mobile */
      .container{max-width:1100px;margin:0 auto;padding:80px 20px 20px} 

      /* NAV */
      .site-nav{position:fixed;left:0;right:0;top:0;background:linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0));backdrop-filter:blur(6px);display:flex;justify-content:space-between;align-items:center;padding:10px 20px;z-index:150;border-bottom:1px solid rgba(255,255,255,0.02)}
      .brand{font-weight:700;font-size:18px}
      .nav-links{display:flex;gap:6px;align-items:center}
      .nav-links a{margin-left:12px;color:var(--text);text-decoration:none;padding:6px 8px;border-radius:8px}
      .nav-links a.active{background:rgba(124,155,255,0.12);color:var(--accent)}
      .icon-btn{background:transparent;border:0;cursor:pointer;padding:8px;border-radius:8px;color:var(--text);font-size:18px}

      /* mobile hamburger */
      .hamburger{display:none;background:transparent;border:0;font-size:22px;color:var(--text);padding:8px;border-radius:8px}
      .mobile-nav{display:none}
      @media (max-width: 980px) {
        .nav-links{display:none}
        .hamburger{display:inline-flex}
        .mobile-nav{display:flex;flex-direction:column;gap:10px;position:absolute;right:12px;top:58px;background:var(--card);padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.04);box-shadow:0 12px 36px rgba(2,6,23,0.12)}
      }

      .section{padding:48px 0}
      .hero{display:grid;grid-template-columns:1fr 360px;gap:22px;align-items:center;min-height:56vh}
      @media(max-width:980px){.hero{grid-template-columns:1fr}.hero-card{order:2}} /* ensure hero-card sits below content on mobile */
      .hero-left{display:flex;gap:20px;align-items:flex-start}
      /* center hero content on small screens */
      @media(max-width:980px){
        .hero-left{flex-direction:column;align-items:center;text-align:center;gap:12px}
        .hero-ctas{flex-direction:column;width:100%;align-items:center}
        .hero-ctas .btn{width:88%;max-width:320px}
      }

      /* ===== AVATAR VIDEO WRAPPER ===== */
      .avatar-wrap {
        width: 120px;
        height: 120px;
        border-radius: 999px;
        overflow: hidden;
        display: inline-block;
        position: relative;
        flex-shrink: 0;
        box-shadow: 0 10px 30px rgba(2,6,23,0.12);
        background: radial-gradient(circle at 30% 20%, rgba(124,155,255,0.12), rgba(0,0,0,0.03));
        border: 4px solid rgba(255,255,255,0.06);
        cursor: pointer;
      }
      .avatar-wrap video.avatar-video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center center;
        display: block;
        background: var(--card);
      }
      @media(min-width: 1100px){
        .avatar-wrap { width: 140px; height: 140px; }
      }

      .modal-content .modal-video {
        width: 100%;
        height: auto;
        max-width: 820px;
        border-radius: 14px;
        display:block;
        background: var(--card);
        box-shadow: 0 30px 80px rgba(2,6,23,0.5);
      }

      .avatar-circle{ display:none; }

      .accent{color:var(--accent)}
      .hero-title{font-size:34px;line-height:1.02;margin:0;font-weight:800}
      .role-type{color:var(--accent);font-weight:800}
      .cursor{display:inline-block;width:10px;margin-left:6px;animation:blink 1s steps(2,end) infinite}
      @keyframes blink{50%{opacity:0}}
      .hero-sub{color:var(--muted);margin-top:12px;max-width:640px}
      .socials{display:flex;gap:10px;margin:14px 0}
      .socials a{width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;color:var(--text);text-decoration:none}
      .hero-ctas{display:flex;gap:10px;margin-top:12px}
      .btn{padding:10px 14px;border-radius:10px;text-decoration:none;cursor:pointer;font-weight:600}
      .btn-primary{background:var(--accent);color:white;border:0}
      .btn-outline{border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--text)}

      .card{background:var(--card);border-radius:14px;padding:16px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 8px 18px rgba(2,6,23,0.12)}
      .skills-grid{display:flex;gap:18px;margin-top:14px;flex-wrap:wrap}
      .skill-group{min-width:200px;flex:1}
      .skill-item{display:flex;gap:12px;align-items:center;margin-bottom:12px}
      .skill-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:8px;background:rgba(255,255,255,0.02)}
      .skill-name{font-weight:700}
      .skill-meter{height:8px;border-radius:6px;background:rgba(255,255,255,0.02);width:100%;overflow:hidden;margin-top:6px}
      .skill-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--accent),#7c9bff);transition:width .8s ease}

      /* Projects */
      .projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px}
      @media(max-width:980px){.projects-grid{grid-template-columns:1fr}}
      .project-card{background:var(--card);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s}
      .project-thumb{width:100%;height:160px;object-fit:cover;background:#e2e8f0}
      @media(max-width:520px){ .project-thumb{height:220px} .project-card{box-shadow:0 8px 18px rgba(2,6,23,0.08)} }
      .project-body{padding:14px;display:flex;flex-direction:column;gap:8px;flex:1}
      .project-title{font-size:18px;margin:0;font-weight:700}
      .project-desc{color:var(--muted);margin:0;font-size:14px}
      .tech-badge{font-size:12px;padding:6px 8px;border-radius:8px;background:rgba(255,255,255,0.02);margin-right:6px;display:inline-block;color:var(--text)}
      .project-links{margin-top:auto;display:flex;gap:12px;align-items:center}

      /* Timeline */
      .timeline{display:flex;flex-direction:column;gap:14px;margin-top:12px}
      .timeline-item{display:flex;gap:12px;align-items:flex-start}
      .timeline-dot{width:12px;height:12px;border-radius:50%;background:var(--accent);margin-top:8px}
      .timeline-body{flex:1}
      .timeline-head{display:flex;justify-content:space-between;align-items:center;gap:12px}
      .timeline-period{color:var(--muted);font-size:13px}
      .muted{color:var(--muted)}

      /* ===== ACHIEVEMENTS ===== */
      .achievements-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px}
      @media(max-width:980px){ .achievements-grid{grid-template-columns:1fr} }
      .cert-card{background:linear-gradient(180deg,var(--card), rgba(255,255,255,0.02));border-radius:12px;padding:12px;display:flex;gap:12px;align-items:center;border:1px solid rgba(255,255,255,0.04)}
      .cert-thumb{width:120px;height:80px;object-fit:cover;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:#fff}
      .cert-meta{flex:1;display:flex;flex-direction:column;gap:6px}
      .cert-title{font-weight:700}
      .cert-issuer{color:var(--muted);font-size:13px}
      .cert-actions{display:flex;gap:8px;align-items:center}
      .cert-link{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:var(--text);text-decoration:none}

      /* Contact: FIXED LAYOUT */
      .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px}
      @media(max-width:980px){.contact-grid{grid-template-columns:1fr}}
      .contact-form{display:flex;flex-direction:column;gap:12px;padding:16px;border-radius:12px;background:var(--card);border:1px solid rgba(255,255,255,0.03)}
      .contact-form input, .contact-form textarea{
        display:block;
        width:100%;
        box-sizing:border-box;
        padding:12px;
        border-radius:10px;
        border:1px solid rgba(255,255,255,0.06);
        background:transparent;
        color:var(--text);
        resize:vertical;
      }

      /* Placeholder visibility for light mode & dark mode */
      html:not(.dark) .contact-form input::placeholder,
      html:not(.dark) .contact-form textarea::placeholder {
        color: var(--muted);
        opacity: 1;
      }
      html.dark .contact-form input::placeholder,
      html.dark .contact-form textarea::placeholder {
        color: rgba(230,238,248,0.45);
        opacity: 1;
      }

      .form-actions{display:flex;justify-content:flex-start;margin-top:6px}
      @media(max-width:520px){ .form-actions{justify-content:center} .form-actions .btn{width:92%} }

      .contact-info .contact-socials{display:flex;gap:10px;margin-top:12px}
      .contact-socials a{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);text-decoration:none;color:var(--text)}
      .contact-socials a svg{margin-right:6px}

      footer.footer{text-align:center;margin-top:20px;color:var(--muted);padding:10px 0;font-size:14px}
      @media(max-width:520px){.hero-title{font-size:28px} .container{padding:80px 12px 18px}}
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = ["home", "achievements", "projects", "skills", "experience", "contact", "publications"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  };

  // Contact send (mailto fallback)
  const handleContact = (e) => {
    e.preventDefault();
    const f = formRef.current;
    if (f) {
      const name = f.elements["name"].value;
      const email = f.elements["email"].value;
      const message = f.elements["message"].value;
      const subject = `Portfolio contact from ${name}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;
    }
  };

  // Typewriter (1.5s pause)
  useEffect(() => {
    let timer;
    const current = TYPE_PHRASES[phraseIndex % TYPE_PHRASES.length];
    if (!isDeleting && charIndex <= current.length) {
      setDisplayText(current.substring(0, charIndex));
      timer = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex > current.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex >= 0) {
      setDisplayText(current.substring(0, charIndex));
      timer = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPE_PHRASES.length);
      setCharIndex(0);
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    if (charIndex === 0 && !isDeleting) setCharIndex(1);
    // eslint-disable-next-line
  }, []);

  // close avatar modal on Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsAvatarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectionVariant = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

  // Helper: close mobile menu when navigating
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="container">
      <header className="site-nav" role="navigation" aria-label="Main navigation">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="brand">{CONTACT.name}</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{CONTACT.title} — {CONTACT.location}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Desktop nav */}
          <nav className="nav-links" aria-label="Page sections">
            <a href="#home" className={active === "home" ? "active" : ""}>Home</a>
            <a href="#achievements" className={active === "achievements" ? "active" : ""}>Achievements</a>
            <a href="#projects" className={active === "projects" ? "active" : ""}>Projects</a>
            <a href="#skills" className={active === "skills" ? "active" : ""}>Skills</a>
            <a href="#experience" className={active === "experience" ? "active" : ""}>Experience</a>
            <a href="#contact" className={active === "contact" ? "active" : ""}>Contact</a>
            <a href="#publications" className={active === "publications" ? "active" : ""}>Publications</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((s) => !s)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* mobile nav panel */}
          {menuOpen && (
            <nav className="mobile-nav" aria-label="Mobile sections">
              <a href="#home" onClick={handleNavClick}>Home</a>
              <a href="#achievements" onClick={handleNavClick}>Achievements</a>
              <a href="#projects" onClick={handleNavClick}>Projects</a>
              <a href="#skills" onClick={handleNavClick}>Skills</a>
              <a href="#experience" onClick={handleNavClick}>Experience</a>
              <a href="#contact" onClick={handleNavClick}>Contact</a>
              <a href="#publications" onClick={handleNavClick}>Publications</a>
            </nav>
          )}

          <a href={CONTACT.resumePath} className="btn btn-outline" download style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <FaDownload /> Resume
          </a>

          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <motion.section id="home" className="hero section" initial="hidden" animate="visible" variants={sectionVariant} transition={{ duration: 0.6 }}>
        <div className="hero-left">

          {/* avatar video wrapper */}
          <div
            className="avatar-wrap"
            onClick={() => setIsAvatarOpen(true)}
            role="button"
            aria-label="Open avatar preview"
            title="Click to enlarge avatar"
          >
            <video
              src="/avatar-video.mp4"
              className="avatar-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/avatar-poster.png"
            />
          </div>

          <div>
            <h1 className="hero-title">
              Hi, I'm <span className="accent">{CONTACT.name.split(" ")[0]}</span>
              <br />
              <span>
                <span className="role-type">{displayText}</span>
                <span className="cursor">|</span>
              </span>
            </h1>

            <p className="hero-sub">I build responsive, user-friendly web apps using React, with experience in ML-backed solutions.</p>

            <div className="socials" aria-hidden>
              <a href={projects[1].github} title="GitHub" aria-label="GitHub" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href={CONTACT.linkedin} title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href={`mailto:${CONTACT.email}`} title="Email" aria-label="Email"><FaEnvelope /></a>
            </div>

            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href={CONTACT.resumePath} className="btn btn-outline" download>Download Resume</a>
            </div>
          </div>
        </div>

        <motion.div className="hero-card card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 220 }}>
          <h3 style={{ margin: 0 }}>Quick Highlights</h3>
          <ul style={{ marginTop: 10, paddingLeft: 18 }}>
            <li>Frontend: React.js, JavaScript, HTML/CSS</li>
            <li>ML: TensorFlow, Python (AgroAI project)</li>
            <li>Tools: Git, Netlify, CI/CD</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* avatar modal */}
      {isAvatarOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setIsAvatarOpen(false)} style={{position:'fixed',inset:0,display:'grid',placeItems:'center',background:'rgba(2,6,23,0.6)',zIndex:200}}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth:900, width:"92%", padding:18}}>
            <video
              src="/avatar-video.mp4"
              className="modal-video"
              autoPlay
              loop
              muted
              controls
              playsInline
              style={{ width: "100%", borderRadius: 14, display: "block" }}
              poster="/avatar-poster.png"
            />
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS */}
      <motion.section id="achievements" className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.5 }}>
        <h2 style={{ margin: 0 }}>Achievements</h2>
        <div className="achievements-grid" style={{ marginTop: 12 }}>
          {achievements.map((a) => (
            <div className="cert-card" key={a.id}>
              <img src=(.) alt={a.title + " certificate"} className="cert-thumb" />
              <div className="cert-meta">
                <div className="cert-title">{a.title}</div>
                <div className="cert-issuer">{a.issuer} • <span className="muted">{a.date}</span></div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{a.description}</div>
                <div className="cert-actions">
                  <a className="cert-link" href={a.url} target="_blank" rel="noreferrer">
                    View Certificate <FaExternalLinkAlt style={{ width: 12 }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section id="skills" className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.5 }}>
        <h2 style={{ margin: 0 }}>Skills</h2>
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div className="skill-group" key={g.group}>
              <h4 style={{ margin: "0 0 10px 0" }}>{g.group}</h4>
              {g.items.map((it) => {
                const Icon = it.Icon;
                return (
                  <div key={it.name} className="skill-item">
                    <div className="skill-icon" aria-hidden><Icon /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div className="skill-name">{it.name}</div>
                        <div style={{ fontSize: 13, color: "var(--muted)" }}>{it.level}%</div>
                      </div>
                      <div className="skill-meter" aria-hidden>
                        <div className="skill-fill" style={{ width: `${it.level}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section id="projects" className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.6 }}>
        <h2 style={{ margin: 0 }}>Projects</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <motion.article key={p.id} className="project-card" whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
              <img className="project-thumb" src={p.img} alt={`${p.title} screenshot`} />
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div>
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={p.github} aria-label="Code" target="_blank" rel="noreferrer">Code</a>
                  <a href={p.live} aria-label="Live" target="_blank" rel="noreferrer">Live <FaExternalLinkAlt style={{ width: 12 }} /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* EXPERIENCE & EDUCATION */}
      <motion.section id="experience" className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.6 }}>
        <h2 style={{ margin: 0 }}>Experience & Education</h2>
        <div className="timeline">
          {experience.map((it) => (
            <div key={it.id} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body card">
                <div className="timeline-head">
                  <div><strong>{it.role}</strong> • <span className="muted">{it.company}</span></div>
                  <div className="timeline-period muted">{it.period}</div>
                </div>
                <p className="muted" style={{ marginTop: 8 }}>{it.details}</p>
              </div>
            </div>
          ))}
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-body card">
              <div className="timeline-head">
                <div>
                  <strong>B.E. – Artificial Intelligence & Machine Learning</strong> • <span className="muted">Savitribai Phule Pune University</span>
                </div>
                <div className="timeline-period muted">Dec 2021 – May 2025</div>
              </div>
              <p className="muted" style={{ marginTop: 8 }}>CGPA: 7.21. Coursework: Data Structures, OS, Software Engineering, Web Dev, Machine Learning.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PUBLICATIONS */}
      <motion.section id="publications" className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.6 }}>
        <h2 style={{ margin: 0 }}>Publications</h2>
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {publications.map((p) => (
            <div key={p.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{p.venue}</div>
              </div>
              <div style={{ marginTop: 6, color: "var(--muted)" }}>
                {p.authors} • ISSN: {p.issn}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section id="contact" className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} transition={{ duration: 0.6 }}>
        <h2 style={{ margin: 0 }}>Contact</h2>
        <div className="contact-grid">
          <div className="contact-info card">
            <h3 style={{ marginTop: 0 }}>Get in touch</h3>
            <p className="muted">Open to internships and junior frontend roles. I usually reply within 2 business days.</p>
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 8 }}>
                <strong>Email</strong>
                <div className="muted"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
              </div>

              <div style={{ marginBottom: 8 }}>
                <strong>Phone</strong>
                <div className="muted"><a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}>{CONTACT.phone}</a></div>
              </div>

              <div>
                <strong>Location</strong>
                <div className="muted">{CONTACT.location}</div>
              </div>

              <div className="contact-socials" style={{ marginTop: 12 }}>
                <a href={projects[1].github} aria-label="GitHub" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
                <a href={CONTACT.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
                <a href={CONTACT.resumePath} aria-label="Resume" download><FaDownload /> Resume</a>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <form ref={formRef} className="contact-form" onSubmit={handleContact} aria-label="Contact form">
            <input name="name" placeholder="Your name" required />
            <input name="email" placeholder="Your email" type="email" required />
            <textarea name="message" placeholder="Message" rows={6} required />
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div><strong>Languages</strong></div>
            <div style={{ color: "var(--muted)" }}>Marathi (First), Hindi (Advanced), English (Advanced)</div>
          </div>

          <div className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div><strong>Live Projects</strong></div>
            <div style={{ color: "var(--muted)" }}>
              <a href="https://snehashirke.netlify.app/" target="_blank" rel="noreferrer">Portfolio</a> •
              <a href="https://to-do-list-wb.netlify.app/" target="_blank" rel="noreferrer"> To-Do</a> •
              <a href="https://quizhackers.netlify.app/" target="_blank" rel="noreferrer"> Quiz</a>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="footer">© {new Date().getFullYear()} {CONTACT.name} — Built with React</footer>
    </div>
  );
}
