// LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types pour le contexte de la langue
interface LanguageContextProps {
    language: string;
    toggleLanguage: (lang: string) => void;
}

// Valeur initiale du contexte
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Hook personnalisé pour accéder au contexte de langue
export const useLanguage = (): LanguageContextProps => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

// Type des props pour le LanguageProvider
interface LanguageProviderProps {
    children: ReactNode;
}

// Composant fournisseur pour le contexte de langue
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // État de la langue, avec 'fr' par défaut
    const [language, setLanguage] = useState<string>('fr');

    // Fonction pour changer de langue
    const toggleLanguage = (lang: string) => setLanguage(lang);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
