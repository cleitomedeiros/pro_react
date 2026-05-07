import React from 'react';

const Categories = ({ currentLang, onFilter }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const categories = [
    { id: 'health', icon: 'fa-heartbeat', color: 'cat-health', titleEs: 'Salud', titleEn: 'Health', count: '245', labelEs: 'profesionales', labelEn: 'professionals' },
    { id: 'vehicles', icon: 'fa-car-side', color: 'cat-vehicle', titleEs: 'Vehiculos', titleEn: 'Vehicles', count: '1,203', labelEs: 'en venta', labelEn: 'for sale' },
    { id: 'services', icon: 'fa-tools', color: 'cat-service', titleEs: 'Servicios', titleEn: 'Services', count: '890', labelEs: 'disponibles', labelEn: 'available' },
    { id: 'beauty', icon: 'fa-magic', color: 'cat-beauty', titleEs: 'Belleza', titleEn: 'Beauty', count: '567', labelEs: 'profesionales', labelEn: 'professionals' },
    { id: 'home', icon: 'fa-home', color: 'cat-home', titleEs: 'Hogar', titleEn: 'Home', count: '2,341', labelEs: 'articulos', labelEn: 'items' },
    { id: 'tech', icon: 'fa-laptop', color: 'cat-tech', titleEs: 'Tecnologia', titleEn: 'Technology', count: '3,102', labelEs: 'productos', labelEn: 'products' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{t('Categorias Populares', 'Popular Categories')}</h2>
            <p className="section-subtitle">{t('Encuentra lo que necesitas en nuestras principales categorias', 'Find what you need in our main categories')}</p>
          </div>
          <a href="#" className="btn-outline">{t('Ver Todas', 'View All')}</a>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <div className="category-card" key={cat.id} onClick={() => onFilter(cat.id)}>
              <div className={`cat-icon ${cat.color}`}><i className={`fas ${cat.icon}`}></i></div>
              <h4>{t(cat.titleEs, cat.titleEn)}</h4>
              <span>{cat.count} <span>{t(cat.labelEs, cat.labelEn)}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;