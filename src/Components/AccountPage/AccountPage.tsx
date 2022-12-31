import React from 'react';
import { useState, useEffect } from 'react';

/** MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/** Components */

/** Styles */
import styles from './styles';

/** Supabase */
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { Database } from '../../utils/supabase/database/database.types';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Switch,
  TextField,
} from '@mui/material';

type Props = {};
type Accounts = Database['public']['Tables']['accounts']['Row'];

export default function AccountPage({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [userData, setUserData] = useState<Accounts>({
    id: user?.id || '',
    created_at: null,
    username: '',
    full_name: '',
    profile_picture: user?.user_metadata?.avatar_url,
    public_profile: true,
  });

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const { data, error, status } = await supabase
        .from('accounts')
        .select('*')
        .single();

      if (status === 200 && data) {
        setUserData(data);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');
      if (!userData) return;

      let { status, error } = await supabase
        .from('accounts')
        .update({
          username: userData.username,
          full_name: userData.full_name,
          public_profile: userData.public_profile,
          profile_picture: userData.profile_picture,
        })
        .eq('user_id', user.id);

      if (status === 204) {
        setSettingsChanged(false);
      }
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Typography variant='h1'>Account</Typography>
      <Box
        component={'form'}
        sx={styles.formContainer}
        className='form-widget'
      >
        <TextField
          id='email'
          type='text'
          value={user?.email}
          label={'Email'}
          disabled
        />
        <TextField
          id='username'
          type='text'
          value={userData.username}
          onChange={(event) => {
            setUserData({ ...userData, username: event.target.value });
            setSettingsChanged(true);
          }}
          label={'Username'}
        />
        <TextField
          id='full_name'
          type='text'
          value={userData.full_name}
          onChange={(event) => {
            setUserData({ ...userData, full_name: event.target.value });
            setSettingsChanged(true);
          }}
          label={'Full Name'}
        />
        <Button
          variant='contained'
          color='info'
          onClick={() => updateProfile()}
          disabled={loading || !settingsChanged}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => supabase.auth.signOut()}
          disabled={loading}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}
