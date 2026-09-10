const KEYBOARD_ROWS = [
  "`1234567890-=",
  "qwertyuiop[]\\",
  "asdfghjkl;'",
  "zxcvbnm,./",
] as const;

const SPECIAL_KEY_POSITIONS: Record<string, number> = {
  Tab: 12,
  CapsLock: 13,
  Shift: 18,
  Control: 20,
  Alt: 28,
  Meta: 36,
  " ": 50,
  Enter: 88,
  Backspace: 92,
  Delete: 91,
  ArrowLeft: 40,
  ArrowDown: 48,
  ArrowUp: 52,
  ArrowRight: 60,
};

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let releaseTimer: number | undefined;

function keyboardPosition(key: string) {
  if (key in SPECIAL_KEY_POSITIONS) return SPECIAL_KEY_POSITIONS[key];

  const normalized = key.toLowerCase();
  for (const row of KEYBOARD_ROWS) {
    const index = row.indexOf(normalized);
    if (index !== -1) {
      const rowProgress = (index + 0.5) / row.length;
      return 14 + rowProgress * 72;
    }
  }

  return 50;
}

function settleAura() {
  root.style.setProperty("--footer-aura-opacity", ".72");
  root.style.setProperty("--footer-aura-scale", "1");
  root.style.setProperty("--footer-aura-lift", "0px");
}

function pulseAura(event: KeyboardEvent) {
  if (reducedMotion.matches) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  root.style.setProperty("--footer-aura-x", `${keyboardPosition(event.key)}%`);
  root.style.setProperty("--footer-aura-opacity", ".98");
  root.style.setProperty("--footer-aura-scale", "1.055");
  root.style.setProperty("--footer-aura-lift", "-8px");

  if (releaseTimer !== undefined) window.clearTimeout(releaseTimer);
  releaseTimer = window.setTimeout(settleAura, 145);
}

function syncMotionPreference() {
  if (releaseTimer !== undefined) window.clearTimeout(releaseTimer);
  root.style.setProperty("--footer-aura-x", "50%");
  settleAura();
}

window.addEventListener("keydown", pulseAura, { passive: true });
reducedMotion.addEventListener?.("change", syncMotionPreference);
