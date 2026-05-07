import React from 'react';
import mariaPhoto from '../assets/images/testimonials/maria.jpg';
import carlosPhoto from '../assets/images/testimonials/maria.jpg';
import lauraPhoto from '../assets/images/testimonials/maria.jpg';

const Testimonials = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const testimonials = [
    { 
      id: 1,
      name: 'Maria Rodriguez', 
      photo: mariaPhoto,  // ← Foto adicionada
      roleEs: 'Compradora', 
      roleEn: 'Buyer', 
      textEs: 'Compre una moto y el sistema escrow me dio mucha confianza. El vendedor fue muy amable y el producto llego en perfectas condiciones. 100% recomendado!', 
      textEn: 'I bought a motorcycle and the escrow system gave me a lot of confidence. The seller was very kind and the product arrived in perfect condition. 100% recommended!', 
      stars: 5,
    },
    { 
      id: 2,
      name: 'Carlos Gutierrez', 
      photo: carlosPhoto,  // ← Foto adicionada
      roleEs: 'Vendedor', 
      roleEn: 'Seller', 
      textEs: 'Soy dentista y esta plataforma me ha ayudado a conseguir muchos pacientes nuevos. El sistema de pagos es muy seguro para ambas partes.', 
      textEn: 'I\'m a dentist and this platform has helped me get many new patients. The payment system is very safe for both parties.', 
      stars: 5,
    },
    { 
      id: 3,
      name: 'Laura Perez', 
      photo: lauraPhoto,  // ← Foto adicionada
      roleEs: 'Masajista', 
      roleEn: 'Masseuse', 
      textEs: 'Ofrezco masajes a domicilio y la verificacion de identidad da confianza a mis clientes. La plataforma es muy facil de usar y el soporte es excelente.', 
      textEn: 'I offer home massages and identity verification gives my clients confidence. The platform is very easy to use and support is excellent.', 
      stars: 4.5,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title">{t('Lo que dicen nuestros usuarios', 'What our users say')}</h2>
          <p className="section-subtitle">{t('Miles de costarricenses confian en CostaMarket', 'Thousands of Costa Ricans trust CostaMarket')}</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.id}>
              <div className="testimonial-header">
                {/* USANDO A IMAGEM AGORA */}
                <img 
                  src={item.photo} 
                  alt={item.name}
                  className="testimonial-avatar"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div className="testimonial-info">
                  <h5>{item.name}</h5>
                  <span>{t(item.roleEs, item.roleEn)}</span>
                </div>
              </div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={i < Math.floor(item.stars) ? 'fas fa-star' : i < item.stars ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
                ))}
              </div>
              <p className="testimonial-text">"{t(item.textEs, item.textEn)}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;