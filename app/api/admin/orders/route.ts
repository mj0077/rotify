import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/admin/orders — List orders with filtering & pagination
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const search = searchParams.get("search") || "";

  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { phone: { contains: search } },
    ];
  }

  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.error("Orders fetch error:", e);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// PATCH /api/admin/orders — Update order status
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    const validStatuses = ["PENDING", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ ok: true, order });
  } catch (e) {
    console.error("Order update error:", e);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
