import { MdWork } from "react-icons/md";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";

function Work() {
  const workTaskNum = useTaskNumberFetcher("work");
  return (
    <>
      {workTaskNum >= 1 && (
        <PageNavigator to="/layout/work" activeClassName={" h-6"}>
          <Ui
            label={"work"}
            taskNum={workTaskNum < 1 ? "" : workTaskNum}
            icon={
              <span className="text-orange-600">
                <MdWork />
              </span>
            }
          />
        </PageNavigator>
      )}
    </>
  );
}

export default Work;
