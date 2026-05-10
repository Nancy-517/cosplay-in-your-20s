import { getEffectDeltas } from "@/lib/presentation";
import type { Choice, NPCState } from "@/lib/types";

type ChoiceConsequenceModalProps = {
  choice: Choice;
  npcStates: NPCState[];
  onContinue: () => void;
  isFinalNode: boolean;
  disabled?: boolean;
};

export function ChoiceConsequenceModal({
  choice,
  npcStates,
  onContinue,
  isFinalNode,
  disabled = false,
}: ChoiceConsequenceModalProps) {
  const deltas = getEffectDeltas(choice);

  return (
    <div className="consequence-backdrop" role="dialog" aria-modal="true" aria-labelledby="choice-consequence-title">
      <div className="panel consequence-modal">
        <div className="grid-noise" />
        <p className="section-heading">选择后果浮层</p>
        <h2 id="choice-consequence-title">{choice.text}</h2>
        <p className="consequence-modal__feedback">{choice.feedback}</p>

        <section className="consequence-modal__section">
          <h3>五维变化</h3>
          <div className="consequence-modal__deltas">
            {deltas.map((delta) => (
              <div key={delta.key} className="consequence-modal__delta">
                <span>{delta.label}</span>
                <strong data-positive={delta.value > 0 ? "true" : "false"}>
                  {delta.value > 0 ? `+${delta.value}` : delta.value}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className="consequence-modal__section">
          <h3>NPC 当前反应</h3>
          <div className="consequence-modal__npc-list">
            {npcStates.map((npc) => (
              <article key={npc.id}>
                <strong>{npc.name}</strong>
                <p>{npc.currentMove}</p>
              </article>
            ))}
          </div>
        </section>

        <button className="cta-button consequence-modal__button" disabled={disabled} type="button" onClick={onContinue}>
          {isFinalNode ? "进入最终结算" : "继续推进"}
        </button>
      </div>
    </div>
  );
}
