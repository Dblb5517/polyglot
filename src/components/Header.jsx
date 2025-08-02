import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ openModal }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-8">
      <span
        className="text-5xl font-bold text-[#162744] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Polyglot
      </span>
      <div className="flex gap-8">
        <span
          className="text-2xl font-bold text-[#162744] cursor-pointer"
          onClick={() => navigate("/about")}
        >
          About
        </span>
        <span
          className="text-2xl font-bold text-[#162744] cursor-pointer"
          onClick={openModal}
        >
          Log In
        </span>
      </div>
    </div>
  );
};

export default Header;
