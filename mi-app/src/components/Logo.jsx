import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <i className="fas fa-shield-alt"></i>
      CostaMarket
    </Link>
  );
};

export default Logo;