import { MdWork } from "react-icons/md";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";


function Work() {
  return (
    <>
      <PageNavigator to="/layout/work" activeClassName={" h-6"}   >
        <Ui
          label={"work"}
          taskNum={12}
          icon={
            <span className="text-orange-600">
              <MdWork />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Work;
