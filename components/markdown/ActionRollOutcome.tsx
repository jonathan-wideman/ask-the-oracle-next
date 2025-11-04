import { ReactNode } from "react";

export const ActionRollOutcome = ({ children }: { children?: ReactNode }) => (
  <strong className="text-indigo-400">{children}</strong>
);
