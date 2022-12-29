import React from "react";

const Home = () => {
  return (
    <div
      className=" dark:bg-slate-800 px-6 py-8 mx-12 ring-1 ring-slate-900/5 shadow-xl flex justify-center mt-6"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <h1 className="text-slate-900 dark:text-white mt-5 text-3xl font-medium tracking-tight">
          Welcome to Task Tracer.
        </h1>
        <h2 className="text-slate-500 dark:text-slate-400 mt-2 text-xl">
          Task managements has become easier with this app. Trace all your to do
          lists from the options above in the navbar.
        </h2>
      </div>
    </div>
  );
};

export default Home;
