import React from 'react';

const CTASection = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <section className="section">
      <div className="container">
        <div className="cta-section">
          <h2>{t('Listo para comenzar?', 'Ready to get started?')}</h2>
          <p>{t('Unete a miles de costarricenses que compran y venden de forma segura', 'Join thousands of Costa Ricans who buy and sell safely')}</p>
          <div className="cta-buttons">
            <a href="#" className="cta-btn-white">{t('Crear Cuenta Gratis', 'Create Free Account')}</a>
            <a href="#" className="cta-btn-outline">{t('Publicar Anuncio', 'Post Listing')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;