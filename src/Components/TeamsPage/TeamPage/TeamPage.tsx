import React from 'react';

/** Supabase */
import { Session } from '@supabase/auth-helpers-react';
import { Database } from '../../../utils/supabase/database/database.types';

/** MUI */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

/** Components */
import SettingsTab from './SettingsTab/SettingsTab';

/** Styles */
import styles from './styles';

import MembersTab from './MembersTab/MembersTab';
import { useRouter } from 'next/router';

type TeamTable = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Team_Roles = Database['public']['Tables']['team_roles']['Row'];
type Member = MembersTeam & Account;

type Team = TeamTable & { members: Member[] } & { roles: Team_Roles[] };

type Props = {
  team: Team;
  session: Session;
};

function a11yProps(index: number) {
  return {
    id: `teams-tab-${index}`,
    'aria-controls': `teams-tabpanel-${index}`,
  };
}

function TeamPage({ session, team }: Props) {
  const router = useRouter();
  const hashMap = {
    '#members': 0,
    '': 0,
    '#team-goals': 1,
    '#performance-reviews': 2,
    '#brag-document': 3,
    '#settings': 4,
  };

  const [value, setValue] = React.useState(hashMap[window.location.hash]);

  React.useEffect(() => {
    setValue(hashMap[window.location.hash]);
  }, [router.asPath]);

  const userMember = team.members.find(
    (member) => member.user_id === session.user.id
  );

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
          scrollButtons='auto'
          variant='scrollable'
        >
          <Tab
            label='Members'
            onClick={() => router.push('#members')}
            {...a11yProps(0)}
          />
          <Tab
            label='Team Goals'
            onClick={() => router.push('#team-goals')}
            {...a11yProps(1)}
          />
          <Tab
            label='Preformance Reviews'
            onClick={() => router.push('#performance-reviews')}
            {...a11yProps(2)}
          />
          <Tab
            label='Brag Document'
            onClick={() => router.push('#brag-document')}
            {...a11yProps(3)}
          />
          {userMember?.team_manager ? (
            <Tab
              label='Settings'
              onClick={() => router.push('#settings')}
              {...a11yProps(4)}
            />
          ) : null}
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
          userMember={userMember}
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
      {userMember?.team_manager ? (
        <Box
          role='tabpanel'
          hidden={value !== 4}
          id={`teams-tabpanel-4`}
          aria-labelledby={`teams-tab-4`}
        >
          <SettingsTab team={team} />
        </Box>
      ) : null}
    </>
  );
}

export default TeamPage;
