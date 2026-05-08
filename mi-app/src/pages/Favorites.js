import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favoritesService, authService } from '../services/api';
import ListingCard from '../components/FeaturedListings/ListingCard';
import { listings } from '../data/listings';

const FavoritesPage = ({ currentLang, t, onToggleFav }) => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            if (authService.isAuthenticated()) {
                try {
                    console.log('Cargando favoritos...');
                    const ids = await favoritesService.list();
                    console.log('IDs dos favoritos:', ids);
                    setFavoriteIds(ids);
                    
                    // 🔴 FILTRAR OS PRODUTOS PELOS IDs
                    const favProducts = listings.filter(item => 
                        ids.includes(item.id)
                    );
                    console.log('Productos favoritos encontrados:', favProducts);
                    setFavoriteProducts(favProducts);
                } catch (error) {
                    console.error('Erro al cargar favoritos:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        
        loadFavorites();
    }, []);

    // 🔴 RECARREGAR QUANDO FAVORITOS MUDAREM (se onToggleFav for chamado)
    useEffect(() => {
        const refreshFavorites = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const ids = await favoritesService.list();
                    setFavoriteIds(ids);
                    const favProducts = listings.filter(item => 
                        ids.includes(item.id)
                    );
                    setFavoriteProducts(favProducts);
                } catch (error) {
                    console.error('Error al actualizar favoritos:', error);
                }
            }
        };
        
        refreshFavorites();
    }, [onToggleFav]); // Recarrega quando o componente recebe nova prop

    if (loading) {
        return (
            <div className="container" style={{ padding: '40px 0', minHeight: '60vh', textAlign: 'center' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '40px', color: '#667eea' }}></i>
                <p>{t('Cargando favoritos...', 'Loading favorites...')}</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 0', minHeight: '60vh' }}>
            <h2 style={{ marginBottom: '30px' }}>
                <i className="fas fa-heart" style={{ color: '#dc2626', marginRight: '10px' }}></i>
                {t('Mis Favoritos', 'My Favorites')}
                <span style={{ fontSize: '16px', color: '#666', marginLeft: '10px' }}>
                    ({favoriteProducts.length} {t('itens', 'items')})
                </span>
            </h2>
            
            {favoriteProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <i className="far fa-heart" style={{ fontSize: '80px', color: '#ddd' }}></i>
                    <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
                        {t('No tienes favoritos aún', 'You have no favorites yet')}
                    </p>
                    <p style={{ color: '#999', marginBottom: '30px' }}>
                        {t('Explora nuestros productos y guarda tus favoritos', 'Explore our products and save your favorites')}
                    </p>
                    <Link to="/" className="btn-primary">
                        <i className="fas fa-store"></i> {t('Explorar productos', 'Explore products')}
                    </Link>
                </div>
            ) : (
                <div className="listings-grid">
                    {favoriteProducts.map(item => (
                        <ListingCard
                            key={item.id}
                            item={item}
                            currentLang={currentLang}
                            onToggleFav={onToggleFav}
                            isFav={true}
                            onAddToCart={() => {}}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;