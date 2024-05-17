export const Clue = {
    Green: "g",
    Yellow: "y",
    Grey: "x",
} as const;

export type ClueValues = (typeof Clue)[keyof typeof Clue];
