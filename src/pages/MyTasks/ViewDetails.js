import React from "react";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";

const ViewDetails = () => {
  const task = useLoaderData();
  const postingDate = format(Date.parse(task?.creationTime), "Pp");
  const deadline = task?.deadline
    ? format(Date.parse(task?.deadline), "P")
    : "";
  const createdBy = task?.createdEmail;
  return (
    <div
      className="dark:bg-slate-800 px-2 md:px-6 py-8 mx-1 md:mx-12 ring-1 ring-slate-900/5 shadow-xl"
      style={{ minHeight: "100vh" }}
    >
      <div className="mt-4 bg-slate-500 rounded-xl w-10/12 mx-auto p-3">
        <h1 className="font-semibold text-xl text-center text-orange-300">
          Task name: {task?.name}
        </h1>
        <hr />
        <div className="flex justify-around">
          <div>
            <h1 className="text-blue-100 mt-8 text-lg">
              Description: {task?.description}
            </h1>

            {deadline && (
              <h1 className="text-red-300 mt-8 text-lg">
                Deadline: {task?.deadline}
              </h1>
            )}
            <h1 className="text-blue-100 pt-3">
              Task Creation Time: {postingDate}
            </h1>

            {createdBy && (
              <h1 className="mt-12 text-blue-300 italic">
                Created By: {createdBy}
              </h1>
            )}
          </div>
          <div>
            <img src={task?.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
