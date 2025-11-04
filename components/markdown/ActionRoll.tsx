import { ReactNode } from "react";

export const ActionRoll = ({ children }: { children?: ReactNode }) => (
  <span className="font-code text-indigo-400 font-bold">
    {(children as string).slice(1)}
  </span>
);
