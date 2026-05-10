type SituationHintProps = {
  hint: string;
};

export function SituationHint({ hint }: SituationHintProps) {
  return (
    <section className="panel situation-hint">
      <div className="grid-noise" />
      <p className="section-heading">局势提示</p>
      <p>{hint}</p>
    </section>
  );
}
