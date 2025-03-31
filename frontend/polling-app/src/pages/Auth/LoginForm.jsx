import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthInput from "../../components/input/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UserContext.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout pagetype="login">
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
        <p className="text-sm text-gray-600">Please enter your details to log in</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <AuthInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <AuthInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 characters long"
            type="password"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            LOGIN
          </button>

          <p className="text-sm text-gray-700 text-center">
            Don't have an account? <Link className="font-medium text-blue-600 hover:underline" to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;