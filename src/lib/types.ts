export type PlayerState = {
  resource: number;
  trust: number;
  reputation: number;
  anxiety: number;
  boundary: number;
};

export type NPCState = {
  id: string;
  name: string;
  role: string;
  relationLabel?: string;
  motivation: string;
  actionStyle?: string;
  attitudeToPlayer: number;
  currentMove: string;
};

export type Choice = {
  id: string;
  text: string;
  feedback: string;
  effects: PlayerState;
  npcImpact: Record<string, string>;
};

export type StoryNode = {
  id: string;
  title: string;
  sceneText: string;
  pressureNote: string;
  choices: Choice[];
};

export type Ending = {
  id: string;
  endingName: string;
  personalityTag: string;
  relationshipSummary: string;
  hiddenCost: string;
  parallelLifeLine: string;
};

export type MapMeta = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "playable" | "coming-soon";
  intensity: string;
};

export type ChoiceHistoryEntry = {
  nodeId: string;
  nodeTitle: string;
  choiceId: string;
  choiceText: string;
};

export type FinalResult = Ending & {
  scoreSnapshot: PlayerState;
};

export type GameSession = {
  selectedMapId: string;
  currentNodeIndex: number;
  playerState: PlayerState;
  npcStates: NPCState[];
  choiceHistory: ChoiceHistoryEntry[];
  latestFeedback: string | null;
  latestNpcSummary: string | null;
  finalResult: FinalResult | null;
};
