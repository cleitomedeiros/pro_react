const db = require('./src/config/db');
const Order = require('./src/models/Order');
const OrderItem = require('./src/models/OrderItem');

async function addTestData() {
    try {
        console.log('🚀 Adicionando dados de teste...');
        
        // Verificar se já existe um pedido para o usuário 1
        const existingOrders = await db.query('SELECT * FROM orders WHERE user_id = 1');
        
        if (existingOrders.length === 0) {
            console.log('📦 Criando pedido de teste para usuário ID 1...');
            
            // Criar pedido para usuário ID 1
            const orderId = await Order.create({
                user_id: 1,
                total: 45000,
                shipping_address: 'San Jose, Costa Rica',
                city: 'San Jose',
                phone: '88888888'
            });
            
            console.log(`✅ Pedido criado com ID: ${orderId}`);
            
            // Atualizar status para entregue
            await Order.updateDeliveryStatus(orderId, 'delivered');
            console.log('✅ Status do pedido atualizado para "delivered"');
            
            // Adicionar item ao pedido (produto ID 1)
            await OrderItem.addItem(orderId, {
                product_id: 1,
                product_name: 'Limpieza Dental Profesional + Blanqueamiento',
                product_price: 45000,
                quantity: 1
            });
            
            console.log('✅ Item adicionado ao pedido');
            console.log('\n🎉 Dados de teste adicionados com sucesso!');
            console.log('Agora você pode avaliar o produto ID 1!');
            
        } else {
            console.log('⚠️ Dados de teste já existem!');
            console.log(`Pedido existente ID: ${existingOrders[0].id}`);
        }
        
        // Mostrar resumo
        const orders = await db.query('SELECT * FROM orders');
        const items = await db.query('SELECT * FROM order_items');
        const reviews = await db.query('SELECT * FROM reviews');
        
        console.log('\n📊 RESUMO DO BANCO:');
        console.log(`📦 Pedidos: ${orders.length}`);
        console.log(`📦 Items: ${items.length}`);
        console.log(`⭐ Avaliações: ${reviews.length}`);
        
    } catch (error) {
        console.error('❌ Erro ao adicionar dados de teste:', error);
    }
}

addTestData();