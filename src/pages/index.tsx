import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Chat from "~/layouts/Chat";

const Home: NextPage = () => {

  return (
    <Chat />
  );
};

export default Home;
