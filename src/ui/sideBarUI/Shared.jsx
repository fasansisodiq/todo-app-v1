import PageNavigator from "../../utils/PageNavigator";
import { FaShareAlt } from "react-icons/fa";
import Ui from "../../utils/Ui";

import { useTasks } from "../../customHooks/tasks/useTasks";

function Shared() {
  const { sharedTasks } = useTasks();
  const shareTaskNum = sharedTasks?.length;
  return (
    <>
      <PageNavigator
        to="/layout/share"
        activeClassName={" h-6"}
        notActiveClassName={"hover:bg-slate-300 hover:px-0.5 px-0.5"}
      >
        <Ui
          label={"shared"}
          taskNum={shareTaskNum < 1 ? "" : shareTaskNum}
          icon={
            <span className="text-pink-600">
              <FaShareAlt />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Shared;
