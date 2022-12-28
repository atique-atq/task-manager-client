import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";

const AddTask = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      condition: "",
    },
  });

  return (
    <div>
      <div className="w-full md:w-10/12 p-7 mx-auto">
        <h2 className="text-2xl text-[#0DA5E9] md:text-center text-left font-bold">
          Add a Task
        </h2>
        <form className="border border-indigo-400 shadow-lg py-12 px-3 md:px-6 mt-3 mx-auto">
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
                  type="text"
                  {...register("description", {
                    required: false,
                  })}
                  className="input input-bordered w-full rounded-none bg-slate-300 p-3"
                />
              </div>
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
                value="Add Product"
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
