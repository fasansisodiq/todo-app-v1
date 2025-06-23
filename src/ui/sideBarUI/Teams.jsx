import TeamIcon from "../../features/team collaboration/TeamIcon";
import PageNavigator from "../../utils/PageNavigator";
import Ui from "../../utils/Ui";

function Teams() {
  return (
    <>
      <PageNavigator
        to="/layout/teams"
        activeClassName={" h-6"}
        notActiveClassName={"hover:bg-slate-300 hover:px-0.5 px-0.5"}
      >
        <Ui
          label={"teams"}
          // taskNum={personalTaskNum < 1 ? "" : personalTaskNum}
          icon={<TeamIcon />}
        />
      </PageNavigator>
    </>
  );
}

export default Teams;
