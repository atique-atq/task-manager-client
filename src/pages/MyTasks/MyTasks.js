import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyTasks = () => {
  const { user, loading } = useContext(AuthContext);

  const url = `http://localhost:5000/mytasks?email=${user?.email}`;
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
      className=" dark:bg-slate-800 px-6 py-8 mx-12 ring-1 ring-slate-900/5 shadow-xl"
      style={{ minHeight: "100vh" }}
    >
      <div className="m-4">
        <h1 className="text-2xl font-bold text-center my-4 pb-8 underline decoration-slate-200 underline-offset-4 font-mono text-[#F6740A]">
          My Tasks list:
        </h1>
        <div className="overflow-x-auto bg-slate-300">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {myTasks?.map((task, i) => (
                <tr key={task._id}>
                  <th>{i + 1}</th>
                  <td>{task.name}</td>
                  <td>{`${task.description.substring(0, 100)}...`}</td>
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
