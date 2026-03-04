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
    nl: {
        translation: {
            login: {
                title: "Admin Portaal",
                subtitle: "Beveiligde toegang tot uw dashboard",
                email_label: "E-MAILADRES",
                password_label: "WACHTWOORD",
                submit: "INLOGGEN",
                success: "Welkom terug!",
                footer: "MR-TECH SECURITY OPLOSSINGEN",
                email_placeholder: "admin@dash.com",
                password_placeholder: "••••••••",
                required_email: "Voer uw e-mailadres in!",
                required_password: "Voer uw wachtwoord in!"
            },
            sidebar: {
                inventory: "Voorraadbeheer",
                logout: "Uitloggen",
                brand: "MR-TECH"
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
                search_placeholder: "Zoek op productnaam of SKU...",
                filters: "Meer filters",
                table: {
                    asset: "PRODUCT ASSET",
                    details: "PRODUCT DETAILS",
                    price: "UNIT PRIJS",
                    inventory: "VOORRAAD",
                    status: "STATUS",
                    operations: "OPERATIES",
                    no_description: "Geen beschrijving",
                    units: "Eenheden"
                },
                modal: {
                    add: "NIEUW RECORD AANMAKEN",
                    edit: "PRODUCTRECORD BEWERKEN",
                    name: "PRODUCTNAAM",
                    name_placeholder: "bijv. Laser Bewegingssensor",
                    description: "BESCHRIJVING",
                    description_placeholder: "Productbeschrijving...",
                    category: "CATEGORIE",
                    price: "PRIJS ($)",
                    stock: "VOORRAADNIVEAU",
                    images: "PRODUCTAFBEELDINGEN",
                    select_images: "Selecteer afbeeldingen",
                    cancel: "ANNULEREN",
                    save: "WIJZIGINGEN OPSLAAN",
                    create: "PRODUCT TOEVOEGEN",
                    required: "Verplicht veld"
                },
                messages: {
                    deleted: "Product succesvol verwijderd",
                    updated: "Record succesvol bijgewerkt",
                    added: "Nieuw product succesvol toegevoegd",
                    fetch_failed: "Laden van producten van backend mislukt",
                    save_failed: "Opslaan van product mislukt"
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
