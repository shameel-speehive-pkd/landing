"use client";

import { useEffect, useRef, useState } from "react";
import { Ship, Map, Fuel, TrendingUp } from "lucide-react";
import ScrollVelocity from "../../components/ScrollVelocity";
import DecryptedText from "../../components/DecryptedText";
import AnimatedContent from "../../components/AnimatedContent";
import Counter from "../../components/Counter";
import GlareHover from "../../components/GlareHover";
import Magnet from "../../components/Magnet";

const features = [
  {
    id: "hivemind-routing",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
    title: "Hivemind Routing",
    description: "Cooperative fleet intelligence that aggregates ocean data from thousands of vessels, optimizing every departure to reduce costs and transit time.",
    gradient: "from-blue-500 to-cyan-400",
    accent: "#3b82f6",
    stat: "28% faster routes",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "telemetry-sync",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Telemetry Sync",
    description: "IoT-powered real-time sensor feeds from every vessel subsystem — engines, hull, weather — delivered instantly to your digital command center.",
    gradient: "from-cyan-500 to-teal-400",
    accent: "#06b6d4",
    stat: "< 2s data latency",
    span: "col-span-1",
  },
  {
    id: "emissions-guard",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
      </svg>
    ),
    title: "Emissions Guard",
    description: "Automated fuel consumption analysis and carbon footprint tracking with IMO compliance reporting — built for a greener maritime future.",
    gradient: "from-emerald-500 to-green-400",
    accent: "#10b981",
    stat: "34% CO₂ reduction",
    span: "col-span-1",
  },
  {
    id: "auto-chartering",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: "Auto-Chartering",
    description: "AI-assisted voyage scheduling, contract matching, and dynamic cargo allocation to maximize vessel utilization and profitability.",
    gradient: "from-yellow-400 to-orange-400",
    accent: "#f59e0b",
    stat: "3× more bookings",
    span: "col-span-1",
  },
  {
    id: "weather-avoidance",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
    title: "Weather Avoidance",
    description: "Predictive storm and hazard routing with 14-day high-resolution ocean weather overlays, ensuring safety and on-time delivery.",
    gradient: "from-violet-500 to-purple-400",
    accent: "#8b5cf6",
    stat: "99.1% safe arrivals",
    span: "col-span-1",
  },
  {
    id: "port-intelligence",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: "Port Intelligence",
    description: "Real-time berth availability, congestion predictions, and automated port clearance coordination across 500+ global ports.",
    gradient: "from-rose-500 to-pink-400",
    accent: "#f43f5e",
    stat: "500+ ports connected",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

const stats = [
  { label: "Vessels Managed", value: 2400, suffix: "+", icon: Ship },
  { label: "Routes Optimized", value: 140, suffix: "K+", icon: Map },
  { label: "Fuel Saved (Annual)", value: 82, suffix: ",000t", icon: Fuel },
  { label: "Uptime SLA", value: 99.98, suffix: "%", icon: TrendingUp },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <AnimatedContent
      delay={index * 0.1}
      distance={40}
      duration={0.7}
      ease="power3.out"
      className={feature.span}
    >
      <GlareHover
        width="100%"
        height="100%"
        background="white"
        borderRadius="20px"
        borderColor="rgba(226,232,240,0.8)"
        glareColor="#ffffff"
        glareOpacity={0.2}
        glareSize={300}
        className="!p-0 h-full"
      >
        <div className="group bg-white rounded-[20px] p-7 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4 h-full relative overflow-hidden">
          {/* Gradient accent line */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {feature.icon}
          </div>
          <div className="flex-1">
            <h3
              className="text-lg font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {feature.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
          <div className="pt-3 border-t border-slate-50">
            <span
              className="text-sm font-bold"
              style={{ color: feature.accent }}
            >
              {feature.stat}
            </span>
          </div>
        </div>
      </GlareHover>
    </AnimatedContent>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center gap-2 py-8 px-4"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-1">
        <Icon className="w-5 h-5 text-slate-500" />
      </div>
      <div className="flex items-baseline gap-0.5">
        {inView && (
          <Counter
            value={stat.value}
            fontSize={36}
            textColor="#0f172a"
            fontWeight={700}
            gradientHeight={8}
            gradientFrom="white"
            gradientTo="transparent"
          />
        )}
        <span
          className="text-2xl md:text-3xl font-bold text-slate-900"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {stat.suffix}
        </span>
      </div>
      <span className="text-xs text-slate-400 font-medium text-center">{stat.label}</span>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="w-full bg-white" style={{ scrollSnapAlign: "start" }}>
      {/* ── Scrolling Marquee Strip ───────────────────────────────────────── */}
      <div className="py-8 border-y border-slate-100 overflow-hidden">
        <ScrollVelocity
          texts={[
            <span key="1" className="text-slate-200 text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
              ROUTES · VESSELS · INTELLIGENCE · FLEET · OPTIMIZATION ·
            </span>,
          ]}
          velocity={40}
          numCopies={4}
          className="!text-slate-200"
        />
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Section Header with DecryptedText */}
        <AnimatedContent distance={60} duration={0.9} ease="power3.out">
          <div className="text-center mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-5">
              Platform Capabilities
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <DecryptedText
                text="The complete intelligence stack"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={30}
                maxIterations={20}
                className="text-slate-900"
                encryptedClassName="text-slate-300"
              />
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {" "}for modern shipping
              </span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              From first mile to final port — Speehive gives you the tools, data,
              and intelligence to run a world-class fleet from a single platform.
            </p>
          </div>
        </AnimatedContent>

        {/* ── Bento Feature Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        {/* ── Animated Stats Counter Strip ────────────────────────────────── */}
        <AnimatedContent distance={40} duration={0.8} ease="power3.out" delay={0.3}>
          <div
            className="rounded-3xl border border-slate-100 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 50%, #faf5ff 100%)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100/60">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* ── Magnetic CTA ────────────────────────────────────────────────── */}
        <AnimatedContent distance={30} duration={0.6} ease="power3.out" delay={0.5}>
          <div className="flex justify-center mt-12">
            <Magnet magnetStrength={4} padding={60}>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Platform
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnet>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
