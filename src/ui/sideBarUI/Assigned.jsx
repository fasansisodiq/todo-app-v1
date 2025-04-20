import { CgAssign } from "react-icons/cg";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";

function Assigned() {
  const assignedNumTasks = useTaskNumberFetcher("assigned");
  return (
    <>
      <PageNavigator to="/layout/assigned" activeClassName={" h-6"}>
        <Ui
          label={"assigned"}
          taskNum={assignedNumTasks < 1 ? "" : assignedNumTasks}
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
