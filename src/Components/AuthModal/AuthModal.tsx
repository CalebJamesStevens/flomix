import React from 'react';

/** MUI */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/** Components */

/** Supabase */
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

/** Styles */
import styles from './styles';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {};

export default function AuthModal({}: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Dialog open={!session}>
      <DialogTitle>Auth</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={['google']}
        />
      </DialogContent>
    </Dialog>
  );
}
