import React, { Component, ElementType } from 'react';

/** MUI */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

/** Components */

/** Styles */
import styles from './styles';
import Link from 'next/link';

type Props = {
  label: string;
  Icon: React.ReactNode;
  href: string;
};

function SidebarListItem({ label, Icon, href }: Props) {
  return (
    <ListItem sx={styles.listItem}>
      <Button
        href={href}
        sx={styles.listButton}
        component={Link}
      >
        {Icon}
        <ListItemText primary={label} />
      </Button>
    </ListItem>
  );
}

export default SidebarListItem;
