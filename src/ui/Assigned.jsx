import { CgAssign } from "react-icons/cg";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";

function Assigned() {
  return (
    <>
      <PageNavigator to="/layout/assigned" activeClassName={" h-6"}>
        <Ui
          label={"assigned"}
          taskNum={2}
          icon={
            <span className="text-lime-500">
              <CgAssign />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Assigned;
