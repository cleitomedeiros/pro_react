import React, { useState } from 'react';
import HeaderPrincipal from './HeaderPrincipal';

// 🔴 ADICIONE as novas props: currentUser e onLogout
const Header = ({ currentLang, changeLang, cartCount, onLoginClick, onPublishClick, currentUser, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <HeaderPrincipal
      currentLang={currentLang}
      changeLang={changeLang}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      cartCount={cartCount}
      onLoginClick={onLoginClick}
      onPublishClick={onPublishClick}
      t={t}
      currentUser={currentUser}  // 🔴 PASSE currentUser
      onLogout={onLogout}        // 🔴 PASSE onLogout
    />
  );
};

export default Header;