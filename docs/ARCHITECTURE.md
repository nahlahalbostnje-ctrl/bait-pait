# معمارية موقع BAIT PAIT

## التشغيل العام

التطبيق Next.js 14 (App Router) عربي RTL (`lang="ar"` و`dir="rtl"`). الصفحة العامة واحدة (`src/app/page.tsx`) مع أقسام بمعرفات.hash. لوحة التحكم مسارات منفصلة تحت `/admin`.

`src/app/layout.tsx` يحمّل Tajawal وPlus Jakarta Sans. طبقة الضجيج من `globals.css`.

المحتوى العام يُقرأ من `getWorks()` و`getSettings()` في `src/lib/site-store.ts` (ملفات JSON تحت `data/` مع بذرة من الكود). الصفحة `dynamic = "force-dynamic"`.

## طبقات الصفحة العامة

1. `LuxuryBackdrop` → `WorldBackground` (Canvas ثابت): كرات زجاج Physically based، حلقات ضوء، Sparkles. بدون EffectComposer/Bloom.
2. `GlassAtmosphere`: توهج CSS، شبكة عمق بعد الهيرو، ألواح زجاج لمّاعة لا تغطي مشهد الرئيسية.
3. المحتوى `z-20`: الشريط والأقسام.

الهيرو له Canvas مستقل (`HeroWorld`) بخلفية `#0b0616` وحواف تلاشي حتى يندمج مع الصفحة. منهجية العمل لها Canvas ثالث (`PathWorld`). لا تزد عن ثلاثة مشاهد WebGL.

## المكوّنات

| الملف | الدور |
| --- | --- |
| `Navbar.tsx` | شريط ثابت زجاجي |
| `Hero.tsx` + `HeroScene.tsx` + `HeroWorld.tsx` | الرئيسية والمشهد الثلاثي |
| `WorldBackground.tsx` + `LuxuryBackdrop.tsx` | خلفية ثلاثية لمّاعة لكل الموقع |
| `GlassAtmosphere.tsx` | طبقات زجاج وتوهج CSS |
| `About.tsx` / `Services.tsx` / `Methodology.tsx` / `Portfolio.tsx` / `Stats.tsx` / `Contact.tsx` / `Footer.tsx` | أقسام المحتوى (تأخذ إعدادات/أعمال من الصفحة) |
| `PathWorld.tsx` | مسار منهجية بست محطات |
| `TiltCard` / `NeonButton` / `SectionHeading` / `Logo` / `ClayIcon` | واجهة مشتركة |
| `src/components/admin/*` | غلاف اللوحة، العناوين، عمق CSS للوحة |

`AiStudio.tsx` مشهد احتياطي غير مستخدم في الصفحة الحالية.

## المشهد الثلاثي في الرئيسية

كاميرا `[3.45, 2.2, 5.15]` و`fov: 34`. إضاءة `#8B5CF6` و`#06B6D4`. نواة هولوغرام، لوحة زجاج، ألواح عائمة، بلورات. حركة الماوس عبر `MouseRig`. لا شبكة أرضية ظاهرة ولا Bloom.

## خلفية الموقع الثلاثية

`WorldBackground`: كرات `meshPhysicalMaterial` (transmission + iridescence + clearcoat)، أضواء داخلية، حلقات، نجوم. تتبع خفيف للماوس. `dpr` محدود. الضباب يدمج الكرات في الخلفية الداكنة `#07040f`.

## مسار التواصل

`POST /api/contact` مع Zod:

- `name` 2–80، `email` صالح، `phone` اختياري، `message` 8–2000
- يخزّن في `data/messages.json` عبر `addMessage`
- النجاح `{ ok: true }` / الفشل 400

## الإعدادات

- `next.config.mjs`: `transpilePackages` لـ three وfiber وdrei
- `tailwind.config.ts`: ألوان night/brand/glow/ink
- `tsconfig.json`: `@/` → `src/`
- `.gitignore`: `data/*.json`، `.env*.local`، `.next`، `node_modules`

قيود 3D: لا Fiber 9 (يحتاج React 19). لا EffectComposer/Bloom (`LuminanceFormat`).

## الدليل التنفيذي

ملف Word داخل `New Folder/` مرجع النصوص. `guide-extracted.txt` النص المستخرج. أي تعديل جوهري على المحتوى يبقى متوافقاً معه ما لم يُطلب خلاف ذلك.

تفاصيل لوحة التحكم في [ADMIN.md](ADMIN.md). كتالوج الأعمال في [PORTFOLIO.md](PORTFOLIO.md).
