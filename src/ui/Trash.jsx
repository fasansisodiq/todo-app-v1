import { FaTrash } from "react-icons/fa";
import Ui from "../utils/Ui";
import PageNavigator from "../utils/PageNavigator";

function Trash() {
  return (
    <>
      <PageNavigator to="/layout/trash" activeClassName={" h-6"}>
        <Ui
          label={"trash"}
          taskNum={12}
          icon={
            <span className="text-fuchsia-600">
              <FaTrash />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Trash;
