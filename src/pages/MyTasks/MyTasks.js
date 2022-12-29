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
  console.log("---the tasks are:", myTasks);
  return (
    <div
      className=" dark:bg-slate-800 px-2 md:px-6 py-8 mx-1 md:mx-12 ring-1 ring-slate-900/5 shadow-xl"
      style={{ minHeight: "100vh" }}
    >
      <div className="m-4">
        <h1 className="text-2xl font-bold text-center my-4 pb-8 underline decoration-slate-200 underline-offset-4 font-mono text-[#a2a2f6]">
          Tasks List:
        </h1>
        <div className="overflow-x-auto bg-slate-500 rounded-lg">
          <table className="border-separate my-table-spacing w-full ">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {myTasks?.map((task, i) => (
                <tr className="mb-12" key={task._id}>
                  <th>{i + 1}</th>
                  <td>{task.name}</td>
                  <td>{`${task.description.substring(0, 100)}...`}</td>
                  <td>
                    <button className="bg-[rgb(162, 162, 246)] border-2 border-slate-400 py-0 px-3 rounded-lg text-md hover:bg-[#a2a2f6]">
                      show details
                    </button>
                  </td>
                  <br />
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
