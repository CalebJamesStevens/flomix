import { Theme } from '@mui/material';

export const styles = {
  formContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    gap: theme.spacing(2),
  }),
};

export default styles;
