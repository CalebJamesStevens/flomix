import React from 'react';

/** Styles */
import styles from './styles';

/** MUI */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/** Components */

/** Supabase */
import { Database } from '../../../../utils/supabase/database/database.types';

type TeamTable = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & Account;
type Team = TeamTable & { members: Member[] } & { roles: {} };
type Props = {
  team: Team;
};

function MembersTab({ team }: Props) {
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
          {team.members.map((member) => {
            return (
              <TableRow key={member.id}>
                <TableCell>{member.full_name}</TableCell>
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
