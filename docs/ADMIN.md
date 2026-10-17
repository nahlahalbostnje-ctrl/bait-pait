# لوحة التحكم

المسار: [http://localhost:3000/admin](http://localhost:3000/admin)

الحماية: كوكي HMAC باسم `bait_admin`. الوسطاء في `src/middleware.ts` يتحققون من وجود الكوكي فقط (بدون Node crypto). التحقق الكامل في مسارات API عبر `src/lib/admin-auth.ts`.

## الدخول

1. انسخ `.env.example` إلى `.env.local`
2. غيّر `ADMIN_PASSWORD` و`ADMIN_SECRET` قبل النشر
3. الافتراضي محلياً فقط: `BaitPait@2026`

`POST /api/admin/login` يضبط الكوكي. `POST /api/admin/logout` يحذفه.

## الصفحات

| المسار | الوظيفة |
| --- | --- |
| `/admin` | نظرة عامة: عدد الرسائل، غير المقروء، الأعمال، توزيع القطاعات |
| `/admin/messages` | صندوق وارد حي: بحث، حالات، تمييز، أرشفة، ملاحظات، رد بريد/واتساب، حذف جماعي |
| `/admin/works` | إضافة/تعديل/حذف الأعمال ورفع الشعار |
| `/admin/settings` | هوية الشركة، النصوص، التواصل، أرقام الإنجازات |

الشريط الجانبي ثابت ومستقيم. الواجهة زجاجية مع عمق بصري؛ المحتوى هو المصدر بعد الحفظ.

## التخزين

الملفات تحت `data/` (مستثناة من Git عدا `.gitkeep`):

- `data/works.json` — المعرض العام
- `data/settings.json` — نصوص الموقع وبيانات التواصل
- `data/messages.json` — رسائل نموذج التواصل

عند أول قراءة تُبذر الأعمال والإعدادات من `src/lib/works.ts` و`src/lib/site-defaults.ts`. إذا حُذفت كل الأعمال تبقى القائمة فارغة ولا تُستعاد تلقائياً.

رفع الصور: `POST /api/admin/upload` يحفظ في `public/works/` بصيغ jpeg/png/webp حتى 6MB.

## واجهات API

| الطريقة | المسار | الغرض |
| --- | --- | --- |
| GET | `/api/admin/summary` | مؤشرات اللوحة |
| GET/PATCH/DELETE | `/api/admin/messages` | قائمة، تحديث حالة/ملاحظات، حذف |
| GET/POST/PUT/DELETE | `/api/admin/works` | CRUD الأعمال |
| GET/PUT | `/api/admin/settings` | قراءة/حفظ الإعدادات |
| POST | `/api/contact` | رسالة من الموقع → `data/messages.json` |

الصفحة الرئيسية `dynamic = "force-dynamic"` حتى تظهر تعديلات اللوحة فوراً.
