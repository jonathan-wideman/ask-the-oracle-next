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
                      href={`/oracles/combined?oracles=${oracle.slug}`}
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

export async function getStaticProps(context) {
  const { category } = "combined";
  return {
    props: {
      oracles: [
        { category: "combined", title: "Action, Theme", slug: "action,theme" },
        {
          category: "combined",
          title: "Ironlander Character",
          slug: "ironlander-names-a,ironlander-names-b,character-descriptor,character-descriptor,character-role,character-goal",
        },
        {
          category: "combined",
          title: "Location",
          slug: "location-descriptor,location-descriptor,location,region",
        },
        {
          category: "combined",
          title: "Settlement",
          slug: "region,settlement-name-prefix,settlement-name-suffix,location-descriptor,location-descriptor,settlement-trouble,theme",
        },
      ],
    },
  };
}
