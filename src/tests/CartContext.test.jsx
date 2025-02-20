import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { CartProvider } from "../context/CartContext";

function TestComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  console.log("Cart content:", cart);

  const product1 = { id: 1, title: "Product 1", price: 10 };
  const product2 = { id: 2, title: "Product 2", price: 15 };

  return (
    <div>
      <button onClick={() => addToCart(product1, 1)}>Add Product 1</button>
      <button onClick={() => addToCart(product2, 1)}>Add Product 2</button>

      {cart.length > 0 && (
        <>
          <button onClick={() => removeFromCart(1)}>Remove Product 1</button>
          <button onClick={() => updateQuantity(1, cart.find(item => item.id === 1)?.quantity + 1)}>
            Increase Product 1 Quantity
          </button>
          <button onClick={() => updateQuantity(1, cart.find(item => item.id === 1)?.quantity - 1)}>
            Decrease Product 1 Quantity
          </button>
          <button onClick={() => updateQuantity(1, 5)}>
            Update Product 1 Quantity to 5
          </button>
        </>
      )}

      <p>Cart Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
    </div>
  );
}

test("adds item to cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  expect(screen.getByText(/Cart Items: 0/)).toBeDefined();

  fireEvent.click(screen.getByText("Add Product 1"));

  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();
});

test("removes item from cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  fireEvent.click(screen.getByText("Add Product 1"));
  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();

  fireEvent.click(screen.getByText("Remove Product 1"));
  expect(screen.getByText(/Cart Items: 0/)).toBeDefined();
});

test("increments product quantity", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  fireEvent.click(screen.getByText("Add Product 1"));
  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();

  fireEvent.click(screen.getByText("Increase Product 1 Quantity"));
  
  expect(screen.getByText(/Cart Items: 2/)).toBeDefined();
});

test("decrements product quantity", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  fireEvent.click(screen.getByText("Add Product 1"));
  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();

  fireEvent.click(screen.getByText("Increase Product 1 Quantity"));
  expect(screen.getByText(/Cart Items: 2/)).toBeDefined();

  fireEvent.click(screen.getByText("Decrease Product 1 Quantity"));
  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();
});

test("updates product quantity", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  fireEvent.click(screen.getByText("Add Product 1"));
  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();

  fireEvent.click(screen.getByText("Update Product 1 Quantity to 5"));

  expect(screen.getByText(/Cart Items: 5/)).toBeDefined();
});

test("adds multiple items to cart", () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  fireEvent.click(screen.getByText("Add Product 1"));
  expect(screen.getByText(/Cart Items: 1/)).toBeDefined();

  fireEvent.click(screen.getByText("Add Product 2"));
  expect(screen.getByText(/Cart Items: 2/)).toBeDefined();
});