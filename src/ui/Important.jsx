
import PageNavigator from "../utils/PageNavigator";
import Ui from "../utils/Ui";
import { IoInformation } from "react-icons/io5";


function Important() {
  return (
    <>
      <PageNavigator to="/layout/important" activeClassName={"h-6"}    >
        <Ui
          icon={
            <span className="text-green-500">
              <IoInformation />
            </span>
          }
          label={"important"}
          taskNum={3}
        />
      </PageNavigator>
    </>
  );
}

export default Important;
