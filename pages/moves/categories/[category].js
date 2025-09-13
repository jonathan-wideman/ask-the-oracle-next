import Layout from "../../../components/Layout";
import {
  getMoves,
  getMovesCategories,
  getOracles,
} from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import utilityStyles from "../../../styles/utility.module.css";
import oracleStyles from "../../../styles/Oracle.module.css";
import { Move } from "../../../components/Move";
import Link from "next/link";

export default function Moves({ moves, oracles }) {
  const movesByCategory = moves.reduce(
    (acc, move) => ({
      ...acc,
      [move.category]: [...(acc[move.category] || []), move],
    }),
    {}
  );

  const allMoveNamesWithoutAsterisks = moves.map((move) =>
    move.name.replace("*", "")
  );

  return (
    <Layout pageTitle={"Moves"}>
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
            What will you do?
          </p>
          {Object.keys(movesByCategory).map((category, index) => (
            <div
              key={category}
              className={classNames(oracleStyles.text_xl, utilityStyles.fadein)}
              style={styleAnimationDelay(index * 0.025 + 0.25)}
            >
              <p className={oracleStyles.heading_margin}>
                {toTitleCase(category)}
              </p>
              <ul>
                {movesByCategory[category].map((move, index) => (
                  <li key={move.name}>
                    <Move
                      move={move}
                      index={index}
                      allMoveNames={allMoveNamesWithoutAsterisks}
                      oracles={oracles}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href={`/moves/categories`}
            className={utilityStyles.fadein}
            style={styleAnimationDelay(1)}>
            
              consider a different action
            
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getMovesCategories().map((category) => ({
    params: { category },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { category } = context.params;
  return {
    props: { moves: getMoves([category]), oracles: getOracles(["move"]) },
  };
}
