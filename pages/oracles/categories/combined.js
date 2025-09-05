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
import utilityStyles from "../../../styles/utility.module.css";
import oracleStyles from "../../../styles/Oracle.module.css";

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
        <div
          className={classNames(
            utilityStyles.container,
            utilityStyles.content_center
          )}
        >
          <p
            className={classNames(oracleStyles.text_xxl, utilityStyles.fadein)}
          >
            What do you seek?
          </p>
          {Object.keys(oraclesByCategory).map((category, index) => (
            <div
              key={category}
              className={classNames(oracleStyles.text_xl, utilityStyles.fadein)}
              style={styleAnimationDelay(index * 0.025 + 0.25)}
            >
              <p className={oracleStyles.heading_margin}>
                {toTitleCase(category)}
              </p>
              <ul>
                {oraclesByCategory[category].map((oracle, index) => (
                  <li key={oracle.id}>
                    <Link href={`/oracles/combined?oracles=${oracle.slug}`}>
                      <a
                        className={classNames(
                          oracleStyles.text_l,
                          utilityStyles.fadein
                        )}
                        style={styleAnimationDelay(index * 0.025 + 0.25)}
                      >
                        {oracle.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link href={`/oracles/categories`}>
            <a className={utilityStyles.fadein} style={styleAnimationDelay(1)}>
              seek a different fate
            </a>
          </Link>
        </div>
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
          slug: "ironlander-names-a,ironlander-names-b,character-descriptor,character-role,character-goal",
        },
        {
          category: "combined",
          title: "Location",
          slug: "region,location,location-descriptor",
        },
        {
          category: "combined",
          title: "Settlement",
          slug: "region,settlement-name-prefix,settlement-name-suffix,location-descriptor,settlement-trouble",
        },
      ],
    },
  };
}
