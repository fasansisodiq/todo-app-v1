import { useContext } from "react";
import { TeamCollabContext } from "./TeamCollabContext";

export function useTeamCollab() {
  return useContext(TeamCollabContext);
}
