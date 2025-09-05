import Link from "next/link";
import Layout from "../../../components/Layout";
import { getOraclesCategories } from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import utilityStyles from "../../../styles/utility.module.css";
import oracleStyles from "../../../styles/Oracle.module.css";

export default function Oracles({ categories }) {
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
          {[...categories, "combined", "all"].map((category, index) => (
            <div
              key={category}
              className={classNames(oracleStyles.text_xl, utilityStyles.fadein)}
              style={styleAnimationDelay(index * 0.025 + 0.25)}
            >
              <p className={oracleStyles.heading_margin}>
                <Link
                  href={
                    category === "all"
                      ? `/oracles`
                      : `/oracles/categories/${category}`
                  }
                >
                  {toTitleCase(category)}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { categories: getOraclesCategories() } };
}
