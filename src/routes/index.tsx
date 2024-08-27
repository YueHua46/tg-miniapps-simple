import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../features/ErrorPage";
import Demo from "../features/Demo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  { path: "/demo", element: <Demo /> },
]);

export default router;
