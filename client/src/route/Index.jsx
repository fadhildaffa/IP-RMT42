import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Detail } from "../../pages/Detail";
import { Register } from "../../pages/register";
import { TeamContextProvider } from "../context/fetchData";

import { createBrowserRouter, redirect } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />
    },
    {
        loader: () => {
            const isLogin = localStorage.getItem("token");
            if (isLogin) {
                throw redirect('/home')
            }
            return null;
        },
        path: "/login",
        element: <Login />
    },
    {
        loader: () => {
            const isNotLogin = localStorage.getItem("token");
            if (!isNotLogin) {
                throw redirect('/login')
            }
            return null;
        },
        children: [{
            path: "/home",          // => /recipes
            element: <TeamContextProvider><Home /></TeamContextProvider> ,
        },
        {
            path: "/home/:teamId",
            element: <Detail />
        },
        // {
        //     path: "categories",
        //     element: <GetCategories />
        // },
        // {
        //     path: "adduser",
        //     element: <AddUser />
        // },
        // {
        //     path: "createpost",
        //     element: <CreatePost />
        // },
        // {
        //     path: "editpost/:postId",
        //     element: <EditPost />
        // },
        // {
        //     path: "updateimage/:postId",
        //     element: <UpdateImage />
        // }
        ]
    },

]);

export default router