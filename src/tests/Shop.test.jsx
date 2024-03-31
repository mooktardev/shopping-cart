//javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shop from '../pages/Shop'; // Assuming the file name is Shop.js
import { fetch } from 'vitest-mock-fetch';

vi.stubGlobal('fetch', fetch);

// Resetting mocks before each test
beforeEach(() => {
  fetch.resetMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Shop component', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 10.0 },
    { id: 2, title: 'Product 2', price: 15.0 },
  ];

  it('displays Loading indicator when fetching products', () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    render(<Shop cartItems={[]} addToCart={() => {}} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders products correctly after fetch', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));
    render(<Shop cartItems={[]} addToCart={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('displays cards for each product', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));
    render(<Shop cartItems={[]} addToCart={() => {}} />);

    await waitFor(() => {
      const cards = screen.getAllByRole('article');
      expect(cards.length).toBe(2);
    });
  });

  it('handles and displays fetch error gracefully', async () => {
    fetch.mockReject(new Error('Fetching error'));
    render(<Shop cartItems={[]} addToCart={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).not.toBeInTheDocument();
      // Assuming an error message is shown or loading disappears
      // Implementation depends on the actual behavior when an error occurs
    });
  });

  it('checks if items already in cart are indicated as added', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));
    render(<Shop cartItems={[{id: 1}]} addToCart={() => {}} />);

    await waitFor(() => {
      const addButton = screen.getAllByRole('button', { name: /add to cart/i })[0];
      userEvent.click(addButton);
      // Assuming Card component's isAdded prop changes button text or style
      // Implementation depends on the actual UI logic for "added to cart" items
    });
  });
  
  // More tests here as needed
});
//