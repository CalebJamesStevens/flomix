import React from 'react';

/** MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Autocomplete,
  Button,
  Checkbox,
  CheckboxProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import {
  AdminPanelSettings,
  Filter,
  GroupAdd,
  ManageAccounts,
  Shield,
} from '@mui/icons-material';

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

type Props = {};

type Teams = Database['public']['Tables']['teams']['Row'];
type MembersTeam = Database['public']['Tables']['members_teams']['Row'];

function TeamsPage({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = React.useState(true);
  const [memberships, setMemberships] = React.useState<
    (MembersTeam & { team: Teams })[] | null
  >(null);
  const [onlyShowManagedTeams, setOnlyShowManagedTeams] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [newTeamDialogOpen, setNewTeamDialogOpen] = React.useState(false);

  async function getTeams() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const { data, error, status } = await supabase
        .from('members_teams')
        .select('*, team: teams (*), account: accounts (*)')
        .eq('user_id', user.id);

      if (status === 200 && data) {
        setMemberships(data);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getTeams();
  }, [session]);

  let filteredMemberships = memberships;
  if (onlyShowManagedTeams && memberships) {
    filteredMemberships = memberships.filter(
      (membership) => membership.team_manager
    );
  }

  if (searchInput && filteredMemberships) {
    filteredMemberships = filteredMemberships.filter((membership) => {
      return membership.team.team_name
        ?.toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());
    });
  }

  return (
    <Box>
      <Typography variant='h1'>Teams</Typography>
      <Box>
        <Box sx={styles.searchContainer}>
          <Autocomplete
            size='small'
            fullWidth
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            options={
              memberships?.map((membership) => membership.team.team_name) || []
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search Teams'
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <Button
            color='info'
            size='small'
            variant='contained'
            sx={styles.actionButton}
            onClick={() => setNewTeamDialogOpen(true)}
          >
            <GroupAdd />
            New Team
          </Button>
          <Dialog
            title='New Team'
            open={newTeamDialogOpen}
            onClose={() => setNewTeamDialogOpen(false)}
          >
            <Box
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = Object.fromEntries([
                  ...new FormData(event.currentTarget).entries(),
                ]);

                let { data, error } = await supabase.rpc('handle_new_team', {
                  team_name: formData.team_name,
                });

                if (error) {
                  console.error(error);
                } else {
                  setMemberships((previousMemberships) => {
                    if (previousMemberships) {
                      const copy = [...previousMemberships];
                      copy.push(data);
                      return copy;
                    } else {
                      return [data];
                    }
                  });
                }

                setNewTeamDialogOpen(false);
              }}
              component={'form'}
            >
              <DialogTitle>New Team</DialogTitle>
              <DialogContent>
                <TextField
                  name='team_name'
                  label={'Team Name'}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setNewTeamDialogOpen(false)}
                  color='primary'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  color='primary'
                >
                  Create
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
        <FormControlLabel
          label='Only Show Teams Managed By Me'
          control={
            <Checkbox
              onClick={() =>
                setOnlyShowManagedTeams((previousValue) => !previousValue)
              }
              checked={onlyShowManagedTeams}
            />
          }
        />
        <Table>
          <Box
            component={'caption'}
            sx={styles.tableCaption}
          >
            <Box>
              <Shield />: You manage this team
            </Box>
          </Box>
          <TableHead sx={styles.tableHead}>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell>Your Role</TableCell>
              <TableCell>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMemberships
              ? filteredMemberships?.map((membership) => {
                  return (
                    <TableRow
                      hover
                      key={membership.team.id}
                    >
                      <TableCell>
                        <Box sx={styles.teamCellBox}>
                          <Shield />
                          <Button
                            variant='contained'
                            href={`/teams/${membership.team.id}`}
                          >
                            <Typography>{membership.team.team_name}</Typography>
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{membership.member_role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'long',
                          }).format(new Date(membership.created_at))}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default TeamsPage;
