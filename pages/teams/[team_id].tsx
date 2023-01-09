import { CircularProgress } from '@mui/material';
import React from 'react';
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
type Member = MembersTeam & Account;
type Team = TeamTable & { members: Member[] } & { roles: Team_Roles[] };

type Props = {
  team: Team;
};

function Team({ team }: Props) {
  const session = useSession();
  if (!session) {
    return <CircularProgress />;
  }

  return (
    <TeamPage
      session={session}
      team={team}
    />
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
