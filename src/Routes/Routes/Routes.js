import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import DisplayError from "../../pages/Shared/DisplayError/DisplayError";
import Home from "../../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            
        ]
    }
])

export default router;