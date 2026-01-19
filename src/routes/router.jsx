import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import ShareGardeners from "../pages/ShareGardeners";
import register from "../pages/register";
import Login from "../pages/Login";
import exploreGardeners from "../pages/exploreGardeners";
import BrowseTips from "../pages/BrowseTips";
import TipsDetails from "../pages/TipsDetails";
import MyTips from "../pages/MyTips";
import UpdateTip from "../pages/UpdateTip";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    Component: HomeLayout,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        path: "/",
        loader: () =>
          fetch("https://gardening-hub-server-chi.vercel.app/featureGarden"),
        Component: Home,
      },
      {
        path: "/exploreGarden",
        loader: () =>
          fetch("https://gardening-hub-server-chi.vercel.app/exploreGardeners"),
        Component: exploreGardeners,
      },

      {
        path: "/browseTips",
        loader: () =>
          fetch("https://gardening-hub-server-chi.vercel.app/browseTips"),
        element: <BrowseTips />,
      },
      {
        path: "/shareGardeners",
        errorElement: <ErrorPage></ErrorPage>,
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <ShareGardeners />
          </PrivateRoute>
        ),
      },

      {
        path: "/myTips",
        errorElement: <ErrorPage></ErrorPage>,
        loader: () =>
          fetch("https://gardening-hub-server-chi.vercel.app/allTipsData"),
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateTip/:id",
        loader: ({ params }) =>
          fetch(
            `https://gardening-hub-server-chi.vercel.app/allTipsData/${params.id}`
          ),
        element: <UpdateTip />,
      },
    ],
  },

  {
    path: "/auth",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Loading></Loading>,
        path: "login",
        Component: Login,
      },
      {
        hydrateFallbackElement: <Loading></Loading>,
        path: "register",
        Component: register,
      },
    ],
  },

  {
    path: "tips-Details/:id",
    errorElement: <ErrorPage></ErrorPage>,
    loader: () =>
      fetch("https://gardening-hub-server-chi.vercel.app/browseTips"),
    element: (
      <PrivateRoute>
        <TipsDetails />,
      </PrivateRoute>
    ),
  },
]);

export default router;
