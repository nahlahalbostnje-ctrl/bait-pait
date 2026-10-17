import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const MESSAGE_STATUSES = ["new", "in_progress", "replied", "closed"] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
  status: MessageStatus;
  notes: string;
  repliedAt?: string;
};

const filePath = path.join(process.cwd(), "data", "messages.json");

function isStatus(value: unknown): value is MessageStatus {
  return MESSAGE_STATUSES.includes(value as MessageStatus);
}

export function normalizeMessage(raw: Partial<ContactMessage> & { id?: string }): ContactMessage {
  const createdAt = raw.createdAt && !Number.isNaN(Date.parse(raw.createdAt)) ? raw.createdAt : new Date().toISOString();
  return {
    id: raw.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: String(raw.name || "زائر").trim() || "زائر",
    email: String(raw.email || "").trim(),
    phone: raw.phone ? String(raw.phone).trim() : undefined,
    message: String(raw.message || "").trim(),
    createdAt,
    read: Boolean(raw.read),
    starred: Boolean(raw.starred),
    archived: Boolean(raw.archived),
    status: isStatus(raw.status) ? raw.status : raw.read ? "in_progress" : "new",
    notes: String(raw.notes || ""),
    repliedAt: raw.repliedAt,
  };
}

async function ensureFile() {
  await mkdir(path.dirname(filePath), { recursive: true });
  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, "[]", "utf8");
  }
}

export async function listMessages(): Promise<ContactMessage[]> {
  await ensureFile();
  const raw = await readFile(filePath, "utf8");
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => normalizeMessage(item as Partial<ContactMessage>));
  } catch {
    return [];
  }
}

export async function saveMessages(items: ContactMessage[]) {
  await ensureFile();
  await writeFile(filePath, JSON.stringify(items.map(normalizeMessage), null, 2), "utf8");
}

export async function addMessage(
  input: Pick<ContactMessage, "name" | "email" | "message"> & { phone?: string },
) {
  const items = await listMessages();
  const row = normalizeMessage({
    ...input,
    read: false,
    starred: false,
    archived: false,
    status: "new",
    notes: "",
  });
  items.unshift(row);
  await saveMessages(items);
  return row;
}

export function messageCounts(items: ContactMessage[]) {
  const inbox = items.filter((m) => !m.archived);
  return {
    total: items.length,
    inbox: inbox.length,
    unread: inbox.filter((m) => !m.read).length,
    starred: items.filter((m) => m.starred && !m.archived).length,
    archived: items.filter((m) => m.archived).length,
    new: inbox.filter((m) => m.status === "new").length,
  };
}
