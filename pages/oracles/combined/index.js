import Layout from "../../../components/Layout";
import { getOracles, getOraclesCategories } from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import { useRouter } from "next/router";
import { Oracle } from "../../../components/Oracle";
import { Container } from "../../../components/atoms/Container";
import { LinkVariant } from "../../../components/atoms/LinkVariant";

export default function Oracles({ oracles }) {
  const router = useRouter();

  const oracleSlugs = Array.isArray(router.query.oracles)
    ? router.query.oracles
    : router.query.oracles?.split(",").filter(Boolean);

  // const filteredOracles = oracles.filter((oracle) =>
  //   oracleSlugs?.includes(oracle.slug)
  // );
  const mappedOracles = (oracleSlugs ?? [])
    .map((slug) => oracles.find((oracle) => oracle.slug === slug))
    .filter(Boolean);

  return (
    <Layout pageTitle={oracleSlugs?.join(", ")}>
      <Container variant="center" className="gap-6">
        {/* <p className={classNames("mb-4 text-3xl font-bold", "fadein")}> */}
        <p className={classNames("text-3xl font-bold", "fadein")}>
          {" "}
          Very well;
        </p>

        {mappedOracles?.map((oracle, index) => (
          <div key={index}>
            {/* <p
              className={classNames("mb-4 text-lg font-bold", "fadein")}
              style={styleAnimationDelay(0.5)}
            >
              {oracle.title}...
            </p> */}

            <Oracle oracle={oracle} rollOnCreate={true} />
          </div>
        ))}

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
  return { props: { oracles: getOracles() } };
}
