import React from "react";
import { assets } from "../assets/assets";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 ">
      {/*------------- Left side --------------------*/}
      <div className="">
        <h1>
          Remove the <br />
          <span>bakground</span> from <br />
          images for free.
        </h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> illo
          odio libero praesentium et accusamus voluptates in, ad laboriosam
          tenetur assumenda?
        </p>

        <div>
          <input type="file" name="" id="upload1" hidden />
          <label htmlFor="upload1">
            <img src={assets.upload_btn_icon} alt="" />
            <p>Upload your image</p>
          </label>
        </div>
      </div>

      {/*---------------------- Right Side ----------------*/}
      <div></div>
    </div>
  );
};

export default HeroSection;
