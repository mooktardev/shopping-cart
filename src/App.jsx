import { useState } from "react";
import { Footer, Navbar } from "./Components";
import { Route, Routes } from "react-router-dom";
import { AboutUs, Cart, ErrorPage, Home, Product, Shop } from "./pages";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems([...cartItems, { ...product, quantity: quantity }]);
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              cartItems={cartItems}
              setCartItems={setCartItems}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/shop/product/:id"
          element={
            <Product
              cartItems={cartItems}
              setCartItems={setCartItems}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
