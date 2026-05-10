const db = require('../config/db');
const Favorite = require('./Favorite');
const Review = require('./Review');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Product = require('./Product');

const User = {
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                role VARCHAR(20) DEFAULT 'user',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await db.run(sql);
        console.log('✅ Tabela users criada/verificada');
        
        await Favorite.createTable();
        await Order.createTable();
        await OrderItem.createTable();
        await Review.createTable();
        await Product.createTable();
    },

    create: async (userData) => {
        const { name, email, password, phone } = userData;
        const sql = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
        const result = await db.run(sql, [name, email, password, phone]);
        return result.lastID;
    },

    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const row = await db.get(sql, [email]);
        return row;
    },

    findById: async (id) => {
        const sql = 'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?';
        const row = await db.get(sql, [id]);
        return row;
    }
};

module.exports = User;