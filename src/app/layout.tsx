import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "شركة البستنجي للحلول البرمجية والتدريب | BAIT PAIT",
  description:
    "نصنع الحلول الرقمية التي تبني المستقبل. تطوير برمجي، أنظمة مؤسسات، وتدريب تقني احترافي من فلسطين — الخليل.",
  keywords: [
    "BAIT PAIT",
    "البستنجي",
    "تطوير مواقع",
    "تطبيقات جوال",
    "ERP",
    "تدريب برمجي",
    "الخليل",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${jakarta.variable} font-arabic antialiased`}>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
