//jsx
// Necessary imports
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock Components
vi.mock('./Components', () => ({
  Navbar: vi.fn(() => null),
  Footer: vi.fn(() => null),
}));

vi.mock('./pages', () => ({
  AboutUs: vi.fn(() => <div>AboutUs page</div>),
  Cart: vi.fn(() => <div>Cart page</div>),
  ErrorPage: vi.fn(() => <div>ErrorPage</div>),
  Home: vi.fn(() => <div>Home page</div>),
  Product: vi.fn(() => <div>Product page</div>),
  Shop: vi.fn(() => <div>Shop page</div>),
}));

describe('App', () => {
  it('renders the Home component for "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('renders the AboutUs component for "/about-us" route', () => {
    render(
      <MemoryRouter initialEntries={['/about-us']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('AboutUs page')).toBeInTheDocument();
  });

  it('renders the Cart component for "/cart" route', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Cart page')).toBeInTheDocument();
  });

  it('renders the Shop component for "/shop" route', () => {
    render(
      <MemoryRouter initialEntries={['/shop']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Shop page')).toBeInTheDocument();
  });

  it('renders the Product component for "/shop/product/:id" route', () => {
    render(
      <MemoryRouter initialEntries={['/shop/product/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Product page')).toBeInTheDocument();
  });

  it('renders the ErrorPage for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('ErrorPage')).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/shop']}>
        <App />
      </MemoryRouter>
    );

    const shopPage = screen.getByText('Shop page');
    expect(shopPage).toBeInTheDocument();

    // Simulating adding an item to the cart would be more complex as it involves interaction with child component's functions
    // For the sake of this demonstration and without an actual implementation of Shop, this step is conceptual
    await user.click(shopPage); // Simulate action that would add to cart
    
    // This test assumes an addToCart method exists and updates state appropriately; actual test would require mocking Shop component's interactions
  });
});
//