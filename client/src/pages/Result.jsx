import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const Result = () => {
  const { image, setImage, removeBg, resultImage, setResultImage } =
    useContext(AppContext);

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white flex flex-col sm:grid grid-cols-2 gap-8 sm:px-15 px-4 py-10 rounded-lg">
        {/* Styles applied at sm automatically apply to md, lg, xl, etc. */}
        {/* Image Container */}
        <div className="">
          {/* Left Side */}
          <p className="font-semibold text-gray-600 mb-2">Original</p>
          <div className="border-t  border-gray-300">
            <img
              className="rounded-md border"
              src={image ? URL.createObjectURL(image) : ""}
              alt=""
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col">
          <p className="font-semibold text-gray-600 mb-2">Background Removed</p>
          <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
            <img src={resultImage ? resultImage : ""} alt="" />

            {/* Loader */}

            {!resultImage && image && (
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              </div>
            )}
          </div>

          {resultImage && (
            <div className="mt-6 flex align-middle justify-end gap-10">
              <input
                type="file"
                name=""
                id="upload3"
                onChange={(e) => removeBg(e.target.files[0])}
                hidden
              />
              <label
                className="cursor-pointer px-6 py-3 text-violet-600 text-md border border-violet-600 rounded-full hover:scale-105 transform transition-all duration-700"
                htmlFor="upload3">
                <p className="">Try another image</p>
              </label>

              <a
                className="px-6 py-3 text-white text-md bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transform transition-all duration-700"
                href={resultImage}
                download>
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
