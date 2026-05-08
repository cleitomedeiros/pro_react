import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favoritesService, authService } from '../services/api';
import ListingCard from '../components/FeaturedListings/ListingCard';
import { listings } from '../data/listings';  // 🔴 IMPORTAR DO ARQUIVO CENTRAL

const FavoritesPage = ({ currentLang, t, onToggleFav }) => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const favoriteIds = await favoritesService.list();
                    // 🔴 USAR A LISTA CENTRALIZADA
                    const favProducts = listings.filter(item => 
                        favoriteIds.includes(item.id)
                    );
                    setFavoriteProducts(favProducts);
                } catch (error) {
                    console.error('Erro ao carregar favoritos:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        
        loadFavorites();
    }, []);

    // ... resto do componente igual
};

export default FavoritesPage;