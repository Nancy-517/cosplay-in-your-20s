"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ActionCard } from "@/components/ActionCard";
import { ChoiceConsequenceModal } from "@/components/ChoiceConsequenceModal";
import { RelationshipPanel } from "@/components/RelationshipPanel";
import { RelationshipGraph } from "@/components/RelationshipGraph";
import { SceneFrame } from "@/components/SceneFrame";
import { StatusBar } from "@/components/StatusBar";
import { SituationHint } from "@/components/SituationHint";
import { baoyanStory } from "@/data/baoyanStory";
import { playableMap } from "@/data/maps";
import { applyChoiceEffects, getNextNodeIndex } from "@/lib/gameEngine";
import { updateNpcStates } from "@/lib/npcEngine";
import { getSituationHint } from "@/lib/presentation";
import { resolveEnding } from "@/lib/resultEngine";
import { createFreshSession, readSession, writeSession } from "@/lib/session";
import type { Choice, GameSession, PlayerState } from "@/lib/types";

export function PlayClient() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);
  const [pendingChoice, setPendingChoice] = useState<Choice | null>(null);
  const [previousPlayerState, setPreviousPlayerState] = useState<PlayerState | null>(null);
  const [graphPulseKey, setGraphPulseKey] = useState(0);
  const [isPending, startTransition] = useTransition();
  const consequenceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = readSession();
    const prepared = stored ?? createFreshSession();
    writeSession(prepared);
    setSession(prepared);
  }, []);

  const currentNode = useMemo(() => {
    if (!session) {
      return null;
    }

    return baoyanStory[session.currentNodeIndex] ?? null;
  }, [session]);

  const handleChoice = async (choice: Choice) => {
    if (!session || pendingChoice) {
      return;
    }

    const nextPlayerState = applyChoiceEffects(session.playerState, choice.effects);
    const npcStates = updateNpcStates(session.npcStates, choice);

    const response = await fetch("/api/npc-action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nodeId: currentNode?.id,
        choiceId: choice.id,
        playerState: nextPlayerState,
        npcStates,
      }),
    });

    const npcPayload = (await response.json()) as { summary: string };

    setPreviousPlayerState(session.playerState);
    const nextSession: GameSession = {
      ...session,
      playerState: nextPlayerState,
      npcStates,
      latestFeedback: choice.feedback,
      latestNpcSummary: npcPayload.summary,
      choiceHistory: currentNode
        ? [
            ...session.choiceHistory,
            {
              nodeId: currentNode.id,
              nodeTitle: currentNode.title,
              choiceId: choice.id,
              choiceText: choice.text,
            },
          ]
        : session.choiceHistory,
    };

    setPendingChoice(choice);
    setSession(nextSession);
    setGraphPulseKey((value) => value + 1);
    writeSession(nextSession);
  };

  useEffect(() => {
    if (pendingChoice && consequenceRef.current) {
      consequenceRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pendingChoice]);

  const continueFlow = async () => {
    if (!session) {
      return;
    }

    const nextIndex = getNextNodeIndex(session.currentNodeIndex, baoyanStory.length);

    if (nextIndex >= baoyanStory.length) {
      const finalResult = resolveEnding(session.playerState, session.choiceHistory);

      const response = await fetch("/api/ai-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          finalState: session.playerState,
          npcStates: session.npcStates,
          choiceHistory: session.choiceHistory,
        }),
      });

      const payload = (await response.json()) as { summary?: string };

      const mergedResult = {
        ...finalResult,
        hiddenCost: payload.summary ?? finalResult.hiddenCost,
      };

      const finishedSession: GameSession = {
        ...session,
        finalResult: mergedResult,
      };

      writeSession(finishedSession);
      setSession(finishedSession);
      startTransition(() => router.push("/result"));
      return;
    }

    const advancedSession: GameSession = {
      ...session,
      currentNodeIndex: nextIndex,
      latestFeedback: null,
    };

    setPendingChoice(null);
    setPreviousPlayerState(null);
    setSession(advancedSession);
    writeSession(advancedSession);
  };

  if (!session || !currentNode) {
    return (
      <main className="page-frame">
        <div className="app-shell play-page">
          <section className="panel play-page__loading">
            <p className="section-heading">Loading Session</p>
            <p>正在把你带回这场局里。</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page-frame">
      <div className="app-shell play-page app-background">
        <div className="ambient-grid" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="floating-clues" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="scanline" aria-hidden="true" />
        <section className="play-page__header">
          <div className="play-page__headline">
            <div className="play-page__map-meta panel">
              <p className="section-heading">当前地图</p>
              <h2>{playableMap.title}</h2>
              <p>{playableMap.subtitle}</p>
            </div>
            <div className="play-page__atmosphere">
              <span className="eyebrow">Field Tension</span>
              <h1 className="page-title play-page__title">Pressure Moves In Layers</h1>
            </div>
          </div>
          <div className="play-page__progress panel">
            <div className="play-page__progress-top">
              <strong>
                节点 {session.currentNodeIndex + 1} / {baoyanStory.length}
              </strong>
              <span>{currentNode.title}</span>
            </div>
            <div className="play-page__progress-bar" aria-hidden="true">
              <span
                style={{
                  width: `${((session.currentNodeIndex + 1) / baoyanStory.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>

        <StatusBar previousState={previousPlayerState} state={session.playerState} />

        <section className="play-layout">
          <div className="play-layout__main">
            <section className="panel play-scene-shell">
              <div className="grid-noise" />
              <div className="play-scene-shell__top">
                <div>
                  <p className="section-heading">当前剧情场景</p>
                  <h2>{currentNode.title}</h2>
                </div>
                <div className="play-scene-shell__badge">Scene {session.currentNodeIndex + 1}</div>
              </div>
              <SceneFrame node={currentNode} />
            </section>

            <section className="play-action-stage">
              <article className="panel story-panel story-panel--secondary">
                <div className="grid-noise" />
                <p className="section-heading">剧情旁白</p>
                <p className="story-panel__scene">{currentNode.sceneText}</p>
                <p className="signal-line">{currentNode.pressureNote}</p>
              </article>
              <div className="action-grid" aria-label="可选行动">
                {currentNode.choices.map((choice) => (
                  <ActionCard
                    key={choice.id}
                    choice={choice}
                    disabled={Boolean(pendingChoice)}
                    onSelect={() => handleChoice(choice)}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="play-layout__side">
            <RelationshipGraph npcStates={session.npcStates} pulseKey={graphPulseKey} />
            <RelationshipPanel npcStates={session.npcStates} />
            <SituationHint hint={getSituationHint(session.playerState, session.npcStates)} />
          </aside>
        </section>

        {pendingChoice ? (
          <div ref={consequenceRef}>
            <ChoiceConsequenceModal
              choice={pendingChoice}
              disabled={isPending}
              isFinalNode={session.currentNodeIndex + 1 >= baoyanStory.length}
              npcStates={session.npcStates}
              onContinue={continueFlow}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}
