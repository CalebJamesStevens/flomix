import { Theme } from '@mui/material';

export const styles = {
  searchContainer: (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  }),
  actionButton: (theme: Theme) => ({
    flexShrink: 0,
    gap: theme.spacing(1),
    height: 'fit-content',
    '& > svg': {
      height: '18px',
    },
    padding: theme.spacing(1, 1),
  }),
};

export default styles;
