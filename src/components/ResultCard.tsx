import type { FinalResult } from "@/lib/types";

type ResultCardProps = {
  result: FinalResult;
  revealStep: number;
};

const resultSections = [
  { key: "endingName", label: "结局名称" },
  { key: "personalityTag", label: "人格标签" },
  { key: "relationshipSummary", label: "关系结算" },
  { key: "hiddenCost", label: "隐藏代价" },
  { key: "parallelLifeLine", label: "平行人生" },
] as const;

export function ResultCard({ result, revealStep }: ResultCardProps) {
  return (
    <article className="panel result-card">
      <div className="grid-noise" />
      <p className="section-heading" data-visible={revealStep >= 0 ? "true" : "false"}>
        最终结算
      </p>
      <div className="result-card__items">
        {resultSections.map((section, index) => (
          <section key={section.key} data-visible={revealStep >= index + 1 ? "true" : "false"}>
            <h3>{section.label}</h3>
            {section.key === "endingName" ? <h2>{result.endingName}</h2> : null}
            {section.key !== "endingName" ? <p>{result[section.key]}</p> : null}
          </section>
        ))}
      </div>
    </article>
  );
}
