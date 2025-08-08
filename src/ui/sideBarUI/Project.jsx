import { BiTask } from "react-icons/bi";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";

function Project() {
  const ProjectTaskNum = useTaskNumberFetcher("project");
  return (
    <>
      {ProjectTaskNum >= 1 && (
        <PageNavigator
          to="/layout/project"
          activeClassName={" h-6"}
          notActiveClassName={"hover:bg-slate-300 hover:px-0.5 px-0.5"}
        >
          <Ui
            label={"project"}
            taskNum={ProjectTaskNum < 1 ? "" : ProjectTaskNum}
            icon={
              <span className="text-blue-400">
                <BiTask />
              </span>
            }
          />
        </PageNavigator>
      )}
    </>
  );
}

export default Project;
