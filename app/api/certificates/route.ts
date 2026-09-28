import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !["ADMIN", "CLERK"].includes(session.user.role)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json() as { donorId?: string };
  if (!body.donorId) return NextResponse.json({ error: "Donor ID is required" }, { status: 400 });
  const donor = await prisma.donor.findUnique({ where: { id: body.donorId } });
  if (!donor) return NextResponse.json({ error: "Donor not found" }, { status: 404 });
  const year = new Date().getFullYear();
  const count = await prisma.certificateLog.count({ where: { createdAt: { gte: new Date(`${year}-01-01`) } } });
  const certificateNumber = `NBSZ/CERT/${year}/${String(count + 1).padStart(4, "0")}`;
  const log = await prisma.certificateLog.create({ data: { certificateNumber, donorId: donor.id, printedBy: session.user.id } });
  return NextResponse.json({ certificateNumber: log.certificateNumber, donor });
}