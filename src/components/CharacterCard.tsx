import type { NPCState } from "@/lib/types";

type CharacterCardProps = {
  name: string;
  role: string;
  motivation: string;
  relationLabel?: string;
  actionStyle?: string;
  npc?: NPCState;
};

export function CharacterCard({
  name,
  role,
  motivation,
  relationLabel,
  actionStyle,
  npc,
}: CharacterCardProps) {
  return (
    <article className="panel character-card">
      <div className="grid-noise" />
      <p className="character-card__eyebrow">{npc ? "非玩家角色" : "玩家视角"}</p>
      <h3>{name}</h3>
      <p className="character-card__role">{role}</p>
      <p className="character-card__motivation">{motivation}</p>
      {relationLabel ? <p className="character-card__relation">{relationLabel}</p> : null}
      {actionStyle ? <p className="character-card__style">{actionStyle}</p> : null}
      {npc ? (
        <div className="character-card__meta">
          <span>当前态度 {npc.attitudeToPlayer}</span>
          <span>{npc.currentMove}</span>
        </div>
      ) : null}
    </article>
  );
}
