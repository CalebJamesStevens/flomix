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
import SendIcon from '@mui/icons-material/Send';

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
import MemberSettingsDialog from './MemberSettingsDialog/MemberSettingsDialog';
import { Shield } from '@mui/icons-material';
type TeamTable = Database['public']['Tables']['teams']['Row'];
type Team_Roles = Database['public']['Tables']['team_roles']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & Account & Team_Roles;
type Team = TeamTable & { members: Member[] } & { roles: Team_Roles[] };
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
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems='center'
      >
        <Typography variant='h1'>{team.team_name}</Typography>
        {userMember.team_manager && (
          <Button
            color='info'
            variant='contained'
            onClick={() => setIsInviteUserDialogOpen(true)}
            startIcon={<SendIcon />}
          >
            Invite User
          </Button>
        )}
      </Stack>
      <Dialog
        open={isInviteUserDialogOpen}
        onClose={() => setIsInviteUserDialogOpen(false)}
      >
        <Box
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const values = Object.fromEntries([...formData.entries()]);

            try {
              const { data, error } = await supabase
                .rpc('create_team_invite', {
                  ...values,
                  _team_id: team.team_id,
                })
                .throwOnError();

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
            } catch (error) {
              globalDispatch({
                type: 'toast',
                payload: {
                  message: error.message,
                  data: {
                    severity: 'error',
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
                required
                label={'Username'}
                name='_username'
                size='small'
              />
              <TextField
                required
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
            {team.enable_roles && <TableCell>Role</TableCell>}
            {team.enable_email && <TableCell>Email</TableCell>}
            {team.enable_phone && <TableCell>Phone</TableCell>}
            <TableCell align='center'>Settings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.members.map((member) => {
            return (
              <TableRow key={member.id}>
                <TableCell>
                  <Box sx={styles.memberNameBox}>
                    {member.full_name}
                    {member.team_manager ? <Shield color='info' /> : null}
                  </Box>
                </TableCell>
                {team.enable_roles && (
                  <TableCell>
                    {member.role_name || 'No Role Assigned'}
                  </TableCell>
                )}
                {team.enable_email && (
                  <TableCell>
                    {member.member_email || 'No Email Setup'}
                  </TableCell>
                )}
                {team.enable_phone && (
                  <TableCell>
                    {member.member_phone_number || 'No Phone Number Setup'}
                  </TableCell>
                )}
                {(userMember.team_manager || userMember.id === member.id) && (
                  <TableCell align='center'>
                    <MemberSettingsDialog
                      isSelf={userMember.id === member.id}
                      team={team}
                      member={member}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default MembersTab;
