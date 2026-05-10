import type { NPCState } from "@/lib/types";

type RelationshipPanelProps = {
  npcStates: NPCState[];
};

export function RelationshipPanel({ npcStates }: RelationshipPanelProps) {
  return (
    <section className="panel relationship-panel">
      <div className="grid-noise" />
      <p className="section-heading">本轮行动 Timeline</p>
      <div className="relationship-panel__list relationship-panel__list--timeline">
        {npcStates.map((npc) => (
          <article key={npc.id} className="relationship-panel__item">
            <header>
              <strong>{npc.name}</strong>
              <span>态度 {npc.attitudeToPlayer}</span>
            </header>
            <p>{npc.currentMove}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
