import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ item, currentLang, onToggleFav, isFav, onAddToCart }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  // 🔴 FUNÇÃO PARA EVITAR PROPAGAÇÃO DO CLIQUE
  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFav(item.id);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div className="listing-card">
      {/* 🔴 ENVOLVE O CONTEÚDO COM LINK (exceto botões) */}
      <Link to={`/produto/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="listing-img" style={{ background: item.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <i className={`fas ${item.icon}`} style={{ fontSize: '60px', color: item.iconColor, opacity: 0.3 }}></i>
          <span className={`listing-badge ${item.type}`}>
            {item.type === 'escrow' ? <><i className="fas fa-shield-alt"></i> ESCROW</> : t('SERVICIO', 'SERVICE')}
          </span>
        </div>
        <div className="listing-body">
          <div className="listing-category">{t(item.categoryEs, item.categoryEn)}</div>
          <div className="listing-title">{t(item.titleEs, item.titleEn)}</div>
          <div className="listing-location"><i className="fas fa-map-marker-alt"></i> {item.location}</div>
          <div className="listing-footer">
            <div className="listing-price">{item.price} <span>{item.priceUnit ? t(item.priceUnitEs, item.priceUnitEn) : ''}</span></div>
            <div className="listing-rating"><i className="fas fa-star"></i> {item.rating} ({item.reviews})</div>
          </div>
        </div>
      </Link>

      {/* 🔴 BOTÃO FAVORITO (fora do Link) */}
      <button 
        className={`listing-fav ${isFav ? 'active' : ''}`} 
        onClick={handleFavClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        <i className={isFav ? 'fas fa-heart' : 'far fa-heart'} style={{ color: isFav ? '#dc2626' : '#666' }}></i>
      </button>
      
      {/* 🔴 BOTÃO ADICIONAR AO CARRINHO (fora do Link) */}
      <button 
        className="btn-add-to-cart"
        onClick={handleCartClick}
        style={{
          width: 'calc(100% - 20px)',
          margin: '0 10px 15px 10px',
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
        <i className="fas fa-shopping-cart"></i> {t('Agregar al Carrito', 'Add to Cart')}
      </button>
    </div>
  );
};

export default ListingCard;