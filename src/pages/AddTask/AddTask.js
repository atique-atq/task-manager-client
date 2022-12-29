import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddTask = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(handleAddTask)();
    }
  };

  const handleAddTask = (data) => {
    let imageUrl = "";
    const image = data.image[0];

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          console.log("imgData:", imgData);
          imageUrl = imgData.data.url;
        });
    }

    const task = {
      image: imageUrl,
      description: data.description,
      name: data.name,
      createdEmail: user?.email,
      status: "not completed",
      creationTime: new Date(),
    };
    console.log("data to be inserted", task);

    //   save product information to the database
    fetch("https://task-manager-server-rho.vercel.app/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success(`${data.name} is added successfully`);
        reset();
        // navigate("/dashboard/myproducts");
      });
  };

  return (
    <div>
      <div className="w-full md:w-10/12 p-7 mx-auto">
        <h2 className="text-2xl text-[#0DA5E9] md:text-center text-left font-bold">
          Add a Task
        </h2>
        <form
          onSubmit={handleSubmit(handleAddTask)}
          className="border border-indigo-400 shadow-lg py-12 px-3 md:px-6 mt-3 mx-auto"
        >
          <div>
            <div className="form-control w-full p-2 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-1 md:mr-5">
                    Task Name:
                  </span>
                </label>

                <input
                  type="text"
                  onKeyPress={handleUserKeyPress}
                  {...register("name", {
                    required: "Task Name is Required",
                  })}
                  className="input input-bordered w-full rounded-none bg-slate-300"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control w-full p-2 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-1 md:mr-3">
                    Description:
                  </span>
                </label>
                <textarea
                  rows={6}
                  onKeyPress={handleUserKeyPress}
                  type="text"
                  {...register("description", {
                    required: "Description is Required",
                  })}
                  className="input input-bordered w-full rounded-none bg-slate-300 p-3"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control w-full p-2 mb-3">
              <div className="flex justify-center items-center max-w-lg">
                <label className="label">
                  {" "}
                  <span className="label-text text-white mr-1 md:mr-5">
                    Upload Photo:
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
                className="bg-[#0DA5E9] p-3 md:w-80 w-64 rounded-md mt-1"
                value="Add Task"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
