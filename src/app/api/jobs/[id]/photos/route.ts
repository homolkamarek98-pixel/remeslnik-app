import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  const currentCount = await prisma.jobPhoto.count({ where: { jobId: id } });
  if (currentCount >= MAX_PHOTOS) {
    return NextResponse.json({ error: `Max ${MAX_PHOTOS} fotek na zakázku` }, { status: 422 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Chybí soubor" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Nepodporovaný formát obrázku" }, { status: 415 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Soubor je příliš velký (max 10MB)" }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const key = `photos/${session.user.id}/${id}/${Date.now()}.${ext}`;
  const url = await uploadToR2(key, buffer, file.type);

  const photo = await prisma.jobPhoto.create({
    data: { jobId: id, url, key },
  });

  return NextResponse.json(photo, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const photoId = req.nextUrl.searchParams.get("photoId");
  if (!photoId) return NextResponse.json({ error: "Chybí photoId" }, { status: 400 });

  const photo = await prisma.jobPhoto.findFirst({
    where: { id: photoId, jobId: id, job: { userId: session.user.id } },
  });
  if (!photo) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  await deleteFromR2(photo.key);
  await prisma.jobPhoto.delete({ where: { id: photoId } });

  return new NextResponse(null, { status: 204 });
}
