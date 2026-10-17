"use client";

import { FormEvent, useEffect, useState } from "react";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-defaults";
import { NeonButton } from "@/components/ui/NeonButton";
import { AdminHeading } from "@/components/admin/AdminHeading";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j.settings) setForm(j.settings);
      })
      .catch(() => undefined);
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    setMsg(res.ok ? "تم حفظ الإعدادات وظهرت على الموقع" : "تعذر الحفظ");
  }

  const field = (key: keyof SiteSettings, label: string, multiline = false) => (
    <label className="block text-sm">
      <span className="mb-1 block text-[#94A3B8]">{label}</span>
      {multiline ? (
        <textarea
          value={String(form[key] || "")}
          onChange={(e) => set(key, e.target.value as never)}
          rows={3}
          className="neu-inset w-full rounded-2xl px-4 py-3 text-white outline-none"
        />
      ) : (
        <input
          value={String(form[key] || "")}
          onChange={(e) => set(key, e.target.value as never)}
          className="neu-inset w-full rounded-2xl px-4 py-3 text-white outline-none"
        />
      )}
    </label>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <AdminHeading
        kicker="Settings"
        title="محتوى الموقع"
        hint="كل حقل هنا يتحدث الصفحة الرئيسية بعد الحفظ."
      />

      <section className="glass admin-card-3d space-y-4 rounded-3xl p-6">
        <h2 className="font-bold text-white">الهوية والنصوص</h2>
        {field("companyTitle", "اسم الشركة")}
        {field("badge", "الشارة الإنجليزية")}
        {field("slogan", "الشعار")}
        {field("vision", "الرؤية", true)}
        {field("mission", "الرسالة", true)}
        {field("founderQuote", "كلمة المؤسس", true)}
        {field("founderName", "اسم المؤسس")}
        {field("nda", "نص الالتزام بالسرية", true)}
      </section>

      <section className="glass admin-card-3d space-y-4 rounded-3xl p-6">
        <h2 className="font-bold text-white">التواصل</h2>
        {field("phoneDisplay", "الهاتف المعروض")}
        {field("phoneWhatsapp", "رقم واتساب بدون +")}
        {field("email", "البريد")}
        {field("facebook", "رابط فيسبوك")}
        {field("location", "العنوان")}
        {field("mapsUrl", "رابط الخريطة")}
      </section>

      <section className="glass admin-card-3d space-y-4 rounded-3xl p-6">
        <h2 className="font-bold text-white">أرقام الإنجازات</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {form.stats.map((s, i) => (
            <div key={i} className="rounded-2xl bg-white/5 p-4">
              <input
                value={s.label}
                onChange={(e) => {
                  const stats = [...form.stats];
                  stats[i] = { ...stats[i], label: e.target.value };
                  set("stats", stats);
                }}
                className="mb-2 w-full bg-transparent text-sm text-white outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={s.value}
                  onChange={(e) => {
                    const stats = [...form.stats];
                    stats[i] = { ...stats[i], value: Number(e.target.value) };
                    set("stats", stats);
                  }}
                  className="neu-inset w-24 rounded-xl px-3 py-2 text-white"
                />
                <input
                  value={s.suffix}
                  onChange={(e) => {
                    const stats = [...form.stats];
                    stats[i] = { ...stats[i], suffix: e.target.value };
                    set("stats", stats);
                  }}
                  placeholder="+"
                  className="neu-inset w-16 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <NeonButton type="submit">{busy ? "جارٍ الحفظ..." : "حفظ كل التغييرات"}</NeonButton>
      {msg ? <p className="text-sm text-[#A5F3FC]">{msg}</p> : null}
    </form>
  );
}
