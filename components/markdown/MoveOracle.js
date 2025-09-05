import { toTitleCase } from "../../lib/util";
import { Oracle } from "../Oracle";

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

  if (!oracle) {
    return null;
  }

  return <Oracle oracle={oracle} rollOnCreate={false} />;
}
