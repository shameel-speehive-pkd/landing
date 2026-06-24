"use client";

const navLinks = [
  {
    heading: "Platform",
    links: ["Hivemind Routing", "Telemetry Sync", "Emissions Guard", "Auto-Chartering", "Port Intelligence"],
  },
  {
    heading: "Solutions",
    links: ["Bulk Carriers", "Container Fleets", "Tanker Management", "Passenger Vessels", "Port Operators"],
  },
  {
    heading: "Company",
    links: ["About Speehive", "Careers", "Newsroom", "Partners", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-slate-900 text-slate-300">
      {/* CTA Band */}
      <div className="relative overflow-hidden">
        <div
          className="px-6 py-20 md:py-28 text-center relative z-10"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f2a1f 100%)" }}
        >
          {/* Decorative hexagonal pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
            <svg width="600" height="400" viewBox="0 0 600 400">
              {[...Array(15)].map((_, i) => {
                const x = (i % 5) * 130 + 35;
                const y = Math.floor(i / 5) * 120 + (i % 2 === 0 ? 20 : 80);
                return (
                  <polygon
                    key={i}
                    points="50,0 100,25 100,75 50,100 0,75 0,25"
                    transform={`translate(${x}, ${y})`}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-cyan-400 bg-cyan-400/10 px-4 py-1.5 rounded-full border border-cyan-400/20 mb-6">
            Get Started Today
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Ready to modernize
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              your entire fleet?
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Join 200+ shipping companies who have switched to Speehive's digital
            platform for smarter, greener, and more profitable voyages.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <input
              id="cta-email-input"
              type="email"
              placeholder="Enter your work email"
              className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 text-sm outline-none focus:border-cyan-400 focus:bg-white/15 transition-all"
            />
            <button
              id="cta-demo-button"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Request Demo
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">No credit card required · 14-day free trial</p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-6 py-14 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Speehive Logo" className="w-10 h-10 object-contain" />
                <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  Speehive
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Digital intelligence for a smarter maritime world. Empowering every vessel with data-driven decisions.
              </p>
              <div className="flex gap-3">
                {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                  <button
                    key={social}
                    id={`social-${social.toLowerCase()}`}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all text-xs cursor-pointer"
                    title={social}
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {navLinks.map((col) => (
              <div key={col.heading}>
                <h4
                  className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4"
                >
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © 2026 Speehive Technologies Ltd. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-slate-600">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="hover:text-slate-400 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
