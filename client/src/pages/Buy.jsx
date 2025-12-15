import React from "react";
import { assets, plans } from "../assets/assets";

const BuyCredit = () => {
  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 mb-6 rounded-full">
        Our Plans
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400  bg-clip-text text-transparent py-5 mb-4 sm:mb-6">
        Choose the plan that's for you
      </h1>
      <div className="flex flex-wrap text-left justify-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-md rounded-lg flex flex-col gap-4 px-8 py-12 text-gray-700 hover:scale-105 transition-all duration-700">
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6">
              <span className=" text-3xl font-medium">${plan.price}</span>/{" "}
              {plan.credits} credits
            </p>
            <button className=" w-full bg-gray-700 text-white mt-8 text-sm rounded-lg py-2.5 min-w-52 ">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
