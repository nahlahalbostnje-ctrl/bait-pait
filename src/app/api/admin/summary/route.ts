import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { listMessages, messageCounts } from "@/lib/messages";
import { getWorks } from "@/lib/site-store";

export async function GET() {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const [items, works] = await Promise.all([listMessages(), getWorks()]);
  const unread = messageCounts(items).unread;
  const bySector = works.reduce<Record<string, number>>((acc, w) => {
    acc[w.sector] = (acc[w.sector] || 0) + 1;
    return acc;
  }, {});
  return NextResponse.json({
    ok: true,
    messages: items.length,
    unread,
    works: works.length,
    families: new Set(works.map((w) => w.family)).size,
    bySector,
    latest: items.slice(0, 5),
  });
}
