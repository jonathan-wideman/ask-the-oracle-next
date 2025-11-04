import { useState } from "react";
import Markdown from "react-markdown";
import { MoveCodeTagDefault } from "./markdown/MoveCodeTagDefault";
import { MoveEmTagDefault } from "./markdown/MoveEmTagDefault";
import { MoveEmTagMoveLink } from "./markdown/MoveEmTagMoveLink";
import { MoveStrongTagDefault } from "./markdown/MoveStrongTagDefault";
import { classNames, styleAnimationDelay } from "../lib/util";
import { customMarkdownComponentMatchers } from "../lib/customMarkdownComponentMatchers";
import { OracleData } from "../data/oracles";

export function Move({
  move,
  index,
  allMoveNames,
  oracles,
}: {
  move: any;
  index: number;
  allMoveNames: string[];
  oracles: OracleData[];
}) {
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
        <div className="font-code text-indigo-400 text-base font-bold">
          Progress Move
        </div>
      )}
      {open && (
        <div className="text-base text-left font-normal">
          <Markdown
            components={{
              em: ({ node, ...rest }) => {
                const isMoveName = allMoveNames.includes(rest.children as string);
                return isMoveName ? (
                  <MoveEmTagMoveLink {...rest} />
                ) : (
                  <MoveEmTagDefault {...rest} />
                );
              },
              strong: ({ node, ...rest }) => {
                const matches = customMarkdownComponentMatchers.strong.filter(
                  (rule) => rule.regex.test(rest.children as string)
                );
                const replacementComponent = matches[0]?.component;
                if (replacementComponent) {
                  return replacementComponent(rest);
                }
                return <MoveStrongTagDefault {...rest} />;
              },
              code({ node, ...rest }) {
                const matches = customMarkdownComponentMatchers.code.filter(
                  (rule) => rule.regex.test(rest.children as string)
                );
                const replacementComponent = matches[0]?.component;
                if (replacementComponent) {
                  return replacementComponent({ ...rest, oracles });
                }
                return <MoveCodeTagDefault {...rest} />;
              },
              p({ node, ...rest }) {
                return <p className="my-1" {...rest} />;
              },
              ul({ node, ...rest }) {
                return (
                  <ul className="list-['·'] list-outside ps-2">
                    {rest.children}
                  </ul>
                );
              },
              li({ node, ...rest }) {
                return <li className="ps-2" {...rest} />;
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
