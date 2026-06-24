"use client";

import { useState } from "react";

const tabs = ["Voyage Planner", "Fleet Health", "Emissions Guard"] as const;
type Tab = (typeof tabs)[number];

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

function HealthBar({ value, color = "bg-blue-500" }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-8 text-right">{value}%</span>
    </div>
  );
}

function EmissionArc({ percentage }: { percentage: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  const color = percentage < 85 ? "#10b981" : percentage < 100 ? "#3b82f6" : "#f59e0b";

  return (
    <svg width="90" height="90" viewBox="0 0 90 90" className="rotate-[-90deg]">
      <circle cx="45" cy="45" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
      <circle
        cx="45" cy="45" r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<Tab>("Voyage Planner");

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60" style={{ background: "#f8fafc" }}>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.13-.53.13-.19 0-.37-.04-.53-.13l-7.9-4.44A1 1 0 0 1 3 16.5v-9a1 1 0 0 1 .54-.88l7.9-4.44c.32-.18.72-.18 1.05 0l7.9 4.44c.33.17.54.5.54.88v9z"/></svg>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>Speehive Command</div>
            <div className="text-xs text-slate-400">Live Fleet Overview</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500 font-medium">3 Vessels Active</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-100 bg-white px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`dashboard-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-xs font-semibold tracking-wide border-b-2 transition-all duration-200 cursor-pointer
              ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[340px]">
        {activeTab === "Voyage Planner" && (
          <div className="flex flex-col gap-3">
            {routes.map((route) => (
              <div key={route.vessel} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-800">{route.vessel}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${route.statusColor}`}>{route.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{route.from}</span>
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18"/></svg>
                    <span className="font-medium text-slate-700">{route.to}</span>
                    <span className="text-slate-300 mx-1">·</span>
                    <span>{route.distance}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-slate-400 mb-0.5">ETA</div>
                    <div className="font-semibold text-slate-800">{route.eta}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 mb-0.5">Fuel Saved</div>
                    <div className="font-semibold text-emerald-600">{route.fuelSaved}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 mb-0.5">CO₂ Down</div>
                    <div className="font-semibold text-blue-600">{route.co2Reduction}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Fleet Health" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fleetHealth.map((vessel) => (
              <div key={vessel.vessel} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-800 mb-1">{vessel.vessel}</div>
                {vessel.alert && (
                  <div className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1 mb-3 flex items-center gap-1.5">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                    {vessel.alert}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Engine</div>
                    <HealthBar value={vessel.engine} color={vessel.engine > 90 ? "bg-emerald-400" : "bg-amber-400"} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Fuel Systems</div>
                    <HealthBar value={vessel.fuel} color="bg-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Navigation</div>
                    <HealthBar value={vessel.nav} color="bg-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Hull Integrity</div>
                    <HealthBar value={vessel.hull} color={vessel.hull > 85 ? "bg-emerald-400" : "bg-rose-400"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Emissions Guard" && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emissionsData.map((e) => {
                const pct = Math.round((e.co2 / e.target) * 100);
                return (
                  <div key={e.vessel} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-center gap-3">
                    <div className="relative">
                      <EmissionArc percentage={pct} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-slate-700">{pct}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-slate-800 mb-1">{e.vessel}</div>
                      <div className="text-xs text-slate-500">{e.co2}t CO₂ / {e.target}t limit</div>
                      <span className={`inline-block mt-2 text-xs font-bold px-2.5 py-0.5 rounded-full border ${e.ratingColor}`}>
                        IMO Rating: {e.rating}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-semibold text-slate-700">Fleet Monthly CO₂ Progress</span>
                <span>Jun 2026</span>
              </div>
              <div className="flex gap-1 items-end h-12">
                {[62, 74, 81, 69, 58, 72, 66, 78, 83, 71, 65, 59, 68, 76, 74, 70, 67, 71, 63, 72, 68, 75, 71, 69].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-blue-400 to-cyan-300 transition-all duration-500"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
