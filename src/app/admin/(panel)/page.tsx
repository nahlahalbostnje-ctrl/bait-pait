"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, Mail, MailOpen, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { AdminHeading } from "@/components/admin/AdminHeading";

type Summary = {
  messages: number;
  unread: number;
  works: number;
  families: number;
  bySector: Record<string, number>;
  latest: { id: string; name: string; message: string; createdAt: string; read: boolean }[];
};

const kpis = [
  { label: "مشاريع منجزة", value: "+400" },
  { label: "مؤسسات وأنظمة", value: "+100" },
  { label: "سنوات خبرة", value: "13" },
  { label: "مسارات تدريبية", value: "10" },
];

const sectorLabel: Record<string, string> = {
  food: "طعام وتوصيل",
  productivity: "إنتاجية",
  lifestyle: "نمط حياة",
  business: "أعمال",
};

export default function AdminHomePage() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    fetch("/api/admin/summary")
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() => setData(null));
  }, []);

  const cards = [
    { label: "رسائل التواصل", value: data?.messages ?? "—", icon: Mail },
    { label: "غير مقروءة", value: data?.unread ?? "—", icon: MailOpen },
    { label: "الأعمال المعروضة", value: data?.works ?? "—", icon: FolderKanban },
    { label: "عائلات المنتجات", value: data?.families ?? "—", icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      <AdminHeading kicker="Control Deck" title="نظرة عامة" hint="مؤشرات حية من الرسائل والأعمال المعروضة على الموقع." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <TiltCard key={c.label} className="group">
            <div className="glass rounded-[1.75rem] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-latin text-3xl font-black text-white">{c.value}</p>
                  <p className="mt-1 text-sm text-[#94A3B8]">{c.label}</p>
                </div>
                <span className="admin-icon-well">
                  <c.icon className="h-4 w-4 text-white" />
                </span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass-chip admin-card-3d rounded-[1.75rem] p-5">
            <p className="font-latin text-2xl font-black text-white">{k.value}</p>
            <p className="text-sm text-[#94A3B8]">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass admin-card-3d rounded-[1.75rem] p-5">
          <h2 className="mb-4 font-bold text-white">توزيع الأعمال</h2>
          <ul className="space-y-3">
            {Object.entries(data?.bySector || {}).map(([k, n]) => (
              <li key={k} className="flex items-center justify-between text-sm">
                <span className="text-[#CBD5E1]">{sectorLabel[k] || k}</span>
                <span className="rounded-full bg-brand/25 px-3 py-1 text-white">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass admin-card-3d rounded-[1.75rem] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-white">آخر الرسائل</h2>
            <Link href="/admin/messages" className="text-xs text-[#C084FC]">
              عرض الكل
            </Link>
          </div>
          <ul className="space-y-3">
            {(data?.latest || []).length === 0 ? (
              <li className="text-sm text-[#94A3B8]">لا توجد رسائل بعد. ستظهر هنا بعد إرسال نموذج التواصل.</li>
            ) : (
              data?.latest.map((m) => (
                <li key={m.id} className="rounded-2xl bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-white">{m.name}</p>
                    {!m.read ? <span className="h-2 w-2 rounded-full bg-[#22D3EE]" /> : null}
                  </div>
                  <p className="line-clamp-2 text-xs text-[#94A3B8]">{m.message}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
