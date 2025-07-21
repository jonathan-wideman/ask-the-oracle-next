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
];

const oracles = massageData(oracleData);

export default oracles;

function deriveIndex(oracle) {
  const match = oracle.title.match(/ (\d)+: /);
  // TODO: guard against bad data, eg. non-numeric
  return match != null ? parseInt(match?.[1]) : -1;
}

function formatTitle(oracle) {
  // trim the index from the raw title
  const trimmed = oracle.title.replace(/^.*: /, "");
  // convert to title case
  return toTitleCase(trimmed);
}

function createSlug(oracle) {
  // based on https://www.30secondsofcode.org/js/s/slugify
  return formatTitle(oracle)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function convertRollRangeString(rangeStr) {
  const matches = rangeStr.match(/[0-9]+/g);
  // TODO: guard against bad data, eg. non-numeric
  // values of 100 are represented as '00' in the dataset
  const values = matches.map((match) =>
    match === "00" ? 100 : parseInt(match)
  );
  // if there is only one value, use it for both min and max of the range
  return { min: values[0], max: values[1] ?? values[0] };
}

function convertRollTable(table) {
  // convert a array of range/result pairs to an array
  // for every range, spread its result over those indices of the array
  // later, we can look up results just using the roll as an index
  // and we can determine the die size needed by the length of the array
  let results = [];
  table.forEach((row) => {
    const range = convertRollRangeString(row.roll);
    for (let i = range.min; i <= range.max; i++) {
      results.push(row.result);
    }
  });
  // we return the max along with the results for easier use in a map call
  return { max: results.length, results };
}

function massageData(oracles) {
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
