import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import ShareGardeners from "../pages/ShareGardeners";
import error from "../pages/error";
import AuthLayout from "../layouts/AuthLayout";
import register from "../pages/register";
import Login from "../pages/Login";
import exploreGardeners from "../pages/exploreGardeners";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        path: "/",
        loader: () => fetch("http://localhost:3000/featureGarden"),
        Component: Home,
      },
      {
        path: "/exploreGarden",
        loader: () => fetch("http://localhost:3000/exploreGardeners"),
        Component: exploreGardeners,
      },
      {
        path: "/browseTips",
        element: <h2>browse Tips LayOut</h2>,
      },
      {
        path: "/shareGardeners",
        Component: ShareGardeners,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: register,
      },
    ],
  },

  {
    path: "/*",
    Component: error,
  },
]);

export default router;
