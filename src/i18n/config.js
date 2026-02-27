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
                footer: "MR-TECH SECURITY SOLUTIONS"
            },
            sidebar: {
                inventory: "Inventory Control",
                logout: "Logout"
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
                    operations: "OPERATIONS"
                },
                modal: {
                    add: "CREATE NEW RECORD",
                    edit: "EDIT PRODUCT RECORD",
                    name: "PRODUCT NAME",
                    category: "CATEGORY",
                    price: "PRICE ($)",
                    stock: "STOCK LEVEL",
                    cancel: "CANCEL",
                    save: "SAVE CHANGES",
                    create: "ADD PRODUCT"
                },
                messages: {
                    deleted: "Product removed",
                    updated: "Record updated",
                    added: "New product added"
                }
            }
        }
    },
    nl: {
        translation: {
            login: {
                title: "Beheerportaal",
                subtitle: "Beveiligde toegang tot uw dashboard",
                email_label: "E-MAILADRES",
                password_label: "WACHTWOORD",
                submit: "INLOGGEN",
                success: "Welkom terug!",
                footer: "MR-TECH BEVEILIGINGS OPLOSSINGEN"
            },
            sidebar: {
                inventory: "Voorraadbeheer",
                logout: "Uitloggen"
            },
            header: {
                sign_out: "Afmelden",
                language: "Taal"
            },
            products: {
                title: "Voorraadbeheer",
                subtitle: "Beheer beveiligingscatalogus en voorraadniveaus",
                new_product: "NIEUW PRODUCT",
                export: "Lijst exporteren",
                search_placeholder: "Zoeken op productnaam of SKU...",
                filters: "Meer filters",
                table: {
                    asset: "PRODUCTASSET",
                    details: "PRODUCTDETAILS",
                    price: "EENHEIDSPRĲS",
                    inventory: "VOORRAAD",
                    status: "STATUS",
                    operations: "OPERATIES"
                },
                modal: {
                    add: "NIEUW RECORD AANMAKEN",
                    edit: "PRODUCTRECORD BEWERKEN",
                    name: "PRODUCTNAAM",
                    category: "CATEGORIE",
                    price: "PRĲS ($)",
                    stock: "VOORRAADNIVEAU",
                    cancel: "ANNULEREN",
                    save: "WIJZIGINGEN OPSLAAN",
                    create: "PRODUCT TOEVOEGEN"
                },
                messages: {
                    deleted: "Product verwijderd",
                    updated: "Record bigewerkt",
                    added: "Nieuw product toegevoegd"
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
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
