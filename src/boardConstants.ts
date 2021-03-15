import { Board } from "./types/BoardType";

const canvasWidth: number = 450;
const canvasHeight: number = 600;
const min: number = 0;
const sizeOfSingleField: number = 50;

const board: Board = { canvasHeight, canvasWidth, sizeOfSingleField, canvasMinHeight: min, canvasMinWidth: min };

export default board;
