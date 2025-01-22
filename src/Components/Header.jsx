import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white mt-10 py-20 px-4 text-center">
      <h1 className="text-xl font-nunito md:text-4xl font-bold mb-4">
      DISCOVER YOUR WINNING VENDORS - <br />DON'T MISS OUT
      </h1>
      <p className="text-sm text-gray-400 font-poppins md:text-md mb-2">
      Unlock business success with exclusive access.
            </p>
      <button className=" text-white text-sm font-nunito font-bold   rounded hover:underline transition-all">
        Shop Now
      </button>
    </header>
  );
};

export default Header;
