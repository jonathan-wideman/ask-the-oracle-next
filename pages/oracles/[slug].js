import { useRouter } from "next/router";
import { Fragment } from "react";
import Layout from "../../components/Layout";
import { getOracles } from "../../lib/connector";
import { classNames, styleAnimationDelay } from "../../lib/util";
import { useOracleState } from "../../hooks/useOracleState";
import { Oracle as OracleComponent } from "../../components/Oracle";
import { OracleTable } from "../../components/OracleTable";
import { OracleTableToggleButton } from "../../components/OracleTableToggleButton";
import { OracleResult, OracleResultAlt } from "../../components/OracleResult";
import { Container } from "../../components/atoms/Container";
import { LinkVariant } from "../../components/atoms/LinkVariant";

export default function Oracle({ oracles }) {
  const router = useRouter();
  const { slug } = router.query;

  const oracle = oracles.find((oracle) => oracle.slug === slug);

  // const { rollOracle, tableVisible, toggleTable, result, rolling } =
  //   useOracleState(oracle, true, undefined, 500);

  return (
    <Layout pageTitle={oracle.title}>
      <Container variant="center" className={"gap-6"}>
        {/* <p className={classNames("mb-4 text-3xl font-bold", "fadein")}>
          {" "}
          Very well;
        </p>
        <p
          className={classNames("mb-4 text-lg font-bold", "fadein")}
          style={styleAnimationDelay(0.5)}
        >
          {oracle.title}...
        </p>

        <OracleResult
          result={result}
          rolling={rolling}
          rollOracle={rollOracle}
        />

        <button
          onClick={() => rollOracle()}
          className={classNames(
            "fadein",
            "cursor-pointer underline",
            "hover:underline hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
            "focus-visible:underline focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow"
          )}
          style={styleAnimationDelay(1.5)}
        >
          ask again
        </button>
        <OracleTableToggleButton
          toggleTable={toggleTable}
          tableVisible={tableVisible}
          animationDelay={1.5}
        />
        <LinkVariant
          href={`/oracles/categories/${oracle.category}`}
          className="fadein"
          style={styleAnimationDelay(1.5)}
        >
          seek a different fate
        </LinkVariant>
        
        <OracleTable oracle={oracle} tableVisible={tableVisible} /> */}
        <OracleComponent oracle={oracle} />

        <LinkVariant
          href={`/oracles/categories/${oracle.category}`}
          className="fadein"
          style={styleAnimationDelay(1.5)}
        >
          seek a different fate
        </LinkVariant>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getOracles().map((oracle) => ({
    params: { slug: oracle.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } };
}
