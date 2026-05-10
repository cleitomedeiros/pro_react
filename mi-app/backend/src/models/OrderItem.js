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
        console.log(`✅ Item adicionado ao pedido ${orderId}, ID: ${result.lastID}`);
        return result.lastID;
    },

    getItemsByOrder: async (orderId) => {
        const sql = 'SELECT * FROM order_items WHERE order_id = ?';
        return await db.query(sql, [orderId]);
    },
    
    disableReview: async (orderItemId) => {
        console.log(`🔒 Desabilitando review para order_item ${orderItemId}`);
        const sql = 'UPDATE order_items SET can_review = 0 WHERE id = ?';
        const result = await db.run(sql, [orderItemId]);
        console.log(`✅ Review desabilitado, affected: ${result.changes}`);
        return result;
    }
};

module.exports = OrderItem;