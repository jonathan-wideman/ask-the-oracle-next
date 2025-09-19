import Link from "next/link";
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
      <main>
        <Container variant="center">
          <p
            className={classNames("mb-4 text-3xl font-bold", "fadein")}
          >
            {" "}
            Very well;
          </p>

          {mappedOracles?.map((oracle, index) => (
            <div key={index}>
              <p
                className={classNames(
                  "mb-4 text-lg font-bold",
                  "fadein"
                )}
                style={styleAnimationDelay(0.5)}
              >
                {oracle.title}...
              </p>

              <Oracle oracle={oracle} rollOnCreate={true} />
            </div>
          ))}

          <Link
            href={`/oracles/categories/combined`}
            className="fadein"
            style={styleAnimationDelay(1)}>
            
              seek a different fate
            
          </Link>
        </Container>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } };
}
