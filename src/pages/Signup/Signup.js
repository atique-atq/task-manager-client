import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value.toLowerCase();
    const confirm = form.confirmPassword.value;

    if (password.length < 6) {
      setError("Password should be 6 characters or more.");
      toast.error("Password should be 6 characters or more.");
      return;
    }

    if (password !== confirm) {
      toast.error("Your Password did not match");
      setError("Your Password did not match");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        form.reset();
        handleUpdateUserProfile(name, email);
        navigate(from, { replace: true });
        toast.success("Registration Successful", {
          position: "top-right",
        });
        form.reset();
      })
      .catch((e) => {
        toast.error(e.message);
        setError(e.message);
      });
  };

  const handleUpdateUserProfile = (name, email) => {
    const profile = {
      displayName: name,
      photoURL: "",
    };

    updateUserProfile(profile)
      .then(() => {
        saveUser(name, email);
      })
      .catch((error) => console.error(error));
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/saveusers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // setCreatedUserEmail(email);
      });
  };

  return (
    <div>
      <div className="my-8 w-full md:w-5/12 p-7 mx-auto">
        <div className="w-full my-5 rounded-lg">
          <div className="flex-col lg:flex-row items-center justify-center justify-items-center">
            <div className="card flex-shrink-0 w-full shadow-2xl bg-slate-600 py-6">
              <h3 className="text-4xl text-center font-bold py-0 my-2 text-[#0DA5E9]">
                Sign Up
              </h3>
              <form onSubmit={handleSubmit} className="my-3">
                <div className="form-control flex justify-center">
                  <input
                    type="text"
                    name="name"
                    placeholder="your name"
                    className="input input-bordered mt-2 w-10/12 md:w-7/12 ml-3 bg-blue-300"
                    required
                  />
                </div>
                <div className="form-control flex justify-center">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered mt-2 w-10/12 md:w-7/12 ml-3 bg-blue-300"
                    required
                  />
                </div>
                <div className="form-control  flex justify-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered mt-2 w-10/12 md:w-7/12 ml-3 bg-blue-300"
                    required
                  />
                </div>

                <div className="form-control flex justify-center">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="input input-bordered mt-2 w-10/12 md:w-7/12 ml-3 bg-blue-300"
                    required
                  />
                </div>

                <div className="form-control mt-6 flex justify-center">
                  <input
                    className="border-none hover:bg-[white] text-lg bg-[#0DA5E9] px-10 py-3 rounded-md"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>
              <hr />
              <p className="text-center mb-4 text-slate-200">
                Already Have an Account?{" "}
                <Link className="text-orange-400 font-bold" to="/login">
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
