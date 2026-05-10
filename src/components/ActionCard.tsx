import { getChoicePreview, getChoiceRiskTags } from "@/lib/presentation";
import type { Choice } from "@/lib/types";

type ActionCardProps = {
  choice: Choice;
  disabled?: boolean;
  onSelect: () => void;
};

export function ActionCard({ choice, disabled = false, onSelect }: ActionCardProps) {
  const tags = getChoiceRiskTags(choice);

  return (
    <button
      className="action-card"
      disabled={disabled}
      type="button"
      onClick={onSelect}
      aria-label={`选择行动：${choice.text}`}
    >
      <div className="action-card__top">
        <p className="action-card__label">行动方案</p>
        <span className="action-card__dot" aria-hidden="true" />
      </div>
      <h3>{choice.text}</h3>
      <p className="action-card__preview">{getChoicePreview(choice.feedback)}</p>
      <div className="action-card__tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </button>
  );
}
