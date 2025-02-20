import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { vi } from "vitest";

test("adds item to cart", () => {
  const mockAddToCart = vi.fn();

  render(
    <CartContext.Provider value={{ addToCart: mockAddToCart }}>
      <ProductCard product={{ id: 1, title: "Test Product", price: 10 }} />
    </CartContext.Provider>
  );

  fireEvent.click(screen.getByText("Add to Cart"));
  expect(mockAddToCart).toHaveBeenCalledWith(expect.any(Object), 1);
});