import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, removeFromCart, currentLang, t }) => {
  const [couponCode, setCouponCode] = useState('');
  
  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calcular desconto (exemplo: 10% se tiver cupom)
  const discount = couponCode === 'DESC10' ? subtotal * 0.10 : 0;
  
  // Calcular envio (grátis acima de 50,000)
  const shipping = subtotal > 50000 ? 0 : 5000;
  
  // Total final
  const total = subtotal - discount + shipping;
  
  const applyCoupon = () => {
    if (couponCode === 'DESC10') {
      alert(t('Cupón aplicado! 10% de descuento', 'Coupon applied! 10% discount'));
    } else {
      alert(t('Cupón inválido', 'Invalid coupon'));
    }
  };
  
  const handleCheckout = () => {
    alert(t('Redirecionando para el checkout...', 'Redirecting to checkout...'));
    // Aqui você pode navegar para a página de checkout
    // navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <i className="fas fa-shopping-cart" style={{ fontSize: '80px', color: '#ccc', marginBottom: '20px' }}></i>
        <h2>{t('Tu carrito está vacío', 'Your cart is empty')}</h2>
        <p>{t('Parece que usted aún no ha agregado ningún artículo a su carrito.', 'Looks like you haven\'t added any items to your cart yet.')}</p>
        <Link to="/" className="btn-primary">
          <i className="fas fa-store"></i> {t('Continuar Comprando', 'Continue Shopping')}
        </Link>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">
          <i className="fas fa-shopping-cart"></i> {t('Mi Carrito', 'My Cart')}
          <span className="cart-count">({cartItems.length} {t('itens', 'items')})</span>
        </h1>
        
        <div className="cart-layout">
          {/* Lista de Itens do Carrinho */}
          <div className="cart-items">
            <div className="cart-header">
              <div className="cart-col-product">{t('Producto', 'Product')}</div>
              <div className="cart-col-price">{t('Precio', 'Price')}</div>
              <div className="cart-col-quantity">{t('Cantidad', 'Quantity')}</div>
              <div className="cart-col-total">{t('Total', 'Total')}</div>
              <div className="cart-col-remove"></div>
            </div>
            
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-product">
                  <div className="cart-item-image">
                    <i className={`fas ${item.icon}`} style={{ fontSize: '40px', color: item.iconColor }}></i>
                  </div>
                  <div className="cart-item-info">
                    <h4>{t(item.titleEs, item.titleEn)}</h4>
                    <div className="cart-item-category">{t(item.categoryEs, item.categoryEn)}</div>
                    <div className="cart-item-location">
                      <i className="fas fa-map-marker-alt"></i> {item.location}
                    </div>
                  </div>
                </div>
                
                <div className="cart-item-price">
                  ₡{item.price.toLocaleString()}
                </div>
                
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                
                <div className="cart-item-total">
                  ₡{(item.price * item.quantity).toLocaleString()}
                </div>
                
                <div className="cart-item-remove">
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen del Pedido */}
          <div className="cart-summary">
            <h3>{t('Resumen del Pedido', 'Order Summary')}</h3>
            
            <div className="summary-row">
              <span>{t('Subtotal', 'Subtotal')}</span>
              <span>₡{subtotal.toLocaleString()}</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-row discount">
                <span>{t('Descuento', 'Discount')} (10%)</span>
                <span>-₡{discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="summary-row">
              <span>{t('Transporte', 'Shipping')}</span>
              <span>{shipping === 0 ? t('Grátis', 'Free') : `₡${shipping.toLocaleString()}`}</span>
            </div>
            
            <div className="summary-row total">
              <span>{t('Total', 'Total')}</span>
              <span>₡{total.toLocaleString()}</span>
            </div>
            
            {/* Cupom de Desconto */}
            <div className="coupon-section">
              <input
                type="text"
                placeholder={t('Código de descuento', 'Coupon code')}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="coupon-input"
              />
              <button onClick={applyCoupon} className="coupon-btn">
                {t('Aplicar', 'Apply')}
              </button>
            </div>
            
            {/* Botão Checkout */}
            <button onClick={handleCheckout} className="checkout-btn">
              <i className="fas fa-lock"></i> {t('Comprar', 'Checkout')}
            </button>
            
            <Link to="/" className="continue-shopping">
              <i className="fas fa-arrow-left"></i> {t('Continuar Comprando', 'Continue Shopping')}
            </Link>
            
            <div className="secure-payment">
              <i className="fas fa-shield-alt"></i>
              <span>{t('Pago 100% seguro con escrow', '100% secure payment with escrow')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;