import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';
import api from '../services/api';

const Reviews = ({ productId, currentLang, t }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);
    const [canReview, setCanReview] = useState(false);
    const [orderItemId, setOrderItemId] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        loadReviews();
        if (authService.isAuthenticated()) {
            checkCanReview();
        }
    }, [productId]);

    const loadReviews = async () => {
        try {
            const response = await api.get(`/reviews/${productId}`);
            setReviews(response.data.reviews);
            setAverageRating(response.data.averageRating);
            setTotalReviews(response.data.totalReviews);
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkCanReview = async () => {
        try {
            const response = await api.get(`/reviews/check/${productId}`);
            setCanReview(response.data.canReview);
            setOrderItemId(response.data.orderItemId);
        } catch (error) {
            console.error('Erro ao verificar permissão:', error);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        
        if (userRating === 0) {
            alert(t('Selecione uma nota para avaliar', 'Select a rating to review'));
            return;
        }

        setSubmitting(true);
        try {
            await api.post(`/reviews/${productId}`, {
                rating: userRating,
                comment: userComment,
                orderItemId: orderItemId
            });
            
            alert(t('Avaliação enviada! Obrigado pelo seu feedback!', 'Review submitted! Thank you for your feedback!'));
            setUserRating(0);
            setUserComment('');
            setShowReviewForm(false);
            setCanReview(false);
            loadReviews();
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            alert(error.response?.data?.message || t('Erro ao enviar avaliação', 'Error submitting review'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>{t('Carregando avaliações...', 'Loading reviews...')}</p>;

    return (
        <div className="reviews-section">
            <h3>{t('Avaliações dos Clientes', 'Customer Reviews')}</h3>
            
            {/* Média das avaliações */}
            <div className="reviews-summary">
                <div className="average-rating">
                    <span className="rating-number">{averageRating}</span>
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={i < Math.floor(averageRating) ? 'fas fa-star' : i < averageRating ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
                        ))}
                    </div>
                    <span>({totalReviews} {t('avaliações', 'reviews')})</span>
                </div>
            </div>

            {/* Botão para avaliar (só aparece se o usuário já comprou e recebeu) */}
            {authService.isAuthenticated() && canReview && !showReviewForm && (
                <div className="can-review-banner">
                    <i className="fas fa-gift"></i>
                    <p>{t('Você já comprou este produto! Compartilhe sua experiência:', 'You have purchased this product! Share your experience:')}</p>
                    <button onClick={() => setShowReviewForm(true)} className="btn-review-now">
                        {t('Avaliar Agora', 'Review Now')}
                    </button>
                </div>
            )}

            {/* Formulário de avaliação */}
            {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="review-form">
                    <h4>{t('Sua avaliação', 'Your Review')}</h4>
                    <div className="rating-input">
                        <span>{t('Sua nota:', 'Your rating:')}</span>
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setUserRating(star)}
                                className={`star-btn ${userRating >= star ? 'active' : ''}`}
                            >
                                <i className="fas fa-star"></i>
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder={t('Conte sobre sua experiência com este produto...', 'Tell us about your experience with this product...')}
                        rows="4"
                        required
                    />
                    <div className="review-actions">
                        <button type="submit" disabled={submitting}>
                            {submitting ? t('Enviando...', 'Submitting...') : t('Enviar Avaliação', 'Submit Review')}
                        </button>
                        <button type="button" onClick={() => setShowReviewForm(false)} className="btn-cancel">
                            {t('Cancelar', 'Cancel')}
                        </button>
                    </div>
                </form>
            )}

            {/* Lista de avaliações existentes */}
            <div className="reviews-list">
                <h4>{t('Opiniões de quem comprou', 'Buyer Reviews')}</h4>
                {reviews.length === 0 ? (
                    <p className="no-reviews">{t('Seja o primeiro a avaliar este produto!', 'Be the first to review this product!')}</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="review-item">
                            <div className="review-header">
                                <strong>{review.name}</strong>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={i < review.rating ? 'fas fa-star' : 'far fa-star'}></i>
                                    ))}
                                </div>
                                <span className="review-date">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="review-comment">"{review.comment}"</p>
                            <span className="verified-badge">
                                <i className="fas fa-check-circle"></i> {t('Compra verificada', 'Verified purchase')}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;