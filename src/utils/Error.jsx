import { useNavigate, useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Oops! something went wrong</h1>
      <span>Sorry, an unexpected error has occurred.</span>
      <span>{error.data || error.message}</span>
      <button
        className="capitalize pl-2 text-sm text-green-500 hover:text-green-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; go back
      </button>
    </div>
  );
}

export default Error;
