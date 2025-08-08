import { TbSocial } from "react-icons/tb";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";

function Social() {
  const socialTaskNum = useTaskNumberFetcher("social");
  return (
    <>
      {socialTaskNum >= 1 && (
        <PageNavigator to="/layout/social" activeClassName={" h-6"}>
          <Ui
            label={"social"}
            taskNum={socialTaskNum < 1 ? "" : socialTaskNum}
            icon={
              <span className="text-amber-500">
                <TbSocial />
              </span>
            }
          />
        </PageNavigator>
      )}
    </>
  );
}

export default Social;
