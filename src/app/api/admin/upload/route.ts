import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { slugify } from "@/lib/site-store";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);

export async function POST(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!allowed.has(file.type) || file.size > 6 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "file" }, { status: 400 });
  }
  const ext = file.type.includes("png") ? "png" : file.type.includes("webp") ? "webp" : "jpg";
  const name = slugify(file.name.replace(/\.[^.]+$/, "")) || `cover-${Date.now()}`;
  const filename = `${name}-${Date.now().toString().slice(-6)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "works");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buf);
  return NextResponse.json({ ok: true, url: `/works/${filename}` });
}
