"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Mail,
  MailOpen,
  Phone,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import type { ContactMessage, MessageStatus } from "@/lib/messages";
import { AdminHeading } from "@/components/admin/AdminHeading";

type Counts = {
  total: number;
  inbox: number;
  unread: number;
  starred: number;
  archived: number;
  new: number;
};

type Folder = "inbox" | "unread" | "starred" | "archived";

const STATUS_LABEL: Record<MessageStatus, string> = {
  new: "جديدة",
  in_progress: "قيد المتابعة",
  replied: "تم الرد",
  closed: "مغلقة",
};

const emptyCounts: Counts = { total: 0, inbox: 0, unread: 0, starred: 0, archived: 0, new: 0 };

function digits(value?: string) {
  return (value || "").replace(/\D/g, "");
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ar-EG", { dateStyle: "medium", timeStyle: "short" });
}

export default function AdminMessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [openId, setOpenId] = useState<string | null>(null);
  const [folder, setFolder] = useState<Folder>("inbox");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [loading, setLoading] = useState(true);

  const applyPayload = useCallback((j: { items?: ContactMessage[]; counts?: Counts }) => {
    setItems(j.items || []);
    if (j.counts) setCounts(j.counts);
  }, []);

  const load = useCallback(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((j) => {
        applyPayload(j);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setCounts(emptyCounts);
        setLoading(false);
      });
  }, [applyPayload]);

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 12000);
    return () => window.clearInterval(timer);
  }, [load]);

  const open = items.find((m) => m.id === openId) || null;

  useEffect(() => {
    setNotes(open?.notes || "");
  }, [open?.id]);

  useEffect(() => {
    setSelected((ids) => ids.filter((id) => items.some((m) => m.id === id)));
  }, [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((m) => {
      if (folder === "inbox" && m.archived) return false;
      if (folder === "unread" && (m.read || m.archived)) return false;
      if (folder === "starred" && (!m.starred || m.archived)) return false;
      if (folder === "archived" && !m.archived) return false;
      if (!q) return true;
      return [m.name, m.email, m.phone, m.message, m.notes].join(" ").toLowerCase().includes(q);
    });
  }, [items, folder, query]);

  async function mutate(body: Record<string, unknown>) {
    const res = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await res.json().catch(() => null);
    if (j?.ok) applyPayload(j);
    else load();
  }

  async function remove(ids: string[]) {
    if (!ids.length) return;
    if (!window.confirm(ids.length > 1 ? `حذف ${ids.length} رسائل؟` : "حذف هذه الرسالة؟")) return;
    const res = await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const j = await res.json().catch(() => null);
    if (openId && ids.includes(openId)) setOpenId(null);
    setSelected([]);
    if (j?.ok) applyPayload(j);
    else load();
  }

  async function openMessage(m: ContactMessage) {
    setOpenId(m.id);
    if (!m.read) await mutate({ id: m.id, action: "read" });
  }

  async function saveNotes() {
    if (!open) return;
    setSavingNotes(true);
    await mutate({ id: open.id, notes });
    setSavingNotes(false);
  }

  const folders: { id: Folder; label: string; count: number }[] = [
    { id: "inbox", label: "الوارد", count: counts.inbox },
    { id: "unread", label: "غير مقروء", count: counts.unread },
    { id: "starred", label: "مميز", count: counts.starred },
    { id: "archived", label: "الأرشيف", count: counts.archived },
  ];

  const mailHref = open ? `mailto:${open.email}?subject=${encodeURIComponent("رد من شركة البستنجي")}&body=${encodeURIComponent(`مرحباً ${open.name}،\n\n`)}` : "#";
  const waHref = open?.phone
    ? `https://wa.me/${digits(open.phone)}?text=${encodeURIComponent(`مرحباً ${open.name}، رداً على رسالتك عبر موقع BAIT PAIT:`)}`
    : "";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <AdminHeading kicker="Inbox" title="رسائل التواصل" />
        <p className="text-sm text-[#94A3B8]">
          {counts.unread} غير مقروءة من أصل {counts.inbox} في الوارد
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setFolder(f.id)}
            className={`admin-card-3d rounded-3xl px-4 py-3 text-right transition ${
              folder === f.id ? "bg-brand/30 text-white ring-1 ring-[#8B5CF6]" : "glass text-[#CBD5E1]"
            }`}
          >
            <p className="font-latin text-2xl font-black">{f.count}</p>
            <p className="text-sm">{f.label}</p>
          </button>
        ))}
      </div>

      <div className="glass flex flex-wrap items-center gap-2 rounded-3xl p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث بالاسم أو البريد أو نص الرسالة"
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pr-10 pl-3 text-sm text-white outline-none placeholder:text-[#64748B]"
          />
        </div>
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => void mutate({ ids: selected, action: "read" })} className="rounded-2xl bg-white/10 px-3 py-2 text-xs">
              مقروء
            </button>
            <button onClick={() => void mutate({ ids: selected, action: "unread" })} className="rounded-2xl bg-white/10 px-3 py-2 text-xs">
              غير مقروء
            </button>
            <button onClick={() => void mutate({ ids: selected, action: folder === "archived" ? "unarchive" : "archive" })} className="rounded-2xl bg-white/10 px-3 py-2 text-xs">
              {folder === "archived" ? "إرجاع" : "أرشفة"}
            </button>
            <button onClick={() => void remove(selected)} className="rounded-2xl bg-rose-500/20 px-3 py-2 text-xs text-rose-200">
              حذف المحدد
            </button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-3">
          {loading ? (
            <div className="glass rounded-3xl p-8 text-sm text-[#94A3B8]">جاري تحميل الرسائل...</div>
          ) : visible.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-sm text-[#94A3B8]">لا توجد رسائل في هذا الصندوق.</div>
          ) : (
            visible.map((m) => (
              <div
                key={m.id}
                className={`glass flex gap-3 rounded-3xl p-3 transition ${
                  open?.id === m.id ? "ring-1 ring-[#8B5CF6]" : "hover:bg-white/5"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(m.id)}
                  onChange={(e) =>
                    setSelected((ids) => (e.target.checked ? [...ids, m.id] : ids.filter((id) => id !== m.id)))
                  }
                  className="mt-3 accent-[#8B5CF6]"
                />
                <button onClick={() => void openMessage(m)} className="min-w-0 flex-1 text-right">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`truncate ${m.read ? "font-medium text-white" : "font-black text-white"}`}>{m.name}</p>
                    <div className="flex items-center gap-2">
                      {m.starred ? <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> : null}
                      {!m.read ? <span className="h-2 w-2 rounded-full bg-[#22D3EE]" /> : null}
                    </div>
                  </div>
                  <p className="mt-1 truncate font-latin text-xs text-[#94A3B8]" dir="ltr">
                    {m.email}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-[#CBD5E1]">{m.message}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>{STATUS_LABEL[m.status]}</span>
                    <span>{formatWhen(m.createdAt)}</span>
                  </div>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="glass rounded-3xl p-6">
          {open ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-white">{open.name}</h2>
                  <p className="mt-1 font-latin text-sm text-[#C084FC]" dir="ltr">
                    {open.email}
                  </p>
                  {open.phone ? (
                    <p className="font-latin text-sm text-[#94A3B8]" dir="ltr">
                      {open.phone}
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs text-[#64748B]">{formatWhen(open.createdAt)}</p>
                </div>
                <button
                  onClick={() => void mutate({ id: open.id, starred: !open.starred })}
                  className="rounded-2xl bg-white/5 p-2"
                  title="تمييز"
                >
                  <Star className={`h-4 w-4 ${open.starred ? "fill-amber-300 text-amber-300" : "text-[#94A3B8]"}`} />
                </button>
              </div>

              <select
                value={open.status}
                onChange={(e) => void mutate({ id: open.id, status: e.target.value as MessageStatus })}
                className="w-full rounded-2xl border border-white/10 bg-[#120924] px-3 py-2 text-sm text-white outline-none"
              >
                {(Object.keys(STATUS_LABEL) as MessageStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </select>

              <p className="whitespace-pre-wrap leading-relaxed text-[#E2E8F0]">{open.message}</p>

              <div className="flex flex-wrap gap-2">
                <a href={mailHref} className="inline-flex items-center gap-2 rounded-2xl bg-brand/30 px-4 py-2 text-sm text-white">
                  <Mail className="h-4 w-4" />
                  رد بالبريد
                </a>
                {waHref ? (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 px-4 py-2 text-sm text-emerald-100"
                  >
                    <Phone className="h-4 w-4" />
                    واتساب
                  </a>
                ) : null}
                <button
                  onClick={() => void mutate({ id: open.id, action: open.read ? "unread" : "read" })}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm"
                >
                  {open.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  {open.read ? "تعليم كغير مقروء" : "تعليم كمقروء"}
                </button>
                <button
                  onClick={() => void mutate({ id: open.id, action: open.archived ? "unarchive" : "archive" })}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm"
                >
                  {open.archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                  {open.archived ? "إرجاع للوارد" : "أرشفة"}
                </button>
                <button
                  onClick={() => void remove([open.id])}
                  className="inline-flex items-center gap-2 rounded-2xl bg-rose-500/20 px-4 py-2 text-sm text-rose-200"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#94A3B8]">ملاحظة داخلية (لا تظهر للعميل)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none"
                  placeholder="اكتب متابعة أو قرار الرد هنا..."
                />
                <button
                  onClick={() => void saveNotes()}
                  disabled={savingNotes || notes === (open.notes || "")}
                  className="mt-2 rounded-2xl bg-white/10 px-4 py-2 text-sm disabled:opacity-40"
                >
                  {savingNotes ? "جاري الحفظ..." : "حفظ الملاحظة"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#94A3B8]">اختر رسالة لعرضها والرد عليها.</p>
          )}
        </div>
      </div>
    </div>
  );
}
