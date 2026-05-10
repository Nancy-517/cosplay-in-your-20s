const phases = [
  "正在回收你的选择记录...",
  "正在重建关系网络...",
  "正在计算隐藏代价...",
  "正在生成平行人生...",
];

type SettlementLoadingProps = {
  phaseIndex: number;
};

export function SettlementLoading({ phaseIndex }: SettlementLoadingProps) {
  const progress = ((phaseIndex + 1) / phases.length) * 100;

  return (
    <section className="panel settlement-loading" aria-live="polite">
      <div className="grid-noise" />
      <p className="section-heading">Final Settlement</p>
      <h2>最终结算生成中</h2>
      <div className="settlement-loading__bar" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="settlement-loading__phases">
        {phases.map((phase, index) => (
          <p key={phase} data-active={index === phaseIndex ? "true" : "false"}>
            {phase}
          </p>
        ))}
      </div>
      <div className="settlement-loading__replay" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
