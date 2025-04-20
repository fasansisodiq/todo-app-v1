import { useNavigate } from "react-router";

function Spinner({ text }) {
  const navigation = useNavigate();
  const isNavigating = Boolean(navigation.state !== "idle");
  return (
    <div className="">
      <div className="animate-spin">
        <span className="capitalize">{text}…</span>
      </div>
      {/* {isNavigating || (
        <button type="button" className="bg-emerald-500 " disabled>
          <span className="mr-3 size-5 animate-spin " viewBox="0 0 24 24">
            ...
          </span>
          <span className="capitalize">{text}…</span>
        </button>
      )} */}
    </div>
  );
}

export default Spinner;
