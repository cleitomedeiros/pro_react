import React from 'react';

const ListingCard = ({ item, currentLang, onToggleFav, isFav, onAddToCart }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <div className="listing-card">
      <div className="listing-img" style={{ background: item.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className={`fas ${item.icon}`} style={{ fontSize: '60px', color: item.iconColor, opacity: 0.3 }}></i>
        <span className={`listing-badge ${item.type}`}>
          {item.type === 'escrow' ? <><i className="fas fa-shield-alt"></i> ESCROW</> : t('SERVICIO', 'SERVICE')}
        </span>
        <button className={`listing-fav ${isFav ? 'active' : ''}`} onClick={() => onToggleFav(item.id)}>
          <i className={isFav ? 'fas fa-heart' : 'far fa-heart'}></i>
        </button>
      </div>
      <div className="listing-body">
        <div className="listing-category">{t(item.categoryEs, item.categoryEn)}</div>
        <div className="listing-title">{t(item.titleEs, item.titleEn)}</div>
        <div className="listing-location"><i className="fas fa-map-marker-alt"></i> {item.location}</div>
        <div className="listing-footer">
          <div className="listing-price">{item.price} <span>{item.priceUnit ? t(item.priceUnitEs, item.priceUnitEn) : ''}</span></div>
          <div className="listing-rating"><i className="fas fa-star"></i> {item.rating} ({item.reviews})</div>
        </div>
        
        {/* Botão Adicionar ao Carrinho */}
        <button 
          className="btn-add-to-cart"
          onClick={() => onAddToCart(item)}
          style={{
            width: '100%',
            marginTop: '15px',
            padding: '10px',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
          onMouseLeave={(e) => e.target.style.background = '#dc2626'}
        >
          <i className="fas fa-shopping-cart"></i> {t('Adicionar ao Carrinho', 'Add to Cart')}
        </button>
      </div>
    </div>
  );
};

export default ListingCard;