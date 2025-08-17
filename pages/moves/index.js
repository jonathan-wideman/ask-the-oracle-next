import Link from "next/link";
import Layout from "../../components/Layout";
import { getMoves, getOracles } from "../../lib/connector";
import { classNames, styleAnimationDelay, toTitleCase } from "../../lib/util";
import utilityStyles from "../../styles/utility.module.css";
import oracleStyles from "../../styles/Oracle.module.css";
import Markdown from "react-markdown";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDiceContext } from "../../contexts/DiceContext";

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
        </div>
      </main>
    </Layout>
  );
}

function MoveOracle({ children, oracles }) {
  const matches = children.match(/ORACLE:(.*)/);
  const oracleTitle = matches[1];
  // TODO: clean this up
  function formatTitle(title) {
    // trim the index from the raw title
    const trimmed = title.replace(/^.*: /, "");
    // convert to title case
    return toTitleCase(trimmed);
  }
  function createSlug(title) {
    // based on https://www.30secondsofcode.org/js/s/slugify
    return formatTitle(title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  const slug = createSlug(oracleTitle);
  const oracle = oracles.find((oracle) => oracle.slug === slug);

  const [tableVisible, setTableVisible] = useState(false);

  const [result, setResult] = useState("Seek your fate...");
  const { roll } = useDiceContext();

  const [rolling, setRolling] = useState(false);
  const timeoutRef = useRef(null);
  const resetAnimation = (delay) => {
    timeoutRef.current = setTimeout(() => setRolling(false), delay);
  };
  useEffect(() => {
    // Clear the timeout interval when the component unmounts
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const rollOracle = (delay = 10) => {
    setRolling(true);
    resetAnimation(delay);
    setResult(roll(oracle));
  };

  // useEffect(() => {
  //   rollOracle(50);
  // }, []);

  const toggleTable = () => setTableVisible((visible) => !visible);

  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      {/* <div
        style={{
          color: "magenta",
          fontFamily: '"Cinzel", serif',
          fontWeight: "bold",
        }}
      >
        {children}
      </div>
      <div>title: {oracleTitle}</div>
      <div>slug: {slug}</div>
      <div>id: {oracle?.id}</div> */}
      <div>
        <button
          onClick={() => rollOracle()}
          className={classNames(
            oracleStyles.result,
            rolling ? utilityStyles.transparent : utilityStyles.fadein
          )}
        >
          {result}
        </button>
      </div>

      {tableVisible ? (
        <div className={classNames(oracleStyles.table, utilityStyles.fadein)}>
          {oracle.table.map((row, index) => (
            <Fragment key={index}>
              <span
                className={utilityStyles.fadein}
                style={styleAnimationDelay(index * 0.025 + 0.1)}
              >
                {row.roll}
              </span>
              <span
                className={utilityStyles.fadein}
                style={styleAnimationDelay(index * 0.025 + 0.1)}
              >
                {row.result}
              </span>
            </Fragment>
          ))}
        </div>
      ) : null}
      <button
        onClick={() => toggleTable()}
        className={utilityStyles.fadein}
        style={styleAnimationDelay(0.5)}
      >
        {tableVisible ? "put away" : "consult"} the runic charts
      </button>
    </div>
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
      // component: ({ children, oracles }) => {
      //   const matches = children.match(/ORACLE:(.*)/);
      //   const oracleTitle = matches[1];
      //   // TODO: clean this up
      //   function formatTitle(title) {
      //     // trim the index from the raw title
      //     const trimmed = title.replace(/^.*: /, "");
      //     // convert to title case
      //     return toTitleCase(trimmed);
      //   }
      //   function createSlug(title) {
      //     // based on https://www.30secondsofcode.org/js/s/slugify
      //     return formatTitle(title)
      //       .toLowerCase()
      //       .trim()
      //       .replace(/[^\w\s-]/g, "")
      //       .replace(/[\s_-]+/g, "-")
      //       .replace(/^-+|-+$/g, "");
      //   }
      //   const slug = createSlug(oracleTitle);
      //   const oracle = oracles.find((oracle) => oracle.slug === slug);
      //   const tableVisible = true;

      //   return (
      //     <>
      //       <div
      //         style={{
      //           color: "magenta",
      //           fontFamily: '"Cinzel", serif',
      //           fontWeight: "bold",
      //         }}
      //       >
      //         {children}
      //       </div>
      //       <div>title: {oracleTitle}</div>
      //       <div>slug: {slug}</div>
      //       <div>id: {oracle?.id}</div>
      //       <button
      //         onClick={() => rollOracle()}
      //         className={classNames(
      //           oracleStyles.result,
      //           rolling ? utilityStyles.transparent : utilityStyles.fadein
      //         )}
      //       >
      //         {result}
      //       </button>

      //       {tableVisible ? (
      //         <div
      //           className={classNames(oracleStyles.table, utilityStyles.fadein)}
      //         >
      //           {oracle.table.map((row, index) => (
      //             <Fragment key={index}>
      //               <span
      //                 className={utilityStyles.fadein}
      //                 style={styleAnimationDelay(index * 0.025 + 0.25)}
      //               >
      //                 {row.roll}
      //               </span>
      //               <span
      //                 className={utilityStyles.fadein}
      //                 style={styleAnimationDelay(index * 0.025 + 0.25)}
      //               >
      //                 {row.result}
      //               </span>
      //             </Fragment>
      //           ))}
      //         </div>
      //       ) : null}
      //     </>
      //   );
      // },
      component: MoveOracle,
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

export function Move({ move, index, allMoveNames, oracles }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        className={classNames(oracleStyles.text_l, utilityStyles.fadein)}
        style={styleAnimationDelay(index * 0.025 + 0.25)}
        onClick={() => setOpen(!open)}
      >
        {move.name}
        {move.progress ? " ✴" : null}
      </a>
      {open && move.progress && (
        <div
          style={{
            color: "cornflowerblue",
            fontSize: "1rem",
            fontFamily: '"Cinzel", serif',
            fontWeight: "bold",
          }}
        >
          Progress Move
        </div>
      )}
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
                  return replacementComponent({ ...rest, oracles });
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
  return { props: { moves: getMoves(), oracles: getOracles() } };
}
