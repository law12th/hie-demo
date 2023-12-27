import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, LandingPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
]);
