import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import ShareGardeners from "../pages/ShareGardeners";
import error from "../pages/error";
import AuthLayout from "../layouts/AuthLayout";
import register from "../pages/register";
import Login from "../pages/Login";
import exploreGardeners from "../pages/exploreGardeners";
import BrowseTips from "../pages/BrowseTips";
import TipsDetails from "../pages/TipsDetails";
import MyTips from "../pages/MyTips";
import UpdateTip from "../pages/UpdateTip";

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
        loader: () => fetch("http://localhost:3000/browseTips"),
        element: <BrowseTips />,
      },
      {
        path: "tips-Details/:id",
        loader: () => fetch("http://localhost:3000/browseTips"),
        element: <TipsDetails />,
      },
      {
        path: "/shareGardeners",
        Component: ShareGardeners,
      },
      {
        path: "/myTips",
        loader: () => fetch("http://localhost:3000/allTipsData"),
        element: <MyTips />,
      },
      {
        path: "/updateTip/:id",
        element: <UpdateTip />,
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
