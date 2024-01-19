import App from "./App.jsx";
import "./index.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      
        <SignUpPage />
    ),
  },
  {
    path: "/signup",
    element: (
      
        <SignUpPage />
    ),
  },
]);

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<RouterProvider router={router} />);
