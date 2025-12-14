import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to={"/"}>
        <img className="w-32 sm:w-44" src={assets.logo} alt="" />
      </Link>
      <button
        onClick={() => openSignIn({})}
        className="bg-zinc-800 text-white flex  item-center gap-4 px-6 py-2 text-sm rounded-full cursor-pointer">
        Get started{" "}
        <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default Navbar;
