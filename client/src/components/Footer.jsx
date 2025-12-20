import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center gap-4 justify-between px-4 lg:px-44 py-3">
      <img width={150} src={assets.logo2} alt="" />
      <p className="text-gray-600">
        Copyright @SnapClean | All right reserved.
      </p>
      <div className="flex gap-3">
        <img width={40} src={assets.facebook_icon} alt="" />
        <img width={40} src={assets.twitter_icon} alt="" />
        <img width={40} src={assets.google_plus_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
