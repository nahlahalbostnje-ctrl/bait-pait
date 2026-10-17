"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { FolderKanban, LayoutDashboard, LogOut, Mail, Settings } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AdminStage } from "@/components/admin/AdminStage";

const links = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/messages", label: "الرسائل", icon: Mail },
  { href: "/admin/works", label: "الأعمال", icon: FolderKanban },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const load = () => {
      fetch("/api/admin/summary")
        .then((r) => r.json())
        .then((j) => setUnread(Number(j.unread) || 0))
        .catch(() => setUnread(0));
    };
    load();
    const timer = window.setInterval(load, 15000);
    return () => window.clearInterval(timer);
  }, [path]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell relative min-h-screen overflow-x-hidden text-[#E2E8F0]">
      <AdminStage />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[280px_1fr]">
        <aside className="admin-dock glass-strong sticky top-4 m-4 hidden h-[calc(100vh-2rem)] flex-col rounded-[2rem] p-6 lg:flex">
          <Link href="/admin" className="mb-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/30 ring-1 ring-white/20">
              <Logo className="h-8 w-8" />
            </span>
            <div>
              <p className="font-latin text-sm font-extrabold text-white">BAIT PAIT</p>
              <p className="text-xs text-[#94A3B8]">غرفة التحكم ثلاثية الأبعاد</p>
            </div>
          </Link>
          <nav className="flex flex-1 flex-col gap-2">
            {links.map((l) => {
              const active = path === l.href;
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-brand/35 text-white shadow-glow ring-1 ring-white/20"
                      : "text-[#CBD5E1] hover:bg-white/5"
                  }`}
                >
                  <span className={`admin-icon-well ${active ? "" : "opacity-80"}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  {l.label}
                  {l.href === "/admin/messages" && unread > 0 ? (
                    <span className="mr-auto rounded-full bg-[#22D3EE]/20 px-2 py-0.5 text-[10px] text-[#22D3EE]">
                      {unread}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={logout}
            className="mt-4 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-[#94A3B8] transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="glass-strong m-3 flex items-center justify-between rounded-3xl px-4 py-3 lg:hidden">
            <Link href="/admin" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="text-sm font-bold">لوحة التحكم</span>
            </Link>
            <button onClick={logout} className="text-xs text-[#94A3B8]">
              خروج
            </button>
          </header>
          <nav className="mx-3 mb-1 flex gap-2 overflow-x-auto lg:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
                  path === l.href ? "bg-brand text-white" : "glass-chip text-[#94A3B8]"
                }`}
              >
                {l.label}
                {l.href === "/admin/messages" && unread > 0 ? ` (${unread})` : ""}
              </Link>
            ))}
          </nav>
          <main className="flex-1 p-3 pt-0 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
