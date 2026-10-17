import type { WorkSector } from "@/lib/works";

export type SiteStat = { value: number; suffix: string; label: string };

export type SiteSettings = {
  companyTitle: string;
  badge: string;
  slogan: string;
  vision: string;
  mission: string;
  founderQuote: string;
  founderName: string;
  phoneDisplay: string;
  phoneWhatsapp: string;
  email: string;
  facebook: string;
  location: string;
  mapsUrl: string;
  nda: string;
  stats: SiteStat[];
};

export const SECTOR_CATEGORY: Record<WorkSector, string> = {
  food: "طعام ومشروب",
  productivity: "الإنتاجية",
  lifestyle: "نمط حياة",
  business: "أعمال",
};

export const DEFAULT_SETTINGS: SiteSettings = {
  companyTitle: "شركة البستنجي للحلول البرمجية والتدريب",
  badge: "Al-Bastanji Software Solutions & Training",
  slogan: "نصنع الحلول الرقمية التي تبني المستقبل.",
  vision: "أن نكون البيت الرقمي الأول لتحويل الأفكار إلى منتجات رقمية منافسة.",
  mission: "تقديم حلول برمجية مبتكرة وتدريب تقني عالي الاحترافية يُمكّن عملاءنا من النمو والريادة.",
  founderQuote: "نبني برمجيات تُشبه البيت: أساس متين، تصميم أنيق، وتجربة يعيشها الناس بثقة.",
  founderName: "م. مصطفى البستنجي",
  phoneDisplay: "+970 55 999 8147 58",
  phoneWhatsapp: "97055999814758",
  email: "info@baitpait.com",
  facebook: "https://facebook.com/PAITBAITCOM",
  location: "فلسطين — الخليل — دورا",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dura+Hebron+Palestine",
  nda: "نلتزم بحماية خصوصية العملاء. التفاصيل التشغيلية المحمية لا تُعرض إلا بموافقة صريحة.",
  stats: [
    { value: 400, suffix: "+", label: "مشروع منجز بنجاح" },
    { value: 100, suffix: "+", label: "مؤسسة ونظام يعمل بكفاءة" },
    { value: 13, suffix: "", label: "سنة من الخبرة المتراكمة" },
    { value: 10, suffix: "", label: "مسارات تدريبية معتمدة" },
  ],
};

export function slugify(input: string) {
  const latin = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return latin || `work-${Date.now()}`;
}

export function digitsPhone(value: string) {
  return value.replace(/\D/g, "");
}
