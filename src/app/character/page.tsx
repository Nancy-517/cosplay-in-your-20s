import Link from "next/link";
import { CharacterCard } from "@/components/CharacterCard";
import { initialNpcStates, playerRole } from "@/data/characters";
import { playableMap } from "@/data/maps";

export default function CharacterPage() {
  return (
    <main className="page-frame">
      <div className="app-shell character-page">
        <section className="character-page__hero">
          <div>
            <span className="eyebrow">Character Briefing</span>
            <h1 className="page-title">Before You Enter The Room</h1>
            <p className="page-subtitle">
              {playableMap.description} 在真正开始做选择前，先看清局里都有哪些人，以及他们为什么不会只是背景板。
            </p>
          </div>
          <div className="character-page__actions">
            <Link className="ghost-button" href="/maps">
              返回地图
            </Link>
            <Link className="cta-button" href="/play">
              开始进入剧情
            </Link>
          </div>
        </section>

        <section className="character-grid">
          <CharacterCard
            name={playerRole.title}
            role={playerRole.identity}
            motivation={playerRole.description}
            relationLabel={playerRole.publicGoal}
            actionStyle={playerRole.hiddenPressure}
          />
          {initialNpcStates.map((npc) => (
            <CharacterCard
              key={npc.id}
              name={npc.name}
              role={npc.role}
              motivation={npc.motivation}
              relationLabel={npc.relationLabel}
              actionStyle={npc.actionStyle}
              npc={npc}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
