import React from 'react';

const TrustSection = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const items = [
    { icon: 'fa-lock', title: t('Pago Seguro Escrow', 'Secure Escrow Payment'), desc: t('Tu dinero esta protegido hasta que confirmes la recepcion', 'Your money is protected until you confirm receipt') },
    { icon: 'fa-user-check', title: t('Vendedores Verificados', 'Verified Sellers'), desc: t('Todos los profesionales pasan por verificacion de identidad', 'All professionals go through identity verification') },
    { icon: 'fa-undo', title: t('Garantia de Devolução', 'Money Back Guarantee'), desc: t('Se você não receber o acordado, devolvemos 100%', 'If you don\'t receive what was agreed, we refund 100%') },
    { icon: 'fa-comments', title: t('Chat Integrado', 'Integrated Chat'), desc: t('Comunicate directamente con el vendedor dentro de la plataforma', 'Communicate directly with the seller within the platform') },
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {items.map((item, idx) => (
            <div className="trust-item" key={idx}>
              <div className="icon"><i className={`fas ${item.icon}`}></i></div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;