"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ChevronLeft, ChevronRight, RefreshCw, Trash2 } from "lucide-react";

export default function AdminWaitlistPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [entries, setEntries] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [authStatus, router]);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
      });
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/waitlist?${params}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
        setPagination(data.pagination);
      }
    } catch (e) {
      console.error("Failed to fetch entries:", e);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchEntries();
    }
  }, [authStatus, fetchEntries]);

  const deleteEntry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this waitlist entry?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/waitlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        setEntries((prev) => prev.filter((entry: any) => entry.id !== id));
        fetchEntries(); // Refresh stats
      } else {
        alert("Failed to delete entry");
      }
    } catch (e) {
      console.error("Failed to delete entry:", e);
    } finally {
      setDeletingId(null);
    }
  };

  if (authStatus === "loading") {
    return (
       <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#FCDF59]/30 border-t-[#FCDF59] rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FCDF59]/60 hover:text-[#FCDF59] hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#FCDF59]"
                style={{ fontFamily: "NeueMachina, serif" }}
              >
                Waitlist
              </h1>
              <p className="text-sm text-[#FCDF59]/50">
                {pagination ? `${pagination.total} total signups` : "Loading..."}
              </p>
            </div>
          </div>
          <button
            onClick={fetchEntries}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59]/60 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FCDF59]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, phone, or address..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59] placeholder:text-[#FCDF59]/30 text-sm outline-none focus:border-[#FCDF59]/50 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Table */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#FCDF59]/30 border-t-[#FCDF59] rounded-full animate-spin" />
              </div>
            ) : entries.length === 0 ? (
              <p className="text-[#FCDF59]/40 text-center py-20">
                No waitlist entries found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">#</th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">Name</th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">Phone</th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">Address</th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">Date</th>
                      <th className="text-right text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                        <td className="py-3 px-4 text-sm text-[#FCDF59]/50">{entry.id}</td>
                        <td className="py-3 px-4 text-sm text-[#FCDF59] font-medium">{entry.name}</td>
                        <td className="py-3 px-4 text-sm text-[#FCDF59]/70">{entry.phone}</td>
                        <td className="py-3 px-4 text-sm text-[#FCDF59]/70 max-w-xs truncate" title={entry.address}>
                          {entry.address}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#FCDF59]/50">
                          {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric", hour: '2-digit', minute:'2-digit'
                          })}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            disabled={deletingId === entry.id}
                            className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors disabled:opacity-50"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                <p className="text-xs text-[#FCDF59]/40">
                  Page {pagination.page} of {pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FCDF59]/60 disabled:opacity-30 hover:bg-white/10 transition-colors duration-300"
                  >
                     <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page >= pagination.totalPages}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FCDF59]/60 disabled:opacity-30 hover:bg-white/10 transition-colors duration-300"
                  >
                     <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
