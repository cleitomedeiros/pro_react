import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ============== COMPONENTES ==============

const Header = ({ currentLang, changeLang, cartCount, onLoginClick, onPublishClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <span>{t('Envios a todo Costa Rica | Pagos seguros con escrow', 'Shipping throughout Costa Rica | Secure escrow payments')}</span>
          <div className="lang-switcher">
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Idioma:</span>
            <button className={`lang-btn ${currentLang === 'es' ? 'active' : ''}`} onClick={() => changeLang('es')}>ES</button>
            <button className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`} onClick={() => changeLang('en')}>EN</button>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="container">
          <a href="#" className="logo">
            <i className="fas fa-shield-alt"></i>
            CostaMarket
          </a>
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('Buscar servicios, vehiculos, productos...', 'Search services, vehicles, products...')}
            />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="header-actions">
            <button className="header-btn" onClick={onLoginClick}>
              <i className="fas fa-user"></i>
              <span>{t('Ingresar', 'Sign In')}</span>
            </button>
            <button className="header-btn">
              <i className="fas fa-heart"></i>
              <span>{t('Favoritos', 'Favorites')}</span>
            </button>
            <button className="header-btn">
              <i className="fas fa-shopping-cart"></i>
              <span className="badge">{cartCount}</span>
              <span>{t('Carrito', 'Cart')}</span>
            </button>
            <button className="btn-primary" onClick={onPublishClick}>
              <i className="fas fa-plus"></i> {t('Publicar', 'Publish')}
            </button>
          </div>
        </div>
      </div>
      <NavCategories currentLang={currentLang} />
    </header>
  );
};

const NavCategories = ({ currentLang }) => {
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

  return (
    <nav className="nav-categories">
      <div className="container">
        {categories.map(cat => (
          <a
            key={cat.id}
            href="#"
            className={`nav-item ${active === cat.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActive(cat.id); }}
          >
            <i className={`fas ${cat.icon}`}></i>
            <span>{t(cat.es, cat.en)}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

const Hero = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>{t('Compra y vende con total seguridad en Costa Rica', 'Buy and sell with total security in Costa Rica')}</h1>
          <p>{t('Servicios profesionales y productos de calidad con nuestro sistema de pagos protegidos. El dinero solo se libera cuando recibes lo que pediste.', 'Professional services and quality products with our protected payment system. Money is only released when you receive what you ordered.')}</p>
          <div>
            <a href="#listings" className="btn-primary" style={{ marginRight: '10px' }}>{t('Explorar Ahora', 'Explore Now')}</a>
            <a href="#how-it-works" className="btn-outline">{t('Como Funciona', 'How It Works')}</a>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>{t('Pagos Seguros', 'Secure Payments')}</span>
            </div>
            <div className="hero-feature">
              <i className="fas fa-check-circle"></i>
              <span>{t('Verificacion de Identidad', 'Identity Verification')}</span>
            </div>
            <div className="hero-feature">
              <i className="fas fa-headset"></i>
              <span>{t('Soporte 24/7', '24/7 Support')}</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <h3>{t('Ubicacion Actual', 'Current Location')}</h3>
          <div className="location-selector">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <div style={{ fontWeight: 600 }}>San Jose, Costa Rica</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t('Cambiar ubicacion', 'Change location')}</div>
            </div>
            <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>2,450+</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t('Profesionales', 'Professionals')}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>15,800+</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t('Productos', 'Products')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const items = [
    { icon: 'fa-lock', title: t('Pago Seguro Escrow', 'Secure Escrow Payment'), desc: t('Tu dinero esta protegido hasta que confirmes la recepcion', 'Your money is protected until you confirm receipt') },
    { icon: 'fa-user-check', title: t('Vendedores Verificados', 'Verified Sellers'), desc: t('Todos los profesionales pasan por verificacion de identidad', 'All professionals go through identity verification') },
    { icon: 'fa-undo', title: t('Garantia de Devolução', 'Money Back Guarantee'), desc: t('Se você não receber o acordado, devolvemos 100%', 'If you don\'t receive what was agreed, we refund 100%') },
    { icon: 'fa-comments', title: t('Chat Integrado', 'Integrated Chat'), desc: t('Comunicate directamente con el vendedor dentro de la plataforma', 'Communicate directly with the seller within the platform') },
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {items.map((item, idx) => (
            <div className="trust-item" key={idx}>
              <div className="icon"><i className={`fas ${item.icon}`}></i></div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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

const ListingCard = ({ item, currentLang, onToggleFav, isFav }) => {
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
      </div>
    </div>
  );
};

const FeaturedListings = ({ currentLang, favorites, onToggleFav, searchTerm }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;
  const [filterType, setFilterType] = useState('all');

  const listings = [
    { id: 1, type: 'service', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)', icon: 'fa-tooth', iconColor: '#dc2626', categoryEs: 'Odontologia', categoryEn: 'Dentistry', titleEs: 'Limpieza Dental Profesional + Blanqueamiento', titleEn: 'Professional Dental Cleaning + Whitening', location: 'San Jose, Escazu', price: '45,000', priceUnitEs: '/ sesion', priceUnitEn: '/ session', rating: '4.9', reviews: '127' },
    { id: 2, type: 'escrow', gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', icon: 'fa-car', iconColor: '#2563eb', categoryEs: 'Vehiculos', categoryEn: 'Vehicles', titleEs: 'Toyota Hilux 2022 4x4', titleEn: 'Toyota Hilux 2022 4x4', location: 'Heredia, San Pablo', price: '18,500,000', rating: '4.8', reviews: '23' },
    { id: 3, type: 'service', gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: 'fa-spa', iconColor: '#d97706', categoryEs: 'Masajes', categoryEn: 'Massage', titleEs: 'Masaje Terapeutico a Domicilio', titleEn: 'Therapeutic Massage at Home', location: 'Cartago, Tres Rios', price: '25,000', priceUnitEs: '/ hora', priceUnitEn: '/ hour', rating: '4.7', reviews: '89' },
    { id: 4, type: 'escrow', gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', icon: 'fa-motorcycle', iconColor: '#db2777', categoryEs: 'Motocicletas', categoryEn: 'Motorcycles', titleEs: 'Honda CB500F 2023', titleEn: 'Honda CB500F 2023', location: 'Alajuela, San Ramon', price: '4,200,000', rating: '5.0', reviews: '12' },
    { id: 5, type: 'service', gradient: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', icon: 'fa-user-md', iconColor: '#4f46e5', categoryEs: 'Medicina General', categoryEn: 'General Medicine', titleEs: 'Consulta Medica a Domicilio 24/7', titleEn: 'Home Medical Consultation 24/7', location: 'San Jose, Todo el GAM', price: '35,000', priceUnitEs: '/ consulta', priceUnitEn: '/ consultation', rating: '4.9', reviews: '203' },
    { id: 6, type: 'escrow', gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', icon: 'fa-bicycle', iconColor: '#059669', categoryEs: 'Bicicletas', categoryEn: 'Bicycles', titleEs: 'Trek Marlin 7 Mountain Bike', titleEn: 'Trek Marlin 7 Mountain Bike', location: 'San Jose, Santa Ana', price: '385,000', rating: '4.6', reviews: '45' },
    { id: 7, type: 'service', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)', icon: 'fa-cut', iconColor: '#dc2626', categoryEs: 'Peluqueria', categoryEn: 'Hairdressing', titleEs: 'Corte + Tinte + Hidratacion', titleEn: 'Cut + Dye + Hydration', location: 'San Jose, Curridabat', price: '28,000', rating: '4.8', reviews: '156' },
    { id: 8, type: 'escrow', gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: 'fa-car', iconColor: '#d97706', categoryEs: 'Vehiculos', categoryEn: 'Vehicles', titleEs: 'Suzuki Swift 2021 Automatico', titleEn: 'Suzuki Swift 2021 Automatic', location: 'Limon, Centro', price: '8,900,000', rating: '4.7', reviews: '34' },
  ];

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
            <button className={`btn-outline ${filterType === 'service' ? 'active-filter' : ''}`} style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setFilterType(filterType === 'service' ? 'all' : 'service')}>
              {t('Servicios', 'Services')}
            </button>
            <button className={`btn-primary ${filterType === 'escrow' ? 'active-filter' : ''}`} style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setFilterType(filterType === 'escrow' ? 'all' : 'escrow')}>
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

const EscrowBanner = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <section className="section">
      <div className="container">
        <div className="escrow-banner">
          <div className="escrow-content">
            <h3>{t('Como funciona la proteccion de pagos?', 'How does payment protection work?')}</h3>
            <p>{t('Nuestro sistema Escrow protege tanto al comprador como al vendedor. El dinero se mantiene seguro en nuestra plataforma hasta que ambas partes confirmen que todo esta correcto.', 'Our Escrow system protects both buyer and seller. Money is kept safe on our platform until both parties confirm everything is correct.')}</p>
            <div className="escrow-steps">
              {[
                { num: '1', titleEs: 'Compras', titleEn: 'You Buy' },
                { num: '2', titleEs: 'Pagas', titleEn: 'You Pay' },
                { num: '3', titleEs: 'Recibes', titleEn: 'You Receive' },
                { num: '4', titleEs: 'Liberamos', titleEn: 'We Release' },
              ].map(step => (
                <div className="escrow-step" key={step.num}>
                  <div className="step-num">{step.num}</div>
                  <h5>{t(step.titleEs, step.titleEn)}</h5>
                </div>
              ))}
            </div>
            <br />
            <a href="#" className="btn-primary">{t('Mas Informacion', 'More Information')}</a>
          </div>
          <div className="escrow-visual">
            <h4 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--primary)' }}>{t('Flujo de Pago Seguro', 'Secure Payment Flow')}</h4>
            <div className="escrow-flow">
              <div className="escrow-entity">
                <div className="entity-icon entity-buyer"><i className="fas fa-user"></i></div>
                <span>{t('Comprador', 'Buyer')}</span>
              </div>
              <i className="fas fa-arrow-right escrow-arrow"></i>
              <div className="escrow-entity">
                <div className="entity-icon entity-platform"><i className="fas fa-shield-alt"></i></div>
                <span>{t('CostaMarket', 'CostaMarket')}</span>
              </div>
              <i className="fas fa-arrow-right escrow-arrow"></i>
              <div className="escrow-entity">
                <div className="entity-icon entity-seller"><i className="fas fa-store"></i></div>
                <span>{t('Vendedor', 'Seller')}</span>
              </div>
            </div>
            <div style={{ marginTop: '25px', background: 'var(--primary-light)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                <i className="fas fa-lock"></i> {t('Fondos protegidos hasta confirmacion de entrega', 'Funds protected until delivery confirmation')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const steps = [
    { num: '1', titleEs: 'Busca', titleEn: 'Search', descEs: 'Encuentra el servicio o producto que necesitas filtrando por categoria, ubicacion y precio.', descEn: 'Find the service or product you need by filtering by category, location and price.' },
    { num: '2', titleEs: 'Contacta', titleEn: 'Contact', descEs: 'Chatea con el vendedor o profesional, acuerda detalles y coordina la entrega o cita.', descEn: 'Chat with the seller or professional, agree on details and coordinate delivery or appointment.' },
    { num: '3', titleEs: 'Paga Seguro', titleEn: 'Pay Securely', descEs: 'Realiza el pago a traves de nuestro sistema escrow. Tu dinero esta protegido.', descEn: 'Make the payment through our escrow system. Your money is protected.' },
    { num: '4', titleEs: 'Recibe y Valora', titleEn: 'Receive & Rate', descEs: 'Confirma la recepcion para liberar el pago al vendedor y deja tu calificacion.', descEn: 'Confirm receipt to release payment to the seller and leave your rating.' },
  ];

  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title">{t('Como Funciona?', 'How Does It Work?')}</h2>
          <p className="section-subtitle">{t('Compra, vende y contrata servicios en simples pasos', 'Buy, sell and hire services in simple steps')}</p>
        </div>
        <div className="steps-grid">
          {steps.map(step => (
            <div className="step-card" key={step.num}>
              <div className="step-number">{step.num}</div>
              <h4>{t(step.titleEs, step.titleEn)}</h4>
              <p>{t(step.descEs, step.descEn)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  const testimonials = [
    { initials: 'MR', name: 'Maria Rodriguez', roleEs: 'Compradora', roleEn: 'Buyer', textEs: 'Compre una moto y el sistema escrow me dio mucha confianza. El vendedor fue muy amable y el producto llego en perfectas condiciones. 100% recomendado!', textEn: 'I\' bought a motorcycle and the escrow system gave me a lot of confidence. The seller was very kind and the product arrived in perfect condition. 100% recommended!', stars: 5 },
    { initials: 'CG', name: 'Carlos Gutierrez', roleEs: 'Vendedor', roleEn: 'Seller', textEs: 'Soy dentista y esta plataforma me ha ayudado a conseguir muchos pacientes nuevos. El sistema de pagos es muy seguro para ambas partes.', textEn: 'I\'m a dentist and this platform has helped me get many new patients. The payment system is very safe for both parties.', stars: 5 },
    { initials: 'LP', name: 'Laura Perez', roleEs: 'Masajista', roleEn: 'Masseuse', textEs: 'Ofrezco masajes a domicilio y la verificacion de identidad da confianza a mis clientes. La plataforma es muy facil de usar y el soporte es excelente.', textEn: 'I\' offer home massages and identity verification gives my clients confidence. The platform is very easy to use and support is excellent.', stars: 4.5 },
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title">{t('Lo que dicen nuestros usuarios', 'What our users say')}</h2>
          <p className="section-subtitle">{t('Miles de costarricenses confian en CostaMarket', 'Thousands of Costa Ricans trust CostaMarket')}</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="testimonial-header">
                <div className="testimonial-avatar">{item.initials}</div>
                <div className="testimonial-info">
                  <h5>{item.name}</h5>
                  <span>{t(item.roleEs, item.roleEn)}</span>
                </div>
              </div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={i < Math.floor(item.stars) ? 'fas fa-star' : i < item.stars ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
                ))}
              </div>
              <p className="testimonial-text">"{t(item.textEs, item.textEn)}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <section className="section">
      <div className="container">
        <div className="cta-section">
          <h2>{t('Listo para comenzar?', 'Ready to get started?')}</h2>
          <p>{t('Unete a miles de costarricenses que compran y venden de forma segura', 'Join thousands of Costa Ricans who buy and sell safely')}</p>
          <div className="cta-buttons">
            <a href="#" className="cta-btn-white">{t('Crear Cuenta Gratis', 'Create Free Account')}</a>
            <a href="#" className="cta-btn-outline">{t('Publicar Anuncio', 'Post Listing')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ currentLang }) => {
  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <i className="fas fa-shield-alt"></i>
              CostaMarket
            </a>
            <p>{t('La plataforma lider en Costa Rica para compra, venta y contratacion de servicios profesionales con pagos 100% seguros.', 'The leading platform in Costa Rica for buying, selling and hiring professional services with 100% secure payments.')}</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t('Servicios', 'Services')}</h4>
            <ul>
              <li><a href="#">{t('Dentistas', 'Dentists')}</a></li>
              <li><a href="#">{t('Medicos', 'Doctors')}</a></li>
              <li><a href="#">{t('Masajistas', 'Massage Therapists')}</a></li>
              <li><a href="#">{t('Peluqueria', 'Hairdressing')}</a></li>
              <li><a href="#">{t('Entrenadores', 'Trainers')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('Productos', 'Products')}</h4>
            <ul>
              <li><a href="#">{t('Vehiculos', 'Vehicles')}</a></li>
              <li><a href="#">{t('Motocicletas', 'Motorcycles')}</a></li>
              <li><a href="#">{t('Bicicletas', 'Bicycles')}</a></li>
              <li><a href="#">{t('Tecnologia', 'Technology')}</a></li>
              <li><a href="#">{t('Hogar', 'Home')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('Ayuda', 'Help')}</h4>
            <ul>
              <li><a href="#">{t('Centro de Ayuda', 'Help Center')}</a></li>
              <li><a href="#">{t('Como funciona Escrow', 'How Escrow Works')}</a></li>
              <li><a href="#">{t('Seguridad', 'Security')}</a></li>
              <li><a href="#">{t('Terminos y Condiciones', 'Terms & Conditions')}</a></li>
              <li><a href="#">{t('Contacto', 'Contact')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>2024 CostaMarket. {t('Todos los derechos reservados.', 'All rights reserved.')}</span>
          <span>Costa Rica</span>
        </div>
      </div>
    </footer>
  );
};

const Modal = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast show">
      <i className="fas fa-check-circle"></i>
      <span>{message}</span>
    </div>
  );
};

// ============== APP PRINCIPAL ==============

function App() {
  const [currentLang, setCurrentLang] = useState('es');
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast({ message: '', isVisible: false });
  };

  const changeLang = (lang) => {
    setCurrentLang(lang);
    showToast(lang === 'en' ? 'Language changed to English' : 'Idioma cambiado a Espanol');
  };

  const toggleFav = (id) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      if (isFav) {
        showToast(currentLang === 'en' ? 'Removed from favorites' : 'Eliminado de favoritos');
        return prev.filter(favId => favId !== id);
      } else {
        showToast(currentLang === 'en' ? 'Added to favorites' : 'Agregado a favoritos');
        return [...prev, id];
      }
    });
  };

  const t = (es, en) => currentLang === 'es' ? es : en;

  return (
    <div className="App">
      <Header
        currentLang={currentLang}
        changeLang={changeLang}
        cartCount={cartCount}
        onLoginClick={() => setLoginOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <Hero currentLang={currentLang} />
      <TrustSection currentLang={currentLang} />
      <Categories currentLang={currentLang} onFilter={(cat) => showToast(t('Filtrando por categoria...', 'Filtering by category...'))} />
      <FeaturedListings
        currentLang={currentLang}
        favorites={favorites}
        onToggleFav={toggleFav}
        searchTerm={searchTerm}
      />
      <EscrowBanner currentLang={currentLang} />
      <HowItWorks currentLang={currentLang} />
      <Testimonials currentLang={currentLang} />
      <CTASection currentLang={currentLang} />
      <Footer currentLang={currentLang} />

      {/* Modal Login */}
      <Modal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        title={t('Iniciar Sesion', 'Sign In')}
        description={t('Accede a tu cuenta para comprar, vender y gestionar tus anuncios.', 'Access your account to buy, sell and manage your listings.')}
      >
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setLoginOpen(false); showToast(t('Inicio de sesion exitoso', 'Login successful')); }}>
          <div className="form-group">
            <label>{t('Correo Electronico', 'Email')}</label>
            <input type="email" placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label>{t('Contrasena', 'Password')}</label>
            <input type="password" placeholder="********" required />
          </div>
          <button type="submit" className="btn-primary">{t('Ingresar', 'Sign In')}</button>
        </form>
      </Modal>

      {/* Modal Publicar */}
      <Modal
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
        title={t('Publicar Anuncio', 'Post Listing')}
        description={t('Elige el tipo de anuncio que deseas publicar.', 'Choose the type of listing you want to post.')}
      >
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setPublishOpen(false); showToast(t('Anuncio publicado exitosamente', 'Listing published successfully')); }}>
          <div className="form-group">
            <label>{t('Tipo de Anuncio', 'Listing Type')}</label>
            <select>
              <option>{t('Servicio Profesional', 'Professional Service')}</option>
              <option>{t('Venta de Producto', 'Product for Sale')}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('Titulo', 'Title')}</label>
            <input type="text" placeholder="Ej: Limpieza Dental Profesional" required />
          </div>
          <div className="form-group">
            <label>{t('Precio (CRC)', 'Price (CRC)')}</label>
            <input type="number" placeholder="45000" required />
          </div>
          <button type="submit" className="btn-primary">{t('Publicar Ahora', 'Publish Now')}</button>
        </form>
      </Modal>

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </div>
  );
}

export default App;