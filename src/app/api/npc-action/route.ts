import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    nodeId?: string;
    choiceId?: string;
    playerState?: Record<string, number>;
    npcStates?: { name: string; currentMove: string }[];
  };

  const summary = payload.npcStates?.map((npc) => `${npc.name}已调整姿态：${npc.currentMove}`).join(" / ");

  return NextResponse.json({
    ok: true,
    nodeId: payload.nodeId,
    choiceId: payload.choiceId,
    summary:
      summary ??
      "其他角色没有离场，只是在重新判断你是否值得被合作、提防，或利用。",
  });
}
