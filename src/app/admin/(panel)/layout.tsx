import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
