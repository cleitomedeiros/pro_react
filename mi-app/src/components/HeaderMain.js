import React from 'react';
import { Link } from 'react-router-dom';

const HeaderMain = ({ searchTerm, setSearchTerm, cartCount, onLoginClick, onPublishClick, t, currentUser, onLogout }) => {
  return (
    <div className="header-main">
      <div className="container">
        <Link to="/" className="logo">
          <i className="fas fa-shield-alt"></i>
          CostaMarket
        </Link>
        
        <div className="search-bar">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('Buscar servicios, vehículos, productos...', 'Search services, vehicles, products...')}
          />
          <button><i className="fas fa-search"></i></button>
        </div>
        
        <div className="header-actions">
          {/* 🔴 VERIFIQUE SE O USUÁRIO ESTÁ LOGADO */}
          {currentUser ? (
            // Mostrar menu do usuário logado
            <>
              <span className="user-name" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                <i className="fas fa-user-circle"></i> {currentUser.name}
              </span>
              <button className="header-btn" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>{t('Sair', 'Logout')}</span>
              </button>
            </>
          ) : (
            // Mostrar botão de login
            <button className="header-btn" onClick={onLoginClick}>
              <i className="fas fa-user"></i>
              <span>{t('Ingresar', 'Sign In')}</span>
            </button>
          )}
          
          <Link to="/favoritos" className="header-btn">
            <i className="fas fa-heart"></i>
            <span>{t('Favoritos', 'Favorites')}</span>
          </Link>
          
          <Link to="/carrito" className="header-btn">
            <i className="fas fa-shopping-cart"></i>
            <span className="badge">{cartCount}</span>
            <span>{t('Carrito', 'Cart')}</span>
          </Link>
          
          <button className="btn-primary" onClick={onPublishClick}>
            <i className="fas fa-plus"></i> {t('Publicar', 'Publish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;