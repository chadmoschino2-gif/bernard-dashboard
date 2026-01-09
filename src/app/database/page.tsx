"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowClockwise, DownloadSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";

type Lead = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  website: string | null;
  website_status: string | null;
  source: string | null;
  created_at: string;
  city: string | null;
  state: string | null;
  niche: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://bernard-scraperg.onrender.com";

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function DatabasePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(200);

  const fetchLeads = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads?limit=${limit}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`API error (${res.status})`);
      const data: { leads: Lead[] } = await res.json();
      setLeads(data.leads ?? []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load leads";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) => {
      const haystack = [
        l.name,
        l.phone ?? "",
        l.email ?? "",
        l.address ?? "",
        l.source ?? "",
        l.city ?? "",
        l.state ?? "",
        l.niche ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [leads, query]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <AceternitySidebar />

      <main className="flex-1 p-8 ml-16 md:ml-64 transition-all duration-300">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-light text-white tracking-tight">Lead Database</h1>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                Postgres
              </span>
            </div>
            <p className="text-neutral-500 text-sm mt-1">
              Leads scraped by Bernard and stored in your database.
            </p>
            <p className="text-xs text-neutral-600 mt-2">
              API: <code className="font-mono text-neutral-400">{API_URL}</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${API_URL}/api/leads/export.csv`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 transition-colors text-sm"
            >
              <DownloadSimple className="w-4 h-4" weight="bold" />
              Export CSV
            </a>
            <button
              type="button"
              onClick={fetchLeads}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 transition-colors text-sm"
              disabled={loading}
            >
              <ArrowClockwise className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} weight="bold" />
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-[#111] rounded-2xl border border-neutral-800 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between mb-4">
            <div className="relative w-full md:max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, phone, city, niche…"
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <label className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Limit</span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                  className="rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-200 px-2 py-2 focus:outline-none focus:border-neutral-700"
                >
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                </select>
              </label>
              <div className="text-xs">
                Showing <span className="text-neutral-200">{filtered.length}</span> /{" "}
                <span className="text-neutral-200">{leads.length}</span>
              </div>
              <Link href="/" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                Back to Dashboard
              </Link>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-amber-200 text-sm">
              {error}
              <div className="text-xs text-amber-200/70 mt-1">
                Make sure your backend is live and <code className="font-mono">NEXT_PUBLIC_API_URL</code> is set correctly.
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 border-b border-neutral-800">
                  <th className="py-3 pr-4 font-medium">Business</th>
                  <th className="py-3 pr-4 font-medium">Phone</th>
                  <th className="py-3 pr-4 font-medium">Address</th>
                  <th className="py-3 pr-4 font-medium">Source</th>
                  <th className="py-3 pr-4 font-medium">City</th>
                  <th className="py-3 pr-4 font-medium">Niche</th>
                  <th className="py-3 pr-0 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-neutral-400">
                      Loading leads…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-neutral-500">
                      No leads yet. Run a scan from the dashboard.
                    </td>
                  </tr>
                ) : (
                  filtered.map((l) => (
                    <tr key={l.id} className="border-b border-neutral-900/60 hover:bg-neutral-900/30">
                      <td className="py-3 pr-4">
                        <div className="text-neutral-100">{l.name}</div>
                        {l.website_status && (
                          <div className="text-xs text-neutral-600 mt-0.5">
                            website: {l.website_status}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-neutral-200">
                        {l.phone ? (
                          <a className="text-cyan-400 hover:text-cyan-300" href={`tel:${l.phone}`}>
                            {l.phone}
                          </a>
                        ) : (
                          <span className="text-neutral-600">—</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-neutral-300">
                        {l.address ? l.address : <span className="text-neutral-600">—</span>}
                      </td>
                      <td className="py-3 pr-4 text-neutral-300">
                        {l.source ?? <span className="text-neutral-600">—</span>}
                      </td>
                      <td className="py-3 pr-4 text-neutral-300">
                        {l.city ? `${l.city}${l.state ? `, ${l.state}` : ""}` : <span className="text-neutral-600">—</span>}
                      </td>
                      <td className="py-3 pr-4 text-neutral-300">
                        {l.niche ?? <span className="text-neutral-600">—</span>}
                      </td>
                      <td className="py-3 pr-0 text-neutral-500">{formatDate(l.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

