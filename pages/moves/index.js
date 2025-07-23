import Link from "next/link";
import Layout from "../../components/Layout";
import { getMoves } from "../../lib/connector";
import { classNames, styleAnimationDelay, toTitleCase } from "../../lib/util";
import utilityStyles from "../../styles/utility.module.css";
import oracleStyles from "../../styles/Oracle.module.css";
import Markdown from "react-markdown";
import { useState } from "react";

export default function Moves({ moves }) {
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
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export function Move({ move, index, allMoveNames }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        className={classNames(oracleStyles.text_l, utilityStyles.fadein)}
        style={styleAnimationDelay(index * 0.025 + 0.25)}
        onClick={() => setOpen(!open)}
      >
        {move.name}
      </a>
      {open && (
        <div className={oracleStyles.move_rules}>
          <Markdown
            components={{
              em: ({ node, ...rest }) => {
                const isMoveName = allMoveNames.includes(rest.children);
                console.log(isMoveName, rest.children);
                return (
                  <em
                    className={isMoveName ? oracleStyles.move_name : undefined}
                    {...rest}
                  />
                );
              },
              code(props) {
                const { node, ...rest } = props;
                const type = rest.children.startsWith("Roll") ? "roll" : "stat";
                return (
                  <span
                    className={
                      {
                        roll: oracleStyles.roll,
                        stat: oracleStyles.stat,
                      }[type]
                    }
                    {...rest}
                  />
                );
              },
            }}
          >
            {move.rules}
          </Markdown>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  return { props: { moves: getMoves() } };
}
