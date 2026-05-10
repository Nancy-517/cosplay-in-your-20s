type ChoiceButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export function ChoiceButton({ text, onClick, disabled = false }: ChoiceButtonProps) {
  return (
    <button className="choice-button" disabled={disabled} type="button" onClick={onClick}>
      <span className="choice-button__index" />
      <span>{text}</span>
    </button>
  );
}
