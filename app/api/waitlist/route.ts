import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { WaitlistSchema } from '@/assets/schema/formSchema';
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

  const parsed = WaitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, phNumber, address } = parsed.data;

  // Sanitize inputs
  const sanitizedName = name.replace(/<[^>]*>/g, '').trim();
  const sanitizedAddress = address.replace(/<[^>]*>/g, '').trim();

  try {
    const entry = await prisma.waitlistEntry.create({
      data: {
        name: sanitizedName,
        phone: phNumber,
        address: sanitizedAddress,
      },
    });

    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    console.error("Waitlist creation error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}
