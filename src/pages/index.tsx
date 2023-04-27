import { GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import Chat from "~/layouts/Chat";

const Home: NextPage = () => {

  return (
    <Chat />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const result = await getSession(context)

  if (!result) {
      return {
          redirect: {
              destination: "/auth",
          },
      }
  }
  return {
      props: {
      },
  };
}

export default Home;
