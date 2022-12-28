import React from 'react';

/** Types */
import type { AppProps } from 'next/app';

/** Auth0 */
import { UserProvider } from '@auth0/nextjs-auth0/client';

/** MUI */
import theme from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const styles = {
  appBox: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
} as const;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={styles.appBox}>
          <Container
            sx={styles.mainContainer}
            component={'main'}
          >
            <Component {...pageProps} />
          </Container>
        </Box>
      </ThemeProvider>
    </UserProvider>
  );
}
