const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Apenas imagens são permitidas'));
    }
});

// Criar produto
router.post('/', authMiddleware, async (req, res) => {
    try {
        const productData = {
            ...req.body,
            user_id: req.userId,
            images: '[]'
        };
        
        const productId = await Product.create(productData);
        res.status(201).json({ message: 'Produto criado com sucesso', productId });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
});

// Upload de imagem
router.post('/:id/images', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        
        if (!product || product.user_id !== req.userId) {
            return res.status(403).json({ message: 'Não autorizado' });
        }
        
        let images = JSON.parse(product.images || '[]');
        const imageUrl = `/uploads/${req.file.filename}`;
        images.push(imageUrl);
        
        await db.run('UPDATE products SET images = ? WHERE id = ?', [JSON.stringify(images), productId]);
        
        res.json({ message: 'Imagem adicionada', imageUrl });
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        res.status(500).json({ message: 'Erro ao fazer upload' });
    }
});

// Listar produtos do usuário
router.get('/my-listings', authMiddleware, async (req, res) => {
    try {
        const products = await Product.findByUser(req.userId);
        res.json({ products });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ message: 'Erro ao listar produtos' });
    }
});

// Buscar produto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        await Product.incrementViews(req.params.id);
        res.json({ product });
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
});

// Atualizar produto
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.user_id !== req.userId) {
            return res.status(403).json({ message: 'Não autorizado' });
        }
        
        await Product.update(req.params.id, req.body);
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
});

// Deletar produto
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.user_id !== req.userId) {
            return res.status(403).json({ message: 'Não autorizado' });
        }
        
        await Product.delete(req.params.id);
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
});

// Estatísticas do vendedor
router.get('/stats/seller', authMiddleware, async (req, res) => {
    try {
        const stats = await Product.getStats(req.userId);
        res.json(stats);
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ message: 'Erro ao buscar estatísticas' });
    }
});

module.exports = router;