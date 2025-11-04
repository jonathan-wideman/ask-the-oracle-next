import { ReactNode } from "react";
import { toTitleCase } from "../../lib/util";
import { Oracle } from "../Oracle";
import { OracleData } from "../../data/oracles";

export function MoveOracle({
  children,
  oracles,
}: {
  children?: ReactNode;
  oracles: OracleData[];
}) {
  const matches = (children as string).match(/ORACLE:(.*)/);
  if (!matches) throw new Error("MoveOracle: Oracle regex not found");
  const oracleTitle = matches[1];

  // TODO: extract
  function formatTitle(title: string) {
    // trim the index from the raw title
    const trimmed = title.replace(/^.*: /, "");
    // convert to title case
    return toTitleCase(trimmed);
  }
  // TODO: extract
  function createSlug(title: string) {
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

  return (
    <Oracle
      oracle={oracle}
      rollOnCreate={false}
      initialResult={"Seek your fate..."}
      className={"my-6"}
    />
  );
}
