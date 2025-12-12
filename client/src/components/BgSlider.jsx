import React, { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, SetSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    SetSliderPosition(e.target.value);
  };

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Remove Background With High <br />
        Quality and Accuracy
      </h1>

      <div className="relative w-full max-w-3xl m-auto overflow-hidden rounded-2xl mt-10 ">
        {/* Background Imge */}
        <img
          className="w-full h-full"
          src={assets.image_w_bg}
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }} //clip-path is a CSS property that cuts (clips) the visible area of an element. (T, R, B, L)
          alt=""
        />
        {/* Forward Imge */}
        <img
          className="absolute top-0 left-0 h-full w-full "
          src={assets.image_wo_bg}
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} // inset:(Top, Right, Bottom, Left)
          alt=""
        />
        <input
          className="absolute top-1/2 left-1/2  w-full transform -translate-x-1/2 -translate-y-1/2 z-10 slider"
          type="range"
          onChange={(e) => handleSliderChange(e)}
        />
      </div>
    </div>
  );
};

export default BgSlider;
