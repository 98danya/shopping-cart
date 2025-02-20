import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <strong>{item.title}</strong> by {item.artist}
                  <div className="cart-item-quantity">
                    <button
                      className="decrement-button"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="quantity-input"
                      onChange={(e) => handleQuantityChange(e, item.id)}
                    />
                    <button
                      className="increment-button"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>

                <div className="cart-buttons">
                  <button
                    className="delete-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="total-price">Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;