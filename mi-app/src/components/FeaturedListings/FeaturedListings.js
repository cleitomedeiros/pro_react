import React, { useState } from 'react';
import ListingCard from './ListingCard'; // Ajuste o caminho se necessário

const FeaturedListings = ({ currentLang, favorites, onToggleFav, searchTerm, onAddToCart }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;
  const [filterType, setFilterType] = useState('all');

  const listings = [
    { id: 1, type: 'service', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)', icon: 'fa-tooth', iconColor: '#dc2626', categoryEs: 'Odontologia', categoryEn: 'Dentistry', titleEs: 'Limpieza Dental Profesional + Blanqueamiento', titleEn: 'Professional Dental Cleaning + Whitening', location: 'San Jose, Escazu', price: '45,000', priceUnitEs: '/ sesion', priceUnitEn: '/ session', rating: '4.9', reviews: '127' },
    { id: 2, type: 'escrow', gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', icon: 'fa-car', iconColor: '#2563eb', categoryEs: 'Vehiculos', categoryEn: 'Vehicles', titleEs: 'Toyota Hilux 2022 4x4', titleEn: 'Toyota Hilux 2022 4x4', location: 'Heredia, San Pablo', price: '18,500,000', rating: '4.8', reviews: '23' },
    { id: 3, type: 'service', gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: 'fa-spa', iconColor: '#d97706', categoryEs: 'Masajes', categoryEn: 'Massage', titleEs: 'Masaje Terapeutico a Domicilio', titleEn: 'Therapeutic Massage at Home', location: 'Cartago, Tres Rios', price: '25,000', priceUnitEs: '/ hora', priceUnitEn: '/ hour', rating: '4.7', reviews: '89' },
    { id: 4, type: 'escrow', gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', icon: 'fa-motorcycle', iconColor: '#db2777', categoryEs: 'Motocicletas', categoryEn: 'Motorcycles', titleEs: 'Honda CB500F 2023', titleEn: 'Honda CB500F 2023', location: 'Alajuela, San Ramon', price: '4,200,000', rating: '5.0', reviews: '12' },
    { id: 5, type: 'service', gradient: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', icon: 'fa-user-md', iconColor: '#4f46e5', categoryEs: 'Medicina General', categoryEn: 'General Medicine', titleEs: 'Consulta Medica a Domicilio 24/7', titleEn: 'Home Medical Consultation 24/7', location: 'San Jose, Todo el GAM', price: '35,000', priceUnitEs: '/ consulta', priceUnitEn: '/ consultation', rating: '4.9', reviews: '203' },
    { id: 6, type: 'escrow', gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', icon: 'fa-bicycle', iconColor: '#059669', categoryEs: 'Bicicletas', categoryEn: 'Bicycles', titleEs: 'Trek Marlin 7 Mountain Bike', titleEn: 'Trek Marlin 7 Mountain Bike', location: 'San Jose, Santa Ana', price: '385,000', rating: '4.6', reviews: '45' },
    { id: 7, type: 'service', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)', icon: 'fa-cut', iconColor: '#dc2626', categoryEs: 'Peluqueria', categoryEn: 'Hairdressing', titleEs: 'Corte + Tinte + Hidratacion', titleEn: 'Cut + Dye + Hydration', location: 'San Jose, Curridabat', price: '28,000', rating: '4.8', reviews: '156' },
    { id: 8, type: 'escrow', gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: 'fa-car', iconColor: '#d97706', categoryEs: 'Vehiculos', categoryEn: 'Vehicles', titleEs: 'Suzuki Swift 2021 Automatico', titleEn: 'Suzuki Swift 2021 Automatic', location: 'Limon, Centro', price: '8,900,000', rating: '4.7', reviews: '34' },
  ];

  const filtered = listings.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.titleEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <section className="section" id="listings" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{t('Destacados', 'Featured')}</h2>
            <p className="section-subtitle">{t('Los mejores servicios y productos esta semana', 'The best services and products this week')}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn-outline ${filterType === 'service' ? 'active-filter' : ''}`} 
              style={{ padding: '8px 16px', fontSize: '13px' }} 
              onClick={() => setFilterType(filterType === 'service' ? 'all' : 'service')}
            >
              {t('Servicios', 'Services')}
            </button>
            <button 
              className={`btn-primary ${filterType === 'escrow' ? 'active-filter' : ''}`} 
              style={{ padding: '8px 16px', fontSize: '13px' }} 
              onClick={() => setFilterType(filterType === 'escrow' ? 'all' : 'escrow')}
            >
              {t('Productos', 'Products')}
            </button>
          </div>
        </div>
        <div className="listings-grid">
          {filtered.map(item => (
            <ListingCard
              key={item.id}
              item={item}
              currentLang={currentLang}
              onToggleFav={onToggleFav}
              isFav={favorites.includes(item.id)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>
            <i className="fas fa-search" style={{ fontSize: '40px', marginBottom: '15px' }}></i>
            <p>{t('No se encontraron resultados', 'No results found')}</p>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#" className="btn-primary">{t('Ver Mas Anuncios', 'View More Listings')}</a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;