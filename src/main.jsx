import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./AuthProvider.jsx";
import Router from "./route/Router.jsx";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
