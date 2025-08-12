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

const specialTextRegexPerElements = {
  code: [
    {
      regex: /^◈.*$/,
      component: ({ children }) => (
        <span
          style={{
            color: "cornflowerblue",
            fontFamily: '"Cinzel", serif',
            fontWeight: "bold",
          }}
        >
          {children.slice(1)}
        </span>
      ),
    },
    {
      regex: /^\d (progress|tick|ticks)$/,
      component: ({ children }) => (
        <span
          style={{
            color: "cornflowerblue",
            fontFamily: '"Cinzel", serif',
            fontWeight: "bold",
          }}
        >
          {children}
        </span>
      ),
    },
    // +1 momentum
    // +2 momentum
    // +3 momentum
    // -1 momentum
    // (1 harm)
    // add +1
    // 1 harm
    // -health
    // -momentum
    // -spirit
    // -supply
    // -2 momentum
    // 1 experience
    {
      regex: /^ORACLE:.*$/,
      component: ({ children }) => (
        <span
          style={{
            color: "magenta",
            fontFamily: '"Cinzel", serif',
            fontWeight: "bold",
          }}
        >
          {children}
        </span>
      ),
    },
  ],
  strong: [
    {
      regex:
        /^(strong hit|weak hit|miss|any result with 6|hit with 5|miss with 1)$/,
      component: ({ children }) => (
        <strong
          style={{
            color: "cornflowerblue",
          }}
        >
          {children}
        </strong>
      ),
    },
  ],
};

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
              strong: ({ node, ...rest }) => {
                const matches = specialTextRegexPerElements.strong.filter(
                  (rule) => rule.regex.test(rest.children)
                );
                const replacementComponent = matches[0]?.component;
                if (replacementComponent) {
                  return replacementComponent(rest);
                }
                return <strong style={{ color: "gold" }} {...rest} />;
              },
              code({ node, ...rest }) {
                const matches = specialTextRegexPerElements.code.filter(
                  (rule) => rule.regex.test(rest.children)
                );
                const replacementComponent = matches[0]?.component;
                if (replacementComponent) {
                  return replacementComponent(rest);
                }
                return (
                  <span
                    style={{
                      color: "cornflowerblue",
                      fontFamily: '"Cinzel", serif',
                      fontWeight: "bold",
                    }}
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
