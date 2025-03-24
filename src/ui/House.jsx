import { HiHomeModern } from "react-icons/hi2";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";

function House() {
  return (
    <>
      <PageNavigator to="/layout/house" activeClassName={" h-6"}>
        <Ui
          label={"house"}
          taskNum={4}
          icon={
            <span className="text-orange-400">
              <HiHomeModern />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default House;
