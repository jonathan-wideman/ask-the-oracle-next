import { DetailedHTMLProps, HTMLAttributes } from "react";

export const MoveCodeTagDefault = ({
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <span className="font-code text-indigo-400 font-bold" {...rest} />
);
