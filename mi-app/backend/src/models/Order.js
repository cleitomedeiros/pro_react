const db = require('../config/db');

const Order = {
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                total DECIMAL(10,2) NOT NULL,
                status VARCHAR(50) DEFAULT 'pending',
                payment_status VARCHAR(50) DEFAULT 'pending',
                delivery_status VARCHAR(50) DEFAULT 'processing',
                shipping_address TEXT,
                city VARCHAR(100),
                phone VARCHAR(20),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                delivered_at DATETIME,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `;
        await db.run(sql);
        console.log('✅ Tabela orders criada');
    },

    create: async (orderData) => {
        const { user_id, total, shipping_address, city, phone } = orderData;
        const sql = `
            INSERT INTO orders (user_id, total, shipping_address, city, phone) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const result = await db.run(sql, [user_id, total, shipping_address, city, phone]);
        return result.lastID;
    },

    updateDeliveryStatus: async (orderId, status) => {
        const sql = 'UPDATE orders SET delivery_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        await db.run(sql, [status, orderId]);
        
        if (status === 'delivered') {
            await db.run('UPDATE orders SET delivered_at = CURRENT_TIMESTAMP WHERE id = ?', [orderId]);
        }
    },

    getOrdersToReview: async (userId) => {
        const sql = `
            SELECT o.*, oi.id as order_item_id, oi.product_id, oi.product_name, oi.product_price
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ? 
            AND o.delivery_status = 'delivered'
            AND oi.can_review = 1
            AND NOT EXISTS (
                SELECT 1 FROM reviews r WHERE r.order_item_id = oi.id
            )
            ORDER BY o.delivered_at DESC
        `;
        return await db.query(sql, [userId]);
    }
};

module.exports = Order;