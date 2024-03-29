import { Roboto, Open_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#274c77'
    },
    secondary: {
      main: '#EBEBD3'
    },
    background: {
      default: '#e7ecef'
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '.2rem',
      lineHeight: 1.4,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '.2rem',
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '.2rem',
      lineHeight: 1.4,
    }
  },
});

export default theme;