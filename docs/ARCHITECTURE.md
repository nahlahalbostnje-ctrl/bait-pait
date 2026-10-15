# معمارية موقع BAIT PAIT

## التشغيل العام

التطبيق تطبيق Next.js 14 بصفحة واحدة عربية (`lang="ar"` و`dir="rtl"`). لا يوجد توجيه متعدد الصفحات؛ التنقل عبر معرفات الأقسام في `src/lib/constants.ts`.

`src/app/layout.tsx` يحمّل Tajawal وPlus Jakarta Sans ويضبط العنوان والوصف وكلمات البحث. طبقة الضجيج البصرية من `globals.css`.

`src/app/page.tsx` يرتب الأقسام فوق خلفية `#0b0616` بدون `LuxuryBackdrop` حتى لا يتكرر WebGL خلف المحتوى.

## المكوّنات

| الملف | الدور |
| --- | --- |
| `Navbar.tsx` | شريط ثابت زجاجي `inset-x-3 top-3`، الشعار يمين، الروابط وسط، تواصل فوري يسار |
| `Hero.tsx` | عمودان: النص والدعوات يمين، `HeroScene` يسار |
| `HeroScene.tsx` | غلاف Canvas لمشهد الرئيسية |
| `HeroWorld.tsx` | نواة هولوغرام، لوحة زجاجية، حلقات، شبكة أرضية، إضاءة بنفسجي/سماوي |
| `About.tsx` | الرؤية والرسالة وكلمة المؤسس |
| `Services.tsx` | شجرة خدمات مزدوجة |
| `Methodology.tsx` + `PathWorld.tsx` | مسار حلزوني بست محطات |
| `Portfolio.tsx` | بطاقات الأعمال من `WORKS` مع فلاتر قطاع |
| `Stats.tsx` | عدّادات متحركة عند الظهور |
| `Contact.tsx` | نموذج neumorphic يرسل إلى `/api/contact` |
| `Footer.tsx` | شعار هولوغرافي وروابط |
| `TiltCard` / `NeonButton` / `SectionHeading` / `Logo` / `ClayIcon` | عناصر واجهة مشتركة |
| `AiStudio.tsx` / `WorldBackground.tsx` / `LuxuryBackdrop.tsx` | مشاهد احتياطية؛ غير مستخدمة في الصفحة الحالية لتقليل عدد الـ canvases |

## المشهد الثلاثي في الرئيسية

كاميرا تقريبية `[3.45, 2.2, 5.15]` و`fov: 34`. إضاءة نقطية `#8B5CF6` و`#06B6D4`. الأرضية شبكة. النواة: كرة `MeshDistortMaterial` + غلاف شفاف + سحابة نقاط Fibonacci بمزج إضافي + Sprite توهج + حلقتان. اللوحة الزجاجية شبه شفافة بإمالة `[-0.62, 0.78, 0.18]` ونسيج Neural Engine من `screenTextures.ts`. حركة الماوس عبر `MouseRig`.

لا `Environment` عاكس ثقيل ولا Bloom عبر `EffectComposer` — سبق أن سوّدا المشهد أو كسرا التنسيق.

## مسار التواصل

`src/app/api/contact/route.ts`:

- المدخلات: `name` (2–80)، `email` صالح، `phone` اختياري، `message` (8–2000)
- النجاح: 200 و`{ ok: true }`
- الفشل: 400 و`{ ok: false }`
- لا تخزين دائم ولا إرسال بريد في النسخة الحالية

## الإعدادات

- `next.config.mjs`: `transpilePackages` لـ three وfiber وdrei
- `tailwind.config.ts`: ألوان night/brand/glow/ink وظلال neu/glow وخطّا arabic/latin
- `tsconfig.json`: مسار `@/` إلى `src/`

## الدليل التنفيذي

ملف Word داخل `New Folder/` هو مرجع النصوص والأقسام. `extract-guide.mjs` يستخرج النص إلى `guide-extracted.txt`. أي تعديل جوهري على المحتوى يجب أن يبقى متوافقاً مع هذا الدليل ما لم يُطلب خلاف ذلك.
