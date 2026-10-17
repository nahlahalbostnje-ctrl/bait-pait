# شركة البستنجي للحلول البرمجية والتدريب (BAIT PAIT)

موقع الشركة التعريفي: واجهة عربية RTL بتصميم Dark Neumorphism + Glassmorphism، خلفية ثلاثية الأبعاد لمّاعة على كامل الصفحة، ومشهد هيرو ومنهجية ثلاثية الأبعاد، مع لوحة تحكم حية لإدارة المحتوى والرسائل.

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

انسخ المتغيرات المحلية قبل تشغيل اللوحة:

```bash
copy .env.example .env.local
```

على macOS/Linux: `cp .env.example .env.local`

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
- تخزين JSON محلي تحت `data/` للوحة التحكم

**قيود مكتبات ثلاثية الأبعاد:** لا ترفع Fiber إلى الإصدار 9 (يحتاج React 19). لا تستخدم `EffectComposer` / Bloom — غير متوافقين هنا (`LuminanceFormat`). الإضاءة والإحساس الثلاثي عبر نقاط، Sprite، ومواد مضيئة.

لا تثبت أكثر من مشهدين أو ثلاثة WebGL في الصفحة.

## أقسام الصفحة

صفحة واحدة (`src/app/page.tsx`) بالترتيب:

1. خلفية ثلاثية ثابتة (`WorldBackground`) — كرات زجاج لمّاعة وحلقات ضوء
2. شريط علوي ثابت — شعار BAIT PAIT، روابط الأقسام، زر تواصل فوري
3. الرئيسية — عمودان RTL: الاسم والدعوات يميناً، `HeroWorld` يساراً بلا إطار
4. من نحن — الرؤية والرسالة وكلمة المؤسس من إعدادات اللوحة
5. خدماتنا — شجرة خدمات مزدوجة
6. منهجيتنا — مسار حلزوني ثلاثي الأبعاد بست محطات
7. أعمالنا — معرض من `data/works.json` (البذرة 23 تطبيقاً بشعارات Play Store)
8. الإنجازات — أرقام قابلة للتعديل من اللوحة
9. تواصل معنا — نموذج يُحفظ في صندوق الرسائل + بيانات الاتصال
10. التذييل — BAIT PAIT ورابط لوحة التحكم

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
src/app/                 الصفحة، التخطيط، لوحة التحكم، API
src/app/admin/           دخول اللوحة والصفحات
src/app/api/admin/       مسارات الإدارة
src/app/api/contact/     استلام رسائل الموقع
src/components/admin/    غلاف اللوحة
src/components/hero/     الرئيسية والمشهد
src/components/about/    من نحن
src/components/services/ الخدمات
src/components/methodology/ المنهجية
src/components/portfolio/ الأعمال
src/components/stats/    الأرقام
src/components/contact/  التواصل
src/components/layout/   الشريط والتذييل
src/components/three/    مشاهد Three.js والخلفية
src/components/ui/       أزرار وبطاقات وزجاج
src/lib/                 مصادقة، رسائل، إعدادات، أعمال
src/middleware.ts        حماية مسارات /admin
data/                    JSON وقت التشغيل (غير مرفوع)
public/works/            شعارات التطبيقات
docs/                    توثيق تقني
```

تفاصيل الملفات والمشاهد الثلاثية في [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).  
لوحة التحكم والـ API في [docs/ADMIN.md](docs/ADMIN.md).  
قائمة الأعمال وملفات الشعارات في [docs/PORTFOLIO.md](docs/PORTFOLIO.md).

## نموذج التواصل

`POST /api/contact` يتحقق عبر Zod من الاسم والبريد والرسالة (والهاتف اختياري) ويحفظ الرسالة في `data/messages.json` ثم يعيد `{ ok: true }`. تظهر في `/admin/messages`.

لا تضع أسراراً في المستودع. ملفات `.env*.local` مستثناة في `.gitignore`.

## لوحة التحكم

افتح [http://localhost:3000/admin](http://localhost:3000/admin)

كلمة المرور الافتراضية محلياً: `BaitPait@2026`

ضعها في `.env.local` عبر `ADMIN_PASSWORD` قبل النشر.

من اللوحة يمكن:

- إدارة صندوق الرسائل (قراءة، حالة، تمييز، أرشفة، ملاحظات، رد، حذف)
- إضافة/تعديل/حذف الأعمال ورفع الشعارات — تظهر في المعرض فوراً
- تعديل اسم الشركة والنصوص وبيانات التواصل وأرقام الإنجازات

التفاصيل التشغيلية في [docs/ADMIN.md](docs/ADMIN.md).

## الحفظ على GitHub

الفرع: `main`  
المستودع: https://github.com/nahlahalbostnje-ctrl/bait-pait

المجلدات غير المرفوعة عمداً: `node_modules`، `.next`، مخرجات البناء، ملفات البيئة المحلية.
