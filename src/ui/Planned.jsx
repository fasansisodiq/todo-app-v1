import { BiCalendarEvent } from "react-icons/bi";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";


function Planned() {
  return (
    <>
      <PageNavigator to="/layout/planned" activeClassName={" h-6"}   >
        <Ui
          label={"planned"}
          taskNum={2}
          icon={
            <span className="text-blue-600">
              <BiCalendarEvent />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Planned;
