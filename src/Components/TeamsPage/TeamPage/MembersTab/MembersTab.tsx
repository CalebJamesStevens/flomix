import React from 'react';

/** Styles */
import styles from './styles';

/** MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/** Components */

/** MUI */
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

/** Supabase */
import { Database } from '../../../../utils/supabase/database/database.types';

type Team = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & { account: Account };

type Props = {
  team: Team;
  members: Member[];
};

function MembersTab({ team, members }: Props) {
  return (
    <Box>
      <Typography variant='h1'>{team.team_name}</Typography>
      <Table>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => {
            return (
              <TableRow key={member.id}>
                <TableCell>{member.account.full_name}</TableCell>
                <TableCell>{member.member_role}</TableCell>
                <TableCell>{member.member_email || 'No Email Setup'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default MembersTab;
