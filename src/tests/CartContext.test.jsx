import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { CartProvider } from "../context/CartContext";

function TestComponent() {
  const { cart, addToCart } = useContext(CartContext);

  console.log("Cart content:", cart);

  return (
    <div>
      <button onClick={() => addToCart({ id: 1, title: "Product 1", price: 10 }, 1)}>
        Add Product 1
      </button>
      <p>Cart Items: {cart.length}</p>
    </div>
  );
}

test("adds item to cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  expect(screen.getByText("Cart Items: 0")).toBeDefined();

  fireEvent.click(screen.getByText("Add Product 1"));

  expect(screen.getByText("Cart Items: 1")).toBeDefined();
});