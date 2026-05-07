import { useState } from 'react';

// Hook personalizado - deve retornar um objeto ou array
const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState('es');
  
  const t = (es, en) => currentLang === 'es' ? es : en;
  
  const changeLang = (lang) => {
    setCurrentLang(lang);
  };
  
  // Retorna um objeto com o que você precisa
  return {
    currentLang,
    setCurrentLang,
    changeLang,
    t
  };
};

export default useLanguage; // ← Exportação default