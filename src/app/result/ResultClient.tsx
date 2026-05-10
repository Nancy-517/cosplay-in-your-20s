"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RelationshipGraph } from "@/components/RelationshipGraph";
import { ResultCard } from "@/components/ResultCard";
import { RelationshipPanel } from "@/components/RelationshipPanel";
import { SettlementLoading } from "@/components/SettlementLoading";
import { SituationHint } from "@/components/SituationHint";
import { getSituationHint } from "@/lib/presentation";
import { clearSession, createFreshSession, readSession, writeSession } from "@/lib/session";
import type { GameSession } from "@/lib/types";

const feedbackUrl =
  process.env.NEXT_PUBLIC_FEEDBACK_URL ||
  "https://ucnaluyl2vsy.feishu.cn/share/base/form/shrcnw4PaYkf8SliYDpnM34XCuf";

export function ResultClient() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const stored = readSession();

    if (!stored?.finalResult) {
      router.replace("/maps");
      return;
    }

    setSession(stored);
  }, [router]);

  useEffect(() => {
    if (!session?.finalResult) {
      return;
    }

    const phaseTimers = [0, 850, 1700, 2550].map((delay, index) =>
      window.setTimeout(() => setPhaseIndex(index), delay),
    );
    const revealTimer = window.setTimeout(() => setShowResult(true), 3300);

    return () => {
      phaseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(revealTimer);
    };
  }, [session]);

  useEffect(() => {
    if (!showResult) {
      return;
    }

    const timers = [0, 220, 420, 640, 860, 1080].map((delay, index) =>
      window.setTimeout(() => setRevealStep(index), delay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [showResult]);

  const handleRestart = () => {
    clearSession();
    const fresh = createFreshSession();
    writeSession(fresh);
    router.push("/play");
  };

  if (!session?.finalResult) {
    return (
      <main className="page-frame">
        <div className="app-shell result-page">
          <section className="panel play-page__loading">
            <p className="section-heading">Redirecting</p>
            <p>没有找到完整结局，正在带你回到地图入口。</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page-frame">
      <div className="app-shell result-page">
        <section className="result-page__header">
          <div>
            <span className="eyebrow">Final Debrief</span>
            <h1 className="page-title result-page__title">What This Cost You</h1>
            <p className="page-subtitle">
              结果页不是结束，而是这一路所有取舍在你身上留下来的样子。
            </p>
          </div>
          <div className="result-page__actions">
            <button className="cta-button" type="button" onClick={handleRestart}>
              重新开始
            </button>
            <Link className="ghost-button" href={feedbackUrl} target="_blank">
              提交反馈
            </Link>
          </div>
        </section>

        <div className="result-layout">
          <div className="result-layout__main">
            {!showResult ? <SettlementLoading phaseIndex={phaseIndex} /> : null}
            {showResult ? <ResultCard result={session.finalResult} revealStep={revealStep} /> : null}
          </div>
          <aside className="result-layout__side">
            <RelationshipGraph npcStates={session.npcStates} pulseKey={revealStep} />
            <RelationshipPanel npcStates={session.npcStates} />
            <SituationHint hint={getSituationHint(session.finalResult.scoreSnapshot, session.npcStates)} />
          </aside>
        </div>
      </div>
    </main>
  );
}
