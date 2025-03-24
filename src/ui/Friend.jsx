import PageNavigator from "../utils/PageNavigator";
import Ui from "../utils/Ui";
import { FaUserFriends } from "react-icons/fa";

function Friend() {
  return (
    <>
      <PageNavigator to="/layout/friend" activeClassName={" h-6"}>
        <Ui
          label={"friend"}
          taskNum={3}
          icon={
            <span className="text-pink-700">
              <FaUserFriends />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Friend;
