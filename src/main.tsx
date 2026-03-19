import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import SecretFriend, {
  loader as namesLoader,
} from "./components/SecretFriend.jsx";
import "@knadh/oat/oat.min.css";
import "@knadh/oat/oat.min.js";

const router = createBrowserRouter([
  {
    path: "/ibabbi/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/ibabbi/",
        element: <Home />,
      },
      {
        path: "/ibabbi/secret/:id",
        loader: namesLoader,
        element: <SecretFriend />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
