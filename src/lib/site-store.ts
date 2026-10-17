import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { WORKS, type Work } from "@/lib/works";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-defaults";

export { DEFAULT_SETTINGS, SECTOR_CATEGORY, slugify, digitsPhone } from "@/lib/site-defaults";
export type { SiteSettings, SiteStat } from "@/lib/site-defaults";

const dataDir = path.join(process.cwd(), "data");
const worksFile = path.join(dataDir, "works.json");
const settingsFile = path.join(dataDir, "settings.json");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await mkdir(dataDir, { recursive: true });
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await writeFile(file, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export async function getWorks(): Promise<Work[]> {
  const items = await readJson<Work[]>(worksFile, WORKS);
  return Array.isArray(items) ? items : WORKS;
}

export async function saveWorks(items: Work[]) {
  await writeJson(worksFile, items);
}

export async function getSettings(): Promise<SiteSettings> {
  const saved = await readJson<Partial<SiteSettings>>(settingsFile, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...saved, stats: saved.stats?.length ? saved.stats : DEFAULT_SETTINGS.stats };
}

export async function saveSettings(next: SiteSettings) {
  await writeJson(settingsFile, next);
}
