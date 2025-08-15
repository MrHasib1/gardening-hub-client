import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";

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
        element: <h2>Explore LayOut</h2>,
      },
      {
        path: "/browseTips",
        element: <h2>browse Tips LayOut</h2>,
      },
    ],
  },

  {
    path: "/auth",
    element: <h2>Auth LayOut</h2>,
  },
  {
    path: "/*",
    element: <h2>Error 404</h2>,
  },
]);

export default router;
