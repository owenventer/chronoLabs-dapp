import type { NextPage } from "next";
import Head from "next/head";
import { EmployerDashView } from "../views";

const EmployerDash: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>ChronoLabs</title>
        <meta
          name="description"
          content="Employer Dashboard"
        />
      </Head>
      <EmployerDashView/>
    </div>
  );
};

export default EmployerDash;
