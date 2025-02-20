import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> by {item.artist} -  
                {item.quantity} x ${item.price} = <strong>${(item.price * item.quantity).toFixed(2)}</strong>

                <button onClick={() => incrementQuantity(item.id)}>+</button>
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <button onClick={() => removeFromCart(item.id)}>Delete</button>
              </li>
            ))}
          </ul>

          <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;