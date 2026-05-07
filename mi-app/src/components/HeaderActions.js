import React from 'react';

const HeaderActions = ({ cartCount, onLoginClick, onPublishClick, currentLang, t }) => {
  return (
    <div className="header-actions">
      <LoginButton onClick={onLoginClick} t={t} />
      <FavoritesButton t={t} />
      <CartButton cartCount={cartCount} t={t} />
      <PublishButton onClick={onPublishClick} t={t} />
    </div>
  );
};

// Botones individuales
const LoginButton = ({ onClick, t }) => (
  <button className="header-btn" onClick={onClick}>
    <i className="fas fa-user"></i>
    <span>{t('Ingresar', 'Sign In')}</span>
  </button>
);

const FavoritesButton = ({ t }) => (
  <button className="header-btn">
    <i className="fas fa-heart"></i>
    <span>{t('Favoritos', 'Favorites')}</span>
  </button>
);

const CartButton = ({ cartCount, t }) => (
  <button className="header-btn">
    <i className="fas fa-shopping-cart"></i>
    {cartCount > 0 && <span className="badge">{cartCount}</span>}
    <span>{t('Carrito', 'Cart')}</span>
  </button>
);

const PublishButton = ({ onClick, t }) => (
  <button className="btn-primary" onClick={onClick}>
    <i className="fas fa-plus"></i> {t('Publicar', 'Publish')}
  </button>
);

export default HeaderActions;