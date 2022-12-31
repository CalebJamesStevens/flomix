import React from 'react';
import AccountPage from '../src/Components/AccountPage/AccountPage';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { CircularProgress } from '@mui/material';
type Props = {};

export const Account = ({}: Props) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  if (!session) {
    return <CircularProgress />;
  }

  return <AccountPage session={session} />;
};

export default Account;
