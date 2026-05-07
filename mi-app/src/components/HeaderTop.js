import React from 'react';

const HeaderTop = ({ currentLang, changeLang, t }) => {
  return (
    <div className="header-top">
      <div className="container">
        <span>
          {t(
            'Envios a todo Costa Rica | Pagos seguros con escrow',
            'Shipping throughout Costa Rica | Secure escrow payments'
          )}
        </span>
        
        <LanguageSwitcher 
          currentLang={currentLang} 
          changeLang={changeLang} 
        />
      </div>
    </div>
  );
};

// Subcomponente para el selector de idioma
const LanguageSwitcher = ({ currentLang, changeLang }) => {
  return (
    <div className="lang-switcher">
      <span style={{ fontSize: '12px', opacity: 0.8 }}>Idioma:</span>
      <button 
        className={`lang-btn ${currentLang === 'es' ? 'active' : ''}`} 
        onClick={() => changeLang('es')}
      >
        ES
      </button>
      <button 
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`} 
        onClick={() => changeLang('en')}
      >
        EN
      </button>
    </div>
  );
};

export default HeaderTop;