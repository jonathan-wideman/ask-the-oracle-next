import { toTitleCase } from "../../lib/util";
import action from "./action.oracle.json";
import challenge_rank from "./challenge-rank.oracle.json";
import character_descriptor from "./character-descriptor.oracle.json";
import character_goal from "./character-goal.oracle.json";
import character_role from "./character-role.oracle.json";
import coastal_waters_location from "./coastal-waters-location.oracle.json";
import combat_action from "./combat-action.oracle.json";
import elf_names from "./elf-names.oracle.json";
import giant_names from "./giant-names.oracle.json";
import ironlander_names_a from "./ironlander-names-a.oracle.json";
import ironlander_names_b from "./ironlander-names-b.oracle.json";
import location_descriptor from "./location-descriptor.oracle.json";
import location from "./location.oracle.json";
import major_plot_twist from "./major-plot-twist.oracle.json";
import move_advance_a_threat from "./move-advance-a-threat.json";
import move_delve_the_depths_edge from "./move-delve-the-depths-edge.json";
import move_delve_the_depths_shadow from "./move-delve-the-depths-shadow.json";
import move_delve_the_depths_wits from "./move-delve-the-depths-wits.json";
import move_endure_harm from "./move-endure-harm.json";
import move_endure_stress from "./move-endure-stress.json";
import move_find_an_opportunity from "./move-find-an-opportunity.json";
import move_pay_the_price from "./move-pay-the-price.json";
import move_reveal_a_danger_alternate_version from "./move-reveal-a-danger-alternate-version.json";
import move_reveal_a_danger from "./move-reveal-a-danger.json";
import mystic_backlash from "./mystic-backlash.oracle.json";
import region from "./region.oracle.json";
import settlement_name_example_creature from "./settlement-name-example-creature.oracle.json";
import settlement_name_example_edifice from "./settlement-name-example-edifice.oracle.json";
import settlement_name_example_event from "./settlement-name-example-event.oracle.json";
import settlement_name_example_landscape from "./settlement-name-example-landscape.oracle.json";
import settlement_name_example_other from "./settlement-name-example-other.oracle.json";
import settlement_name_example_season from "./settlement-name-example-season.oracle.json";
import settlement_name_example_word from "./settlement-name-example-word.oracle.json";
import settlement_name_prefix from "./settlement-name-prefix.oracle.json";
import settlement_name_suffix from "./settlement-name-suffix.oracle.json";
import settlement_name_theme from "./settlement-name-theme.oracle.json";
import settlement_trouble from "./settlement-trouble.oracle.json";
import theme from "./theme.oracle.json";
import troll_names from "./troll-names.oracle.json";
import varou_names from "./varou-names.oracle.json";
import probability_almost_certain from "./probability-almost-certain.json";
import probability_even_chance from "./probability-even-chance.json";
import probability_likely from "./probability-likely.json";
import probability_small_chance from "./probability-small-chance.json";
import probability_unlikely from "./probability-unlikely.json";

const oracleData = [
  action,
  challenge_rank,
  character_descriptor,
  character_goal,
  character_role,
  coastal_waters_location,
  combat_action,
  elf_names,
  giant_names,
  ironlander_names_a,
  ironlander_names_b,
  location_descriptor,
  location,
  major_plot_twist,
  move_advance_a_threat,
  move_delve_the_depths_edge,
  move_delve_the_depths_shadow,
  move_delve_the_depths_wits,
  move_endure_harm,
  move_endure_stress,
  move_find_an_opportunity,
  move_pay_the_price,
  move_reveal_a_danger_alternate_version,
  move_reveal_a_danger,
  mystic_backlash,
  region,
  settlement_name_example_creature,
  settlement_name_example_edifice,
  settlement_name_example_event,
  settlement_name_example_landscape,
  settlement_name_example_other,
  settlement_name_example_season,
  settlement_name_example_word,
  settlement_name_prefix,
  settlement_name_suffix,
  settlement_name_theme,
  settlement_trouble,
  theme,
  troll_names,
  varou_names,
  probability_almost_certain,
  probability_even_chance,
  probability_likely,
  probability_small_chance,
  probability_unlikely,
];

export type OracleRawJSONTableEntry = {
  roll: string;
  result: string;
};
// export type OracleDataList = typeof oracleData;
export type OracleRawJSON = {
  title: string;
  category: string;
  table: OracleRawJSONTableEntry[];
};

export type OracleData = {
  max: number;
  results: any[];
  id: string;
  index: number;
  title: any;
  slug: any;
  category: string;
  table: {
    roll: string;
    result: string;
  }[];
};

export type OracleListing = {
  id: string;
  index: number;
  title: string;
  slug: string;
  category: string;
};

export type OracleRollRange = {
  min: number | undefined;
  max: number | undefined;
};

const oracles = massageData(oracleData);

export default oracles;

function deriveIndex(oracle: OracleRawJSON) {
  const match = oracle.title.match(/ (\d)+: /);
  // TODO: guard against bad data, eg. non-numeric
  return match != null ? parseInt(match?.[1]) : -1;
}

function formatTitle(oracle: OracleRawJSON) {
  // trim the index from the raw title
  const trimmed = oracle.title.replace(/^.*: /, "");
  // convert to title case
  return toTitleCase(trimmed);
}

function createSlug(oracle: OracleRawJSON) {
  // based on https://www.30secondsofcode.org/js/s/slugify
  return formatTitle(oracle)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function convertRollRangeString(rangeStr: string): OracleRollRange {
  const matches = rangeStr.match(/[0-9]+/g);
  // TODO: guard against bad data, eg. non-numeric
  // values of 100 are represented as '00' in the dataset
  const values = matches?.map((match) =>
    match === "00" ? 100 : parseInt(match)
  );
  // if there is only one value, use it for both min and max of the range
  return { min: values?.[0], max: values?.[1] ?? values?.[0] };
}

function convertRollTable(table: OracleRawJSONTableEntry[]) {
  // convert a array of range/result pairs to an array
  // for every range, spread its result over those indices of the array
  // later, we can look up results just using the roll as an index
  // and we can determine the die size needed by the length of the array
  let results: string[] = [];
  table.forEach((row) => {
    const range = convertRollRangeString(row.roll);
    for (let i = range.min ?? 0; i <= (range.max ?? 0); i++) {
      results.push(row.result);
    }
  });
  // we return the max along with the results for easier use in a map call
  return { max: results.length, results };
}

function massageData(oracles: OracleRawJSON[]): OracleData[] {
  return oracles.map((oracle) => ({
    ...oracle,
    id: oracle.title,
    index: deriveIndex(oracle),
    title: formatTitle(oracle),
    slug: createSlug(oracle),
    category: oracle.category,
    ...convertRollTable(oracle.table),
  }));
}

export const getOracleListing = (oracle: OracleData): OracleListing => ({
  id: oracle.id,
  index: oracle.index,
  title: oracle.title,
  slug: oracle.slug,
  category: oracle.category,
});
