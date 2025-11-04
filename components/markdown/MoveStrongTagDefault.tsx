import { DetailedHTMLProps, HTMLAttributes } from "react";

export const MoveStrongTagDefault = ({
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <strong className="text-amber-300" {...rest} />
);
