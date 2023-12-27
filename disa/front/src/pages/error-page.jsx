import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">beep boop</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Oops!</span> Something went wrong
        </p>
        <p className="lead">{error.statusText || error.message}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
