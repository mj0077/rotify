import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/admin/stats — Dashboard statistics
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [total, pending, confirmed, active, completed, cancelled, todayOrders, recentOrders, waitlistTotal, recentWaitlist] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: "PENDING" } }),
        prisma.order.count({ where: { status: "CONFIRMED" } }),
        prisma.order.count({ where: { status: "ACTIVE" } }),
        prisma.order.count({ where: { status: "COMPLETED" } }),
        prisma.order.count({ where: { status: "CANCELLED" } }),
        prisma.order.count({ where: { createdAt: { gte: today } } }),
        prisma.order.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.waitlistEntry.count(),
        prisma.waitlistEntry.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      ]);

    return NextResponse.json({
      stats: {
        total,
        pending,
        confirmed,
        active,
        completed,
        cancelled,
        todayOrders,
        waitlistTotal,
      },
      recentOrders,
      recentWaitlist,
    });
  } catch (e) {
    console.error("Stats fetch error:", e);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
