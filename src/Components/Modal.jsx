import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Modal({ isShow, title, children, action, isConfetti }) {
  return (
    <div
      className={`${isShow ? "flex" : "hidden"} fixed left-0 top-0 h-full min-h-screen w-full items-center justify-center bg-dark/70 px-4 py-5`}
    >
      <div className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center md:px-[70px] md:py-[60px] z-[1]">
        <h3 className="pb-[18px] text-xl font-semibold text-dark sm:text-2xl">
          {title}
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary"></span>
        <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-4 text-justify">
          {children}
        </p>
        <div className="-mx-3 inline-flex items-start justify-evenly gap-x-6">
            <Button variant="danger-outline" onclick={action}>Close</Button>
            <Link to="/shop">
                <Button variant="primary">Go to Shop</Button>
            </Link>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-screen min-h-screen flex justify-center items-center">
        <div className="canvas-confetti"></div>
      </div>
    </div>
  );
}
