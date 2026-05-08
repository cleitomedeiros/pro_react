import React, { useState } from 'react';
import ListingCard from './ListingCard';
import { listings } from '../../data/listings';  // 🔴 IMPORTAR DO ARQUIVO CENTRAL

const FeaturedListings = ({ currentLang, favorites, onToggleFav, searchTerm, onAddToCart }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;
  const [filterType, setFilterType] = useState('all');

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