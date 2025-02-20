import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p><strong>Artist:</strong> {product.artist}</p>
      <p><strong>Released:</strong> {product.releaseDate}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>

      <div>
        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button onClick={() => addToCart(product, quantity)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;