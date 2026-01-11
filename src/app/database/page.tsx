"use client";

import { useState, useEffect } from "react";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";
import { BorderMagicButton } from "@/components/ui/border-magic-button";
import { StarField } from "@/components/ui/star-field";
import {
  IconDownload,
  IconRefresh,
  IconPhone,
  IconMail,
  IconMapPin,
  IconLoader2,
  IconExternalLink,
  IconStar,
  IconWorld,
  IconMinus,
  IconBrandFacebook,
  IconBrandInstagram,
  IconFileTypePdf,
  IconSquare,
  IconSquareCheck,
  IconSparkles,
} from "@tabler/icons-react";

type Lead = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  url?: string;
  source: string;
  rating?: number;
  reviews?: number;
  hasWebsite?: boolean;
  facebook?: string;
  instagram?: string;
  description?: string | null;
  created_at: string;
};

export default function DatabasePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, withPhone: 0, withEmail: 0 });

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads?limit=100`);
      if (res.ok) {
        const data = await res.json();
        const leadsData = data.leads || [];
        setLeads(leadsData);
        setStats({
          total: leadsData.length,
          withPhone: leadsData.filter((l: Lead) => l.phone).length,
          withEmail: leadsData.filter((l: Lead) => l.email).length,
        });
      }
    } catch {
      // Failed to fetch
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(leads.map(l => l.id)));
    }
  };

  const getExportLeads = () => {
    if (selectedIds.size > 0) {
      return leads.filter(l => selectedIds.has(l.id));
    }
    return leads;
  };

  const exportCSV = () => {
    const exportLeads = getExportLeads();
    const headers = ["Name", "Description", "Phone", "Email", "Google Maps URL", "Address", "Source", "Rating", "Reviews", "Has Website", "Facebook", "Instagram", "Date"];
    const rows = exportLeads.map((l) => {
      const mapUrl = l.url || `https://www.google.com/maps/search/${encodeURIComponent(l.name + " " + (l.address || ""))}`;
      return [
        l.name,
        l.description || "",
        l.phone || "",
        l.email || "",
        mapUrl,
        l.address || "",
        l.source,
        l.rating || "",
        l.reviews || "",
        l.hasWebsite ? "Yes" : "No",
        l.facebook || "",
        l.instagram || "",
        new Date(l.created_at).toLocaleDateString(),
      ];
    });
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const exportPDF = () => {
    const exportLeads = getExportLeads();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bernard Leads Export</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; }
          h1 { font-size: 24px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #0a0a0a; color: white; }
          tr:nth-child(even) { background: #f9f9f9; }
          .meta { color: #666; font-size: 12px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <h1>Bernard Lead Export</h1>
        <p class="meta">Generated: ${new Date().toLocaleString()} | Total Leads: ${exportLeads.length}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>
            ${exportLeads.map(l => `
              <tr>
                <td>${l.name}</td>
                <td>${l.description || "-"}</td>
                <td>${l.phone || "-"}</td>
                <td>${l.email || "-"}</td>
                <td>${l.address || "-"}</td>
                <td>${l.rating || "-"}</td>
                <td>${l.reviews || "-"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] relative">
      <StarField />
      <AceternitySidebar />

      <main className="flex-1 p-6 md:p-12 ml-0 md:ml-[72px] pt-20 md:pt-12 overflow-x-hidden relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Beta Banner */}
          <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
            <div className="relative flex items-center gap-3">
              <IconSparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-sm text-neutral-300">
                <span className="text-cyan-400 font-medium">Beta Mode:</span> Have ideas to make Bernard better? Contact us via the menu to request features or give feedback!
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Leads</h1>
                <p className="text-neutral-500 text-sm">{stats.total} total{selectedIds.size > 0 && ` • ${selectedIds.size} selected`}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="px-3 py-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 text-xs font-medium transition-colors active:scale-95"
                >
                  {selectedIds.size === leads.length && leads.length > 0 ? "Deselect" : "Select All"}
                </button>
                <button
                  onClick={fetchLeads}
                  className="p-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 transition-colors active:scale-95 flex items-center justify-center"
                >
                  <IconRefresh className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>
            {/* Export Buttons - Separate row on mobile */}
            <div className="flex items-center gap-2">
              <BorderMagicButton
                onClick={exportCSV}
                disabled={leads.length === 0}
              >
                <IconDownload className="w-4 h-4" />
                <span className="hidden sm:inline">CSV</span>
                <span className="sm:hidden">CSV</span>
                {selectedIds.size > 0 && <span className="text-cyan-400">({selectedIds.size})</span>}
              </BorderMagicButton>
              <BorderMagicButton
                onClick={exportPDF}
                disabled={leads.length === 0}
              >
                <IconFileTypePdf className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
                <span className="sm:hidden">PDF</span>
                {selectedIds.size > 0 && <span className="text-cyan-400">({selectedIds.size})</span>}
              </BorderMagicButton>
            </div>
          </div>

          {/* Selection Helper - Hidden on mobile for cleaner look */}
          <p className="text-xs text-neutral-500/70 text-center hidden sm:block">
            💡 Click the checkbox on each lead to select specific ones for export
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-3"
          >
            <div className="bg-[#111] rounded-xl border border-neutral-800 p-4 text-center">
              <p className="text-2xl font-light text-white">{stats.total}</p>
              <p className="text-xs text-neutral-500">Total</p>
            </div>
            <div className="bg-[#111] rounded-xl border border-neutral-800 p-4 text-center">
              <p className="text-2xl font-light text-emerald-400">{stats.withPhone}</p>
              <p className="text-xs text-neutral-500">With Phone</p>
            </div>
            <div className="bg-[#111] rounded-xl border border-neutral-800 p-4 text-center">
              <p className="text-2xl font-light text-cyan-400">{stats.withEmail}</p>
              <p className="text-xs text-neutral-500">With Email</p>
            </div>
          </div>

          {/* Leads List */}
          <div
            className="space-y-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <IconLoader2 className="w-6 h-6 text-neutral-500 animate-spin" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                No leads yet. Run a scan to get started.
              </div>
            ) : (
              leads.map((lead: Lead) => {
                // Use scraped URL or generate a smart search link
                const mapUrl = lead.url || `https://www.google.com/maps/search/${encodeURIComponent(lead.name + " " + (lead.address || ""))}`;
                const isSelected = selectedIds.has(lead.id);

                return (
                  <div
                    key={lead.id}
                    className={`gloss bg-[#0d0d0d] backdrop-blur-md rounded-2xl border p-6 transition-all duration-200 hover:shadow-[0_0_40px_-12px_rgba(6,182,212,0.25)] group ${isSelected ? 'border-cyan-500/60 bg-cyan-950/20 ring-1 ring-cyan-500/20' : 'border-neutral-800/60 hover:border-cyan-500/40'}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleSelect(lead.id)}
                        className="mt-1 shrink-0 text-neutral-500 hover:text-cyan-400 transition-colors"
                      >
                        {isSelected ? (
                          <IconSquareCheck className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <IconSquare className="w-5 h-5" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium truncate text-lg tracking-tight group-hover:text-cyan-400 transition-colors">{lead.name}</h3>
                          {lead.rating && lead.rating > 0 && (
                            <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                              <IconStar className="w-3 h-3 fill-amber-400" />
                              {lead.rating} ({lead.reviews})
                            </span>
                          )}
                          {lead.hasWebsite !== undefined && (
                            <span className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${lead.hasWebsite ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-neutral-500 bg-neutral-800 border-neutral-700'}`}>
                              {lead.hasWebsite ? <IconWorld className="w-3 h-3" /> : <IconMinus className="w-3 h-3" />}
                              {lead.hasWebsite ? 'Web' : 'No Web'}
                            </span>
                          )}
                        </div>

                        {/* Company Description/Category */}
                        {lead.description && (
                          <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                            {lead.description}
                          </p>
                        )}

                        {/* Phone - Primary contact method */}
                        {lead.phone ? (
                          <div className="flex items-center gap-3">
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                              <IconPhone className="w-4 h-4" />
                              {lead.phone}
                            </a>
                            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors" title="View on Google Maps">
                              <IconMapPin className="w-4 h-4" />
                            </a>
                            {/* Social Media Links */}
                            {lead.facebook && (
                              <a href={lead.facebook} target="_blank" rel="noopener noreferrer" className="mt-3 p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors" title="Facebook">
                                <IconBrandFacebook className="w-4 h-4" />
                              </a>
                            )}
                            {lead.instagram && (
                              <a href={lead.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 p-2 rounded-lg bg-pink-600/20 border border-pink-500/30 text-pink-400 hover:bg-pink-600/30 transition-colors" title="Instagram">
                                <IconBrandInstagram className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ) : (
                          <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm font-medium hover:bg-neutral-700 hover:border-neutral-600 transition-all hover:scale-[1.02]"
                          >
                            <IconMapPin className="w-4 h-4 text-emerald-500" />
                            Find Number on Maps
                            <IconExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        )}

                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-neutral-400">
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                              <IconMail className="w-3 h-3" />
                              {lead.email}
                            </a>
                          )}
                          {lead.address && (
                            <span className="flex items-center gap-1 truncate">
                              <IconMapPin className="w-3 h-3 shrink-0" />
                              {lead.address}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500 shrink-0">
                        {lead.source}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
