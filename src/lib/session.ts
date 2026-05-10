"use client";

import { playableMap } from "@/data/maps";
import { initializeGameSession } from "@/lib/gameEngine";
import type { GameSession } from "@/lib/types";

const SESSION_KEY = "cosplay-in-your-20s-session";

export function createFreshSession(): GameSession {
  return initializeGameSession(playableMap.id);
}

export function readSession(): GameSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as GameSession;
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function writeSession(session: GameSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(SESSION_KEY);
}
