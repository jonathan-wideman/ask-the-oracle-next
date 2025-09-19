import Link from "next/link";
import Layout from "../../components/Layout";
import { getOraclesListings } from "../../lib/connector";
import { classNames, styleAnimationDelay, toTitleCase } from "../../lib/util";
import { Container } from "../../components/atoms/Container";

export default function Oracles({ oracles }) {
  const oraclesByCategory = oracles.reduce(
    (acc, oracle) => ({
      ...acc,
      [oracle.category]: [...(acc[oracle.category] || []), oracle],
    }),
    {}
  );

  return (
    <Layout pageTitle={"Tailwind"}>
      <main>
        <Container variant="center">container, content_center</Container>
        <div className="mx-auto w-4/5 max-w-4xl flex flex-col items-center text-center bg-amber-900">
          tailwind
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { oracles: getOraclesListings() } };
}
