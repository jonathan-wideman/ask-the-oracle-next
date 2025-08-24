import { useState, useRef, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import oracleStyles from "../../styles/Oracle.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { useDiceContext } from "../../contexts/DiceContext";
import { toTitleCase, classNames, styleAnimationDelay } from "../../lib/util";


export function MoveOracle({ children, oracles }) {
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
