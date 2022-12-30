import { Theme } from '@mui/material';

export const styles = {
  drawerPaper: (theme: Theme) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  }),
  listItem: (theme: Theme) => ({
    px: theme.spacing(1),
    minWidth: '200px',
  }),
  listButton: (theme: Theme) => ({
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    width: '100%',
    gap: theme.spacing(2),
    px: theme.spacing(2),
  }),
  listDivider: (theme: Theme) => ({
    borderColor: theme.palette.primary.light,
    mx: theme.spacing(1),
  }),
};

export default styles;
