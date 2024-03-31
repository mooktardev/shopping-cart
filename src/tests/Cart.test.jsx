//javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../pages/Cart'; // Assuming the file name is Cart.js
import Confetti from '../utils/Confetti';

vi.mock('../utils/Confetti', () => vi.fn())

const mockItems = [
  {
    id: '1',
    title: 'Item 1',
    price: 10,
    quantity: 2,
    image: 'path/to/image1.jpg',
  },
  {
    id: '2',
    title: 'Item 2',
    price: 15,
    quantity: 1,
    image: 'path/to/image2.jpg',
  },
];

describe('Cart Component Tests', () => {
  let cartItems;
  let setCartItems;

  beforeEach(() => {
    cartItems = [...mockItems];
    setCartItems = vi.fn();
    render(
      <MemoryRouter>
        <Cart cartItems={cartItems} setCartItems={setCartItems}/>
      </MemoryRouter>
    );
  });

  it('renders cart items correctly', () => {
    const items = screen.getAllByText(/Item/);
    expect(items.length).toBe(2);
  });

  it('calculates total price correctly', () => {
    expect(screen.getByText('$ 35')).toBeInTheDocument();
  });

  it('calculates total items correctly', () => {
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('removes item from cart', () => {
    fireEvent.click(screen.getAllByTitle('Delete')[0]);
    expect(setCartItems).toHaveBeenCalledTimes(1);
    expect(setCartItems).toHaveBeenCalledWith([mockItems[1]]);
  });

  it('changes item quantity and updates cart correctly', () => {
    const input = screen.getAllByType('number')[0];
    fireEvent.change(input, { target: { value: '3' } });
    expect(setCartItems).toHaveBeenCalledTimes(1);
    expect(setCartItems).toHaveBeenCalledWith([{...mockItems[0], quantity: '3'}, mockItems[1]]);
  });

  it('shows modal on purchase and clears cart', () => {
    expect(screen.queryByText('Thank You for Your Purchase!')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Check out'));
    expect(screen.getByText('Thank You for Your Purchase!')).toBeInTheDocument();
    expect(Confetti).toHaveBeenCalled();
    expect(setCartItems).toHaveBeenCalledWith([]);
  });

  it('does not show checkout modal when cart is empty', () => {
    setCartItems([]); // Empty the cart
    fireEvent.click(screen.getByText('Check out'));
    expect(screen.queryByText('Thank You for Your Purchase!')).not.toBeInTheDocument();
  });

  it('displays message when cart is empty', () => {
    render(
      <MemoryRouter>
        <Cart cartItems={[]} setCartItems={setCartItems}/>
      </MemoryRouter>
    );
    expect(screen.getByText('Your cart is empty now.')).toBeInTheDocument();
  });
});
//