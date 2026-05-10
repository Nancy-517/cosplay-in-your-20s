import type { PlayerState } from "@/lib/types";

type StatusBarProps = {
  state: PlayerState;
  previousState?: PlayerState | null;
};

const items = [
  { key: "resource", label: "资源", color: "var(--signal)" },
  { key: "trust", label: "信任", color: "var(--trust)" },
  { key: "reputation", label: "声望", color: "var(--accent)" },
  { key: "anxiety", label: "焦虑", color: "var(--pressure)" },
  { key: "boundary", label: "边界", color: "var(--risk)" },
] as const;

export function StatusBar({ state, previousState = null }: StatusBarProps) {
  return (
    <div className="status-grid">
      {items.map((item) => {
        const value = state[item.key];
        const previousValue = previousState ? previousState[item.key] : value;
        const delta = value - previousValue;
        const alertState =
          item.key === "anxiety" && value >= 75
            ? "warning"
            : item.key === "boundary" && value <= 30
              ? "danger"
              : item.key === "resource" && value >= 70
                ? "signal"
                : "normal";

        return (
          <div
            key={item.key}
            className="panel status-card"
            data-alert={alertState}
            data-changed={delta !== 0 ? "true" : "false"}
          >
            <div className="status-card__header">
              <span>{item.label}</span>
              <div className="status-card__value-group">
                {delta !== 0 ? (
                  <em data-positive={delta > 0 ? "true" : "false"}>
                    {delta > 0 ? `+${delta}` : delta}
                  </em>
                ) : null}
                <strong>{value}</strong>
              </div>
            </div>
            <div className="status-card__track" aria-hidden="true">
              <span style={{ width: `${value}%`, background: item.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
