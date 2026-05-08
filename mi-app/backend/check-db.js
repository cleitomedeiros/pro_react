const db = require('./src/config/db');

async function checkTables() {
    try {
        // Listar todas as tabelas
        const tables = await db.query(`
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            ORDER BY name
        `);
        
        console.log('📋 Tabelas no banco de dados:');
        tables.forEach(table => {
            console.log(`  - ${table.name}`);
        });
        
        // Verificar se a tabela reviews existe
        const reviewTable = tables.find(t => t.name === 'reviews');
        if (reviewTable) {
            console.log('\n✅ Tabela "reviews" encontrada!');
            
            // Verificar estrutura da tabela reviews
            const schema = await db.query("PRAGMA table_info(reviews)");
            console.log('\n📝 Estrutura da tabela reviews:');
            schema.forEach(col => {
                console.log(`  - ${col.name}: ${col.type}`);
            });
        } else {
            console.log('\n❌ Tabela "reviews" NÃO encontrada!');
        }
        
        // Verificar se a tabela order_items existe
        const orderItemsTable = tables.find(t => t.name === 'order_items');
        if (orderItemsTable) {
            console.log('\n✅ Tabela "order_items" encontrada!');
        } else {
            console.log('\n❌ Tabela "order_items" NÃO encontrada!');
        }
        
        // Verificar se a tabela orders existe
        const ordersTable = tables.find(t => t.name === 'orders');
        if (ordersTable) {
            console.log('✅ Tabela "orders" encontrada!');
        } else {
            console.log('❌ Tabela "orders" NÃO encontrada!');
        }
        
    } catch (error) {
        console.error('Erro ao verificar banco:', error);
    }
}

checkTables();