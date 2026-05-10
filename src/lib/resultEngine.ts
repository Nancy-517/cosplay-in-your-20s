import { endings } from "@/data/endings";
import type { ChoiceHistoryEntry, Ending, PlayerState } from "@/lib/types";

type EndingRule = {
  id: Ending["id"];
  match: (state: PlayerState, history: ChoiceHistoryEntry[]) => boolean;
};

const endingRules: EndingRule[] = [
  {
    id: "information-operator",
    match: (state) => state.resource >= 70 && state.trust <= 40 && state.boundary <= 48,
  },
  {
    id: "boundary-keeper",
    match: (state) => state.boundary >= 72 && state.reputation >= 54,
  },
  {
    id: "high-pressure-collaborator",
    match: (state) => state.trust >= 62 && state.boundary >= 60,
  },
  {
    id: "silent-observer",
    match: (state) => state.anxiety >= 62 && state.resource <= 45,
  },
  {
    id: "calculated-grace",
    match: (state) =>
      state.resource >= 52 &&
      state.reputation >= 52 &&
      state.trust <= 48 &&
      state.boundary >= 44,
  },
  {
    id: "dignified-winner",
    match: (state, history) =>
      state.resource >= 58 &&
      state.reputation >= 58 &&
      history.some((entry) => entry.choiceText.includes("公开") || entry.choiceText.includes("体面")),
  },
];

export function resolveEnding(state: PlayerState, history: ChoiceHistoryEntry[]) {
  const selected = endingRules.find((rule) => rule.match(state, history));
  const fallback = endings.find((ending) => ending.id === "dignified-winner")!;
  const ending = endings.find((item) => item.id === selected?.id) ?? fallback;

  return {
    ...ending,
    scoreSnapshot: state,
  };
}
