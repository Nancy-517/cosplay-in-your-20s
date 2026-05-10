import type { Choice, NPCState, PlayerState } from "@/lib/types";

export type EffectDeltaItem = {
  key: keyof PlayerState;
  label: string;
  value: number;
};

const effectLabels: Record<keyof PlayerState, string> = {
  resource: "资源",
  trust: "信任",
  reputation: "声望",
  anxiety: "焦虑",
  boundary: "边界",
};

export function getChoicePreview(feedback: string) {
  const snippet = feedback.split("。").slice(0, 2).join("。").trim();
  return snippet.endsWith("。") ? snippet : `${snippet}。`;
}

export function getChoiceRiskTags(choice: Choice) {
  const tags: string[] = [];

  if (choice.effects.resource >= 8) tags.push("资源收益");
  if (choice.effects.trust <= -8) tags.push("信任风险");
  if (choice.effects.boundary <= -8) tags.push("边界代价");
  if (choice.effects.anxiety >= 8) tags.push("压力上升");
  if (choice.effects.reputation >= 8) tags.push("声望收益");

  if (tags.length === 0) {
    tags.push("关系微调");
  }

  return tags.slice(0, 3);
}

export function getEffectDeltas(choice: Choice): EffectDeltaItem[] {
  return Object.entries(choice.effects)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => ({
      key: key as keyof PlayerState,
      label: effectLabels[key as keyof PlayerState],
      value,
    }));
}

export function getSituationHint(playerState: PlayerState, npcStates: NPCState[]) {
  const rival = npcStates.find((npc) => npc.id === "rivalB");
  const ally = npcStates.find((npc) => npc.id === "allyA");

  if (playerState.anxiety >= 72) {
    return "局势提示：你的焦虑已经开始吞噬判断，任何模糊信息都会被放大成新的压力。";
  }

  if (playerState.resource >= 70 && playerState.trust <= 42) {
    return "局势提示：你手里的资源在上升，但关系正在变薄，别人开始把你当成更难靠近的人。";
  }

  if (playerState.boundary <= 30) {
    return "局势提示：你正在用自己去换确定性，短期看像推进，长期看可能会留下更深的耗损。";
  }

  if (ally && ally.attitudeToPlayer >= 62) {
    return `局势提示：你和${ally.name}的联盟正在回温，但这份回温仍旧带着条件。`;
  }

  if (rival && rival.attitudeToPlayer <= 24) {
    return `局势提示：${rival.name}已经把你视为需要重点防备的对象，后续动作只会更快。`;
  }

  return "局势提示：局面还没有失控，但每一步都在重新定义别人怎么看你，以及你怎么看自己。";
}
