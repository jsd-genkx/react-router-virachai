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
  loader as rootLoader,
  action as rootAction,
  clear as rootClear,
} from "./routes/root";
import Contact, { loader as contactLoader } from "./routes/contact";
// import {
//   deleteContactAll as clearFt,
//   createContact as newFt,
//   getContacts as getFt,
// } from "./contacts";
// import { getContacts } from "./contacts";

// Define a loader function to fetch the posts
// const fetchPosts = async () => {
//   let contacts = await getFt();
//   return { contacts };
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "contacts",
        element: <div>Click Menu!</div>,
      },

      {
        path: "contacts/new",
        element: <div>New</div>,
        loader: async ({ params, request }) => {
          const { contact } = await rootAction();
          if (contact && contact.id) return redirect(`/?id=${contact.id}`);
          if (contact || params || request)
            return redirect(`/?forceReload=${Date.now()}`);
          return null;
        },
      },
      {
        path: "contacts/clear",
        element: <div>clear</div>,
        loader: async ({ params, request }) => {
          if ((await rootClear()) || params || request)
            return redirect(`/?forceReload=${Date.now()}`);
          return null;
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
        path: "contacts/1",
        element: <div>contacts/1 - Your Name</div>,
      },
      {
        path: "contacts/3",
        element: <div>contacts/2 - reactrouter</div>,
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
