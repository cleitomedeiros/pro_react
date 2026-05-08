const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Favorite = require('../models/Favorite');

// Listar favoritos do usuário
router.get('/', authMiddleware, async (req, res) => {
    try {
        const favorites = await Favorite.listByUser(req.userId);
        res.json({ favorites });
    } catch (error) {
        console.error('Erro ao listar favoritos:', error);
        res.status(500).json({ message: 'Erro ao listar favoritos' });
    }
});

// Adicionar favorito
router.post('/:productId', authMiddleware, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const result = await Favorite.add(req.userId, productId);
        
        if (result === null) {
            return res.status(400).json({ message: 'Produto já está nos favoritos' });
        }
        
        res.json({ message: 'Adicionado aos favoritos', isFavorite: true });
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);
        res.status(500).json({ message: 'Erro ao adicionar favorito' });
    }
});

// Remover favorito
router.delete('/:productId', authMiddleware, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const removed = await Favorite.remove(req.userId, productId);
        
        if (!removed) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }
        
        res.json({ message: 'Removido dos favoritos', isFavorite: false });
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        res.status(500).json({ message: 'Erro ao remover favorito' });
    }
});

// Verificar se produto é favorito
router.get('/check/:productId', authMiddleware, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const isFavorite = await Favorite.isFavorite(req.userId, productId);
        res.json({ isFavorite });
    } catch (error) {
        console.error('Erro ao verificar favorito:', error);
        res.status(500).json({ message: 'Erro ao verificar favorito' });
    }
});

module.exports = router;