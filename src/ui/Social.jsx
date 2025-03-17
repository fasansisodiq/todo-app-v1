import { TbSocial } from "react-icons/tb";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";


function Social() {
  return (
    <>
      <PageNavigator to="/layout/social" activeClassName={" h-6"}   >
        <Ui
          label={"social"}
          taskNum={3}
          icon={
            <span className="text-amber-500">
              <TbSocial />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Social;
