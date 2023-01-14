import React from 'react';

/** MUI */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Settings, TollRounded } from '@mui/icons-material';

/** Styles */
import styles from './styles';

/** Supabase */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from '../../../../../utils/supabase/database/database.types';
import {
  Autocomplete,
  Checkbox,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';
import useStore from '../../../../../utils/state/useStore/useStore';
import useTeamState from '../../useTeamState/useTeamState';
type TeamTable = Database['public']['Tables']['teams']['Row'];
type Team_Roles = Database['public']['Tables']['team_roles']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Member = MembersTeam & Account & Team_Roles;
type Team = TeamTable & { members: Member[] } & { roles: Team_Roles[] };

type Props = {
  member: MembersTeam;
  team: Team;
  isSelf: boolean;
};

function MemberSettingsDialog({ member, team, isSelf }: Props) {
  const user = useUser();
  const { globalStore, globalDispatch } = useStore();
  const { teamState, teamDispatch } = useTeamState();
  const supabase = useSupabaseClient();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Settings />
      </IconButton>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
      >
        <DialogTitle>Member Settings</DialogTitle>
        <Box
          component={'form'}
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = Object.fromEntries(
              new FormData(event.currentTarget).entries()
            );

            try {
              const dataToSend = {
                ...formData,
                team_id: team.team_id,
                user_id: member.user_id,
                member_id: member.id,
                team_manager: formData.team_manager === 'on' ? true : false,
              };

              if (isSelf) {
                dataToSend.team_manager = member.team_manager;
                if (!member.team_manager) {
                  dataToSend.member_role = member.member_role;
                }
              }

              const { data } = await supabase
                .rpc('update_team_member', {
                  data: JSON.stringify(dataToSend),
                })
                .throwOnError();

              teamDispatch({
                type: 'updateMember',
                payload: {
                  memberId: data?.id,
                  memberData: data,
                },
              });
              setOpen(false);
              globalDispatch({
                type: 'toast',
                payload: {
                  message: 'Member Updated!',
                  data: {
                    severity: 'success',
                    duration: 5000,
                  },
                },
              });
            } catch (error) {
              console.log(error);
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
        >
          <DialogContent>
            <Stack gap={2}>
              {isSelf && member.team_manager && (
                <Autocomplete
                  size='small'
                  options={team.roles.map((role) => role.role_name)}
                  defaultValue={member.role_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name={'member_role'}
                      label='Role'
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              )}
              <TextField
                size='small'
                defaultValue={member.member_email}
                name={'member_email'}
                type='email'
                label={'Email'}
              />
              <TextField
                size='small'
                defaultValue={member.member_phone_number}
                name={'member_phone_number'}
                type='tel'
                label={'Phone'}
              />
              {!isSelf && (
                <FormLabel>
                  <Checkbox
                    defaultChecked={member.team_manager}
                    name='team_manager'
                    sx={styles.formCheckbox}
                  />
                  Team Manager
                </FormLabel>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color='secondary'>Cancel</Button>
            <Button
              variant='contained'
              color='info'
              type={'submit'}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default MemberSettingsDialog;
