import { NavLink } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
function NewTask({ setShow }) {
  function handleShow() {
    setShow((sh) => !sh);
  }
  return (
    <button onClick={handleShow}>
      <NavLink to="/layout/new-task">
        <BiPlus size={"2rem"} />
      </NavLink>
    </button>
  );
}

export default NewTask;
