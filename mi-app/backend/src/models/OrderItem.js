const db = require('../config/db');

const OrderItem = {
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                product_name VARCHAR(200) NOT NULL,
                product_price DECIMAL(10,2) NOT NULL,
                quantity INTEGER NOT NULL,
                can_review BOOLEAN DEFAULT 1,
                FOREIGN KEY (order_id) REFERENCES orders(id)
            )
        `;
        await db.run(sql);
        console.log('✅ Tabela order_items criada');
    },

    addItem: async (orderId, item) => {
        const sql = `
            INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, can_review) 
            VALUES (?, ?, ?, ?, ?, 1)
        `;
        const result = await db.run(sql, [orderId, item.product_id, item.product_name, item.product_price, item.quantity]);
        return result.lastID;
    },

    getItemsByOrder: async (orderId) => {
        const sql = 'SELECT * FROM order_items WHERE order_id = ?';
        return await db.query(sql, [orderId]);
    },
    
    disableReview: async (orderItemId) => {
        const sql = 'UPDATE order_items SET can_review = 0 WHERE id = ?';
        await db.run(sql, [orderItemId]);
        console.log(`✅ Review desabilitado para order_item ${orderItemId}`);
    }
};

module.exports = OrderItem;