import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { signIn, googleSignIn, loading } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
      })
      .catch((er) => {
        console.log("error:", er);
        toast.error("wrong credential");
        form.reset();
        navigate(from, { replace: true });
      });
  };

  return (
    <div className="my-8 w-full md:w-5/12 p-7 mx-auto">
      <div className="w-full my-5 rounded-lg">
        <div className="flex-col lg:flex-row items-center justify-center justify-items-center">
          <div className="card flex-shrink-0 w-full shadow-2xl bg-slate-600 py-6">
            <h3 className="text-4xl text-center font-bold py-0 my-2 text-[#0DA5E9]">
              Login
            </h3>
            <form onSubmit={handleLogin} className="">
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
              <div className="form-control mt-6 flex justify-center">
                {/* <input className="btn bg-[#fd6288] border-none hover:bg-orange-700 text-lg" type="submit" value="Log in" /> */}
                <input
                  className="border-none hover:bg-[white] text-lg bg-[#0DA5E9] px-10 py-3 rounded-md"
                  type="submit"
                  value="Log in"
                />
              </div>
            </form>
            <p className="text-center mb-4 text-slate-200">
              Don't Have an Account?{" "}
              <Link className="text-orange-400 font-bold" to="/signup">
                Sign Up
              </Link>{" "}
            </p>

            <div className="divider my-0 text-slate-100 font-semibold text-center">
              OR
            </div>
            <hr />

            <div className="flex justify-center">
              <div
                onClick={handleGoogleSignIn}
                className="input input-bordered mt-2 w-10/12 md:w-7/12 ml-3 bg-blue-300 text-center p-3 rounded-lg hover:bg-white hover:cursor-pointer text-slate-800 flex items-center justify-center"
              >
                <FaGoogle className="mr-2"></FaGoogle> Login with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
