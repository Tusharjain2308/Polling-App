import React from "react";
import ui_element from "../../assets/images/login_img.jpg";
import signupimg from "../../assets/images/signup.jpg";

const   AuthLayout = ({ children, pagetype }) => {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Polling App</h2>

        {children}
      </div>

      <div className="hidden md:flex w-1/2 h-full bg-sky-50 justify-center items-center relative">
        <img
          src={pagetype === "signup" ? signupimg : ui_element}
          className="w-3/4 max-w-md"
          alt="UI Element"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
