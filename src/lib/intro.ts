"use client";

import { useSyncExternalStore } from "react";

/** Sinaliza quando o preloader terminou, para a hero iniciar sua montagem. */
let ready = false;
const subscribers = new Set<() => void>();

export const intro = {
  done() {
    if (ready) return;
    ready = true;
    subscribers.forEach((fn) => fn());
  },
  subscribe(fn: () => void) {
    subscribers.add(fn);
    return () => {
      subscribers.delete(fn);
    };
  },
  isReady: () => ready,
};

export function useIntroReady() {
  return useSyncExternalStore(intro.subscribe, intro.isReady, () => false);
}
