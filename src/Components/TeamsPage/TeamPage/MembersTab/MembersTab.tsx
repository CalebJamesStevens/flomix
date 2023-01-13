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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { Stack } from '@mui/system';
import useStore from '../../../../utils/state/useStore/useStore';
type TeamTable = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & Account;
type Team = TeamTable & { members: Member[] } & { roles: {} };
type Props = {
  team: Team;
  userMember: MembersTeam;
};

function MembersTab({ team, userMember }: Props) {
  const supabase = useSupabaseClient<Database>();
  const { globalStore, globalDispatch } = useStore();

  const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] =
    React.useState(false);

  return (
    <Box>
      <Typography variant='h1'>{team.team_name}</Typography>
      {userMember.team_manager && (
        <Button onClick={() => setIsInviteUserDialogOpen(true)}>
          Invite User
        </Button>
      )}
      <Dialog
        open={isInviteUserDialogOpen}
        onClose={() => setIsInviteUserDialogOpen(false)}
      >
        <Box
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const values = Object.fromEntries([...formData.entries()]);
            console.log(values);
            const { data, error } = await supabase.rpc('create_team_invite', {
              ...values,
              _team_id: team.team_id,
            });

            if (!error) {
              setIsInviteUserDialogOpen(false);
              globalDispatch({
                type: 'toast',
                payload: {
                  message: 'Invite Sent!',
                  data: {
                    severity: 'success',
                    duration: 5000,
                  },
                },
              });
            }
          }}
          component={'form'}
        >
          <DialogTitle>Invite User</DialogTitle>
          <DialogContent>
            <Stack gap={2}>
              <TextField
                label={'Username'}
                name='_username'
                size='small'
              />
              <TextField
                label={'Invite Code'}
                name='_invite_code'
                size='small'
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
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
