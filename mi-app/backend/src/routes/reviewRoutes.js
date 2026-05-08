const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Review = require('../models/Review');

// Buscar avaliações de um produto (público)
router.get('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        console.log('📖 Buscando avaliações para produto:', productId);
        
        const reviews = await Review.getByProduct(productId);
        const averageRating = await Review.getAverageRating(productId);
        
        res.json({
            reviews: reviews || [],
            averageRating: averageRating.rating || 0,
            totalReviews: averageRating.total || 0
        });
    } catch (error) {
        console.error('❌ Erro ao buscar avaliações:', error);
        res.status(500).json({ message: 'Erro ao buscar avaliações: ' + error.message });
    }
});

// Verificar se usuário pode avaliar (requer login)
router.get('/check/:productId', authMiddleware, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const userId = req.userId;
        console.log('🔍 Verificando se usuário', userId, 'pode avaliar produto', productId);
        
        const result = await Review.canReview(userId, productId);
        console.log('📦 Resultado:', result);
        
        res.json(result);
    } catch (error) {
        console.error('❌ Erro ao verificar permissão:', error);
        // Em caso de erro, retorna que não pode avaliar
        res.json({ canReview: false, orderItemId: null });
    }
});

// Adicionar avaliação (requer login)
router.post('/:productId', authMiddleware, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const userId = req.userId;
        const { rating, comment, orderItemId } = req.body;
        
        console.log('✍️ Adicionando avaliação - Produto:', productId, 'Usuário:', userId, 'OrderItem:', orderItemId);
        console.log('⭐ Nota:', rating, '💬 Comentário:', comment);
        
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Nota deve ser entre 1 e 5' });
        }
        
        if (!orderItemId) {
            return res.status(400).json({ message: 'OrderItemId é obrigatório' });
        }
        
        const result = await Review.add(productId, userId, orderItemId, rating, comment);
        
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        
        const newAverage = await Review.getAverageRating(productId);
        
        res.json({ 
            message: 'Avaliação adicionada com sucesso',
            averageRating: newAverage.rating,
            totalReviews: newAverage.total
        });
    } catch (error) {
        console.error('❌ Erro ao adicionar avaliação:', error);
        res.status(500).json({ message: 'Erro ao adicionar avaliação: ' + error.message });
    }
});

module.exports = router;