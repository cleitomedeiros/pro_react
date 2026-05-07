import React from 'react';
import HeaderTop from './HeaderTop';
import HeaderMain from './HeaderMain';

const HeaderPrincipal = ({ 
  currentLang, 
  changeLang, 
  searchTerm, 
  setSearchTerm, 
  cartCount,
  onLoginClick,
  onPublishClick,
  t,
  currentUser,    // 🔴 ADICIONE
  onLogout        // 🔴 ADICIONE
}) => {
  return (
    <header className="header">
      <HeaderTop 
        currentLang={currentLang} 
        changeLang={changeLang} 
        t={t} 
      />
      
      <HeaderMain 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        onLoginClick={onLoginClick}
        onPublishClick={onPublishClick}
        t={t}
        currentUser={currentUser}   // 🔴 PASSE currentUser
        onLogout={onLogout}          // 🔴 PASSE onLogout
      />
      
      {/* <NavCategories currentLang={currentLang} /> */}
    </header>
  );
};

export default HeaderPrincipal;