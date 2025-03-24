import { GiSelfLove } from "react-icons/gi";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";

function Personal() {
  return (
    <>
      <PageNavigator
        to="/layout/personal"
        activeClassName={" h-6"}
        notActiveClassName={"hover:bg-slate-300 hover:px-0.5 px-0.5"}
      >
        <Ui
          label={"personal"}
          taskNum={5}
          icon={
            <span className="text-pink-600">
              <GiSelfLove />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Personal;
