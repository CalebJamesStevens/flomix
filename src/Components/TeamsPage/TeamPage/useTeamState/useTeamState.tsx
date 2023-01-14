import React, { Dispatch, DispatchWithoutAction } from 'react';
import { TeamContext } from '../../../../../pages/teams/[team_id]';

import { Database } from '../../../../utils/supabase/database/database.types';

type TeamTable = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type Team_Roles = Database['public']['Tables']['team_roles']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & Account & Team_Roles;
type TeamWithMembersAndRoles = TeamTable & { members: Member[] } & {
  roles: Team_Roles[];
};
type Action = {
  type: 'updateTeam' | 'updateMember' | 'updateRoles';
  payload: any;
};

function useTeamState(): {
  teamState: TeamWithMembersAndRoles | null;
  teamDispatch: Dispatch<Action> | null;
} {
  const { teamState, dispatch } = React.useContext(TeamContext);

  return { teamState, teamDispatch: dispatch };
}

export default useTeamState;
