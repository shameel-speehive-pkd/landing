"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import ScrollSequence from "./components/ScrollSequence";
import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import FloatingNodes from "./components/FloatingNodes";
import Noise from "../components/Noise";
import Magnet from "../components/Magnet";
import FadeContent from "../components/FadeContent";
import GlareHover from "../components/GlareHover";
import BorderGlow from "../components/BorderGlow";
import ScrollFloat from "../components/ScrollFloat";

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
      {/* ── Global Effects ─────────────────────────────────────────────────────── */}
      <Noise patternAlpha={12} patternRefreshInterval={3} />
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
              style={{ fontFamily: "var(--font-jakarta)" }}
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
              style={{ fontFamily: "var(--font-jakarta)" }}
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
            <Magnet magnetStrength={3} padding={60}>
              <a
                href="#contact"
                id="nav-cta-btn"
                className="text-sm font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-sm hover:shadow-md inline-block"
              >
                Get Demo
              </a>
            </Magnet>
          </div>
        </div>
      </nav>

      {/* ── HERO + SCROLL SEQUENCE ────────────────────────────────────────────── */}
      {/* The container is very tall to give room for scroll-based animation */}
      <div
        ref={sequenceContainerRef}
        className="relative"
        style={{ height: "600vh", scrollSnapAlign: "start" }}
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
                style={{ fontFamily: "var(--font-jakarta)", textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
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
        <section id="platform" className="w-full py-24 md:py-32 px-6 bg-gradient-to-b from-white to-slate-50" style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-6xl mx-auto flex flex-col gap-16">
            {/* Header */}
            <FadeContent blur duration={1000} delay={100}>
              <div className="text-center">
                <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-5">
                  Command Center
                </span>
                <ScrollFloat
                  containerClassName="text-center"
                  textClassName="text-3xl md:text-5xl font-bold text-slate-900 leading-tight"
                  animationDuration={1.2}
                  ease="back.inOut(2)"
                  scrollStart="top bottom+=20%"
                  scrollEnd="top center"
                  stagger={0.02}
                >
                  {"Your fleet, at a glance."}
                </ScrollFloat>
                <ScrollFloat
                  containerClassName="text-center -mt-3"
                  textClassName="text-3xl md:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
                  animationDuration={1.2}
                  ease="back.inOut(2)"
                  scrollStart="top bottom+=10%"
                  scrollEnd="top center-=10%"
                  stagger={0.02}
                >
                  {"Always in control."}
                </ScrollFloat>
                <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  The Speehive Command Center gives your operations team a unified view
                  of every vessel, route, and metric — in real time, from any device.
                </p>
              </div>
            </FadeContent>

            {/* Interactive Dashboard */}
            <FadeContent blur duration={1200} delay={300}>
              <BorderGlow
                backgroundColor="#f8fafc"
                glowColor="210 90 60"
                colors={["#3b82f6", "#06b6d4", "#10b981"]}
                borderRadius={24}
                glowIntensity={0.8}
              >
                <DashboardPreview />
              </BorderGlow>
            </FadeContent>

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
                <GlareHover
                  key={author}
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="16px"
                  borderColor="transparent"
                  glareColor="#ffffff"
                  glareOpacity={0.15}
                  glareSize={200}
                  className="!p-0"
                >
                  <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col gap-5 text-left h-full">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
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
                </GlareHover>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────────────────── */}
        <Features />

        {/* ── How It Works ───────────────────────────────────────────────────── */}
        <HowItWorks />

        {/* ── Footer / CTA ───────────────────────────────────────────────────── */}
        <Footer />
      </div>
    </div>
  );
}
