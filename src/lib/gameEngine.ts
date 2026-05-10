import { initialNpcStates, playerInitialState } from "@/data/characters";
import type { Choice, GameSession, PlayerState } from "@/lib/types";

export const DEFAULT_PLAYER_STATE: PlayerState = playerInitialState;

const clampValue = (value: number) => Math.min(100, Math.max(0, value));

export function initializeGameSession(mapId: string): GameSession {
  return {
    selectedMapId: mapId,
    currentNodeIndex: 0,
    playerState: { ...DEFAULT_PLAYER_STATE },
    npcStates: initialNpcStates.map((npc) => ({ ...npc })),
    choiceHistory: [],
    latestFeedback: null,
    latestNpcSummary: null,
    finalResult: null,
  };
}

export function applyChoiceEffects(
  currentState: PlayerState,
  effects: Choice["effects"],
): PlayerState {
  return {
    resource: clampValue(currentState.resource + effects.resource),
    trust: clampValue(currentState.trust + effects.trust),
    reputation: clampValue(currentState.reputation + effects.reputation),
    anxiety: clampValue(currentState.anxiety + effects.anxiety),
    boundary: clampValue(currentState.boundary + effects.boundary),
  };
}

export function getNextNodeIndex(currentNodeIndex: number, totalNodes: number): number {
  return Math.min(currentNodeIndex + 1, totalNodes);
}
