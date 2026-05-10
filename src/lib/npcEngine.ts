import type { Choice, NPCState } from "@/lib/types";

const attitudeAdjustments: Record<string, number> = {
  allyA: 6,
  rivalB: -4,
  brokerC: 3,
  seniorD: 2,
};

const clampAttitude = (value: number) => Math.min(100, Math.max(0, value));

export function updateNpcStates(currentStates: NPCState[], choice: Choice): NPCState[] {
  return currentStates.map((npc) => {
    const impactText = choice.npcImpact[npc.id] ?? npc.currentMove;
    const delta = attitudeAdjustments[npc.id] ?? 0;
    const direction = impactText.includes("警惕") || impactText.includes("防御") || impactText.includes("距离")
      ? -Math.abs(delta)
      : delta;

    return {
      ...npc,
      currentMove: impactText,
      attitudeToPlayer: clampAttitude(npc.attitudeToPlayer + direction),
    };
  });
}

export function summarizeNpcMoves(npcStates: NPCState[]): string {
  const segments = npcStates.map((npc) => `${npc.name}：${npc.currentMove}`);
  return segments.join(" / ");
}
