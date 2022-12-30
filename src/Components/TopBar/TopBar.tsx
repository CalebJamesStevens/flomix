import React from 'react';

type Props = {};

/** MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/** Components */

/** Styles */
import styles from './styles';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { AccountCircle, Home, Person } from '@mui/icons-material';
import SidebarListItem from './SidebarListItem';

export default function TopBbar({}: Props) {
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
