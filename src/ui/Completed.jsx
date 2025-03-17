import { MdDone } from "react-icons/md";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";


function Completed() {
  return (
    <>
      <PageNavigator to="/layout/completed" activeClassName={" h-6"}   >
        <Ui
          label={"completed"}
          taskNum={10}
          icon={
            <span className="text-black-600">
              <MdDone />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Completed;
