import "./polyfills.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "virtual:uno.css";

import WebApp from "@twa-dev/sdk";
import router from "./routes/index.tsx";
import { RouterProvider } from "react-router-dom";

import("eruda").then((eruda) => eruda.default.init());

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
