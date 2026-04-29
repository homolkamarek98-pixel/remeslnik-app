import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

// Vercel Cron: runs daily at 09:00 UTC
// vercel.json: { "path": "/api/cron/overdue", "schedule": "0 9 * * *" }
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const result = await prisma.invoice.updateMany({
    where: {
      status: InvoiceStatus.SENT,
      dueDate: { lt: now },
    },
    data: { status: InvoiceStatus.OVERDUE },
  });

  // TODO Sprint 4: send overdue reminder emails via Resend

  return NextResponse.json({ updated: result.count });
}
