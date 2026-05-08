import React from 'react';

const HowItWorks = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const steps = [
    { 
      num: '1', 
      titleEs: 'Busca', 
      titleEn: 'Search', 
      descEs: 'Encuentra el servicio o producto que necesitas filtrando por categoria, ubicacion y precio.', 
      descEn: 'Find the service or product you need by filtering by category, location and price.' 
    },
    { 
      num: '2', 
      titleEs: 'Contacta', 
      titleEn: 'Contact', 
      descEs: 'Chatea con el vendedor o profesional, acuerda detalles y coordina la entrega o cita.', 
      descEn: 'Chat with the seller or professional, agree on details and coordinate delivery or appointment.' 
    },
    { 
      num: '3', 
      titleEs: 'Paga Seguro', 
      titleEn: 'Pay Securely', 
      descEs: 'Realiza el pago a traves de nuestro sistema escrow. Tu dinero esta protegido.', 
      descEn: 'Make the payment through our escrow system. Your money is protected.' 
    },
    { 
      num: '4', 
      titleEs: 'Recibe y Valora', 
      titleEn: 'Receive & Rate', 
      descEs: 'Confirma la recepción para liberar el pago al vendedor y deja tu calificación.', 
      descEn: 'Confirm receipt to release payment to the seller and leave your rating.' 
    },
  ];

  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title">{t('Como Funciona?', 'How Does It Work?')}</h2>
          <p className="section-subtitle">{t('Compra, vende y contrata servicios en simples pasos', 'Buy, sell and hire services in simple steps')}</p>
        </div>
        <div className="steps-grid">
          {steps.map(step => (
            <div className="step-card" key={step.num}>
              <div className="step-number">{step.num}</div>
              <h4>{t(step.titleEs, step.titleEn)}</h4>
              <p>{t(step.descEs, step.descEn)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;