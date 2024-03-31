import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="container mx-auto text-slate-800 py-20">
      <div className="-mx-4 flex">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[400px] text-center">
            <h2 className="mb-2 text-[50px] font-bold leading-none sm:text-[80px] md:text-[100px]">
              404
            </h2>
            <h4 className="mb-3 text-[22px] font-semibold leading-tight">
              Oops! That page can’t be found
            </h4>
            <p className="mb-8 text-lg">
              The page you are looking for it maybe deleted
            </p>
            <Link
              to="/"
              className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold transition bg-primary text-white"
            >
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
