import React from 'react';

/** Types */
import type { AppProps } from 'next/app';

/** Supabase */
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  SessionContextProvider,
  Session,
  useUser,
} from '@supabase/auth-helpers-react';

/** MUI */
import theme from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AuthModal from '../src/Components/AuthModal/AuthModal';

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

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
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
        <AuthModal />
      </ThemeProvider>
    </SessionContextProvider>
  );
}
