import { CircularProgress } from '@mui/material';
import React, { Dispatch, DispatchWithoutAction } from 'react';
import TeamPage from '../../src/Components/TeamsPage/TeamPage/TeamPage';

/** Supabase */
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';

import { Database } from '../../src/utils/supabase/database/database.types';
import { NextPageContext } from 'next';

type TeamTable = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type Team_Roles = Database['public']['Tables']['team_roles']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & Account & Team_Roles;
type TeamWithMembersAndRoles = TeamTable & { members: Member[] } & {
  roles: Team_Roles[];
};

type Props = {
  team: TeamWithMembersAndRoles;
};

type Action = {
  type: 'updateTeam' | 'updateMember' | 'updateRoles';
  payload: any;
};

export const TeamContext = React.createContext<{
  teamState: TeamWithMembersAndRoles | null;
  dispatch: Dispatch<Action> | null;
}>({
  teamState: null,
  dispatch: null,
});

const teamReducer = (state: TeamWithMembersAndRoles, action: Action) => {
  switch (action.type) {
    case 'updateMember': {
      const members = JSON.parse(JSON.stringify(state.members));
      members.forEach((member: MembersTeam, index) => {
        if (member.id === action.payload.memberId) {
          members[index] = action.payload.memberData;
        }
      });

      return {
        ...state,
        members: members,
      };
    }
  }
};

function Team({ team }: Props) {
  const session = useSession();
  const [teamState, dispatch] = React.useReducer(teamReducer, team);

  if (!session) {
    return <CircularProgress />;
  }

  return (
    <TeamContext.Provider value={{ teamState, dispatch }}>
      <TeamPage
        session={session}
        team={teamState}
      />
    </TeamContext.Provider>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { team_id } = context.query;
  const supabaseServerClient = createServerSupabaseClient<Database>(context);

  let team = await supabaseServerClient.rpc('get_team', {
    _team_id: team_id,
  });

  return {
    props: {
      team: team.data,
    },
  };
};

export default Team;
