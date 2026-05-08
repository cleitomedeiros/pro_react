const db = require('../config/db');
const OrderItem = require('./OrderItem');

const Review = {
    createTable: async () => {
        // ... seu código existente
    },

    add: async (productId, userId, orderItemId, rating, comment) => {
        // ... seu código existente
    },

    canReview: async (userId, productId) => {
        try {
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
            
            if (result && result.order_item_id) {
                return { canReview: true, orderItemId: result.order_item_id };
            }
            return { canReview: false, orderItemId: null };
        } catch (error) {
            console.error('Erro no canReview:', error);
            return { canReview: false, orderItemId: null };
        }
    },

    getByProduct: async (productId) => {
        try {
            const sql = `
                SELECT r.*, u.name 
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                WHERE r.product_id = ?
                ORDER BY r.created_at DESC
            `;
            return await db.query(sql, [productId]);
        } catch (error) {
            console.error('Erro no getByProduct:', error);
            return [];
        }
    },

    getAverageRating: async (productId) => {
        try {
            const sql = 'SELECT AVG(rating) as average, COUNT(*) as total FROM reviews WHERE product_id = ?';
            const result = await db.get(sql, [productId]);
            return {
                rating: result && result.average ? parseFloat(result.average).toFixed(1) : 0,
                total: result && result.total ? result.total : 0
            };
        } catch (error) {
            console.error('Erro no getAverageRating:', error);
            return { rating: 0, total: 0 };
        }
    }
};

module.exports = Review;