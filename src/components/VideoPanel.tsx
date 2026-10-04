import { useRef, useState } from "react";
import type { MoveVideo } from "../types";
import { createPlayer, type YTPlayer } from "../lib/youtube";

export default function VideoPanel({
  video,
  mirrored,
  onPlayerReady,
}: {
  video: MoveVideo | undefined;
  mirrored: boolean;
  onPlayerReady: (player: YTPlayer) => void;
}) {
  const [started, setStarted] = useState(false);
  const mountId = useRef(`yt-${video?.youtubeId ?? "none"}`);

  if (!video) {
    return (
      <div className="video-panel">
        <p className="empty-note">
          No verified video for this move yet — see PLAN.md §6 for the "don't guess" rule.
        </p>
      </div>
    );
  }

  async function start() {
    setStarted(true);
    const player = await createPlayer(mountId.current, video!.youtubeId);
    player.playVideo();
    onPlayerReady(player);
  }

  return (
    <div className={`video-panel${mirrored ? " mirrored" : ""}`}>
      {!started && (
        <button className="play" onClick={start} aria-label="Play video">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="#12201a" />
          </svg>
        </button>
      )}
      <div id={mountId.current} style={{ width: "100%", height: "100%", display: started ? "block" : "none" }} />
      <span className="cap">
        {video.type.toUpperCase()} · {video.channel.toUpperCase()}
      </span>
    </div>
  );
}
