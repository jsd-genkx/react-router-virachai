import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Contact from "./routes/contact";
import {
  getContacts as getFt,
  deleteContactAll as clearFt,
  createContact as newFt,
} from "./contacts";
import { loader as rootLoader } from "./routes/lib/loader.jsx";

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
          await newFt();
          console.log("New");
          await getFt();
          if (params || request) return redirect("/");
        },
      },
      {
        path: "contacts/clear",
        element: <div>clear</div>,
        loader: async ({ params, request }) => {
          await clearFt();
          console.log("clear");
          await getFt();
          if (params || request) return redirect("/");
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
        // loader: contactLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
