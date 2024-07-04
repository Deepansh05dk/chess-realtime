export enum Result {
  WHITE_WINS = "WHITE_WINS",
  BLACK_WINS = "BLACK_WINS",
  DRAW = "DRAW",
}
export interface GameResult {
  result: Result;
  by: string;
}
