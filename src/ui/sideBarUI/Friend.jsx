import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";
import PageNavigator from "../../utils/PageNavigator";
import Ui from "../../utils/Ui";
import { FaUserFriends } from "react-icons/fa";

function Friend() {
  const friendTaskNum = useTaskNumberFetcher("friend");
  return (
    <>
      {friendTaskNum >= 1 && (
        <PageNavigator to="/layout/friend" activeClassName={" h-6"}>
          <Ui
            label={"friend"}
            taskNum={friendTaskNum < 1 ? "" : friendTaskNum}
            icon={
              <span className="text-pink-700">
                <FaUserFriends />
              </span>
            }
          />
        </PageNavigator>
      )}
    </>
  );
}

export default Friend;
