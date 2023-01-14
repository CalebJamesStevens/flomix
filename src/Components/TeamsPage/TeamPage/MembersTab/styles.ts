import { Theme } from '@mui/material';

export const styles = {
  tableHead: {
    '& th': {
      fontWeight: '600',
    },
  },
  memberNameBox: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    paddingRight: (theme: Theme) => theme.spacing(1),
  },
};

export default styles;
