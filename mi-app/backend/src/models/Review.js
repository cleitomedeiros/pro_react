const db = require('../config/db');
const OrderItem = require('./OrderItem');

const Review = {
    createTable: async () => {
        try {
            // Verificar se a coluna order_item_id existe
            const tableInfo = await db.query("PRAGMA table_info(reviews)");
            const hasOrderItemId = tableInfo.some(col => col.name === 'order_item_id');
            
            if (!hasOrderItemId && tableInfo.length > 0) {
                console.log('🔄 Adicionando coluna order_item_id à tabela reviews...');
                await db.run('ALTER TABLE reviews ADD COLUMN order_item_id INTEGER');
                console.log('✅ Coluna order_item_id adicionada');
            }
        } catch (error) {
            console.error('Erro ao verificar/atualizar tabela reviews:', error);
        }
        
        const sql = `
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                order_item_id INTEGER,
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (order_item_id) REFERENCES order_items(id),
                UNIQUE(order_item_id, user_id)
            )
        `;
        await db.run(sql);
        console.log('✅ Tabela reviews verificada/atualizada');
    },

    add: async (productId, userId, orderItemId, rating, comment) => {
        console.log('📝 Review.add chamado:', { productId, userId, orderItemId, rating, comment });
        
        if (!orderItemId) {
            console.error('❌ orderItemId é obrigatório');
            return { error: 'orderItemId é obrigatório' };
        }
        
        const sql = `
            INSERT INTO reviews (product_id, user_id, order_item_id, rating, comment) 
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const result = await db.run(sql, [productId, userId, orderItemId, rating, comment]);
            console.log('✅ Review inserido com sucesso, ID:', result.lastID);
            
            // Desabilitar review para este order_item
            if (orderItemId) {
                await OrderItem.disableReview(orderItemId);
            }
            
            return result.lastID;
        } catch (error) {
            console.error('❌ Erro no add:', error.message);
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                return { error: 'Você já avaliou este produto' };
            }
            throw new Error(error.message);
        }
    },

    canReview: async (userId, productId) => {
        try {
            console.log('🔍 canReview:', { userId, productId });
            
            const sql = `
                SELECT oi.id as order_item_id
                FROM order_items oi
                JOIN orders o ON oi.order_id = o.id
                WHERE o.user_id = ? 
                AND oi.product_id = ?
                AND o.delivery_status = 'delivered'
                AND oi.can_review = 1
                LIMIT 1
            `;
            const result = await db.get(sql, [userId, productId]);
            console.log('📦 Resultado canReview:', result);
            
            if (result && result.order_item_id) {
                return { canReview: true, orderItemId: result.order_item_id };
            }
            return { canReview: false, orderItemId: null };
        } catch (error) {
            console.error('❌ Erro no canReview:', error);
            return { canReview: false, orderItemId: null };
        }
    },

    getByProduct: async (productId) => {
        try {
            console.log('📖 getByProduct:', productId);
            
            const sql = `
                SELECT r.*, u.name 
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                WHERE r.product_id = ?
                ORDER BY r.created_at DESC
            `;
            const results = await db.query(sql, [productId]);
            console.log(`📦 Encontradas ${results.length} avaliações`);
            return results;
        } catch (error) {
            console.error('❌ Erro no getByProduct:', error);
            return [];
        }
    },

    getAverageRating: async (productId) => {
        try {
            console.log('📊 getAverageRating:', productId);
            
            const sql = 'SELECT AVG(rating) as average, COUNT(*) as total FROM reviews WHERE product_id = ?';
            const result = await db.get(sql, [productId]);
            console.log('📦 Resultado média:', result);
            
            return {
                rating: result && result.average ? parseFloat(result.average).toFixed(1) : 0,
                total: result && result.total ? result.total : 0
            };
        } catch (error) {
            console.error('❌ Erro no getAverageRating:', error);
            return { rating: 0, total: 0 };
        }
    }
};

module.exports = Review;