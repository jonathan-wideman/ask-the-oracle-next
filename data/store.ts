import oracles from "./oracles";
import moves from "./moves/moves.json";

export type MoveData = {
  name: string;
  category: string;
  source: string;
  rules: string;
  progress: boolean | undefined;
};

const store = {
  oracles,
  moves: moves as MoveData[],
};

export default store;
