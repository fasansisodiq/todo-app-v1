import { IoTodaySharp } from "react-icons/io5";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";

function Today() {
  return (
    <PageNavigator to="/layout/today" activeClassName={" h-6"}>
      <Ui
        label={"today"}
        taskNum={4}
        icon={
          <span className="text-rose-500">
            <IoTodaySharp />
          </span>
        }
      />
    </PageNavigator>
  );
}

export default Today;
