import React from "react";
import ui_element from "../../assets/images/login_img.jpg";
import signupimg from "../../assets/images/signup.jpg";

const AuthLayout = ({ children, pagetype }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12 space-y-4 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-700">Polling App</h2>
        {children}
      </div>

      <div className="hidden md:flex w-1/2 h-full justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 relative">
        <img
          src={pagetype === "signup" ? signupimg : ui_element}
          className="w-3/4 max-w-md rounded-xl shadow-lg"
          alt="UI Element"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
