export const ActionRoll = ({ children }) => (
  <span
    className="font-code"
    style={{
      color: "cornflowerblue",
      fontWeight: "bold",
    }}
  >
    {children.slice(1)}
  </span>
);
