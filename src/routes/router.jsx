import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import ExploreGardener from "../pages/ExploreGardener";
import ShareGardeners from "../pages/ShareGardeners";
import error from "../pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/exploreGarden",
        loader: () => fetch("http://localhost:3000/exploreGarden"),
        Component: ExploreGardener,
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
    element: <h2>Auth LayOut</h2>,
  },
  {
    path: "/*",
    Component: error,
  },
]);

export default router;
