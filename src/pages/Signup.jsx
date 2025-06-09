import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/login");
  };

  const empty_input = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const validate_data = () => {
    if (password == "" || email == "" || username == "") {
      toast.error("all values must be filled");
      return false;
    }

    if (username.length < 4) {
      toast.error("username must be at least 4 letters");
      return false;
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (!validateEmail(email)) {
      toast.error("invalid email");
      return false;
    }

    const custom_validate_email = (email) => {
      const domain = email.slice(email.indexOf("@") + 1, email.indexOf("."));
      return domain == "tuwaiq";
    };

    if (!custom_validate_email(email)) {
      toast.error("email domain name must be tuwaiq");
      return false;
    }

    if (password.length < 8) {
      toast.error("password must be at least 8 letters");
      return false;
    }

    if (userType == "") {
      toast.error("you must choose a type");
      return false;
    }

    return true;
  };

  const post_user = () => {
    // return if the data is not valid
    if (!validate_data()) {
      return;
    }

    axios.get(API).then((res) => {
      // check if user exits
      const check_user = res.data.find((user) => {
        return user.email == email;
      });

      if (check_user) {
        toast.error("user already exists");
        return;
      }

      // post new user
      axios
        .post(API, {
          username: username,
          email: email,
          password: password,
          type: userType,
          idea: { title: "", text: "" },
          students: [],
          ideaStatus: { status: "", text: "" },
        })
        .then((res) => {
          toast.success("signed up successfull");
          empty_input();

          setTimeout(() => {
            redirect();
          }, 2000);

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <div>
        <ToastContainer position="top-center" reverseOrder={false} />
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign Up
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="user@tuwaiq.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <label
              htmlFor="usertype"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select an option
            </label>
            <select
              onChange={(e) => setUserType(e.target.value)}
              value={userType}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose type</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              onClick={post_user}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to={"/login"}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {" "}
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
