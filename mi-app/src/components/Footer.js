import React from 'react';

const Footer = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <i className="fas fa-shield-alt"></i>
              CostaMarket
            </a>
            <p>{t('La plataforma líder en Costa Rica para compra, venta y contratación de servicios profesionales con pagos 100% seguros.', 'The leading platform in Costa Rica for buying, selling and hiring professional services with 100% secure payments.')}</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t('Servicios', 'Services')}</h4>
            <ul>
              <li><a href="#">{t('Dentistas', 'Dentists')}</a></li>
              <li><a href="#">{t('Medicos', 'Doctors')}</a></li>
              <li><a href="#">{t('Masajistas', 'Massage Therapists')}</a></li>
              <li><a href="#">{t('Peluquería', 'Hairdressing')}</a></li>
              <li><a href="#">{t('Entrenadores', 'Trainers')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('Productos', 'Products')}</h4>
            <ul>
              <li><a href="#">{t('Vehículos', 'Vehicles')}</a></li>
              <li><a href="#">{t('Motocicletas', 'Motorcycles')}</a></li>
              <li><a href="#">{t('Bicicletas', 'Bicycles')}</a></li>
              <li><a href="#">{t('Tecnología', 'Technology')}</a></li>
              <li><a href="#">{t('Hogar', 'Home')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('Ayuda', 'Help')}</h4>
            <ul>
              <li><a href="#">{t('Centro de Ayuda', 'Help Center')}</a></li>
              <li><a href="#">{t('Como funciona Escrow', 'How Escrow Works')}</a></li>
              <li><a href="#">{t('Seguridad', 'Security')}</a></li>
              <li><a href="#">{t('Términos y Condiciones', 'Terms & Conditions')}</a></li>
              <li><a href="#">{t('Contacto', 'Contact')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>2024 CostaMarket. {t('Todos los derechos reservados.', 'All rights reserved.')}</span>
          <span>Costa Rica</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;