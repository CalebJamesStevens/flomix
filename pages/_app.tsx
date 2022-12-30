import React from 'react';

/** Types */
import type { AppProps } from 'next/app';

/** Auth0 */
import { UserProvider } from '@auth0/nextjs-auth0/client';

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
import { useRouter } from 'next/router';
import AuthModal from '../src/Components/AuthModal/AuthModal';
import { AuthSession } from '@supabase/supabase-js';

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
  const router = useRouter();
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());
  const [session, setSesstion]: [
    session: AuthSession | null,
    setSession: Function
  ] = React.useState(null);
  const user = useUser();

  React.useEffect(() => {
    const getSession = () => {
      supabaseClient.auth.getSession().then(({ data }) => setSesstion(data));
    };

    getSession();
  }, []);

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
