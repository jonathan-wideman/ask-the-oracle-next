import Link from "next/link";
import Layout from "../../../components/Layout";
import {
  getOraclesCategories,
  getOraclesListings,
} from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import { Container } from "../../../components/atoms/Container";

export default function Oracles({ oracles }) {
  const oraclesByCategory = oracles.reduce(
    (acc, oracle) => ({
      ...acc,
      [oracle.category]: [...(acc[oracle.category] || []), oracle],
    }),
    {}
  );

  return (
    <Layout pageTitle={"Oracles"}>
      <main>
        <Container variant="center">
          <p className={classNames("mb-4 text-3xl font-bold", "fadein")}>
            What do you seek?
          </p>
          {Object.keys(oraclesByCategory).map((category, index) => (
            <div
              key={category}
              className={classNames("mb-4 text-xl font-bold", "fadein")}
              style={styleAnimationDelay(index * 0.025 + 0.25)}
            >
              <p className={"mt-2 mr-0 mb-1 ml-0"}>{toTitleCase(category)}</p>
              <ul>
                {oraclesByCategory[category].map((oracle, index) => (
                  <li key={oracle.id}>
                    <Link
                      href={`/oracles/${oracle.slug}`}
                      className={classNames("mb-4 text-lg font-bold", "fadein")}
                      style={styleAnimationDelay(index * 0.025 + 0.25)}
                    >
                      {oracle.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href={`/oracles/categories`}
            className="fadein"
            style={styleAnimationDelay(1)}
          >
            seek a different fate
          </Link>
        </Container>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getOraclesCategories().map((category) => ({
    params: { category },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { category } = context.params;
  return { props: { oracles: getOraclesListings([category]) } };
}
