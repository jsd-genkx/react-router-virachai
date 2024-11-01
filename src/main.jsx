import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  // action as rootAction,
  // clear as clearAction,
} from "./routes/root";
import Contact, { loader as contactLoader } from "./routes/contact";
import { deleteContactAll as clearAction } from "./contacts";

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
        // action: deleteContactAll,
      },
      {
        path: "contacts/clear",
        element: <div>clear</div>,
      },
      {
        path: "contacts/1",
        element: <div>contacts/1- Your Name</div>,
      },
      {
        path: "contacts/2",
        element: <div>contacts/2- Your Friend</div>,
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

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
