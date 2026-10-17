import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import {
  listMessages,
  messageCounts,
  MESSAGE_STATUSES,
  saveMessages,
  type ContactMessage,
  type MessageStatus,
} from "@/lib/messages";

function patchRow(
  m: ContactMessage,
  patch: {
    read?: boolean;
    starred?: boolean;
    archived?: boolean;
    notes?: string;
    status?: MessageStatus;
  },
): ContactMessage {
  const next: ContactMessage = { ...m };
  if (typeof patch.read === "boolean") next.read = patch.read;
  if (typeof patch.starred === "boolean") next.starred = patch.starred;
  if (typeof patch.archived === "boolean") next.archived = patch.archived;
  if (typeof patch.notes === "string") next.notes = patch.notes;
  if (patch.status && MESSAGE_STATUSES.includes(patch.status)) {
    next.status = patch.status;
    if (patch.status === "replied" && !next.repliedAt) next.repliedAt = new Date().toISOString();
    if (patch.status !== "new") next.read = true;
  }
  return next;
}

function applyAction(m: ContactMessage, action: string): ContactMessage | null {
  switch (action) {
    case "read":
      return { ...m, read: true, status: m.status === "new" ? "in_progress" : m.status };
    case "unread":
      return { ...m, read: false };
    case "star":
      return { ...m, starred: true };
    case "unstar":
      return { ...m, starred: false };
    case "archive":
      return { ...m, archived: true, read: true };
    case "unarchive":
      return { ...m, archived: false };
    case "delete":
      return null;
    default:
      return m;
  }
}

export async function GET() {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const items = await listMessages();
  return NextResponse.json({ ok: true, items, counts: messageCounts(items) });
}

export async function PATCH(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as {
    id?: string;
    ids?: string[];
    read?: boolean;
    starred?: boolean;
    archived?: boolean;
    notes?: string;
    status?: MessageStatus;
    action?: string;
  } | null;

  const ids = [...new Set([body?.id, ...(body?.ids || [])].filter(Boolean) as string[])];
  if (!ids.length) return NextResponse.json({ ok: false }, { status: 400 });

  const items = await listMessages();
  const idSet = new Set(ids);
  let next: ContactMessage[] = [];

  for (const m of items) {
    if (!idSet.has(m.id)) {
      next.push(m);
      continue;
    }
    if (body?.action) {
      const updated = applyAction(m, body.action);
      if (updated) next.push(updated);
      continue;
    }
    next.push(patchRow(m, body || {}));
  }

  await saveMessages(next);
  return NextResponse.json({ ok: true, items: next, counts: messageCounts(next) });
}

export async function DELETE(req: Request) {
  if (!isAdminLoggedIn()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { id?: string; ids?: string[] } | null;
  const ids = new Set([body?.id, ...(body?.ids || [])].filter(Boolean) as string[]);
  if (!ids.size) return NextResponse.json({ ok: false }, { status: 400 });
  const items = await listMessages();
  const next = items.filter((m) => !ids.has(m.id));
  await saveMessages(next);
  return NextResponse.json({ ok: true, items: next, counts: messageCounts(next) });
}
