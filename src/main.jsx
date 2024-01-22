import App from "./App.jsx";
import "./index.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LogInPage from "./Pages/LogInPage.jsx";
import Dashboard1 from "./Pages/Dashboard1.jsx";
import Dashboard from "./Pages/LandingPage.jsx";


const router = createBrowserRouter([
  {
    path: "/templates",
    element: <App />,
  },
  {
    path: "/",
    element: (
      
        <Dashboard />
    ),
  },

  {
    path: "/dashboard",
    element: (
      
        <Dashboard1 />
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
