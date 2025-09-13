import Link from "next/link";
import Layout from "../../components/Layout";
import { getOraclesListings } from "../../lib/connector";
import { classNames, styleAnimationDelay, toTitleCase } from "../../lib/util";
import utilityStyles from "../../styles/utility.module.css";
import oracleStyles from "../../styles/Oracle.module.css";

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
                    <Link
                      href={`/oracles/${oracle.slug}`}
                      className={classNames(
                        oracleStyles.text_l,
                        utilityStyles.fadein
                      )}
                      style={styleAnimationDelay(index * 0.025 + 0.25)}>

                      {oracle.title}

                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href={`/moves/categories`}
            className={utilityStyles.fadein}
            style={styleAnimationDelay(1)}>
            
              seek a different fate
            
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { oracles: getOraclesListings() } };
}
