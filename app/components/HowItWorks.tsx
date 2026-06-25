"use client";

import { useRef, useEffect, useState } from "react";
import { Plug, Brain, TrendingUp } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Connect Your Fleet",
    description: "Install lightweight IoT gateways on your vessels. Our plug-and-play hardware syncs in minutes.",
    Icon: Plug,
    color: "from-blue-100 to-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-500",
  },
  {
    number: 2,
    title: "Activate Intelligence",
    description: "Speehive's AI begins processing telemetry immediately, surfacing insights and optimization opportunities.",
    Icon: Brain,
    color: "from-cyan-100 to-cyan-50 border-cyan-200",
    iconColor: "text-cyan-600",
    badgeColor: "bg-cyan-500",
  },
  {
    number: 3,
    title: "Optimize & Scale",
    description: "Get personalized recommendations, automated reporting, and route adjustments that compound savings over time.",
    Icon: TrendingUp,
    color: "from-emerald-100 to-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    badgeColor: "bg-emerald-500",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const fallback = setTimeout(() => setVisible(true), 4000);

    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", scrollSnapAlign: "start" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-5">
            How It Works
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Up and running
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {" "}in 3 simple steps
            </span>
          </h2>
        </div>

        {/* Horizontal Stepper */}
        <div
          className="relative"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-0.5">
            <div className="w-full h-full bg-slate-200 rounded-full" />
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: visible ? "100%" : "0%",
                transitionDelay: "0.6s",
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center gap-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.3 + idx * 0.15}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.3 + idx * 0.15}s`,
                }}
              >
                {/* Icon container with badge */}
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm border`}
                  >
                    <step.Icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  {/* Step number badge */}
                  <span
                    className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${step.badgeColor} text-white text-xs font-bold flex items-center justify-center shadow-md`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text content */}
                <div>
                  <h3
                    className="text-lg font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
