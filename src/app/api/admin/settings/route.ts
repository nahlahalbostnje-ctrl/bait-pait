import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { DEFAULT_SETTINGS, digitsPhone, getSettings, saveSettings, type SiteSettings } from "@/lib/site-store";

export async function GET() {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, settings: await getSettings() });
}

export async function PUT(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Partial<SiteSettings> | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });
  const current = await getSettings();
  const next: SiteSettings = {
    ...current,
    ...body,
    stats: body.stats?.length ? body.stats : current.stats,
  };
  if (body.phoneDisplay && !body.phoneWhatsapp) {
    next.phoneWhatsapp = digitsPhone(body.phoneDisplay);
  }
  if (!next.companyTitle) next.companyTitle = DEFAULT_SETTINGS.companyTitle;
  await saveSettings(next);
  return NextResponse.json({ ok: true, settings: next });
}
