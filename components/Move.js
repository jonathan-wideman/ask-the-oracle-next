import { useState } from "react";
import Markdown from "react-markdown";
import { MoveCodeTagDefault } from "./markdown/MoveCodeTagDefault";
import { MoveEmTagDefault } from "./markdown/MoveEmTagDefault";
import { MoveEmTagMoveLink } from "./markdown/MoveEmTagMoveLink";
import { MoveStrongTagDefault } from "./markdown/MoveStrongTagDefault";
import { classNames, styleAnimationDelay } from "../lib/util";
import { customMarkdownComponentMatchers } from "../lib/customMarkdownComponentMatchers";

export function Move({ move, index, allMoveNames, oracles }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        className={classNames("mb-4 text-lg font-bold", "fadein")}
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
        <div className="text-base text-left">
          <Markdown
            components={{
              em: ({ node, ...rest }) => {
                const isMoveName = allMoveNames.includes(rest.children);
                return isMoveName ? (
                  <MoveEmTagMoveLink {...rest} />
                ) : (
                  <MoveEmTagDefault {...rest} />
                );
              },
              strong: ({ node, ...rest }) => {
                const matches = customMarkdownComponentMatchers.strong.filter(
                  (rule) => rule.regex.test(rest.children)
                );
                const replacementComponent = matches[0]?.component;
                if (replacementComponent) {
                  return replacementComponent(rest);
                }
                return <MoveStrongTagDefault {...rest} />;
              },
              code({ node, ...rest }) {
                const matches = customMarkdownComponentMatchers.code.filter(
                  (rule) => rule.regex.test(rest.children)
                );
                const replacementComponent = matches[0]?.component;
                if (replacementComponent) {
                  return replacementComponent({ ...rest, oracles });
                }
                return <MoveCodeTagDefault {...rest} />;
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
