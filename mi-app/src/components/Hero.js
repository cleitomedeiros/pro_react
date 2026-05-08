import React, { useState } from 'react';
import LocationPicker from './LocationPicker';

const Hero = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 9.9281,
    lng: -84.0907,
    address: 'San Jose, Costa Rica'
  });

  // Função para quando selecionar a localização
  const handleLocationSelect = (location) => {
    setUserLocation(prev => ({
      ...prev,
      lat: location.lat,
      lng: location.lng,
      address: location.address
    }));
    // Fecha o modal automaticamente
    setShowLocationModal(false);
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>{t('Compra y vende con total seguridad en Costa Rica', 'Buy and sell with total security in Costa Rica')}</h1>
          <p>{t('Servicios profesionales y productos de calidad con nuestro sistema de pagos protegidos. El dinero solo se libera cuando recibes lo que pediste.', 'Professional services and quality products with our protected payment system. Money is only released when you receive what you ordered.')}</p>
          <div>
            <a href="#listings" className="btn-primary" style={{ marginRight: '10px' }}>{t('Explorar Ahora', 'Explore Now')}</a>
            <a href="#how-it-works" className="btn-outline">{t('Como Funciona', 'How It Works')}</a>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>{t('Pagos Seguros', 'Secure Payments')}</span>
            </div>
            <div className="hero-feature">
              <i className="fas fa-check-circle"></i>
              <span>{t('Verificación de Identidad', 'Identity Verification')}</span>
            </div>
            <div className="hero-feature">
              <i className="fas fa-headset"></i>
              <span>{t('Soporte 24/7', '24/7 Support')}</span>
            </div>
          </div>
        </div>
        
        <div className="hero-card">
          <h3>{t('Ubicacion Actual', 'Current Location')}</h3>
          <div className="location-selector" onClick={() => setShowLocationModal(true)} style={{ cursor: 'pointer' }}>
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <div style={{ fontWeight: 600 }}>{userLocation.address}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                <i className="fas fa-pen"></i> {t('Cambiar ubicacion', 'Change location')}
              </div>
            </div>
            <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
          </div>
          
          {/* Estatísticas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>2,450+</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t('Profesionales', 'Professionals')}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>15,800+</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t('Productos', 'Products')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do mapa - SEM OS BOTÕES */}
      {showLocationModal && (
        <div className="modal-overlay active" onClick={() => setShowLocationModal(false)}>
          <div className="modal" style={{ maxWidth: '600px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLocationModal(false)}>&times;</button>
            <h3>{t('Selecionar Localização', 'Select Location')}</h3>
            <LocationPicker 
              onLocationSelect={handleLocationSelect}
              initialLocation={userLocation}
              t={t}
            />
            {/* 🔴 BOTÕES REMOVIDOS */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;