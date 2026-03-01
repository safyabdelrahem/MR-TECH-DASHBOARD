import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            login: {
                title: "Admin Portal",
                subtitle: "Secure access to your dashboard",
                email_label: "EMAIL ADDRESS",
                password_label: "PASSWORD",
                submit: "SIGN IN",
                success: "Welcome back!",
                footer: "MR-TECH SECURITY SOLUTIONS",
                email_placeholder: "admin@dash.com",
                password_placeholder: "••••••••",
                required_email: "Please enter your email!",
                required_password: "Please enter your password!"
            },
            sidebar: {
                inventory: "Inventory Control",
                logout: "Logout",
                brand: "MR-TECH"
            },
            header: {
                sign_out: "Sign Out",
                language: "Language"
            },
            products: {
                title: "Inventory Control",
                subtitle: "Manage security catalog and stock levels",
                new_product: "NEW PRODUCT",
                export: "Export List",
                search_placeholder: "Search by product name or SKU...",
                filters: "More Filters",
                table: {
                    asset: "PRODUCT ASSET",
                    details: "PRODUCT DETAILS",
                    price: "UNIT PRICE",
                    inventory: "INVENTORY",
                    status: "STATUS",
                    operations: "OPERATIONS",
                    no_description: "No description",
                    units: "Units"
                },
                modal: {
                    add: "CREATE NEW RECORD",
                    edit: "EDIT PRODUCT RECORD",
                    name: "PRODUCT NAME",
                    name_placeholder: "e.g. Laser Motion Sensor",
                    description: "DESCRIPTION",
                    description_placeholder: "Product description...",
                    category: "CATEGORY",
                    price: "PRICE ($)",
                    stock: "STOCK LEVEL",
                    images: "PRODUCT IMAGES",
                    select_images: "Select Images",
                    cancel: "CANCEL",
                    save: "SAVE CHANGES",
                    create: "ADD PRODUCT",
                    required: "Required field"
                },
                messages: {
                    deleted: "Product removed successfully",
                    updated: "Record updated successfully",
                    added: "New product added successfully",
                    fetch_failed: "Failed to fetch products from backend",
                    save_failed: "Failed to save product"
                }
            }
        }
    },
    ar: {
        translation: {
            login: {
                title: "بوابة الإدارة",
                subtitle: "تسجيل الدخول الآمن للوحة التحكم",
                email_label: "البريد الإلكتروني",
                password_label: "كلمة المرور",
                submit: "تسجيل الدخول",
                success: "مرحباً بك مجدداً!",
                footer: "إم آر تك للحلول الأمنية",
                email_placeholder: "admin@dash.com",
                password_placeholder: "••••••••",
                required_email: "يرجى إدخال البريد الإلكتروني!",
                required_password: "يرجى إدخال كلمة المرور!"
            },
            sidebar: {
                inventory: "إدارة المخزون",
                logout: "تسجيل الخروج",
                brand: "إم-آر تك"
            },
            header: {
                sign_out: "تسجيل الخروج",
                language: "اللغة"
            },
            products: {
                title: "إدارة المخزون",
                subtitle: "إدارة كتالوج المنتجات الأمنية ومستويات المخزون",
                new_product: "منتج جديد",
                export: "تصدير القائمة",
                search_placeholder: "ابحث باسم المنتج...",
                filters: "مزيد من الفلاتر",
                table: {
                    asset: "صورة المنتج",
                    details: "التفاصيل",
                    price: "سعر الوحدة",
                    inventory: "المخزون",
                    status: "الحالة",
                    operations: "الإجراءات",
                    no_description: "لا يوجد وصف",
                    units: "قطعة"
                },
                modal: {
                    add: "إضافة منتج جديد",
                    edit: "تعديل بيانات المنتج",
                    name: "اسم المنتج",
                    name_placeholder: "مثل: كاميرا مراقبة ليلية",
                    description: "الوصف",
                    description_placeholder: "اكتب وصفاً للمنتج...",
                    category: "التصنيف",
                    price: "السعر",
                    stock: "الكمية المتوفرة",
                    images: "صور المنتج",
                    select_images: "اختر الصور",
                    cancel: "إلغاء",
                    save: "حفظ التعديلات",
                    create: "إضافة المنتج",
                    required: "هذا الحقل مطلوب"
                },
                messages: {
                    deleted: "تم مسح المنتج بنجاح",
                    updated: "تم تحديث البيانات بنجاح",
                    added: "تمت إضافة المنتج بنجاح",
                    fetch_failed: "فشل في جلب المنتجات من السيرفر",
                    save_failed: "فشل في حفظ المنتج"
                }
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
