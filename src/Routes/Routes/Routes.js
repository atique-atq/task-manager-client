import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import DisplayError from "../../pages/Shared/DisplayError/DisplayError";
import Home from "../../pages/Home/Home";
import AddTask from "../../pages/AddTask/AddTask";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import MyTasks from "../../pages/MyTasks/MyTasks";
import CompletedTask from "../../pages/CompletedTask/CompletedTask";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ViewDetails from "../../pages/MyTasks/ViewDetails";
import EditTask from "../../pages/MyTasks/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addtask",
        element: <AddTask></AddTask>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/mytasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "/compltedtasks",
        element: <CompletedTask></CompletedTask>,
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(
            `https://task-manager-server-rho.vercel.app/details/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        loader: ({ params }) =>
          fetch(
            `https://task-manager-server-rho.vercel.app/details/${params.id}`
          ),
        element: <EditTask></EditTask>,
      },
    ],
  },
]);

export default router;
