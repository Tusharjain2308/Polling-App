import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthInput from "../../components/input/AuthInput";
import ProfilephotoSelector from "../../components/input/ProfilephotoSelector";
import { validateEmail } from "../../utils/helper";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUpForm = () => {
  const [profilepic, setProfilePic] = useState(null);
  const [fullname, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullname) {
      setError("Please enter your fullname");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email Address");
      return;
    }

    if (!username) {
      setError("Please enter your username");
      return;
    }

    if (!password) {
      setError("Please enter your Password");
      return;
    }

    setError("");

    //SignUp API
    try {
      //upload profile image if present
      if (profilepic) {
        const imgUploadRes = await uploadImage(profilepic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        username,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout pagetype="signup">
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-ceneter">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join Us today by entering your details below and dive straight into
          Polling.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilephotoSelector image={profilepic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInput
              value={fullname}
              onChange={({ target }) => setfullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <AuthInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            <AuthInput
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              label="Username"
              placeholder="@"
              type="text"
            />

            <AuthInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Minimum 8 characters long"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            CREATE ACCOUNT
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
