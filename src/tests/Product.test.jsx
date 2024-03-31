//javascript
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Product from "../pages/Product";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get('https://fakestoreapi.com/products/:id', (req, res, ctx) => {
    return res(ctx.json({
      id: 1,
      title: 'Test Product',
      description: 'This is a test product',
      category: 'electronics',
      image: 'test-image.jpg',
      price: 100,
      rating: {
        rate: 4.5,
        count: 10
      }
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({ children }) {
  return (
    <MemoryRouter initialEntries={['/product/1']}>
      <Routes>
        <Route path="product/:id" element={children} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Product component tests', () => {
  it('renders loading state initially', () => {
    render(<Product />, { wrapper: Wrapper });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('loads and displays the product', async () => {
    render(<Product />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });

  it('handles quantity changes', async () => {
    render(<Product />, { wrapper: Wrapper });
    await waitFor(() => {
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 3 } });
      expect(screen.getByRole('spinbutton').value).toBe("3");
    });
  });

  it('displays correct image', async () => {
    render(<Product />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
    });
  });

  it('displays add to cart button initially', async () => {
    const addToCartMock = vi.fn();
    render(<Product addToCart={addToCartMock} cartItems={[]} />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    });
  });

  it('changes button after adding to cart', async () => {
    const addToCartMock = vi.fn();
    render(<Product addToCart={addToCartMock} cartItems={[{ id: 1 }]} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(/add to cart/i)).toBeDisabled();
    });
  });

  it('fetches product data and displays it', async () => {
    render(<Product cartItems={[]} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText(/electronics/i)).toBeInTheDocument();
      expect(screen.getByText('4.5/5')).toBeInTheDocument();
    });
  });

  // Add more tests here to cover other scenarios and edge cases
});
//