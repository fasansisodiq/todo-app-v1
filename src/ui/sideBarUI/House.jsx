import { HiHomeModern } from "react-icons/hi2";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";

function House() {
  const houseTaskNum = useTaskNumberFetcher("house");
  return (
    <>
      <PageNavigator to="/layout/house" activeClassName={" h-6"}>
        <Ui
          label={"house"}
          taskNum={houseTaskNum < 1 ? "" : houseTaskNum}
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
