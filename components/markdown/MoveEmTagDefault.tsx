import { DetailedHTMLProps, HTMLAttributes } from "react";

export const MoveEmTagDefault = ({
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <em {...rest} />
);
