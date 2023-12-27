import PropTypes from "prop-types";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import { Spinner } from "../components";
import { ErrorPage } from "../pages";

export const AppProvider = ({ router }) => {
  return (
    <React.Suspense
      fallback={
        <div className="container">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.Suspense>
  );
};

AppProvider.propTypes = {
  router: PropTypes.any,
};
