import { CircularProgress } from '@mui/material';
import React from 'react';
import TeamsPage from '../../src/Components/TeamsPage/TeamsPage';
import TeamPage from '../../src/Components/TeamsPage/TeamPage/TeamPage';

/** Supabase */
import {
  createServerSupabaseClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import {
  useUser,
  useSession,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';

import { Database } from '../../src/utils/supabase/database/database.types';
import { NextPageContext } from 'next';
type Team = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & { account: Account };

type Props = {
  team: Team;
  members: Member[];
};

function Team({ team, members }: Props) {
  const session = useSession();

  if (!session) {
    return <CircularProgress />;
  }

  return (
    <TeamPage
      session={session}
      team={team}
      members={members}
    />
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { team_id } = context.query;
  const supabaseServerClient = createServerSupabaseClient<Database>(context);
  const user = await supabaseServerClient.auth.getUser();
  const members = await supabaseServerClient
    .from('members_teams')
    .select(
      `
    *,
    account: accounts (*)
    `
    )
    .eq('team_id', team_id);

  const team = await supabaseServerClient
    .from('teams')
    .select('*')
    .eq('id', team_id)
    .single();

  return {
    props: {
      team: team.data,
      members: members.data,
    },
  };
};

export default Team;
