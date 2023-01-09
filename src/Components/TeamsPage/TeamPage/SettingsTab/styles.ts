import { Theme } from '@mui/material';

export const styles = {
  form: (theme: Theme) => ({
    marginTop: theme.spacing(4),
  }),
  rolesBox: (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    flexWrap: 'wrap',
    width: '100%',
  }),
  roleTag: (theme: Theme) => ({
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: theme.palette.info.main,
    color: 'white',
    padding: '.25rem .5rem',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0),
    textAlign: 'center',
    borderRadius: '10px',
    transition: '250ms',
    '&:hover, &:focus-within': {
      '& .MuiListItemButton-root': {
        transform: 'scaleX(1)',
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
  }),
  rolesButton: (theme: Theme) => ({
    transition: '250ms',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    borderRadius: '50%',
    color: 'white',
  }),
  fieldset: (theme: Theme) => ({
    borderRadius: '4px',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
    marginTop: theme.spacing(2),
    '& > legend': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      '& > label': {
        margin: 0,
        padding: 0,
      },
    },
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    '&:disabled': {
      '& > :not(legend)': {
        pointerEvents: 'none',
        opacity: '.5',
      },
    },
  }),
  formActions: (theme: Theme) => ({
    marginTop: theme.spacing(4),
    display: 'flex',
    gap: theme.spacing(1),
  }),
};

export default styles;
