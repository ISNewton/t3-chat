import '../styles/globals.css'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import { withTRPC } from '@trpc/next';
import { getSession, SessionProvider } from 'next-auth/react';
import { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import Layout from '~/layouts/Layout';
import { AppRouter } from '~/server/api/root';


// const { APP_URL, WS_URL } = publicRuntimeConfig;

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
      <Component {...pageProps} />
        </Layout>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    pageProps: {
      session: await getSession(ctx),
    },
  };
};

function getEndingLink() {
  // if (typeof window === 'undefined') {
    console.log(121212121212)
    console.log(`${process.env.APP_URL}/api/trpc`)
    // console.log(`${getBaseUrl()}/api/trpc`)
    return httpBatchLink({
      url: `http://localhost:3000/api/trpc`,
      // url: `${process.env.APP_URL}/api/trpc`,
    });
  // }
  // const client = createWSClient({
  //   url: 'ws:localhost::3001',
  // });
  // return wsLink<AppRouter>({
  //   client,
  // });
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' &&
              typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        getEndingLink(),
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: () => {
        if (ctx?.req) {
          // on ssr, forward client's headers to the server
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
