import React from 'react';
import { useLanguage } from './LanguageProvider';
import './LanguageSelector.css'; // Créez un fichier CSS séparé

export function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    toggleLanguage(event.target.value);
  };

  return (
    <div className="selector-container">
      <label htmlFor="language-select">Langue:</label>
      <select
        id="language-select"
        aria-labelledby="language-label"
        value={language} 
        onChange={handleLanguageChange}
        className="styled-select"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
