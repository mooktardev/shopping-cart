import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Loading,
} from "../Components";
import startSVG from "../assets/star.svg";
import addToCartSVG from "../assets/add-to-cart.svg";
import cartCheckSVG from "../assets/cart-check.svg";


export default function Product({ addToCart, cartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false)

  const hanldeQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const res = cartItems.find((item) => item.id === product.id)
    setIsAdded(res)
  }, [product, cartItems])

  return (
    <div className="container mx-auto py-10">
      <Breadcrumbs current="Product details" />

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 flex-shrink gap-x-10 max-w-screen-md mx-auto mt-10">
          <div className="w-full bg-white rounded-lg shadow-md flex justify-center items-center p-10">
            <img src={product.image} alt={product.id} className="w-auto h-96" />
          </div>

          <div className="flex flex-col justify-around items-start">
            <div className="inline-block rounded border border-transparent bg-primary/10 px-2.5 py-1 text-md font-medium text-primary">
              {product.category}
            </div>
            <h2 className="text-base md:text-xl lg:text-2xl font-bold">
              {product.title}
            </h2>
            <p className="">{product.description}</p>
            <div className="flex items-center gap-x-2">
              <span className="flex bg-">
                <img src={startSVG} alt="" width={18} height={18} />
                <img src={startSVG} alt="" width={18} height={18} />
                <img src={startSVG} alt="" width={18} height={18} />
                <img src={startSVG} alt="" width={18} height={18} />
                <img src={startSVG} alt="" width={18} height={18} />
              </span>
              <span className="">{product.rating.rate}/5</span>
              <span className="">({product.rating.count})</span>
            </div>
            <p className="mb-4 text-lg font-bold leading-relaxed text-slate-800">
              <span className="font-normal">Price: </span>
              {product.price} $
            </p>
            <div className="flex items-center justify-start gap-x-4">
              <span>Quantity: </span>
              <input
                className="w-24 rounded-md border border-stroke bg-transparent px-5 py-[10px] text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:border-gray-2 disabled:bg-gray-2 dark:border-dark-2"
                type="number"
                value={quantity}
                min="1"
                onChange={hanldeQuantityChange}
              />
              <Button variant="primary" isDisabled={isAdded} size="sm" onclick={() => !isAdded && addToCart(product, quantity)}>
                <img
                  src={isAdded ? cartCheckSVG : addToCartSVG}
                  alt=""
                  width={20}
                  height={20}
                  className="fill-white"
                />
                {isAdded ? "Added to cart" : "Add to cart"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
