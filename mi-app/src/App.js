import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// IMPORTS
import Header from './components/Header';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Categories from './components/Categories';
import FeaturedListings from './components/FeaturedListings/FeaturedListings';
import EscrowBanner from './components/EscrowBanner';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Toast from './components/Toast';
import Cart from './pages/Cart';
import FavoritesPage from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';  // 🔴 APENAS UM IMPORT
import { authService, favoritesService } from './services/api';
import SellerDashboard from './pages/Dashboard/SellerDashboard';
import MyListings from './pages/Dashboard/MyListings';
import CreateListing from './pages/Dashboard/CreateListing';
import EditListing from './pages/Dashboard/EditListing';

// Componente de rota protegida
const PrivateRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [currentLang, setCurrentLang] = useState('es');
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  // ========== FUNÇÕES BÁSICAS ==========
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

  const t = (es, en) => currentLang === 'es' ? es : en;

  // ========== FUNÇÕES DE AUTENTICAÇÃO ==========
  const handleLogin = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      setCurrentUser(response.user);
      showToast(currentLang === 'es' ? 'Login realizado!' : 'Login successful!');
      setLoginOpen(false);
    } catch (error) {
      showToast(error.response?.data?.message || 'Erro no login');
    }
  };

  const handleRegister = async (name, email, password, phone) => {
    try {
      const response = await authService.register({ name, email, password, phone });
      setCurrentUser(response.user);
      showToast(currentLang === 'es' ? 'Conta criada!' : 'Account created!');
      setLoginOpen(false);
    } catch (error) {
      showToast(error.response?.data?.message || 'Erro no cadastro');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    showToast(currentLang === 'es' ? 'Logout realizado!' : 'Logged out!');
  };

  // ========== FUNÇÃO PARA CARREGAR FAVORITOS ==========
  const loadFavorites = async () => {
    if (authService.isAuthenticated()) {
      try {
        const favoriteIds = await favoritesService.list();
        setFavorites(favoriteIds);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
  };

  // ========== CARREGAR FAVORITOS QUANDO USUÁRIO LOGAR ==========
  useEffect(() => {
    loadFavorites();
  }, [currentUser]);

  // ========== FUNÇÃO TOGGLE FAV ==========
  const toggleFav = async (id) => {
    const isFav = favorites.includes(id);
    
    try {
      if (isFav) {
        await favoritesService.remove(id);
        setFavorites(prev => prev.filter(favId => favId !== id));
        showToast(currentLang === 'en' ? 'Removed from favorites' : 'Eliminado de favoritos');
      } else {
        await favoritesService.add(id);
        setFavorites(prev => [...prev, id]);
        showToast(currentLang === 'en' ? 'Added to favorites' : 'Agregado a favoritos');
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      showToast(currentLang === 'en' ? 'Error' : 'Error al guardar favorito');
    }
  };

  // ========== FUNÇÕES DO CARRINHO ==========
  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(currentLang === 'es' ? 'Agregado al carrito' : 'Added to cart');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast(currentLang === 'es' ? 'Eliminado del carrito' : 'Removed from cart');
  };

  // ========== COMPONENTE DA PÁGINA INICIAL ==========
  const HomePage = () => (
    <>
      <Hero currentLang={currentLang} />
      <TrustSection currentLang={currentLang} />
      <Categories currentLang={currentLang} onFilter={(cat) => showToast(t('Filtrando por categoria...', 'Filtering by category...'))} />
      <FeaturedListings 
        currentLang={currentLang} 
        favorites={favorites} 
        onToggleFav={toggleFav} 
        searchTerm={searchTerm}
        onAddToCart={addToCart}
      />
      <EscrowBanner currentLang={currentLang} />
      <HowItWorks currentLang={currentLang} />
      <Testimonials currentLang={currentLang} />
      <CTASection currentLang={currentLang} />
    </>
  );

  // ========== RENDER ==========
  return (
    <div className="App">
      <Header
        currentLang={currentLang}
        changeLang={changeLang}
        cartCount={cartItems.length}
        onLoginClick={() => setLoginOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* 🔴 ROTA DO PRODUTO DETALHES */}
        <Route 
          path="/produto/:id" 
          element={
            <ProductDetails 
              currentLang={currentLang}
              t={t}
              addToCart={addToCart}
              onToggleFav={toggleFav}
              favorites={favorites}
            />
          } 
        />

        <Route 
    path="/dashboard" 
    element={
        <PrivateRoute>
            <SellerDashboard currentLang={currentLang} t={t} />
        </PrivateRoute>
    }
>
    <Route index element={<MyListings currentLang={currentLang} t={t} />} />
    <Route path="mis-anuncios" element={<MyListings currentLang={currentLang} t={t} />} />
    <Route path="crear-anuncio" element={<CreateListing currentLang={currentLang} t={t} />} />
    <Route path="editar-anuncio/:id" element={<EditListing currentLang={currentLang} t={t} />} />
</Route>
        
        <Route 
          path="/favoritos" 
          element={
            <PrivateRoute>
              <FavoritesPage 
                currentLang={currentLang}
                t={t}
                onToggleFav={toggleFav}
              />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/carrito" 
          element={
            <PrivateRoute>
              <Cart 
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                currentLang={currentLang}
                t={t}
              />
            </PrivateRoute>
          } 
        />
      </Routes>

      <Footer currentLang={currentLang} />

      {/* Modal Login */}
      <Modal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        title={t('Iniciar Sesion', 'Sign In')}
        description={t('Accede a tu cuenta para comprar, vender y gestionar tus anuncios.', 'Access your account to buy, sell and manage your listings.')}
      >
        <LoginForm 
          onLogin={handleLogin}
          onRegister={handleRegister}
          t={t}
        />
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

// Componente LoginForm
const LoginForm = ({ onLogin, onRegister, t }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (isLoginMode) {
      onLogin(formData.get('email'), formData.get('password'));
    } else {
      onRegister(
        formData.get('name'),
        formData.get('email'),
        formData.get('password'),
        formData.get('phone')
      );
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      {!isLoginMode && (
        <div className="form-group">
          <label>{t('Nome', 'Name')}</label>
          <input name="name" type="text" required />
        </div>
      )}
      <div className="form-group">
        <label>{t('Correo Electronico', 'Email')}</label>
        <input name="email" type="email" required />
      </div>
      <div className="form-group">
        <label>{t('Contrasena', 'Password')}</label>
        <input name="password" type="password" required />
      </div>
      {!isLoginMode && (
        <div className="form-group">
          <label>{t('Telefono', 'Phone')}</label>
          <input name="phone" type="tel" />
        </div>
      )}
      <button type="submit" className="btn-primary">
        {isLoginMode ? t('Ingresar', 'Sign In') : t('Registrar', 'Sign Up')}
      </button>
      
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        {isLoginMode ? t('No tiene cuenta?', 'No account?') : t('Ya tiene cuenta?', 'Already have an account?')}
        <button 
          type="button" 
          onClick={() => setIsLoginMode(!isLoginMode)}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
        >
          {isLoginMode ? t('Registrar', 'Sign up') : t('Iniciar sesion', 'Login')}
        </button>
      </p>
    </form>
  );
};

export default App;