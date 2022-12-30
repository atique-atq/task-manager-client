import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditTask = () => {
  const task = useLoaderData();
  console.log("task id:", task._id);
  const { user, loading } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: task?.name,
      description: task?.description,
      deadline: task?.deadline,
    },
  });

  const handleEditTask = (data) => {
    const image = data.image[0];

    if (image) {
      console.log("image ase from form");

      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          let imgbbUrl = imgData.data.url;
          console.log("inside image data:", imgData.data);

          let updatedTask = {
            name: data.name,
            description: data.description,
            deadline: data.deadline,
            image: imgbbUrl,
          };
          // update task
          fetch(`https://task-mager.vercel.app/update?id=${task._id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedTask),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is updated`);
              reset();
              navigate("/mytasks");
            });
        });
    } else {
      let updatedTask = {
        name: data.name,
        description: data.description,
        deadline: data.deadline,
      };
      console.log("Form theke image pai nai");

      // update task
      fetch(`https://task-mager.vercel.app/update?id=${task._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedTask),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toast.success(`${data.name} is updated`);
          reset();
          navigate("/mytasks");
        });
    }
  };

  return (
    <div>
      <div className="w-full md:w-10/12 p-7 mx-auto">
        <h2 className="text-2xl text-[#a2a2f6] md:text-center text-left font-bold">
          Edit Task
        </h2>
        <form
          onSubmit={handleSubmit(handleEditTask)}
          className="border border-indigo-400 shadow-lg py-12 px-3 md:px-6 mt-3 mx-auto text-slate-600"
        >
          <div>
            <div className="form-control w-full p-2 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-1 md:mr-5">
                    Edit Name:
                  </span>
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Task Name is Required",
                  })}
                  className="input input-bordered w-full rounded-none bg-slate-300 ml-1"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control w-full p-0 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-0 pr-0">
                    Edit description
                  </span>
                </label>
                <textarea
                  rows={4}
                  type="text"
                  {...register("description", {
                    required: "Description is Required",
                  })}
                  className="input input-bordered w-full rounded-none bg-slate-300 p-3 mr-0"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control w-full p-2 mb-3 flex flex-col md:flex-row justify-between">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-2 md:mr-6">
                    Edit Deadline:
                  </span>
                </label>

                <input
                  type="text"
                  {...register("deadline")}
                  className="input input-bordered w-full rounded-none bg-slate-300"
                />
              </div>

              <div className="flex justify-center items-center max-w-lg ml-4 mt-6 md:mt-1">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-1 md:mr-5">
                    New Photo:
                  </span>
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: "Photo is Required",
                  })}
                  className="input input-bordered w-full  rounded-none bg-slate-400"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <input
                className="bg-[#a2a2f6] p-3 md:w-80 w-64 rounded-md mt-1 hover:cursor-pointer hover:bg-white"
                value="Update Task"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
