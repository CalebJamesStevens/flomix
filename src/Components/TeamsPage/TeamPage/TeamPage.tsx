import React from 'react';

/** Supabase */
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { Database } from '../../../utils/supabase/database/database.types';

/** MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/** Components */

/** Styles */
import styles from './styles';
import {
  List,
  ListItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import MembersTab from './MembersTab/MembersTab';

type Team = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & { account: Account };

type Props = {
  team: Team;
  session: Session;
  members: Member[];
};

function a11yProps(index: number) {
  return {
    id: `teams-tab-${index}`,
    'aria-controls': `teams-tabpanel-${index}`,
  };
}

function TeamPage({ session, team, members }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='Team Tabs'
        >
          <Tab
            label='Members'
            {...a11yProps(0)}
          />
          <Tab
            label='Team Goals'
            {...a11yProps(1)}
          />
          <Tab
            label='Preformance Reviews'
            {...a11yProps(2)}
          />
          <Tab
            label='Brag Document'
            {...a11yProps(3)}
          />
          <Tab
            label='Settings'
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
      <Box
        role='tabpanel'
        hidden={value !== 0}
        id={`teams-tabpanel-0`}
        aria-labelledby={`teams-tab-0`}
      >
        <MembersTab
          team={team}
          members={members}
        />
      </Box>
      <Box
        role='tabpanel'
        hidden={value !== 1}
        id={`teams-tabpanel-1`}
        aria-labelledby={`teams-tab-1`}
      >
        Team Goals
      </Box>
      <Box
        role='tabpanel'
        hidden={value !== 2}
        id={`teams-tabpanel-2`}
        aria-labelledby={`teams-tab-2`}
      >
        Performance Reviews
      </Box>
      <Box
        role='tabpanel'
        hidden={value !== 3}
        id={`teams-tabpanel-3`}
        aria-labelledby={`teams-tab-3`}
      >
        Brag Document
      </Box>
      <Box
        role='tabpanel'
        hidden={value !== 4}
        id={`teams-tabpanel-4`}
        aria-labelledby={`teams-tab-4`}
      >
        Settings
      </Box>
    </>
  );
}

export default TeamPage;
