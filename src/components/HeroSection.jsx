import React from "react";
import language from "../images/frontimg.png";

const HeroSection = () => {
  return (
    <div className="flex items-center p-6">
      <h1 className="text-9xl">
        <span className="text-red-500">Learn</span> the{" "}
        <span className="text-blue-500">language</span> you{" "}
        <span className="text-orange-400">want</span> to!
      </h1>
      <img src={language} alt="language" className="w-[50%] h-full" />
    </div>
  );
};

export default HeroSection;
