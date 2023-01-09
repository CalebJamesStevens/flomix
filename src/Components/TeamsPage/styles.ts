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
  tableHead: {
    '& th': {
      fontWeight: '600',
    },
  },
  teamCellBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
    '& > svg': (theme: Theme) => ({
      color: theme.palette.info.dark,
    }),
  },
  tableCaption: {
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': (theme: Theme) => ({
      color: theme.palette.info.dark,
    }),
  },
};

export default styles;
