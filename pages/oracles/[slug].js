import Layout from "../../components/Layout";
import { getOracle, getOraclesListings } from "../../lib/connector";
import { styleAnimationDelay } from "../../lib/util";
import { OracleAlt } from "../../components/Oracle";
import { Container } from "../../components/atoms/Container";
import { LinkVariant } from "../../components/atoms/LinkVariant";

export default function Oracle({ oracle }) {
  return (
    <Layout pageTitle={oracle.title}>
      <Container variant="center" className={"gap-6"}>
        <OracleAlt oracle={oracle} rollOnCreate={true} />

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
  const paths = getOraclesListings().map((oracle) => ({
    params: { slug: oracle.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { oracle: getOracle(params.slug) } };
}
