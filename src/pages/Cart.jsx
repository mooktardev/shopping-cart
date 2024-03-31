import React, { useEffect, useState } from "react";
import { Breadcrumbs, Button, Modal } from "../Components";
import trashSVG from "../assets/trash.svg";
import { Link } from "react-router-dom";
import Confetti from "../utils/Confetti";

const ItemRow = ({
  item,
  quantityChange,
  removeFromCart,
  calculateItemSubTotal,
}) => {
  return (
    <tr key={item.id} className="border border-slate-100">
      <td className="px-2 py-3 flex justify-center items-center text-base font-medium text-dark">
        <img src={item.image} alt="" className="w-auto h-20" />
      </td>
      <td className="px-2 py-3 text-md font-medium text-dark">
        <h3 className="h-16 text-pretty overflow-hidden truncate leading-tight">
          {item.title}
        </h3>
      </td>
      <td className="px-2 py-3 text-center text-base font-medium text-dark">
        <input
          className="w-24 rounded-md border border-stroke bg-transparent px-5 py-[10px] text-lg text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:border-gray-2 disabled:bg-gray-2 dark:border-dark-2"
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) => quantityChange(e, item.id)}
        />
      </td>
      <td className="px-2 py-3 text-center text-base font-medium text-dark">
        {calculateItemSubTotal(item.id).toLocaleString()} $
      </td>
      <td className="px-2 py-3 text-center text-base font-medium text-dark">
        <Button
          variant="white-outline"
          title="Delete"
          onclick={() => removeFromCart(item.id)}
        >
          <img src={trashSVG} alt="" width={20} height={20} className="" />
        </Button>
      </td>
    </tr>
  );
};

function Cart({ cartItems, setCartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const calculateTotalPrice = () => {
    const res = cartItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalPrice(res);
  };

  const calculateItemSubTotal = (id) => {
    const item = cartItems.filter((product) => product.id === id)[0];
    const res = item.price * +item.quantity;
    console.log(item);
    return res;
  };

  const calculateTotalItems = () => {
    setTotalItems(cartItems.length);
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((product) => product.id !== id);
    setCartItems(updatedItems);
  };

  const quantityChange = (e, id) => {
    const value = e.target.value;
    console.log(value);
    setQuantity(value);
    const updatedItems = cartItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: value,
        };
      }
      return product;
    });

    setCartItems(updatedItems.filter((product) => product !== null));
  };

  const purchasseCart = () => {
    setShowModal((v) => !v);
    Confetti();
    setCartItems([]);
  };

  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  }, [cartItems]);

  return (
    <div className="container mx-auto py-10">
      <Breadcrumbs current="Cart" />

      <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3 overflow-hidden">
          {cartItems.length == 0 ? (
            <div className="w-4xl p-16 rounded-lg bg-white shadow-md flex flex-col items-center gap-y-10">
              <h2 className="text-2xl font-semibold">
                Your cart is empty now.
              </h2>
              <Link to="/shop">
                <Button variant="primary">Go to shop</Button>
              </Link>
            </div>
          ) : (
            <table className="w-full table-fixed bg-white shadow-md">
              <thead>
                <tr className="bg-primary text-center">
                  <th className="w-2/7 min-w-[160px] px-3 py-2 text-lg font-medium text-white lg:px-3 lg:py-4">
                    Thumbnail
                  </th>
                  <th className="w-2/7 min-w-[160px] px-3 py-2 text-lg font-medium text-white lg:px-3 lg:py-4">
                    Title
                  </th>
                  <th className="w-1/7 min-w-[160px] px-3 py-2 text-lg font-medium text-white lg:px-3 lg:py-4">
                    Quantity
                  </th>
                  <th className="w-1/7 min-w-[160px] px-3 py-2 text-lg font-medium text-white lg:px-3 lg:py-4">
                    Subtotal
                  </th>
                  <th className="w-1/7 min-w-[160px] px-3 py-2 text-lg font-medium text-white lg:px-3 lg:py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <ItemRow
                    item={item}
                    quantityChange={quantityChange}
                    removeFromCart={removeFromCart}
                    calculateItemSubTotal={calculateItemSubTotal}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Items</p>
            <p className="text-gray-700">{totalItems}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Total</p>
            <p className="text-gray-700">$ {totalPrice.toLocaleString()}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-8">
            <p className="text-lg font-bold">Total</p>
            <div className="text-right">
              <p className="mb-1 text-lg font-bold">
                $ {totalPrice.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">* including Taxes</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="primary"
              isDisabled={totalItems === 0}
              onclick={() => (totalItems == 0 ? null : purchasseCart())}
            >
              Check out
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isShow={showModal}
        title="Thank You for Your Purchase!"
        action={purchasseCart}
      >
        Dear Customer,
        <br />
        <br />
        I hope this message finds you well. I wanted to take a moment to express
        our sincere gratitude for your recent purchase.
        <br />
        If you have any questions or need assistance, please don't hesitate to
        reach out to us. We are here to help!
        <br />
        <br />
        Best regards,
      </Modal>
    </div>
  );
}

export default Cart;
