import Link from "next/link";
import Layout from "../../components/Layout";
import { getOraclesListings } from "../../lib/connector";
import { classNames, styleAnimationDelay, toTitleCase } from "../../lib/util";
import { Container } from "../../components/atoms/Container";
import { OracleResult } from "../../components/OracleResult";

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
      <Container variant="center">
        <OracleResult result={"Result"} rolling={false} rollOracle={() => {}} />
        <div
          className={classNames(
            "relative",
            "px-10 py-6 text-xl",
            "bg-zinc-950/50",
            "rounded-3xl",
            // "border border-zinc-700 rounded-3xl",
            "fadein"
          )}
        >
          Result
          <div
            className={classNames(
              "text-xs text-zinc-500",
              "absolute -bottom-2 left-0 right-0 text-center"
              // "capitalize"
            )}
          >
            ⊰ CATEGORY ⊱
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { oracles: getOraclesListings() } };
}
