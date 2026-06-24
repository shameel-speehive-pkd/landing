"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    id: "hivemind-routing",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
    title: "Hivemind Routing",
    description: "Cooperative fleet intelligence that aggregates ocean data from thousands of vessels, optimizing every departure to reduce costs and transit time.",
    gradient: "from-blue-500 to-cyan-400",
    accent: "#3b82f6",
    stat: "28% faster routes",
  },
  {
    id: "telemetry-sync",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Telemetry Sync",
    description: "IoT-powered real-time sensor feeds from every vessel subsystem — engines, hull, weather — delivered instantly to your digital command center.",
    gradient: "from-cyan-500 to-teal-400",
    accent: "#06b6d4",
    stat: "< 2s data latency",
  },
  {
    id: "emissions-guard",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
      </svg>
    ),
    title: "Emissions Guard",
    description: "Automated fuel consumption analysis and carbon footprint tracking with IMO compliance reporting — built for a greener maritime future.",
    gradient: "from-emerald-500 to-green-400",
    accent: "#10b981",
    stat: "34% CO₂ reduction",
  },
  {
    id: "auto-chartering",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: "Auto-Chartering",
    description: "AI-assisted voyage scheduling, contract matching, and dynamic cargo allocation to maximize vessel utilization and profitability.",
    gradient: "from-yellow-400 to-orange-400",
    accent: "#f59e0b",
    stat: "3× more bookings",
  },
  {
    id: "weather-avoidance",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
    title: "Weather Avoidance",
    description: "Predictive storm and hazard routing with 14-day high-resolution ocean weather overlays, ensuring safety and on-time delivery.",
    gradient: "from-violet-500 to-purple-400",
    accent: "#8b5cf6",
    stat: "99.1% safe arrivals",
  },
  {
    id: "port-intelligence",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: "Port Intelligence",
    description: "Real-time berth availability, congestion predictions, and automated port clearance coordination across 500+ global ports.",
    gradient: "from-rose-500 to-pink-400",
    accent: "#f43f5e",
    stat: "500+ ports connected",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s, box-shadow 0.3s ease, transform 0.3s ease`,
      }}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
      >
        {feature.icon}
      </div>
      <div>
        <h3
          className="text-base font-bold text-slate-900 mb-1.5"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {feature.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
      </div>
      <div className="mt-auto pt-3 border-t border-slate-50">
        <span
          className="text-xs font-bold"
          style={{ color: feature.accent }}
        >
          {feature.stat}
        </span>
      </div>
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="w-full py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-5">
            Platform Capabilities
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            The complete intelligence stack
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        {/* Stats Strip */}
        <div
          className="mt-16 rounded-2xl border border-slate-100 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { label: "Vessels Managed", value: "2,400+", icon: "🚢" },
              { label: "Routes Optimized", value: "140K+", icon: "🗺️" },
              { label: "Fuel Saved (Annual)", value: "82,000t", icon: "⛽" },
              { label: "Uptime SLA", value: "99.98%", icon: "🟢" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-1 py-8 px-4">
                <span className="text-2xl mb-1">{icon}</span>
                <span
                  className="text-2xl md:text-3xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {value}
                </span>
                <span className="text-xs text-slate-400 font-medium text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
