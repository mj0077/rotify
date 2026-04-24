import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET /api/admin/waitlist — Fetch waitlist entries
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "15") || 15;
    const skip = (page - 1) * limit;

    const where: Prisma.WaitlistEntryWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { address: { contains: search } },
      ];
    }

    const [entries, total] = await Promise.all([
      prisma.waitlistEntry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.waitlistEntry.count({ where }),
    ]);

    return NextResponse.json({
      entries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Waitlist fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist entries" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/waitlist - Delete a waitlist entry
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing entry ID" }, { status: 400 });
    }

    const entry = await prisma.waitlistEntry.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    console.error("Waitlist delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete waitlist entry" },
      { status: 500 }
    );
  }
}
