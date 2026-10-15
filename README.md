# شركة البستنجي للحلول البرمجية والتدريب (BAIT PAIT)

موقع الشركة التعريفي: واجهة عربية RTL بتصميم Dark Neumorphism + Glassmorphism، مع مشاهد ثلاثية الأبعاد في الصفحة الرئيسية ومنهجية العمل.

النسخة المحفوظة على GitHub: [nahlahalbostnje-ctrl/bait-pait](https://github.com/nahlahalbostnje-ctrl/bait-pait)

## الهوية

| الحقل | القيمة |
| --- | --- |
| الاسم | شركة البستنجي للحلول البرمجية والتدريب |
| الشعار | BAIT PAIT |
| الشعار النصي | نصنع الحلول الرقمية التي تبني المستقبل |
| الموقع | فلسطين — الخليل — دورا |
| الهاتف | +970 55 999 8147 58 |
| واتساب | [wa.me/97055999814758](https://wa.me/97055999814758) |
| البريد | info@baitpait.com |
| فيسبوك | [facebook.com/PAITBAITCOM](https://facebook.com/PAITBAITCOM) |

المصدر النصي للتصميم: الدليل التنفيذي في `New Folder/` والنص المستخرج في `guide-extracted.txt`.

## التشغيل

يتطلب Node.js 18 أو أحدث.

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

```bash
npm run build
npm start
```

```bash
npm run lint
```

## التقنيات

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS 3.4
- Framer Motion + Lucide
- Three.js `0.186` مع `@react-three/fiber` `8.17` و `@react-three/drei` `9.117`
- Zod لمسار نموذج التواصل `/api/contact`

**قيود مكتبات ثلاثية الأبعاد:** لا ترفع Fiber إلى الإصدار 9 (يحتاج React 19). لا تستخدم `EffectComposer` / Bloom — غير متوافقين هنا (`LuminanceFormat`). الإضاءة والإحساس الثلاثي عبر نقاط، Sprite، ومواد مضيئة.

لا تثبت أكثر من مشهدين أو ثلاثة WebGL في الصفحة.

## أقسام الصفحة

صفحة واحدة (`src/app/page.tsx`) بالترتيب:

1. شريط علوي ثابت — شعار BAIT PAIT، روابط الأقسام، زر تواصل فوري
2. الرئيسية — عمودان RTL: اسم الشركة والشعار والدعوات يميناً، المشهد الثلاثي (`HeroWorld`) يساراً بلا إطار
3. من نحن — الرؤية والرسالة وكلمة المؤسس
4. خدماتنا — شجرة خدمات مزدوجة
5. منهجيتنا — مسار حلزوني ثلاثي الأبعاد بست محطات
6. أعمالنا — 23 تطبيقاً بشعارات حقيقية من Play Store وفلاتر: الكل / طعام / إنتاجية / نمط حياة / أعمال
7. الإنجازات — +400 مشروع، +100 مؤسسة، 13 سنة، 10 مسارات تدريبية
8. تواصل معنا — نموذج + بيانات الاتصال
9. التذييل — BAIT PAIT وروابط التواصل

## ألوان التصميم

| الرمز | الاستخدام |
| --- | --- |
| `#0b0616` / `#05030A` | خلفية الرئيسية |
| `#0A0612` / `#120924` | أقسام المحتوى |
| `#1A0F35` | الأسطح |
| `#6C2BD9` / `#8B5CF6` | الهوية |
| `#C084FC` / `#EC4899` / `#06B6D4` | التوهج |

الخطوط: Tajawal للعربية، Plus Jakarta Sans للاتينية.

## هيكل المشروع

```
src/app/                 الصفحة، التخطيط، مسار API
src/components/hero/     الرئيسية والمشهد
src/components/about/    من نحن
src/components/services/ الخدمات
src/components/methodology/ المنهجية
src/components/portfolio/ الأعمال
src/components/stats/    الأرقام
src/components/contact/  التواصل
src/components/layout/   الشريط والتذييل
src/components/three/    مشاهد Three.js
src/components/ui/       أزرار وبطاقات وعناوين
src/lib/constants.ts     الهاتف، البريد، الروابط
src/lib/works.ts         كتالوج الأعمال
public/works/            شعارات التطبيقات
docs/                    توثيق تقني
```

تفاصيل الملفات والمشاهد الثلاثية ومسار التواصل في [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).  
قائمة الأعمال وملفات الشعارات في [docs/PORTFOLIO.md](docs/PORTFOLIO.md).

## نموذج التواصل

`POST /api/contact` يتحقق عبر Zod من الاسم والبريد والرسالة (والهاتف اختياري) ويعيد `{ ok: true }`. لا يرسل بريداً بعد؛ الطلب يُسجَّل في سجل الخادم. لربط بريد أو CRM لاحقاً عدّل `src/app/api/contact/route.ts`.

لا تضع أسراراً في المستودع. ملفات `.env*.local` مستثناة في `.gitignore`.

## الحفظ على GitHub

الفرع: `main`  
المستودع: https://github.com/nahlahalbostnje-ctrl/bait-pait

المجلدات غير المرفوعة عمداً: `node_modules`، `.next`، مخرجات البناء، ملفات البيئة المحلية.
