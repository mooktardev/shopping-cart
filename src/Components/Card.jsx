import React from "react";
import { Link } from "react-router-dom";
import addToCartSVG from "../assets/add-to-cart.svg";
import cartCheckSVG from "../assets/cart-check.svg";
import Button from "./Button";

function Card({ product, addToCart, isAdded }) {
  const { id, title, price, image } = product;

  return (
    <div className="w-full flex flex-col justify-between shadow-md overflow-hidden rounded-xl bg-white shadow-1 duration-300 hover:shadow-3">
      <div className="w-full p-3 h-[250px] bg-white flex justify-center">
        <img src={image} alt="image" className="w-auto h-full" />
      </div>
      <div className="px-4 py-3 items-end bg-primary bg-opacity-10">
        <h3 className="block text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] font-semibold w-full h-10 leading-tight tracking-tight hover:text-primary text-ellipsis overflow-hidden">
          <Link to={`product/${id}`}>{title}</Link>
        </h3>
        <div className="flex items-start justify-between mt-4">
          <p className="mb-4 text-lg font-bold leading-relaxed text-primary">
            {price.toFixed(2)} $
          </p>

          <div className="flex items-center justify-center">
            <Button
              variant="transparent-outline"
              size="sm"
              isDisabled={isAdded}
              onclick={() => (isAdded ? null : addToCart(product))}
            >
              <img
                src={isAdded ? cartCheckSVG : addToCartSVG}
                alt=""
                width={20}
                height={20}
                className="hover:fill-white"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
