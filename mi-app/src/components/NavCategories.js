import React, { useState } from 'react';

const NavCategories = ({ currentLang, onCategorySelect }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;
  const [active, setActive] = useState('Todos');

  const categories = [
    { id: 'Todos', icon: 'fa-th-large', es: 'Todos', en: 'All' },
    { id: 'Dentistas', icon: 'fa-tooth', es: 'Dentistas', en: 'Dentists' },
    { id: 'Medicos', icon: 'fa-user-md', es: 'Medicos', en: 'Doctors' },
    { id: 'Masajistas', icon: 'fa-spa', es: 'Masajistas', en: 'Massage' },
    { id: 'Vehiculos', icon: 'fa-car', es: 'Vehiculos', en: 'Vehicles' },
    { id: 'Motos', icon: 'fa-motorcycle', es: 'Motos', en: 'Motorcycles' },
    { id: 'Bicicletas', icon: 'fa-bicycle', es: 'Bicicletas', en: 'Bicycles' },
    { id: 'Servicios', icon: 'fa-briefcase', es: 'Servicios', en: 'Services' },
  ];

  const handleSelect = (categoryId) => {
    setActive(categoryId);
    if (onCategorySelect) onCategorySelect(categoryId);
  };

  return (
    <nav className="nav-categories">
      <div className="container">
        {categories.map(cat => (
          <a
            key={cat.id}
            href="#"
            className={`nav-item ${active === cat.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleSelect(cat.id); }}
          >
            <i className={`fas ${cat.icon}`}></i>
            <span>{t(cat.es, cat.en)}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavCategories;