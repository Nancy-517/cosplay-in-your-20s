import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    finalState?: Record<string, number>;
    choiceHistory?: { choiceText: string }[];
  };

  const tone =
    payload.finalState && payload.finalState.boundary > 60
      ? "你保住了一部分自己，但也让某些入口在你眼前慢慢合上。"
      : "你换来了更接近结果的位置，也让自己更习惯在现实里压低情绪。";

  return NextResponse.json({
    ok: true,
    summary: tone,
    trace: payload.choiceHistory?.length ?? 0,
  });
}
