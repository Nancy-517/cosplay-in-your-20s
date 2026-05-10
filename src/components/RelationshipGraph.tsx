import type { NPCState } from "@/lib/types";

type RelationshipGraphProps = {
  npcStates: NPCState[];
  pulseKey: number;
};

function getLinkTone(value: number) {
  if (value >= 70) {
    return "#78f0c2";
  }
  if (value >= 40) {
    return "#7f97c2";
  }
  if (value >= 20) {
    return "#f5a15f";
  }
  return "#f06a76";
}

function getLinkWidth(value: number) {
  if (value >= 70) return 4;
  if (value >= 40) return 3;
  if (value >= 20) return 2.5;
  return 2;
}

const positions: Record<string, { x: number; y: number }> = {
  allyA: { x: 96, y: 48 },
  rivalB: { x: 306, y: 70 },
  brokerC: { x: 72, y: 240 },
  seniorD: { x: 320, y: 250 },
};

export function RelationshipGraph({ npcStates, pulseKey }: RelationshipGraphProps) {
  return (
    <section className="panel relationship-graph">
      <div className="grid-noise" />
      <p className="section-heading">Relationship Graph</p>
      <div className="relationship-graph__canvas" data-pulse={pulseKey}>
        <svg viewBox="0 0 400 320" aria-hidden="true">
          {npcStates.map((npc) => {
            const point = positions[npc.id];
            const tone = getLinkTone(npc.attitudeToPlayer);
            const strokeWidth = getLinkWidth(npc.attitudeToPlayer);

            return (
              <g key={npc.id}>
                <line
                  x1="200"
                  y1="156"
                  x2={point.x}
                  y2={point.y}
                  stroke={tone}
                  strokeOpacity="0.75"
                  strokeWidth={strokeWidth}
                />
                <circle cx={point.x} cy={point.y} fill={tone} fillOpacity="0.12" r="28" />
                <circle cx={point.x} cy={point.y} fill={tone} fillOpacity="0.95" r="4" />
              </g>
            );
          })}
          <circle cx="200" cy="156" fill="rgba(214, 228, 255, 0.18)" r="44" />
          <circle cx="200" cy="156" fill="#d6e4ff" fillOpacity="0.96" r="6" />
        </svg>
        <div className="relationship-graph__you">你</div>
        {npcStates.map((npc) => {
          const point = positions[npc.id];
          return (
            <div
              key={npc.id}
              className="relationship-graph__node"
              style={{ left: `${point.x}px`, top: `${point.y}px` }}
            >
              <strong>{npc.name}</strong>
              <span>{npc.relationLabel ?? npc.role}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
