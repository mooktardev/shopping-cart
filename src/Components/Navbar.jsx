import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import cartSVG from "../assets/cart.svg";

function Navbar({ cartItems }) {
  return (
    <header className="flex w-full sticky top-0 shadow-sm items-center bg-slate-700 dark:bg-dark">
      <div className="container mx-auto">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link
              to="/"
              className="w-full py-5 flex items-center gap-2 text-white font-bold text-xl"
            >
              <img src={logo} alt="logo" />
              <span>Savana Shop</span>
            </Link>
          </div>

          <div className="flex w-full items-center justify-end px-4">
            <div>
              {/* Menu Button */}
              <button
                id="navbarToggler"
                className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              {/* Navbar Nav */}
              <nav
                id="navbarCollapse"
                className="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent"
              >
                <ul className="block lg:flex">
                  <li>
                    <Link
                      to="/"
                      className="flex py-2 text-base font-medium text-white hover:text-light lg:ml-12 lg:inline-flex"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="shop"
                      className="flex py-2 text-base font-medium text-white hover:text-light lg:ml-12 lg:inline-flex"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="about-us"
                      className="flex py-2 text-base font-medium text-white hover:text-light lg:ml-12 lg:inline-flex"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <Link to="cart" className="px-7 py-3 flex items-center">
                <div className="relative">
                  {cartItems.length > 0 && (
                    <div className="-top-2 absolute -right-2">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                        {cartItems.length}
                      </p>
                    </div>
                  )}
                  <img src={cartSVG} alt="Cart" width={25} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
