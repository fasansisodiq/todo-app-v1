import { useNavigate, useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <h1>Oops!!! something went wrong.</h1>
      <span>Sorry, an unexpected error has occurred.</span>
      <p className="">
        <span className="py-0 px-2 sm:px-3 md:px-4 lg:px-5 ">
          {error.statusTest || error.message}.
        </span>
        <button
          className="capitalize  text-sm font-medium text-blue-800 hover:text-blue-800 hover:underline"
          onClick={() => navigate(-1)}
        >
          &larr; Go back
        </button>
      </p>
    </div>
  );
}

export default Error;
