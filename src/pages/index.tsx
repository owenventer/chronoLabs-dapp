import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>ChronoLabs</title>
        <meta
          name="description"
          content="SchronoLabs"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
