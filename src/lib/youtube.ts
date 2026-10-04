// Minimal YouTube IFrame Player API loader. Mirrors tap-dance's approach:
// load the script once, resolve a promise when the global API is ready,
// and hand back a thin wrapper with just the controls the practice
// console needs (play/pause, speed, seek, loop).

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setPlaybackRate(rate: number): void;
  getCurrentTime(): number;
  destroy(): void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: { onReady?: (e: { target: YTPlayer }) => void };
        },
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

export function loadYouTubeApi(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT) {
      resolve();
      return;
    }
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return apiPromise;
}

export async function createPlayer(
  elementId: string,
  videoId: string,
): Promise<YTPlayer> {
  await loadYouTubeApi();
  return new Promise((resolve) => {
    new window.YT!.Player(elementId, {
      videoId,
      playerVars: { playsinline: 1, rel: 0 },
      events: {
        onReady: (e) => resolve(e.target),
      },
    });
  });
}

export type { YTPlayer };
