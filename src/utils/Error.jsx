import { useNavigate, useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Oops! something went wrong</h1>
      <span>Sorry, an unexpected error has occurred.</span>
      <p className="">
        <span className="py-0 px-2 md:px-20 ">
          {error.data || error.message}
        </span>
        <button
          className="capitalize  text-sm text-green-500 hover:text-green-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          &larr; go back
        </button>
      </p>
    </div>
  );
}

export default Error;
