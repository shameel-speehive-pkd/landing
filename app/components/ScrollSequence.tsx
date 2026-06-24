"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSequenceProps {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
  isLoaded: boolean;
  scrollProgress: number;
}

const TOTAL_FRAMES = 240;

const storySteps = [
  {
    start: 0.04,
    end: 0.22,
    label: "01",
    title: "The Ocean,\nDigitized",
    text: "Speehive transforms raw voyage data into collaborative, real-time fleet intelligence — connecting every vessel in the global network.",
    align: "left" as const,
  },
  {
    start: 0.28,
    end: 0.46,
    label: "02",
    title: "Cooperative\nRouting",
    text: "Vessels don't sail in isolation. Our digital hivemind optimizes routes in real-time using shared ocean telemetry from thousands of ships.",
    align: "right" as const,
  },
  {
    start: 0.52,
    end: 0.70,
    label: "03",
    title: "Precision\nPerformance",
    text: "Monitor fuel consumption, carbon emissions, and vessel efficiency with precision IoT synchronization down to the nautical mile.",
    align: "left" as const,
  },
  {
    start: 0.77,
    end: 0.92,
    label: "04",
    title: "Splash Into\nEfficiency",
    text: "Witness the moment of impact — where data-driven routing shifts the tides of global maritime logistics forever.",
    align: "center" as const,
  },
];

export default function ScrollSequence({
  onProgress,
  onLoaded,
  isLoaded,
  scrollProgress,
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [stepProgress, setStepProgress] = useState(0);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const handleLoad = () => {
      loadedCount++;
      onProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) onLoaded();
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i + 1).padStart(3, "0");
      img.src = `/img/ezgif-frame-${pad}.jpg`;
      img.onload = handleLoad;
      img.onerror = handleLoad;
      images[i] = img;
    }
    imagesRef.current = images;
  }, [onProgress, onLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const clamped = Math.max(0, Math.min(1, scrollProgress));
    targetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(clamped * TOTAL_FRAMES) + 1));

    let foundStep: number | null = null;
    let progress = 0;
    for (let i = 0; i < storySteps.length; i++) {
      const s = storySteps[i];
      if (clamped >= s.start && clamped <= s.end) {
        foundStep = i;
        progress = (clamped - s.start) / (s.end - s.start);
        break;
      }
    }
    setActiveStep(foundStep);
    setStepProgress(progress);
  }, [scrollProgress, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    let rafId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const images = imagesRef.current;
      if (!canvas || !ctx) { rafId = requestAnimationFrame(render); return; }

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) < 0.05) currentFrameRef.current = targetFrameRef.current;
      else currentFrameRef.current += diff * 0.18;

      const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current) - 1));
      const img = images[idx];

      if (img?.complete && img.naturalWidth > 0) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== Math.round(rect.width * dpr)) canvas.width = Math.round(rect.width * dpr);
        if (canvas.height !== Math.round(rect.height * dpr)) canvas.height = Math.round(rect.height * dpr);

        const cw = canvas.width, ch = canvas.height;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const ratio = Math.max(cw / iw, ch / ih);
        const nw = iw * ratio, nh = ih * ratio;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [isLoaded]);

  // Compute enter/exit animation values
  const getAnimations = (progress: number) => {
    const enterEnd = 0.18;
    const exitStart = 0.82;

    // 0 = fully entered, 1 = fully exited
    let enter = 1; // starts hidden
    let exit = 0;  // starts visible

    if (progress < enterEnd) {
      enter = 1 - progress / enterEnd; // 1 → 0 (slide in)
    } else if (progress > exitStart) {
      exit = (progress - exitStart) / (1 - exitStart); // 0 → 1 (slide out)
    }

    return { enter, exit };
  };

  const step = activeStep !== null ? storySteps[activeStep] : null;
  const { enter, exit } = activeStep !== null ? getAnimations(stepProgress) : { enter: 1, exit: 0 };

  // Determine slide direction based on alignment
  const slideDir = step?.align === "right" ? 1 : -1; // right-aligned slides from right, others from left

  const lineProgress = activeStep !== null
    ? stepProgress < 0.15
      ? stepProgress / 0.15
      : stepProgress > 0.85
        ? (1 - stepProgress) / 0.15
        : 1
    : 0;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none pointer-events-none"
        style={{ transform: `scale(${1 + (1 - scrollProgress) * 0.025})`, transition: "transform 0.1s linear" }}
      />

      {/* Readability gradient — subtle dark wash behind text area */}
      {activeStep !== null && (
        <div
          className="absolute inset-0 z-[9] pointer-events-none"
          style={{
            background: step?.align === "right"
              ? "linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 60%)"
              : step?.align === "center"
                ? "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 70%)"
                : "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)",
            opacity: lineProgress,
          }}
        />
      )}

      {/* Cinematic text overlay — no card, just floating content */}
      {isLoaded && activeStep !== null && step && (
        <div
          className={`absolute inset-0 flex items-center px-8 md:px-20 pointer-events-none z-10
            ${step.align === "right" ? "justify-end" : step.align === "center" ? "justify-center" : "justify-start"}`}
        >
          <div
            className={`flex flex-col gap-4 max-w-lg
              ${step.align === "right" ? "items-end text-right" : step.align === "center" ? "items-center text-center" : "items-start text-left"}`}
            style={{
              opacity: 1 - exit,
              transform: `translateX(${(enter * slideDir * 60) + (exit * -slideDir * 60)}px)`,
              transition: "opacity 0.12s ease, transform 0.12s ease",
            }}
          >
            {/* Accent line */}
            <div
              className={`w-px bg-gradient-to-b from-cyan-400 to-emerald-400 ${step.align === "center" ? "hidden" : ""}`}
              style={{
                height: "48px",
                opacity: lineProgress,
                transform: `scaleY(${lineProgress})`,
                transformOrigin: "top",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
            />

            {/* Step label */}
            <span
              className="text-[10px] font-mono tracking-[0.3em] uppercase"
              style={{
                color: "rgba(103,232,249,0.8)",
                opacity: lineProgress,
                transform: `translateY(${(1 - lineProgress) * 8}px)`,
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
            >
              {step.label}
            </span>

            {/* Title — each line staggered */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] whitespace-pre-line"
              style={{ fontFamily: "var(--font-outfit)", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
            >
              {step.title.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block"
                  style={{
                    opacity: lineProgress,
                    transform: `translateY(${(1 - lineProgress) * (12 + i * 6)}px)`,
                    transition: `opacity 0.2s ease ${i * 0.06}s, transform 0.25s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
                  }}
                >
                  {i === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>

            {/* Description */}
            <p
              className="text-sm md:text-base max-w-md leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
                textShadow: "0 1px 12px rgba(0,0,0,0.4)",
                opacity: lineProgress,
                transform: `translateY(${(1 - lineProgress) * 10}px)`,
                transition: "opacity 0.2s ease 0.12s, transform 0.25s cubic-bezier(0.16,1,0.3,1) 0.12s",
              }}
            >
              {step.text}
            </p>

            {/* Bottom accent bar */}
            <div
              className="h-px bg-gradient-to-r from-cyan-400/60 to-transparent mt-1"
              style={{
                width: step.align === "center" ? "120px" : "80px",
                opacity: lineProgress,
                transform: `scaleX(${step.align === "right" ? -lineProgress : lineProgress})`,
                transformOrigin: step.align === "right" ? "right" : "left",
                transition: "opacity 0.2s ease 0.15s, transform 0.3s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
