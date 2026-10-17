"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Work, WorkSector } from "@/lib/works";
import { NeonButton } from "@/components/ui/NeonButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { AdminHeading } from "@/components/admin/AdminHeading";

const sectors: { id: WorkSector; label: string }[] = [
  { id: "food", label: "طعام وتوصيل" },
  { id: "productivity", label: "إنتاجية" },
  { id: "lifestyle", label: "نمط حياة" },
  { id: "business", label: "أعمال" },
];

const empty = {
  name: "",
  nameEn: "",
  family: "",
  sector: "productivity" as WorkSector,
  cover: "",
};

export default function AdminWorksPage() {
  const [items, setItems] = useState<Work[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(() => {
    fetch("/api/admin/works")
      .then((r) => r.json())
      .then((j) => setItems(j.items || []))
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(file: File) {
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    const json = await res.json();
    if (!res.ok) throw new Error("upload");
    return json.url as string;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const payload = {
        name: form.name,
        nameEn: form.nameEn,
        family: form.family || form.name,
        sector: form.sector,
        cover: form.cover || null,
      };
      const res = await fetch("/api/admin/works", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { ...payload, id: editing } : payload),
      });
      if (!res.ok) throw new Error("save");
      setForm(empty);
      setEditing(null);
      setMsg(editing ? "تم حفظ التعديل" : "تمت إضافة العمل");
      load();
    } catch {
      setMsg("تعذر الحفظ");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("حذف هذا العمل من الموقع؟")) return;
    await fetch("/api/admin/works", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (editing === id) {
      setEditing(null);
      setForm(empty);
    }
    load();
  }

  function startEdit(w: Work) {
    setEditing(w.id);
    setForm({
      name: w.name,
      nameEn: w.nameEn,
      family: w.family,
      sector: w.sector,
      cover: w.cover || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-5">
      <AdminHeading
        kicker="Portfolio"
        title={editing ? "تعديل عمل" : "إضافة عمل جديد"}
        hint="ما تحفظه هنا يظهر مباشرة في معرض الموقع."
      />

      <form onSubmit={onSubmit} className="glass grid gap-4 rounded-3xl p-6 md:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="الاسم بالعربية"
          className="neu-inset rounded-2xl px-4 py-3 text-white outline-none"
        />
        <input
          value={form.nameEn}
          onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
          placeholder="الاسم بالإنجليزية"
          className="neu-inset rounded-2xl px-4 py-3 text-white outline-none"
        />
        <input
          value={form.family}
          onChange={(e) => setForm({ ...form, family: e.target.value })}
          placeholder="العائلة / المجموعة"
          className="neu-inset rounded-2xl px-4 py-3 text-white outline-none"
        />
        <select
          value={form.sector}
          onChange={(e) => setForm({ ...form, sector: e.target.value as WorkSector })}
          className="neu-inset rounded-2xl px-4 py-3 text-white outline-none"
        >
          {sectors.map((s) => (
            <option key={s.id} value={s.id} className="bg-[#120924]">
              {s.label}
            </option>
          ))}
        </select>
        <label className="md:col-span-2 rounded-2xl border border-dashed border-white/20 p-4 text-sm text-[#94A3B8]">
          شعار / صورة الغلاف
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="mt-2 block w-full text-white"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              try {
                const url = await upload(file);
                setForm((f) => ({ ...f, cover: url }));
              } catch {
                setMsg("تعذر رفع الصورة");
              } finally {
                setBusy(false);
              }
            }}
          />
          {form.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.cover} alt="" className="mt-3 h-20 object-contain" />
          ) : null}
        </label>
        <div className="flex gap-3 md:col-span-2">
          <NeonButton type="submit" className="flex-1">
            {busy ? "جارٍ الحفظ..." : editing ? "حفظ التعديل" : "إضافة للعمل"}
          </NeonButton>
          {editing ? (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(empty);
              }}
              className="glass rounded-2xl px-5 text-sm"
            >
              إلغاء
            </button>
          ) : null}
        </div>
        {msg ? <p className="text-sm text-[#A5F3FC] md:col-span-2">{msg}</p> : null}
      </form>

      <h2 className="text-xl font-black text-white">الأعمال الحالية ({items.length})</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((app) => (
          <TiltCard key={app.id} className="group">
          <article className="glass admin-card-3d overflow-hidden rounded-3xl">
            <div className="flex h-32 items-center justify-center bg-white/[0.04] p-4">
              {app.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={app.cover} alt={app.name} className="max-h-24 w-auto max-w-full object-contain" />
              ) : (
                <p className="text-sm text-[#94A3B8]">{app.name}</p>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white">{app.name}</h3>
              <p className="font-latin text-xs text-[#94A3B8]">{app.nameEn}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => startEdit(app)} className="rounded-xl bg-brand/30 px-3 py-1.5 text-xs text-white">
                  تعديل
                </button>
                <button onClick={() => void remove(app.id)} className="rounded-xl bg-rose-500/20 px-3 py-1.5 text-xs text-rose-200">
                  حذف
                </button>
              </div>
            </div>
          </article>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
