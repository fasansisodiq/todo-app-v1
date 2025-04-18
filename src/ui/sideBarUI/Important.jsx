import { useTasks } from "../../customHooks/tasks/useTasks";
import PageNavigator from "../../utils/PageNavigator";
import Ui from "../../utils/Ui";
import { IoInformation } from "react-icons/io5";

function Important() {
  const { tasks } = useTasks();
  const importantTaskNum = tasks.filter(
    (task) => task.priority === "yes"
  ).length;
  return (
    <>
      <PageNavigator to="/layout/important" activeClassName={"h-6"}>
        <Ui
          icon={
            <span className="text-green-500">
              <IoInformation />
            </span>
          }
          label={"important"}
          taskNum={importantTaskNum}
        />
      </PageNavigator>
    </>
  );
}

export default Important;
