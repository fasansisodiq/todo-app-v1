import { BiTask } from "react-icons/bi";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";


function Task() {
  return (
    <>
      <PageNavigator to="/layout/task" activeClassName={" h-6"}   >
        <Ui
          label={"task"}
          taskNum={8}
          icon={
            <span className="text-blue-400">
              <BiTask />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Task;
