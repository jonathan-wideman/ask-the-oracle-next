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
              <p className={oracleStyles.heading_margin}>{toTitleCase(category)}</p>
              <ul>
                {movesByCategory[category].map((move, index) => (
                  <li key={move.name}>
                    <Move move={move} index={index} />
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

export function Move({ move, index }) {
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
          <Markdown>{move.rules}</Markdown>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  return { props: { moves: getMoves() } };
}
