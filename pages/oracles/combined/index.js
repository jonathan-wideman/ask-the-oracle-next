import Link from "next/link";
import Layout from "../../../components/Layout";
import { getOracles, getOraclesCategories } from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import utilityStyles from "../../../styles/utility.module.css";
import oracleStyles from "../../../styles/Oracle.module.css";
import { useRouter } from "next/router";
import { Oracle } from "../../../components/Oracle";

export default function Oracles({ oracles }) {
  const router = useRouter();

  const oracleSlugs = Array.isArray(router.query.oracles)
    ? router.query.oracles
    : router.query.oracles?.split(",").filter(Boolean);

  const filteredOracles = oracles.filter((oracle) =>
    oracleSlugs?.includes(oracle.slug)
  );

  return (
    <Layout pageTitle={oracleSlugs?.join(", ")}>
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
            {" "}
            Very well;
          </p>

          {filteredOracles?.map((oracle, index) => (
            <div key={index}>
              <p
                className={classNames(
                  oracleStyles.text_l,
                  utilityStyles.fadein
                )}
                style={styleAnimationDelay(0.5)}
              >
                {oracle.title}...
              </p>

              <Oracle oracle={oracle} rollOnCreate={true} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } };
}
