"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CalendarDays,
  Users,
} from "lucide-react";
import type { DashboardData, Order, WaitlistEntry } from "@/types/order";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONFIRMED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  ACTIVE: "bg-green-500/20 text-green-400 border-green-500/30",
  COMPLETED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => (
  <div className="relative p-[1px] rounded-xl bg-gradient-to-br from-white/10 to-white/5">
    <div className="rounded-xl bg-black/60 backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div
        className="text-2xl font-bold text-[#FCDF59]"
        style={{ fontFamily: "NeueMachina, serif" }}
      >
        {value}
      </div>
      <div className="text-xs text-[#FCDF59]/50 uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error("Failed to fetch stats:", e);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#FCDF59]"
              style={{ fontFamily: "NeueMachina, serif" }}
            >
              Dashboard
            </h1>
            <p className="text-sm text-[#FCDF59]/50 mt-1">
              Welcome back, {session?.user?.name || 'Admin'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/waitlist"
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59]/60 text-sm font-medium flex items-center gap-2 hover:text-[#FCDF59] hover:bg-white/10 transition-all duration-300"
            >
              <Users className="w-4 h-4" />
              Waitlist
            </Link>
            <Link
              href="/admin/orders"
              className="px-5 py-2.5 rounded-xl bg-[#FCDF59]/10 border border-[#FCDF59]/20 text-[#FCDF59] text-sm font-medium flex items-center gap-2 hover:bg-[#FCDF59]/20 transition-colors duration-300"
            >
              <ClipboardList className="w-4 h-4" />
              All Orders
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FCDF59]/60 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats grid */}
        {stats && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              <StatCard
                label="Total Orders"
                value={stats.stats.total}
                icon={Package}
                color="bg-[#FCDF59]/10 text-[#FCDF59]"
              />
              <StatCard
                label="Waitlist"
                value={stats.stats.waitlistTotal}
                icon={Users}
                color="bg-purple-500/10 text-purple-400"
              />
              <StatCard
                label="Today's Orders"
                value={stats.stats.todayOrders}
                icon={CalendarDays}
                color="bg-blue-500/10 text-blue-400"
              />
              <StatCard
                label="Pending"
                value={stats.stats.pending}
                icon={Clock}
                color="bg-amber-500/10 text-amber-400"
              />
              <StatCard
                label="Active"
                value={stats.stats.active}
                icon={TrendingUp}
                color="bg-green-500/10 text-green-400"
              />
              <StatCard
                label="Confirmed"
                value={stats.stats.confirmed}
                icon={CheckCircle2}
                color="bg-blue-500/10 text-blue-400"
              />
              <StatCard
                label="Completed"
                value={stats.stats.completed}
                icon={CheckCircle2}
                color="bg-emerald-500/10 text-emerald-400"
              />
              <StatCard
                label="Cancelled"
                value={stats.stats.cancelled}
                icon={XCircle}
                color="bg-red-500/10 text-red-400"
              />
            </div>

            {/* Recent Orders */}
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
              <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold text-[#FCDF59]"
                    style={{ fontFamily: "NeueMachina, serif" }}
                  >
                    Recent Orders
                  </h2>
                  <Link
                    href="/admin/orders"
                    className="text-sm text-[#FCDF59]/50 hover:text-[#FCDF59] transition-colors duration-300"
                  >
                    View all →
                  </Link>
                </div>

                {stats.recentOrders.length === 0 ? (
                  <p className="text-[#FCDF59]/40 text-center py-8">
                    No orders yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
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
                            Dates
                          </th>
                          <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders.map((order: Order) => (
                          <tr
                            key={order.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                          >
                            <td className="py-3 px-4 text-sm text-[#FCDF59]">
                              {order.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#FCDF59]/70">
                              {order.phone}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#FCDF59]/70">
                              {[
                                order.breakfast && "B",
                                order.lunch && "L",
                                order.dinner && "D",
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#FCDF59]/70">
                              {order.startDate} → {order.endDate}
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            {/* Recent Waitlist */}
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 mt-8">
              <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold text-[#FCDF59]"
                    style={{ fontFamily: "NeueMachina, serif" }}
                  >
                    Recent Waitlist Signups
                  </h2>
                  <Link
                    href="/admin/waitlist"
                    className="text-sm text-[#FCDF59]/50 hover:text-[#FCDF59] transition-colors duration-300"
                  >
                    View all →
                  </Link>
                </div>

                {stats.recentWaitlist?.length === 0 ? (
                  <p className="text-[#FCDF59]/40 text-center py-8">
                    No waitlist entries yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                            Name
                          </th>
                          <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                            Phone
                          </th>
                          <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                            Address
                          </th>
                          <th className="text-left text-xs text-[#FCDF59]/40 uppercase tracking-wider py-3 px-4">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentWaitlist?.map((entry: WaitlistEntry) => (
                          <tr
                            key={entry.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                          >
                            <td className="py-3 px-4 text-sm text-[#FCDF59]">
                              {entry.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#FCDF59]/70">
                              {entry.phone}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#FCDF59]/70 truncate max-w-[200px]" title={entry.address}>
                              {entry.address}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#FCDF59]/70">
                               {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
