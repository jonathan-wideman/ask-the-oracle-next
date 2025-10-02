import Layout from "../../../components/Layout";
import { getOracles, getOraclesListings } from "../../../lib/connector";
import { classNames, styleAnimationDelay } from "../../../lib/util";
import { useRouter } from "next/router";
import { Oracle, OracleChooser } from "../../../components/Oracle";
import { Container } from "../../../components/atoms/Container";
import { LinkVariant } from "../../../components/atoms/LinkVariant";
import { useState } from "react";

export default function Oracles({ oracles, allOracleListings }) {
  const router = useRouter();

  const oracleSlugs = Array.isArray(router.query.oracles)
    ? router.query.oracles
    : router.query.oracles?.split(",").filter(Boolean);

  const mappedOracles = (oracleSlugs ?? [])
    .map((slug) => oracles.find((oracle) => oracle.slug === slug))
    .filter(Boolean);

  const [addingOracle, setAddingOracle] = useState(false);

  const addOracleSlugToQuery = (oracleSlug) => {
    const currentQuery = router.query;
    // console.log({ currentQuery });
    const newQuery = {
      ...currentQuery,
      oracles: `${currentQuery.oracles},${oracleSlug}`,
    };
    // console.log({ newQuery });
    router.push({ query: newQuery });
    setAddingOracle(false);
  };

  const removeOracleSlugFromQueryByIndex = (index) => {
    const currentQuery = router.query;
    // console.log({ currentQuery });
    const newQuery = {
      ...currentQuery,
      oracles: currentQuery.oracles
        .split(",")
        .filter((slug, i) => i !== index)
        .join(","),
    };
    // console.log({ newQuery });
    router.push({ query: newQuery });
  };

  return (
    <Layout pageTitle={oracleSlugs?.join(", ")}>
      <Container variant="center" className="gap-6">
        <p className={classNames("text-3xl font-bold", "fadein")}>
          {" "}
          Very well;
        </p>

        {mappedOracles?.map((oracle, index) => (
          <div key={`${index}${oracle.id}`}>
            <Oracle
              oracle={oracle}
              rollOnCreate={true}
              onDelete={() => removeOracleSlugFromQueryByIndex(index)}
            />
          </div>
        ))}

        {!addingOracle && (
          <button
            className={classNames(
              "underline",
              "hover:text-zinc-50 hover:text-shadow-zinc-50/50 hover:text-shadow-glow",
              "focus-visible:text-zinc-50 focus-visible:text-shadow-zinc-50/50 focus-visible:text-shadow-glow",
              "fadein"
            )}
            onClick={() => setAddingOracle(true)}
            style={styleAnimationDelay(0.75)}
          >
            add an oracle
          </button>
        )}
        {addingOracle && (
          <OracleChooser
            oracleListings={allOracleListings}
            onSelect={addOracleSlugToQuery}
            onCancel={() => setAddingOracle(false)}
          />
        )}

        <LinkVariant
          href={`/oracles/categories/combined`}
          className="fadein"
          style={styleAnimationDelay(1)}
        >
          seek a different fate
        </LinkVariant>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { oracles: getOracles(), allOracleListings: getOraclesListings() },
  };
}
