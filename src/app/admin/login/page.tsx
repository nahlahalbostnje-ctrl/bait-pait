"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { NeonButton } from "@/components/ui/NeonButton";
import { AdminStage } from "@/components/admin/AdminStage";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const password = String(new FormData(e.currentTarget).get("password") || "");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="admin-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <AdminStage />
      <form onSubmit={onSubmit} className="glass neon-border admin-card-3d relative w-full max-w-md rounded-[2rem] p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="icon-3d">
            <span className="clay-orb grid h-16 w-16 place-items-center">
              <Logo className="h-10 w-10" />
            </span>
          </span>
          <h1 className="holo-title title-3d mt-5 text-2xl font-black">لوحة تحكم BAIT PAIT</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">أدخل كلمة مرور المسؤول للمتابعة</p>
        </div>
        <input
          name="password"
          type="password"
          required
          placeholder="كلمة المرور"
          className="neu-inset mb-4 w-full rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-light"
        />
        <NeonButton type="submit" className="w-full">
          {loading ? "جارٍ الدخول..." : "دخول"}
        </NeonButton>
        {error ? <p className="mt-3 text-center text-sm text-rose-300">كلمة المرور غير صحيحة</p> : null}
        <p className="mt-5 text-center text-[11px] text-[#64748B]">
          الافتراضي محلياً: BaitPait@2026 — غيّرها عبر ADMIN_PASSWORD
        </p>
      </form>
    </div>
  );
}
