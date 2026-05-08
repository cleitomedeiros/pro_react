const db = require('../config/db');

const Favorite = {
    // Criar tabela de favoritos
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, product_id)
            )
        `;
        try {
            await db.run(sql);
            console.log('✅ Tabela favorites criada/verificada');
        } catch (error) {
            console.error('❌ Erro ao criar tabela favorites:', error);
        }
    },

    // Adicionar favorito
    add: async (userId, productId) => {
        const sql = 'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)';
        try {
            const result = await db.run(sql, [userId, productId]);
            return { success: true, id: result.lastID };
        } catch (error) {
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                console.log('Favorito já existe');
                return { success: false, exists: true };
            }
            console.error('Erro ao adicionar favorito:', error);
            throw error;
        }
    },

    // Remover favorito
    remove: async (userId, productId) => {
        const sql = 'DELETE FROM favorites WHERE user_id = ? AND product_id = ?';
        try {
            const result = await db.run(sql, [userId, productId]);
            return { success: true, changes: result.changes };
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
            throw error;
        }
    },

    // Listar favoritos do usuário
    listByUser: async (userId) => {
        const sql = 'SELECT product_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC';
        try {
            const rows = await db.query(sql, [userId]);
            return rows.map(row => row.product_id);
        } catch (error) {
            console.error('Erro ao listar favoritos:', error);
            throw error;
        }
    },

    // Verificar se produto é favorito
    isFavorite: async (userId, productId) => {
        const sql = 'SELECT 1 FROM favorites WHERE user_id = ? AND product_id = ?';
        try {
            const row = await db.get(sql, [userId, productId]);
            return !!row;
        } catch (error) {
            console.error('Erro ao verificar favorito:', error);
            throw error;
        }
    }
};

module.exports = Favorite;