import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

const CompletedTask = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const url = `http://localhost:5000/completedtasks`;
  const { data: completedTasks, refetch } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const handleNotCompleteTask = (_id) => {
    let completeUrl = `http://localhost:5000/notcomplete?id=${_id}`;
    fetch(completeUrl, {
      method: "PUT",
      headers: {},
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Moved to My Tasks");
          navigate("/mytasks");
        }
      });
  };

  const handleDeleteTask = (_id) => {
    let answer = window.confirm("Want to Delete the task?");
    if (answer) {
      let deleteUrl = `http://localhost:5000/delete?id=${_id}`;
      fetch(deleteUrl, {
        method: "DELETE",
        headers: {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            // refetch();
            toast.success("Deleted Successfully");
          }
        });
    }
  };

  return (
    <div
      className="dark:bg-slate-800 px-2 md:px-6 py-8 mx-1 md:mx-12 ring-1 ring-slate-900/5 shadow-xl"
      style={{ minHeight: "100vh" }}
    >
      <div className="m-4">
        <h1 className="text-2xl font-bold text-center my-4 pb-8 underline decoration-slate-200 underline-offset-4 font-mono text-[#2F8D46]">
          Completed Tasks:
        </h1>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6"></th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-2">
                  Description
                </th>
                <th scope="col" className="py-3 px-1"></th>
                <th scope="col" className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {completedTasks?.map((task, i) => (
                <tr
                  key={task._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6">{i + 1}</td>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {task.name}
                  </th>
                  <td className="py-4 px-6">{`${task.description.substring(
                    0,
                    100
                  )}...`}</td>

                  <td className="py-4 px-2">
                    <h1
                      onClick={() => handleDeleteTask(task._id)}
                      className="font-medium border-2 border-slate-400 px-0 text-center rounded-lg py-2 text-blue-600 dark:text-blue-800 bg-red-400 hover:bg-slate-500 hover:cursor-pointer"
                    >
                      Delete Task
                    </h1>
                  </td>

                  <td className="py-4 px-1">
                    <h1
                      onClick={() => handleNotCompleteTask(task._id)}
                      className="font-medium border-2 border-slate-400 px-0 text-center rounded-lg py-2 text-white-600 dark:text-white bg-slate-500 hover:bg-slate-500 hover:cursor-pointer"
                    >
                      Not Completed
                    </h1>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
