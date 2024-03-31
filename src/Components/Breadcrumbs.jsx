import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from "../assets/home.svg"

function Breadcrumbs({current}) {
  return (
    <div className="mb-8 w-full">
          <div className="border-b border-stroke py-4 dark:border-dark-3 md:py-5 flex items-center gap-x-10">
            <h2 className='font-bold text-2xl'>{current}</h2>
            <ul className="items-center hidden">
              <li className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center text-base font-medium text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                >
                  <img src={homeIcon} alt="home" width={30} height={30} />
                  Home
                </Link>
                <span className="px-3 text-body-color dark:text-dark-6"> / </span>
              </li>
              <li className="text-base font-medium">
                {current}
              </li>
            </ul>
          </div>
        </div>
  )
}

export default Breadcrumbs