import { ActionRoll } from "../components/markdown/ActionRoll";
import { ActionRollOutcome } from "../components/markdown/ActionRollOutcome";
import { MoveOracle } from "../components/markdown/MoveOracle";
import { Progress } from "../components/markdown/Progress";

export const customMarkdownComponentMatchers = {
  // Custom components per markdown tag,
  // with regex to match text within that tag
  code: [
    {
      regex: /^◈.*$/,
      component: ActionRoll,
    },
    {
      regex: /^\d (progress|tick|ticks)$/,
      component: Progress,
    },
    {
      regex: /^ORACLE:.*$/,
      component: MoveOracle,
    },
  ],
  strong: [
    {
      regex: /^(strong hit|weak hit|miss|any result with 6|hit with 5|miss with 1)$/,
      component: ActionRollOutcome,
    },
  ],
};
