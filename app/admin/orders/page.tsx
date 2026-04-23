"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONFIRMED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  ACTIVE: "bg-green-500/20 text-green-400 border-green-500/30",
  COMPLETED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statuses = ["ALL", "PENDING", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"];

export default function AdminOrdersPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [authStatus, router]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
      });
      if (filter !== "ALL") params.set("status", filter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/orders?${params}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
        setPagination(data.pagination);
      }
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    } finally {
      setLoading(false);
    }
  }, [page, filter, search]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchOrders();
    }
  }, [authStatus, fetchOrders]);

  const updateStatus = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o: any) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    } finally {
      setUpdatingId(null);
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
                Orders
              </h1>
              <p className="text-sm text-[#FCDF59]/50">
                {pagination ? `${pagination.total} total orders` : "Loading..."}
              </p>
            </div>
          </div>
          <button
            onClick={fetchOrders}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59]/60 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FCDF59]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or phone..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59] placeholder:text-[#FCDF59]/30 text-sm outline-none focus:border-[#FCDF59]/50 transition-colors duration-300"
            />
          </div>

          {/* Status filters */}
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setFilter(s);
                  setPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  filter === s
                    ? "bg-[#FCDF59]/20 text-[#FCDF59] border border-[#FCDF59]/30"
                    : "bg-white/5 text-[#FCDF59]/50 border border-white/10 hover:bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#FCDF59]/30 border-t-[#FCDF59] rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-[#FCDF59]/40 text-center py-20">
                No orders found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        #
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Customer
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Phone
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Meals
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Schedule
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Status
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Created
                      </th>
                      <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="py-3 px-4 text-sm text-[#FCDF59]/50">
                          {order.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#FCDF59] font-medium">
                          {order.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#FCDF59]/70">
                          {order.phone}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {order.breakfast && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs">
                                B
                              </span>
                            )}
                            {order.lunch && (
                              <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs">
                                L
                              </span>
                            )}
                            {order.dinner && (
                              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs">
                                D
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#FCDF59]/60">
                          {order.startDate}
                          <br />→ {order.endDate}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                              statusColors[order.status] || statusColors.PENDING
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#FCDF59]/50">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(order.id, e.target.value)
                            }
                            disabled={updatingId === order.id}
                            className="bg-white/5 border border-white/10 rounded-lg text-xs text-[#FCDF59] px-2 py-1.5 outline-none cursor-pointer disabled:opacity-50"
                          >
                            {statuses
                              .filter((s) => s !== "ALL")
                              .map((s) => (
                                <option key={s} value={s} className="bg-zinc-900">
                                  {s}
                                </option>
                              ))}
                          </select>
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
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
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
