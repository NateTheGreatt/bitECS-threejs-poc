import { pipe } from "bitecs";
import { movementSystem } from "./system/movement";
import { renderSystem } from "./system/render";
import { timeSystem } from "./system/time";

export const pipeline = pipe(
  timeSystem,
  movementSystem,
  renderSystem,
)