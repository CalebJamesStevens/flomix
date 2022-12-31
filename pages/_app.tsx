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
import SideBar from '../src/Components/SideBar/SideBar';

export const styles = {
  appBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  sidebarContainer: {},
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100vh',
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
          <SideBar />

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
