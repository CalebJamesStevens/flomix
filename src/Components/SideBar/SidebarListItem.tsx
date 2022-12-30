import React, { Component, ElementType } from 'react';

/** MUI */
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
