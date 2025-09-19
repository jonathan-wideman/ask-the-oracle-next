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
import { Move } from "../../../components/Move";
import Link from "next/link";
import { Container } from "../../../components/atoms/Container";

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
        <Container variant="center">
          <p className={classNames("mb-4 text-3xl font-bold", "fadein")}>
            What will you do?
          </p>
          {Object.keys(movesByCategory).map((category, index) => (
            <div
              key={category}
              className={classNames("mb-4 text-xl font-bold", "fadein")}
              style={styleAnimationDelay(index * 0.025 + 0.25)}
            >
              <p className={"mt-2 mr-0 mb-1 ml-0"}>{toTitleCase(category)}</p>
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
            className="fadein"
            style={styleAnimationDelay(1)}
          >
            consider a different action
          </Link>
        </Container>
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
