import React from "react";

export default function Button({ children, onclick, variant, title, isDisabled, size }) {
  const vregx = variant.split('-')
  const color = vregx[0]
  const sz = size == "sm" ? "px-3 py-2" : "px-8 py-3"
  const baseClass = `flex items-center justify-center gap-x-2 rounded-md border ${sz} text-center text-base hover:text-white font-medium transition-colors ease-in-out duration-300`
  const variantClass = ` ${!vregx[1] && "text-white"} bg-${color} disabled:text-dark-7 disabled:bg-${color} disabled:bg-opacity-80 disabled:cursor-not-allowed`
  const outlineClass = vregx[1] && ` border-${color} text-${color} hover:border-${color} bg-transparent hover:bg-${color} hover:text-white active:border-${color}/80 active:bg-${color}/80`
  const classNames = baseClass + variantClass + outlineClass

  return (
    <button
      className={classNames}
      onClick={onclick}
      disabled={isDisabled}
      title={title}
    >
      {children}
    </button>
  );
}
