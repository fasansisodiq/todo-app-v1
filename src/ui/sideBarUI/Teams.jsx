import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";
import TeamIcon from "../../features/team collaboration/TeamIcon";
import PageNavigator from "../../utils/PageNavigator";
import Ui from "../../utils/Ui";

function Teams() {
  const { teams } = useTeamCollab();
  const totalTeamNumber = teams ? Object.keys(teams).length : 0;
  return (
    <>
      <PageNavigator
        to="/layout/teams"
        activeClassName={" h-6"}
        notActiveClassName={"hover:bg-slate-300 hover:px-0.5 px-0.5"}
      >
        <Ui
          label={"teams"}
          taskNum={totalTeamNumber < 1 ? "" : totalTeamNumber}
          icon={<TeamIcon />}
        />
      </PageNavigator>
    </>
  );
}

export default Teams;
