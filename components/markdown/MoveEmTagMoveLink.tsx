import { DetailedHTMLProps, HTMLAttributes } from "react";

export const MoveEmTagMoveLink = ({
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <em className="text-amber-300" {...rest} />
);
