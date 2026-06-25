"use client";

import { Ship, Fuel, Leaf, Zap, AlertTriangle, CheckCircle, Info, Bell, BarChart3, Activity, Globe, TrendingDown } from "lucide-react";

interface VoyageRoute {
  from: string;
  to: string;
  vessel: string;
  eta: string;
  status: "On Route" | "Optimizing" | "Docked";
  statusColor: string;
  fuelSaved: string;
  co2Reduction: string;
  distance: string;
}

const routes: VoyageRoute[] = [
  { from: "Singapore", to: "Rotterdam", vessel: "MV Helix Prime", eta: "Jul 14, 2026", status: "On Route", statusColor: "bg-emerald-100 text-emerald-700", fuelSaved: "2.4t", co2Reduction: "7.6t", distance: "10,842 nm" },
  { from: "Dubai", to: "Hamburg", vessel: "MV Nordic Star", eta: "Jul 09, 2026", status: "Optimizing", statusColor: "bg-blue-100 text-blue-700", fuelSaved: "1.8t", co2Reduction: "5.1t", distance: "6,518 nm" },
  { from: "Shanghai", to: "Los Angeles", vessel: "MV Pacific Hive", eta: "Jul 22, 2026", status: "On Route", statusColor: "bg-emerald-100 text-emerald-700", fuelSaved: "3.1t", co2Reduction: "9.8t", distance: "5,473 nm" },
];

interface FleetHealth {
  vessel: string;
  engine: number;
  fuel: number;
  nav: number;
  hull: number;
  alert?: string;
}

const fleetHealth: FleetHealth[] = [
  { vessel: "MV Helix Prime", engine: 97, fuel: 82, nav: 100, hull: 94 },
  { vessel: "MV Nordic Star", engine: 89, fuel: 91, nav: 98, hull: 76, alert: "Hull inspection recommended" },
  { vessel: "MV Pacific Hive", engine: 99, fuel: 88, nav: 100, hull: 91 },
];

interface Emission {
  vessel: string;
  co2: number;
  target: number;
  rating: string;
  ratingColor: string;
}

const emissionsData: Emission[] = [
  { vessel: "MV Helix Prime", co2: 23.4, target: 28, rating: "A+", ratingColor: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { vessel: "MV Nordic Star", co2: 26.1, target: 28, rating: "B+", ratingColor: "text-blue-600 bg-blue-50 border-blue-200" },
  { vessel: "MV Pacific Hive", co2: 21.9, target: 28, rating: "A+", ratingColor: "text-emerald-600 bg-emerald-50 border-emerald-200" },
];

const alerts = [
  { vessel: "MV Nordic Star", type: "warning", message: "Hull inspection due in 48h", time: "2m ago" },
  { vessel: "MV Helix Prime", type: "info", message: "Route optimized — saved 12nm", time: "18m ago" },
  { vessel: "MV Pacific Hive", type: "success", message: "Port clearance approved — LA", time: "1h ago" },
];

const quickStats = [
  { label: "Active Voyages", value: "3", icon: Ship, color: "from-blue-500 to-cyan-400" },
  { label: "Fuel Saved Today", value: "7.3t", icon: Fuel, color: "from-emerald-500 to-green-400" },
  { label: "CO₂ Reduced", value: "22.5t", icon: Leaf, color: "from-green-500 to-emerald-400" },
  { label: "Fleet Speed", value: "14.2kn", icon: Zap, color: "from-amber-500 to-orange-400" },
];

function HealthBar({ value, color = "bg-blue-500" }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] font-semibold text-slate-500 w-7 text-right">{value}%</span>
    </div>
  );
}

function EmissionArc({ percentage, size = 64 }: { percentage: number; size?: number }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  const color = percentage < 85 ? "#10b981" : percentage < 100 ? "#3b82f6" : "#f59e0b";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

export default function DashboardPreview() {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60" style={{ background: "#f8fafc" }}>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.13-.53.13-.19 0-.37-.04-.53-.13l-7.9-4.44A1 1 0 0 1 3 16.5v-9a1 1 0 0 1 .54-.88l7.9-4.44c.32-.18.72-.18 1.05 0l7.9 4.44c.33.17.54.5.54.88v9z"/></svg>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-jakarta)" }}>Speehive Command</div>
            <div className="text-xs text-slate-400">Live Fleet Overview</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500 font-medium">3 Vessels Active</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── Quick Stats Row (spans full width) ──────────────────────────── */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-jakarta)" }}>{stat.value}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Voyage Planner (left 2 cols) ────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Voyage Planner</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">3 active</span>
          </div>
          <div className="flex flex-col gap-2">
            {routes.map((route) => (
              <div key={route.vessel} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/60 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-bold text-slate-800 truncate">{route.vessel}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${route.statusColor}`}>{route.status}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <span className="font-medium text-slate-600">{route.from}</span>
                    <svg className="w-3 h-3 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18"/></svg>
                    <span className="font-medium text-slate-600">{route.to}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400">{route.distance}</span>
                  </div>
                </div>
                <div className="flex gap-3 text-[10px]">
                  <div className="text-center">
                    <div className="text-slate-400">ETA</div>
                    <div className="font-semibold text-slate-700">{route.eta.split(",")[0]}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">Fuel</div>
                    <div className="font-semibold text-emerald-600">{route.fuelSaved}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">CO₂</div>
                    <div className="font-semibold text-blue-600">{route.co2Reduction}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Fleet Health (right column) ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Fleet Health</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {fleetHealth.map((vessel) => (
              <div key={vessel.vessel} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-800">{vessel.vessel}</span>
                  {vessel.alert && (
                    <span className="text-[8px] text-amber-600 bg-amber-50 border border-amber-100 rounded px-1.5 py-0.5 font-medium">!</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 w-12">Engine</span>
                    <HealthBar value={vessel.engine} color={vessel.engine > 90 ? "bg-emerald-400" : "bg-amber-400"} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 w-12">Fuel</span>
                    <HealthBar value={vessel.fuel} color="bg-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 w-12">Nav</span>
                    <HealthBar value={vessel.nav} color="bg-cyan-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 w-12">Hull</span>
                    <HealthBar value={vessel.hull} color={vessel.hull > 85 ? "bg-emerald-400" : "bg-rose-400"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Emissions Guard (left column) ───────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-green-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Emissions Guard</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {emissionsData.map((e) => {
              const pct = Math.round((e.co2 / e.target) * 100);
              return (
                <div key={e.vessel} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/60 flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <EmissionArc percentage={pct} size={56} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-700">{pct}%</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-slate-800 truncate">{e.vessel}</div>
                    <div className="text-[9px] text-slate-500">{e.co2}t / {e.target}t limit</div>
                    <span className={`inline-block mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${e.ratingColor}`}>
                      {e.rating}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Live Alerts (middle column) ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Live Alerts</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold flex items-center justify-center">{alerts.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {alerts.map((alert, i) => (
              <div key={i} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/60 flex items-start gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  alert.type === "warning" ? "bg-amber-100" : alert.type === "success" ? "bg-emerald-100" : "bg-blue-100"
                }`}>
                  {alert.type === "warning" && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                  {alert.type === "success" && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                  {alert.type === "info" && <Info className="w-3 h-3 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-700">{alert.vessel}</div>
                  <div className="text-[10px] text-slate-500 leading-snug">{alert.message}</div>
                </div>
                <span className="text-[9px] text-slate-400 flex-shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CO₂ Monthly Chart (right column) ────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-cyan-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </div>
              <span className="text-xs font-bold text-slate-700">CO₂ Progress</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Jun 2026</span>
          </div>
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/60">
            <div className="flex items-end gap-[3px] h-20">
              {[62, 74, 81, 69, 58, 72, 66, 78, 83, 71, 65, 59, 68, 76, 74, 70, 67, 71, 63, 72, 68, 75, 71, 69].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-blue-400 to-cyan-300 transition-all duration-500 hover:from-blue-500 hover:to-cyan-400"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-slate-400">
              <span>1</span>
              <span>8</span>
              <span>15</span>
              <span>22</span>
              <span>30</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/60 text-center">
              <div className="text-[10px] text-slate-400">Avg Daily</div>
              <div className="text-sm font-bold text-slate-700">68.4t</div>
            </div>
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/60 text-center">
              <div className="text-[10px] text-slate-400">vs Target</div>
              <div className="text-sm font-bold text-emerald-600">-12%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
