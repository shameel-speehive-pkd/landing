"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import ScrollSequence from "./components/ScrollSequence";
import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import Footer from "./components/Footer";
import FloatingNodes from "./components/FloatingNodes";

const NAV_LINKS = ["Platform", "Solutions", "Fleet Hub", "About"];

export default function Home() {
  // ── Loader state ──────────────────────────────────────────────────────────
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  // ── Scroll sequence state ─────────────────────────────────────────────────
  const sequenceContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [splashTriggered, setSplashTriggered] = useState(false);
  const [splashOpacity, setSplashOpacity] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  // ── Navbar scroll state ───────────────────────────────────────────────────
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleProgress = useCallback((p: number) => setLoadProgress(p), []);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
    // Give a moment to show 100%, then fade out loader
    setTimeout(() => {
      setLoaderVisible(false);
      setTimeout(() => setHeroTextVisible(true), 400);
    }, 600);
  }, []);

  // ── Scroll event ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Navbar appearance
      setNavScrolled(scrollY > 50);

      // Compute scroll progress within the sticky sequence section
      const container = sequenceContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = scrollY + rect.top - (rect.top - container.offsetTop); // absolute top
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far have we scrolled through the sticky section?
      const absoluteTop = container.offsetTop;
      const scrollable = containerHeight - viewportHeight;
      const scrolled = scrollY - absoluteTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      setScrollProgress(progress);

      // Splash transition: trigger when progress > 0.88
      if (progress >= 0.88 && !splashTriggered) {
        setSplashTriggered(true);
      }

      // Splash opacity: fade in the white overlay from 0.88 to 1.0
      if (progress >= 0.88) {
        const splashProgress = (progress - 0.88) / 0.12;
        setSplashOpacity(Math.min(1, splashProgress));
      } else {
        setSplashOpacity(0);
      }

      // Reveal main content when splash is nearly complete
      if (progress >= 0.96) {
        setContentVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [splashTriggered]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── Preloader ────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700"
        style={{ opacity: loaderVisible ? 1 : 0, pointerEvents: loaderVisible ? "all" : "none" }}
        aria-hidden={!loaderVisible}
      >
        <div className="flex flex-col items-center gap-8">
          <Image src="/logo.png" alt="Speehive" width={72} height={72} className="object-contain" priority />
          <div className="flex flex-col items-center gap-3">
            <span
              className="text-2xl font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Speehive
            </span>
            <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">
              Loading Fleet Intelligence
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-56 flex flex-col gap-2">
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Initializing</span>
              <span>{loadProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
        style={{
          background: navScrolled ? "rgba(255,255,255,0.9)" : "transparent",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: navScrolled ? "blur(16px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
          boxShadow: navScrolled ? "0 1px 24px rgba(0,0,0,0.04)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Speehive" width={32} height={32} className="object-contain" />
            <span
              className="text-base font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Speehive
            </span>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              id="nav-login-btn"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden md:inline"
            >
              Sign in
            </a>
            <a
              href="#contact"
              id="nav-cta-btn"
              className="text-sm font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-sm hover:shadow-md"
            >
              Get Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO + SCROLL SEQUENCE ────────────────────────────────────────────── */}
      {/* The container is very tall to give room for scroll-based animation */}
      <div
        ref={sequenceContainerRef}
        className="relative"
        style={{ height: "600vh" }}
      >
        {/* Sticky canvas wrapper */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Canvas / frame animation layer */}
          <ScrollSequence
            onProgress={handleProgress}
            onLoaded={handleLoaded}
            isLoaded={isLoaded}
            scrollProgress={scrollProgress}
          />

          {/* Vignette overlay — fades out as user scrolls */}
          <div
            className="absolute inset-0 z-[15] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
              opacity: scrollProgress < 0.04 ? 1 : Math.max(0, 1 - scrollProgress * 12),
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Floating data nodes — fade out on scroll */}
          <FloatingNodes opacity={scrollProgress < 0.04 ? (heroTextVisible ? 0.8 : 0) : Math.max(0, 1 - scrollProgress * 15)} />

          {/* Hero Text Overlay — left-aligned, staggered entrance */}
          <div
            className="absolute inset-0 flex flex-col justify-center z-20 px-8 md:px-20 pointer-events-none"
            style={{
              opacity: scrollProgress < 0.04 ? (heroTextVisible ? 1 : 0) : Math.max(0, 1 - scrollProgress * 25),
            }}
          >
            <div className="flex flex-col items-start gap-5 max-w-2xl">
              {/* Badge */}
              <span
                className="inline-block text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-cyan-300 px-4 py-1.5 rounded-full border border-white/15"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  opacity: heroTextVisible ? 1 : 0,
                  transform: heroTextVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                }}
              >
                Maritime Intelligence Platform
              </span>

              {/* Title with staggered words */}
              <h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)", textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
              >
                <span
                  className="inline-block"
                  style={{
                    opacity: heroTextVisible ? 1 : 0,
                    transform: heroTextVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                  }}
                >
                  The Hive That
                </span>
                <br />
                <span className="relative inline-block">
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300"
                    style={{
                      WebkitTextStroke: "0px",
                      opacity: heroTextVisible ? 1 : 0,
                      transform: heroTextVisible ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 0.7s ease 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
                      display: "inline-block",
                    }}
                  >
                    Moves Oceans
                  </span>
                  {/* Animated wave underline */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 overflow-visible"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    style={{
                      opacity: heroTextVisible ? 1 : 0,
                      transition: "opacity 0.5s ease 0.9s",
                    }}
                  >
                    <path
                      d="M0,8 Q37.5,0 75,8 Q112.5,16 150,8 Q187.5,0 225,8 Q262.5,16 300,8"
                      fill="none"
                      stroke="url(#wave-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="400"
                      strokeDashoffset={heroTextVisible ? 0 : 400}
                      style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 1s" }}
                    />
                    <defs>
                      <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(103,232,249)" />
                        <stop offset="100%" stopColor="rgb(52,211,153)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-sm md:text-base font-normal max-w-md leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.01em",
                  textShadow: "0 1px 20px rgba(0,0,0,0.5)",
                  opacity: heroTextVisible ? 1 : 0,
                  transform: heroTextVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.7s ease 0.6s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s",
                }}
              >
                Speehive digitizes every voyage, vessel, and waterway — transforming
                raw ocean data into cooperative fleet intelligence.
              </p>

              {/* Stats bar */}
              <div
                className="flex items-center gap-6 mt-2"
                style={{
                  opacity: heroTextVisible ? 1 : 0,
                  transform: heroTextVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.7s ease 0.8s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s",
                }}
              >
                {[
                  { value: "10,000+", label: "Vessels" },
                  { value: "50+", label: "Routes" },
                  { value: "Real-Time", label: "Telemetry" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    {i > 0 && <div className="w-px h-4 bg-white/20" />}
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-bold text-white/90">{stat.value}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SPLASH WHITE FADE OVERLAY ───────────────────────────────────── */}
          {/* Uses the final water splash frames to transition into page content */}
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: "white",
              opacity: splashOpacity,
              transition: "opacity 0.08s linear",
            }}
          />

          {/* Scroll indicator — wave ripple style */}
          {isLoaded && scrollProgress < 0.03 && (
            <div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 z-20 pointer-events-none"
              style={{
                opacity: heroTextVisible ? 1 : 0,
                transition: "opacity 0.6s ease 1.2s",
              }}
            >
              <span className="text-[10px] text-white/40 font-medium tracking-[0.25em] uppercase">Scroll to explore</span>
              <div className="relative w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
                <div className="w-1 h-2.5 rounded-full bg-white/50 animate-[scrollPulse_2s_ease-in-out_infinite]" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BELOW-FOLD CONTENT ────────────────────────────────────────────────── */}
      <div
        className="relative z-10 bg-white"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Dashboard Showcase ─────────────────────────────────────────────── */}
        <section id="platform" className="w-full py-24 md:py-32 px-6 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-6xl mx-auto flex flex-col gap-16">
            {/* Header */}
            <div className="text-center">
              <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-5">
                Command Center
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Your fleet, at a glance.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Always in control.
                </span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                The Speehive Command Center gives your operations team a unified view
                of every vessel, route, and metric — in real time, from any device.
              </p>
            </div>

            {/* Interactive Dashboard */}
            <DashboardPreview />

            {/* Testimonial / Social Proof */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Speehive cut our average voyage time by 18% and saved us $2.4M in fuel costs in the first year alone.",
                  author: "Capt. Lars Henriksen",
                  role: "Fleet Director, Nordic Carriers",
                  avatar: "LH",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  quote: "The emissions dashboard gave us instant IMO compliance visibility. Our audits are now effortless.",
                  author: "Priya Menon",
                  role: "Sustainability Head, OceanPath Logistics",
                  avatar: "PM",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  quote: "Real-time port intelligence from Speehive means our vessels never wait idle at berth anymore.",
                  author: "Zhang Wei",
                  role: "VP Operations, Pacific Freight Group",
                  avatar: "ZW",
                  color: "from-cyan-500 to-blue-500",
                },
              ].map(({ quote, author, role, avatar, color }) => (
                <div
                  key={author}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col gap-5"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">"{quote}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{author}</div>
                      <div className="text-xs text-slate-400">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────────────────── */}
        <Features />

        {/* ── How It Works ───────────────────────────────────────────────────── */}
        <section id="solutions" className="w-full py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-5">
                How It Works
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Up and running
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  {" "}in 3 simple steps
                </span>
              </h2>
            </div>

            <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
              {/* Connecting line on desktop */}
              <div className="hidden md:block absolute top-10 left-[17%] right-[17%] h-px bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200" />

              {[
                {
                  step: "01",
                  title: "Connect Your Fleet",
                  description: "Install lightweight IoT gateways on your vessels. Our plug-and-play hardware syncs in minutes.",
                  icon: "🔌",
                  color: "from-blue-100 to-blue-50 border-blue-200",
                  iconBg: "bg-blue-500",
                },
                {
                  step: "02",
                  title: "Activate Intelligence",
                  description: "Speehive's AI begins processing telemetry immediately, surfacing insights and optimization opportunities.",
                  icon: "🧠",
                  color: "from-cyan-100 to-cyan-50 border-cyan-200",
                  iconBg: "bg-cyan-500",
                },
                {
                  step: "03",
                  title: "Optimize & Scale",
                  description: "Get personalized recommendations, automated reporting, and route adjustments that compound savings over time.",
                  icon: "📈",
                  color: "from-emerald-100 to-emerald-50 border-emerald-200",
                  iconBg: "bg-emerald-500",
                },
              ].map(({ step, title, description, icon, iconBg }, idx) => (
                <div key={step} className="flex-1 flex flex-col items-center text-center gap-4 px-6 relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${iconBg === "bg-blue-500" ? "from-blue-100 to-blue-50 border border-blue-200" : iconBg === "bg-cyan-500" ? "from-cyan-100 to-cyan-50 border border-cyan-200" : "from-emerald-100 to-emerald-50 border border-emerald-200"} flex items-center justify-center text-3xl shadow-sm relative z-10`}>
                    {icon}
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${iconBg} text-white text-xs font-bold flex items-center justify-center shadow`}>
                      {idx + 1}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer / CTA ───────────────────────────────────────────────────── */}
        <Footer />
      </div>
    </div>
  );
}
