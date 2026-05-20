// 全局游戏状态存储（模块级单例，无需 React Context）
import type { ResourceState, GameDecision } from './gameData';
import { INITIAL_RESOURCES } from './gameData';

interface GameState {
  started: boolean;
  playerName: string;
  wish: string;
  secretGoals: string[];
  resources: ResourceState;
  decisions: GameDecision[];
  currentRound: number;
}

let state: GameState = {
  started: false,
  playerName: '',
  wish: '',
  secretGoals: [],
  resources: { ...INITIAL_RESOURCES },
  decisions: [],
  currentRound: 0,
};

export function getGameState(): Readonly<GameState> {
  return state;
}

export function resetGame() {
  state = {
    started: false,
    playerName: '',
    wish: '',
    secretGoals: [],
    resources: { ...INITIAL_RESOURCES },
    decisions: [],
    currentRound: 0,
  };
}

export function startGame(playerName: string, wish: string, secretGoals: string[]) {
  state = {
    started: true,
    playerName,
    wish,
    secretGoals,
    resources: { ...INITIAL_RESOURCES },
    decisions: [],
    currentRound: 1,
  };
}

export function advanceRound(decision: GameDecision) {
  state.decisions.push(decision);
  state.resources = { ...decision.resourcesAfter };
  state.currentRound += 1;
}

export function getPersonalityLabel(resources: ResourceState, decisions: GameDecision[]): { label: string; desc: string } {
  // 根据决策和资源计算人格标签
  const allyCount = decisions.filter(d => d.actionId === 'ally' || d.actionId === 'support').length;
  const selfishCount = decisions.filter(d => d.actionId === 'seize' || d.actionId === 'reserve').length;
  const infoCount = decisions.filter(d => d.actionId === 'probe' || d.actionId === 'rumor').length;
  const shareCount = decisions.filter(d => d.actionId === 'share' || d.actionId === 'clarify').length;

  if (infoCount >= 3) {
    return { label: '信息控制者', desc: '你擅长掌握信息的分发权，在博弈中始终保持主动权。你明白信息就是力量，但有时会因此错过真诚的连接。' };
  }
  if (shareCount >= 3 && selfishCount >= 2) {
    return { label: '表面合作者', desc: '你懂得在人群中维持和谐的面具，即便内心有自己的盘算。合作是你的策略，而非本能。' };
  }
  if (allyCount >= 3) {
    return { label: '真实同行者', desc: '你相信人与人之间存在真实的信任，愿意为此承担风险。在零和博弈中，你的选择显得尤为珍贵。' };
  }
  if (selfishCount >= 3) {
    return { label: '孤狼策略家', desc: '你习惯独立作战，不依赖他人的善意。你的自我保护能力极强，但或许也错过了一些温暖的瞬间。' };
  }
  if (resources.reputation >= 50 && resources.trustMarks >= 3) {
    return { label: '利他主义者', desc: '你倾向于先考虑他人的利益，即便这意味着自己的损失。你的善意是真实的，但代价也不容忽视。' };
  }
  if (resources.opportunityPoints >= 3) {
    return { label: '机会主义者', desc: '你对机会的嗅觉异常敏锐，善于在混乱中寻找突破口。短期来看你总能获利，但长期信任需要重建。' };
  }

  return { label: '平衡探索者', desc: '你在这场博弈中尝试了多种策略，没有固定的模式。这种灵活性是你的优势，也是你的困惑来源。' };
}

export function getEndingType(resources: ResourceState, decisions: GameDecision[]) {
  const won = resources.opportunityPoints >= 2;
  const hasTrust = resources.trustMarks >= 3 && resources.reputation >= 50;
  if (won && hasTrust) return 'win-trust';
  if (won && !hasTrust) return 'win-alone';
  if (!won && hasTrust) return 'lose-trust';
  return 'lose-alone';
}
