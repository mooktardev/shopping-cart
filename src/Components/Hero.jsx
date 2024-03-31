import React from 'react'
import heroIMG from "../assets/hero.jpg"
import circlePattern from "../assets/circle-pattern.svg"
import { Link } from 'react-router-dom'
import Button from './Button'

function Hero() {
  return (
    <div
      className="relative py-20 text-slate-800 lg:pt-28"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-5/12">
            <div className="hero-content">
              <h1
                className="mb-5 text-4xl font-bold !leading-[1.208] sm:text-[42px] lg:text-[40px] xl:text-5xl"
              >
                The Greatest <br />
                Journey Of Online <br />
                Shopping.
              </h1>
              <p
                className="mb-8 max-w-[480px] text-base"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus, aperiam rem temporibus dicta quasi asperiores incidunt doloribus error nobis rerum maxime nisi corporis ipsum voluptas perspiciatis vel hic tempore.
              </p>
              <ul className="flex flex-wrap items-center">
                <li>
                  <Link to="/shop">
                    <Button variant="primary">Start shopping</Button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-semibold"
                  >
                    More about us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/12"></div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-11 lg:pt-0">
                <img
                  src={heroIMG}
                  alt="hero"
                  className="max-w-full lg:ml-auto"
                />
                <span className="absolute -bottom-8 -left-8 z-[-1]">
                  <img src={circlePattern} alt='' width={100} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero