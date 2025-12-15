import React from "react";
import HeroSection from "../components/HeroSection";
import Steps from "../components/Steps";
import BgSlider from "../components/BgSlider";
import Testimonial from "../components/Testimonial";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Steps />
      <BgSlider />
      <Testimonial />
      <Upload />
    </div>
  );
};

export default Home;
