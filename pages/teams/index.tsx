import { CircularProgress } from '@mui/material';
import React from 'react';
import TeamsPage from '../../src/Components/TeamsPage/TeamsPage';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

type Props = {};

function Teams({}: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();

  if (!session) {
    return <CircularProgress />;
  }

  return <TeamsPage session={session} />;
}

export default Teams;
