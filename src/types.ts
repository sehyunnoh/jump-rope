export type LevelId = 1 | 2 | 3 | 4 | 5;

export interface Level {
  id: LevelId;
  name: string;
  subtitle: string;
  tabLabel: string;
  colorVar: string;
  description: string;
}

export type VideoType = "tutorial" | "demo" | "routine";

export interface MoveVideo {
  youtubeId: string;
  title: string;
  channel: string;
  type: VideoType;
  loop?: { start: number; end: number };
}

export type MoveStatus = "complete" | "no-video" | "description-pending";

export interface Move {
  id: string;
  name: string;
  /** Korean alias — null means not yet verified against a Korean-language source. Never guess one in. */
  alias: string | null;
  level: LevelId;
  /** false = descriptive placeholder name (spotted in a video, no recognized trick name exists) — flagged in the UI, never implied to be a real community term. Omitted/true = a real, recognized name. */
  officialName?: boolean;
  category: string;
  rotationsPerJump: number;
  jpm: { slow: number; normal: number; music: number };
  breakdown: string[];
  description: string;
  tips: string[];
  prerequisites: string[];
  nextSteps: string[];
  videos: MoveVideo[];
  status: MoveStatus;
}
