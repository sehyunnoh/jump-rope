/** Web Audio based click engine — scheduled ahead of time so tempo stays accurate
 *  even if the main thread briefly stalls (the classic setInterval drift problem). */
export class Metronome {
  private ctx: AudioContext | null = null;
  private nextTickTime = 0;
  private timerId: number | null = null;
  private bpm: number;
  private onTick?: () => void;
  private readonly lookahead = 25; // ms between scheduler passes
  private readonly scheduleAhead = 0.1; // seconds scheduled ahead

  constructor(bpm: number, onTick?: () => void) {
    this.bpm = bpm;
    this.onTick = onTick;
  }

  setBpm(bpm: number) {
    this.bpm = bpm;
  }

  get isRunning() {
    return this.timerId !== null;
  }

  start() {
    if (this.isRunning) return;
    this.ctx ??= new AudioContext();
    this.nextTickTime = this.ctx.currentTime + 0.05;
    const scheduler = () => {
      if (!this.ctx) return;
      while (this.nextTickTime < this.ctx.currentTime + this.scheduleAhead) {
        this.playClick(this.nextTickTime);
        this.onTick?.();
        this.nextTickTime += 60 / this.bpm;
      }
      this.timerId = window.setTimeout(scheduler, this.lookahead);
    };
    scheduler();
  }

  stop() {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private playClick(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = 1500;
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.06);
  }
}
