import React, { useEffect, useState } from "react";
import { Breadcrumbs, Card, Loading } from "../Components";

function Shop({ cartItems, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all Products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Fetching error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Breadcrumbs current="Shop" />

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 grid-flow-row-dense gap-16 my-10">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              addToCart={addToCart}
              isAdded={cartItems.find((item) => item.id === product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
