import React from 'react';

const EscrowBanner = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const steps = [
    { num: '1', titleEs: 'Compras', titleEn: 'You Buy' },
    { num: '2', titleEs: 'Pagas', titleEn: 'You Pay' },
    { num: '3', titleEs: 'Recibes', titleEn: 'You Receive' },
    { num: '4', titleEs: 'Liberamos', titleEn: 'We Release' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="escrow-banner">
          <div className="escrow-content">
            <h3>{t('Como funciona la proteccion de pagos?', 'How does payment protection work?')}</h3>
            <p>{t('Nuestro sistema Escrow protege tanto al comprador como al vendedor. El dinero se mantiene seguro en nuestra plataforma hasta que ambas partes confirmen que todo esta correcto.', 'Our Escrow system protects both buyer and seller. Money is kept safe on our platform until both parties confirm everything is correct.')}</p>
            <div className="escrow-steps">
              {steps.map(step => (
                <div className="escrow-step" key={step.num}>
                  <div className="step-num">{step.num}</div>
                  <h5>{t(step.titleEs, step.titleEn)}</h5>
                </div>
              ))}
            </div>
            <br />
            <a href="#" className="btn-primary">{t('Mas Informacion', 'More Information')}</a>
          </div>
          <div className="escrow-visual">
            <h4 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--primary)' }}>{t('Flujo de Pago Seguro', 'Secure Payment Flow')}</h4>
            <div className="escrow-flow">
              <div className="escrow-entity">
                <div className="entity-icon entity-buyer"><i className="fas fa-user"></i></div>
                <span>{t('Comprador', 'Buyer')}</span>
              </div>
              <i className="fas fa-arrow-right escrow-arrow"></i>
              <div className="escrow-entity">
                <div className="entity-icon entity-platform"><i className="fas fa-shield-alt"></i></div>
                <span>{t('CostaMarket', 'CostaMarket')}</span>
              </div>
              <i className="fas fa-arrow-right escrow-arrow"></i>
              <div className="escrow-entity">
                <div className="entity-icon entity-seller"><i className="fas fa-store"></i></div>
                <span>{t('Vendedor', 'Seller')}</span>
              </div>
            </div>
            <div style={{ marginTop: '25px', background: 'var(--primary-light)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                <i className="fas fa-lock"></i> {t('Fondos protegidos hasta confirmacion de entrega', 'Funds protected until delivery confirmation')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EscrowBanner;