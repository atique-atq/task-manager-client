import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../Footer";
import notFoundImage from "../../../assets/images/404.webp";
const DisplayError = () => {
  const error = useRouteError();

  return (
    <div
      className="dark:bg-slate-800 px-2 md:px-6 py-8 mx-1 md:mx-12 ring-1 ring-slate-900/5 shadow-xl"
      style={{ minHeight: "100vh" }}
    >
      <Header></Header>
      <div className="mx-12 mt-12 flex justify-center items-center">
        <div>
          <p className="text-red-600 text-center text-3xl font-mono font-bold">
            Page Not Found{" "}
            <small className="italic text-sm text-gray-500">
              {error.statusText || error.message}
            </small>
          </p>
          <img className="w-5/12 mx-auto" src={notFoundImage} alt="" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DisplayError;
