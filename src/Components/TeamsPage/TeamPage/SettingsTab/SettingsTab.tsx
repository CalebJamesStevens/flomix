import React from 'react';

/** MUI */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Add from '@mui/icons-material/Add';
import DeleteRounded from '@mui/icons-material/DeleteRounded';

/** Components */

/** Styles */
import styles from './styles';

/** Supabase */
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../../../../utils/supabase/database/database.types';

type TeamTable = Database['public']['Tables']['teams']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];
type Team_Roles = Database['public']['Tables']['team_roles']['Row'];
type Member = MembersTeam & Account & Team_Roles;
type Team = TeamTable & { members: Member[] } & { roles: Team_Roles[] };
type Props = {
  team: Team;
};

function SettingsTab({ team }: Props) {
  const supabase = useSupabaseClient();
  const [teamSettings, setTeamSettings] = React.useState({
    team_name: team.team_name,
    enable_roles: team.enable_roles,
    enable_email: team.enable_email,
    enable_phone: team.enable_phone,
    roles: team.roles.map((role) => role.role_name),
  });

  const changesMade =
    JSON.stringify({
      team_name: team.team_name,
      enable_roles: team.enable_roles,
      enable_email: team.enable_email,
      enable_phone: team.enable_phone,
      roles: team.roles.map((role) => role.role_name),
    }) !== JSON.stringify(teamSettings);

  return (
    <Box
      sx={styles.form}
      component={'form'}
      onKeyDown={(event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const { name, value } = event.target;
          if (event.target.hasAttribute('data-tags-input')) {
            return setTeamSettings((previousValues) => {
              if (previousValues[name].includes(value) || !value.trim()) {
                return previousValues;
              }
              event.target.value = '';
              return {
                ...previousValues,
                [name]: [...previousValues[name], value],
              };
            });
          }
        }
      }}
      onChange={(event: React.ChangeEvent<HTMLFormElement>) => {
        if (event.target.hasAttribute('data-tags-input')) {
          return;
        }
        const { name, value, type, checked } = event.target;

        return setTeamSettings((previousValues) => {
          return {
            ...previousValues,
            [name]: type === 'checkbox' ? checked : value,
          };
        });
      }}
      onReset={() =>
        setTeamSettings({
          team_name: team.team_name,
          enable_roles: team.enable_roles,
          enable_email: team.enable_email,
          enable_phone: team.enable_phone,
          roles: team.roles.map((role) => role.role_name),
        })
      }
      onSubmit={async (event) => {
        if (!changesMade) {
          return;
        }
        event.preventDefault();
        const data = await supabase.rpc('update_team_settings', {
          data: JSON.stringify(teamSettings),
          _team_id: team.team_id,
        });
      }}
    >
      <Stack>
        <Box
          sx={styles.fieldset}
          component='fieldset'
        >
          <Box component={'legend'}>Team Information</Box>
          <TextField
            size='small'
            label='Team Name'
            defaultValue={teamSettings.team_name}
            name='team_name'
          />
        </Box>
        <Box
          disabled={!teamSettings.enable_roles}
          component='fieldset'
          sx={styles.fieldset}
        >
          <Box component={'legend'}>
            <FormControlLabel
              label='Enable Team Roles'
              control={
                <Checkbox
                  checked={teamSettings.enable_roles}
                  name='enable_roles'
                />
              }
            />
          </Box>
          <TextField
            size='small'
            inputProps={{
              'data-tags-input': true,
            }}
            name='roles'
            label='New Role Name'
          />
          {teamSettings?.roles.length ? (
            <List sx={styles.rolesBox}>
              {teamSettings?.roles?.map((role) => {
                return (
                  <ListItem
                    key={role}
                    sx={styles.roleTag}
                    dense
                  >
                    <ListItemText>{role}</ListItemText>
                    <ListItemButton
                      onClick={() =>
                        setTeamSettings((previousRoles) => ({
                          ...previousRoles,
                          roles: previousRoles.roles.filter(
                            (_role) => _role !== role
                          ),
                        }))
                      }
                      sx={styles.rolesButton}
                    >
                      <DeleteRounded fontSize='small' />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Box>
              <Typography
                display='flex'
                alignItems='center'
                color='grey'
                marginTop={2}
              >
                <Add fontSize='small' />
                Add Your First Role
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={styles.fieldset}
          component='fieldset'
        >
          <Box component={'legend'}>Member Information</Box>
          <FormControlLabel
            label='Enable Member Email Registration'
            control={
              <Checkbox
                checked={teamSettings.enable_email}
                name='enable_email'
              />
            }
          />
          <FormControlLabel
            label='Enable Member Phone Number Registration'
            control={
              <Checkbox
                checked={teamSettings.enable_phone}
                name='enable_phone'
              />
            }
          />
        </Box>
        <Box sx={styles.formActions}>
          <Button
            variant='contained'
            color='info'
            type='submit'
            disabled={!changesMade}
          >
            Save
          </Button>
          <Button
            color='secondary'
            type='reset'
            disabled={!changesMade}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default SettingsTab;
