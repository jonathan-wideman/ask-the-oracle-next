import action from './action.oracle.json'
import challenge_rank from './challenge-rank.oracle.json'
import character_descriptor from './character-descriptor.oracle.json'
import character_goal from './character-goal.oracle.json'
import character_role from './character-role.oracle.json'
import coastal_waters_location from './coastal-waters-location.oracle.json'
import combat_action from './combat-action.oracle.json'
import elf_names from './elf-names.oracle.json'
import ironlander_names_a from './ironlander-names-a.oracle.json'
import ironlander_names_b from './ironlander-names-b.oracle.json'
import location_descriptor from './location-descriptor.oracle.json'
import location from './location.oracle.json'
import major_plot_twist from './major-plot-twist.oracle.json'
import mystic_backlash from './mystic-backlash.oracle.json'
import region from './region.oracle.json'
import settlement_trouble from './settlement-trouble.oracle.json'
import theme from './theme.oracle.json'

const oracleData = [
  action,
  challenge_rank,
  character_descriptor,
  character_goal,
  character_role,
  coastal_waters_location,
  combat_action,
  elf_names,
  ironlander_names_a,
  ironlander_names_b,
  location_descriptor,
  location,
  major_plot_twist,
  mystic_backlash,
  region,
  settlement_trouble,
  theme,
]

const oracles = massageData(oracleData)

export default oracles


function deriveIndex(oracle) {
  const match = oracle.title.match(/ (\d)+: /)
  // should guard against bad data, eg. non-numeric
  return match != null ? parseInt(match?.[2]) : -1
}

function formatTitle(oracle) {
  // trim the index from the raw title
  const trimmed = oracle.title.replace(/^.*: /, '')
  // convert to title case
  // based on https://www.w3docs.com/snippets/javascript/how-to-convert-string-to-title-case-with-javascript.html
  return trimmed.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

function createSlug(oracle) {
  // based on https://www.30secondsofcode.org/js/s/slugify
  return formatTitle(oracle).toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function massageData(oracles) {
  return oracles.map(oracle => ({
    ...oracle,
    id: oracle.title,
    index: deriveIndex(oracle),
    title: formatTitle(oracle),
    slug: createSlug(oracle)
  }))
}