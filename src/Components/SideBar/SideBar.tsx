import React from 'react';

type Props = {};

/** MUI */
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Home, Person } from '@mui/icons-material';

/** Components */
import SidebarListItem from './SidebarListItem';

/** Styles */
import styles from './styles';

export default function SideBar({}: Props) {
  return (
    <Box
      component={'aside'}
      sx={styles.drawerPaper}
    >
      <List component={'nav'}>
        <SidebarListItem
          label='Home'
          Icon={<Home />}
          href='/'
        />
        <Divider sx={styles.listDivider} />
        <SidebarListItem
          label='Account'
          Icon={<Person />}
          href='/account'
        />
      </List>
    </Box>
  );
}
