import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { SessionProvider, signIn, useSession } from 'next-auth/react'

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';

import createEmotionCache from '../createEmotionCache';
import CustomTheme from '../theme';
import { ReactElement, ReactNode, useMemo, useState } from 'react';
import { ColorModeContext } from '@/context/ColorModeContext';
import { NextPage } from 'next';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth: boolean;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}


function MyApp(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;

  const getLayout = Component.getLayout ?? ((page) => page)
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () => CustomTheme(mode),
    [mode],
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SessionProvider
            session={session}
          >
            {Component.auth
              ? <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
              : getLayout(<Component {...pageProps} />)
            }
          </SessionProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  )
}

interface AuthProps {
  children: any;
}

function Auth(props: AuthProps) {

  const { data: session, status } = useSession({
    required: true
  })
  const isUser = !!session?.user

  if (isUser) {
    return props.children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default MyApp
