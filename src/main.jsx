import App from './App.jsx'
import './index.css'
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import SignUpPage from './Pages/SignUpPage.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Dashboard1 from './Pages/Dashboard1.jsx';
import LogInPage from './Pages/LogInPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard1 />,
  }
]);

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<RouterProvider router={router} />);

