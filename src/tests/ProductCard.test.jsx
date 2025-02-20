import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const mockProduct = {
  id: 1,
  title: "Test Product",
  artist: "Test Artist",
  releaseDate: "2024-01-01",
  price: 10.99,
  image: "test-image.jpg",
};


test("increments quantity", () => {
  render(
    <CartContext.Provider value={{ addToCart: vi.fn() }}>
      <ProductCard product={mockProduct} />
    </CartContext.Provider>
  );

  const incrementButton = screen.getByText("+");
  const quantityInput = screen.getByRole("spinbutton");

  expect(quantityInput.value).toBe("1");

  fireEvent.click(incrementButton);
  expect(quantityInput.value).toBe("2");

  fireEvent.click(incrementButton);
  expect(quantityInput.value).toBe("3");
});

test("decrements quantity but not below 1", () => {
  render(
    <CartContext.Provider value={{ addToCart: vi.fn() }}>
      <ProductCard product={mockProduct} />
    </CartContext.Provider>
  );

  const decrementButton = screen.getByText("-");
  const quantityInput = screen.getByRole("spinbutton");

  expect(quantityInput.value).toBe("1");

  fireEvent.click(decrementButton);
  expect(quantityInput.value).toBe("1");

  fireEvent.click(screen.getByText("+"));
  expect(quantityInput.value).toBe("2");

  fireEvent.click(decrementButton);
  expect(quantityInput.value).toBe("1");
});

test("adds item to cart with correct quantity", () => {
  const mockAddToCart = vi.fn();

  render(
    <CartContext.Provider value={{ addToCart: mockAddToCart }}>
      <ProductCard product={mockProduct} />
    </CartContext.Provider>
  );

  const addToCartButton = screen.getByText("Add to Cart");
  const quantityInput = screen.getByRole("spinbutton");

  fireEvent.change(quantityInput, { target: { value: "3" } });
  fireEvent.click(addToCartButton);

  expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
});