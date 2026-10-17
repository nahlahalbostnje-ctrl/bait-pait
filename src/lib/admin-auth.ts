import { createHmac } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "bait_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "BaitPait@2026";
}

function secret() {
  return process.env.ADMIN_SECRET || "bait-pait-dashboard";
}

export function adminToken() {
  return createHmac("sha256", secret()).update(adminPassword()).digest("hex");
}

export function isAdminToken(token?: string | null) {
  return Boolean(token) && token === adminToken();
}

export function isAdminLoggedIn() {
  return isAdminToken(cookies().get(ADMIN_COOKIE)?.value);
}
