import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { getWorks, saveWorks, SECTOR_CATEGORY, slugify } from "@/lib/site-store";
import type { Work, WorkSector } from "@/lib/works";

const sectors: WorkSector[] = ["food", "productivity", "lifestyle", "business"];

export async function GET() {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, items: await getWorks() });
}

export async function POST(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Partial<Work> | null;
  if (!body?.name) return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  const sector = sectors.includes(body.sector as WorkSector) ? (body.sector as WorkSector) : "productivity";
  const items = await getWorks();
  const id = slugify(body.id || body.nameEn || body.name);
  const unique = items.some((w) => w.id === id) ? `${id}-${Date.now().toString().slice(-4)}` : id;
  const work: Work = {
    id: unique,
    name: body.name,
    nameEn: body.nameEn || body.name,
    sector,
    category: body.category || SECTOR_CATEGORY[sector],
    family: body.family || body.name,
    note: body.note,
    cover: body.cover || null,
    notification: body.notification || null,
  };
  items.unshift(work);
  await saveWorks(items);
  return NextResponse.json({ ok: true, item: work });
}

export async function PUT(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Partial<Work> & { id?: string } | null;
  if (!body?.id) return NextResponse.json({ ok: false }, { status: 400 });
  const items = await getWorks();
  const idx = items.findIndex((w) => w.id === body.id);
  if (idx < 0) return NextResponse.json({ ok: false }, { status: 404 });
  const sector = sectors.includes(body.sector as WorkSector) ? (body.sector as WorkSector) : items[idx].sector;
  items[idx] = {
    ...items[idx],
    ...body,
    id: items[idx].id,
    sector,
    category: body.category || SECTOR_CATEGORY[sector],
  };
  await saveWorks(items);
  return NextResponse.json({ ok: true, item: items[idx] });
}

export async function DELETE(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ ok: false }, { status: 400 });
  const items = await getWorks();
  await saveWorks(items.filter((w) => w.id !== body.id));
  return NextResponse.json({ ok: true });
}
