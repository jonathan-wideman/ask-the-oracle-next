import { ReactNode } from "react";

export const Progress = ({ children }: { children?: ReactNode }) => (
  <span className="font-code text-indigo-400 font-bold">{children}</span>
);
