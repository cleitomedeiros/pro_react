const db = require('../config/db');

const Product = {
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title_es VARCHAR(200) NOT NULL,
                title_en VARCHAR(200) NOT NULL,
                description_es TEXT,
                description_en TEXT,
                category_es VARCHAR(100),
                category_en VARCHAR(100),
                price DECIMAL(10,2) NOT NULL,
                price_unit_es VARCHAR(50),
                price_unit_en VARCHAR(50),
                location VARCHAR(200),
                type VARCHAR(50) DEFAULT 'service',
                stock INTEGER DEFAULT 1,
                images TEXT,
                status VARCHAR(20) DEFAULT 'active',
                views INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `;
        await db.run(sql);
        console.log('✅ Tabela products criada');
    },

    create: async (productData) => {
        const {
            user_id, title_es, title_en, description_es, description_en,
            category_es, category_en, price, price_unit_es, price_unit_en,
            location, type, stock, images
        } = productData;
        
        const sql = `
            INSERT INTO products (
                user_id, title_es, title_en, description_es, description_en,
                category_es, category_en, price, price_unit_es, price_unit_en,
                location, type, stock, images
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const result = await db.run(sql, [
            user_id, title_es, title_en, description_es, description_en,
            category_es, category_en, price, price_unit_es, price_unit_en,
            location, type, stock, images
        ]);
        
        return result.lastID;
    },

    findByUser: async (userId) => {
        const sql = 'SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC';
        return await db.query(sql, [userId]);
    },

    findById: async (id) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        return await db.get(sql, [id]);
    },

    update: async (id, productData) => {
        const {
            title_es, title_en, description_es, description_en,
            category_es, category_en, price, price_unit_es, price_unit_en,
            location, type, stock, status
        } = productData;
        
        const sql = `
            UPDATE products SET 
                title_es = ?, title_en = ?, description_es = ?, description_en = ?,
                category_es = ?, category_en = ?, price = ?, price_unit_es = ?,
                price_unit_en = ?, location = ?, type = ?, stock = ?, status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await db.run(sql, [
            title_es, title_en, description_es, description_en,
            category_es, category_en, price, price_unit_es, price_unit_en,
            location, type, stock, status, id
        ]);
    },

    delete: async (id) => {
        const sql = 'DELETE FROM products WHERE id = ?';
        await db.run(sql, [id]);
    },

    incrementViews: async (id) => {
        const sql = 'UPDATE products SET views = views + 1 WHERE id = ?';
        await db.run(sql, [id]);
    },

    getStats: async (userId) => {
        const sql = `
            SELECT 
                COUNT(*) as total_products,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_products,
                SUM(views) as total_views
            FROM products 
            WHERE user_id = ?
        `;
        return await db.get(sql, [userId]);
    }
};

module.exports = Product;