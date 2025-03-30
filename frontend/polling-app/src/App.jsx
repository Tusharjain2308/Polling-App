import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import LoginForm from "./pages/Auth/LoginForm.jsx";
import SignUpForm from "./pages/Auth/SignUpForm.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import CreatePoll from "./pages/Dashboard/CreatePoll.jsx";
import VotedPolls from "./pages/Dashboard/VotedPolls.jsx";
import MyPolls from "./pages/Dashboard/MyPolls.jsx";
import Bookmarks from "./pages/Dashboard/Bookmarks.jsx";
import UserProvider from "./context/UserContext.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<LoginForm />} />
            <Route path="/signUp" exact element={<SignUpForm />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/create-polls" exact element={<CreatePoll />} />
            <Route path="/voted-polls" exact element={<VotedPolls />} />
            <Route path="/my-polls" exact element={<MyPolls />} />
            <Route path="/bookmarked-polls" exact element={<Bookmarks />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </UserProvider>
    </div>
  );
};

export default App;

//method for Root initial redirection
const Root = () => {
  //if the token exists
  const isAuthenticated = !!localStorage.getItem("token");

  // if authentication successful -> dashboard
  // else -> login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
