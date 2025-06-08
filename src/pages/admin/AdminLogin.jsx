import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/adminpage");
  };

  const validate_data = () => {
    if (password == "" || username == "") {
      toast.error("all values must be filled");
      return false;
    }
    if (username != "admin" || password != "admin") {
        toast.error("invalid credentials");
      return false;
    }
    return true;
  };

  const post_user = () => {
    // return if the data is not valid
    if (!validate_data()) {
      return;
    }

    localStorage.setItem("username", "admin");
    localStorage.setItem("userType", "admin");

    toast.success("logged in successfully");

    setTimeout(() => {
      redirect();
    }, 3000);
  };

  return (
    <div>
      <div>
        <ToastContainer position="top-center" reverseOrder={false} />
      </div>
      <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-200 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Log In
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              onClick={post_user}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
