import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { FormSchema } from '@/assets/schema/formSchema';
import prisma from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  // Rate limiting: 5 submissions per minute per IP
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  const limiter = rateLimit(ip, 5, 60 * 1000);

  if (!limiter.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = FormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, phNumber, startDate, endDate, breakfast, lunch, dinner } = parsed.data;

  // Sanitize name — strip HTML tags
  const sanitizedName = name.replace(/<[^>]*>/g, '').trim();

  // Validate at least one meal is selected
  if (!breakfast && !lunch && !dinner) {
    return NextResponse.json(
      { ok: false, error: "Please select at least one meal type" },
      { status: 400 }
    );
  }

  // Validate end date is not before start date
  if (endDate < startDate) {
    return NextResponse.json(
      { ok: false, error: "End date cannot be before start date" },
      { status: 400 }
    );
  }

  // Validate start date is not before today
  const today = new Date().toISOString().split("T")[0];
  if (startDate < today) {
     return NextResponse.json(
      { ok: false, error: "Start date cannot be in the past" },
      { status: 400 }
    );
  }

  try {
    const order = await prisma.order.create({
      data: {
        name: sanitizedName,
        phone: phNumber,
        startDate,
        endDate,
        breakfast,
        lunch,
        dinner,
        status: "PENDING",
      },
    });

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (e) {
    console.error("Order creation error:", e);
    return NextResponse.json(
      { ok: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
