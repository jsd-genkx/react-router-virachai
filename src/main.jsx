import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root, {
  action as rootAction,
  loader as rootLoader,
  clear as clearAll,
} from "./routes/root";
import Contact, { loader as contactLoader } from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "projects",
        element: <div>Projects</div>,
      },
      {
        path: "contacts",
        element: <div>Click Menu!</div>,
      },
      {
        path: "contacts/new",
        element: <div>New</div>,
        loader: async ({ params, request }) => {
          await rootAction();
          console.log("New");
          await rootLoader();
          return redirect("/");
        },
      },
      {
        path: "contacts/clear",
        element: <div>clear</div>,
        loader: async ({ params, request }) => {
          await clearAll();
          console.log("clear");
          await rootLoader();
          return redirect("/");
        },
      },
      {
        path: "contacts/1",
        element: <div>contacts/1 - Your Name</div>,
      },
      {
        path: "contacts/2",
        element: <div>contacts/2 - Your Friend</div>,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
