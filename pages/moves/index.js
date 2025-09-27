import Layout from "../../components/Layout";
import { getAllMovesNames, getMoves, getOracles } from "../../lib/connector";
import { classNames, styleAnimationDelay, toTitleCase } from "../../lib/util";
import { Move } from "../../components/Move";
import { Container } from "../../components/atoms/Container";
import { LinkVariant } from "../../components/atoms/LinkVariant";

export default function Moves({ moves, allMoveNames, oracles }) {
  const movesByCategory = moves.reduce(
    (acc, move) => ({
      ...acc,
      [move.category]: [...(acc[move.category] || []), move],
    }),
    {}
  );

  const allMoveNamesWithoutAsterisks = allMoveNames.map((name) =>
    name.replace("*", "")
  );

  return (
    <Layout pageTitle={"Moves"}>
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
            <p className="mt-2 mr-0 mb-1 ml-0">{toTitleCase(category)}</p>
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
        <LinkVariant
          href={`/moves/categories`}
          className="fadein"
          style={styleAnimationDelay(1)}
        >
          consider a different action
        </LinkVariant>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      moves: getMoves(),
      allMoveNames: getAllMovesNames(),
      oracles: getOracles(["move"]),
    },
  };
}
