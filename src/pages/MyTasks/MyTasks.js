import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyTasks = () => {
  const { user, loading } = useContext(AuthContext);

  const url = `http://localhost:5000/alltasks`;
  const { data: myTasks, refetch } = useQuery({
    queryKey: ["myTasks"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div
      className=" dark:bg-slate-800 px-2 md:px-6 py-8 mx-1 md:mx-12 ring-1 ring-slate-900/5 shadow-xl"
      style={{ minHeight: "100vh" }}
    >
      <div className="m-4">
        <h1 className="text-2xl font-bold text-center my-4 pb-8 underline decoration-slate-200 underline-offset-4 font-mono text-[#a2a2f6]">
          Tasks List:
        </h1>

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6"></th>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-2">
                  Description
                </th>
                <th scope="col" class="py-3 px-1"></th>
                <th scope="col" class="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {myTasks?.map((task, i) => (
                <tr
                  key={task._id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="py-4 px-6">{i + 1}</td>
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {task.name}
                  </th>
                  <td class="py-4 px-6">{`${task.description.substring(
                    0,
                    100
                  )}...`}</td>

                  <td class="py-4 px-2">
                    <h1 class="font-medium border-2 border-slate-400 px-0 text-center rounded-lg py-2 text-blue-600 dark:text-blue-800 bg-[#a2a2f6] hover:bg-slate-500 hover:cursor-pointer">
                      View Details
                    </h1>
                  </td>

                  <td class="py-4 px-1">
                    <h1 class="font-medium border-2 border-slate-400 px-0 text-center rounded-lg py-2 text-blue-600 dark:text-blue-700 bg-green-300 hover:bg-slate-500 hover:cursor-pointer">
                      Complete Task
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

export default MyTasks;
