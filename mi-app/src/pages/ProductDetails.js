import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listings } from '../data/listings';  // 🔴 IMPORTAR DO ARQUIVO CENTRAL

const ProductDetails = ({ currentLang, t, addToCart, onToggleFav, favorites }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const isFav = favorites.includes(parseInt(id));

    useEffect(() => {
        // 🔴 BUSCAR O PRODUTO DA LISTA CENTRALIZADA
        const foundProduct = listings.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        }
        setLoading(false);
    }, [id]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '40px', color: '#667eea' }}></i>
                <p>{t('Carregando...', 'Loading...')}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                <i className="fas fa-exclamation-triangle" style={{ fontSize: '60px', color: '#dc2626' }}></i>
                <h2>{t('Produto não encontrado', 'Product not found')}</h2>
                <p>{t('O produto que você procura não existe ou foi removido.', 'The product you are looking for does not exist or has been removed.')}</p>
                <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>
                    {t('Voltar para loja', 'Back to store')}
                </Link>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">{t('Início', 'Home')}</Link>
                    <span> &gt; </span>
                    <Link to="/">{t(product.categoryEs, product.categoryEn)}</Link>
                    <span> &gt; </span>
                    <span>{t(product.titleEs, product.titleEn)}</span>
                </div>

                <div className="product-details-grid">
                    {/* Imagens do Produto */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <div className="image-placeholder" style={{ background: product.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', borderRadius: '10px' }}>
                                <i className={`fas ${product.icon}`} style={{ fontSize: '120px', color: product.iconColor, opacity: 0.5 }}></i>
                            </div>
                        </div>
                        <div className="thumbnails">
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="thumbnail">
                                    <div className="image-placeholder" style={{ background: product.gradient, height: '80px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className={`fas ${product.icon}`} style={{ fontSize: '30px', color: product.iconColor, opacity: 0.5 }}></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Informações do Produto */}
                    <div className="product-info">
                        <div className="product-category">{t(product.categoryEs, product.categoryEn)}</div>
                        <h1>{t(product.titleEs, product.titleEn)}</h1>
                        
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={i < Math.floor(product.rating) ? 'fas fa-star' : i < product.rating ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
                                ))}
                            </div>
                            <span>({product.reviews} {t('avaliações', 'reviews')})</span>
                        </div>

                        <div className="product-price">
                            ₡{product.price.toLocaleString()}
                            {product.priceUnit && <span className="price-unit">/{t(product.priceUnitEs, product.priceUnitEn)}</span>}
                        </div>

                        <div className="product-location">
                            <i className="fas fa-map-marker-alt"></i> {product.location}
                        </div>

                        <div className="product-description">
                            <h3>{t('Descrição', 'Description')}</h3>
                            <p>{t(product.descriptionEs || product.titleEs, product.descriptionEn || product.titleEn)}</p>
                        </div>

                        {/* Quantidade e Ações */}
                        <div className="product-actions">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            
                            <button className="btn-add-cart" onClick={handleAddToCart}>
                                <i className="fas fa-shopping-cart"></i> {t('Agregar al Carrito', 'Add to Cart')}
                            </button>
                            
                            <button className={`btn-favorite ${isFav ? 'active' : ''}`} onClick={() => onToggleFav(product.id)}>
                                <i className={isFav ? 'fas fa-heart' : 'far fa-heart'}></i>
                            </button>
                        </div>

                        {/* Informações do Vendedor */}
                        <div className="seller-info">
                            <img src={product.sellerImage} alt={product.seller} className="seller-image" />
                            <div>
                                <h4>{t('Vendedor', 'Seller')}</h4>
                                <p>{product.seller}</p>
                                <button className="btn-contact">{t('Contatar Vendedor', 'Contact Seller')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;