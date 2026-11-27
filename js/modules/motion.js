// Respeita prefers-reduced-motion e ativa modo leve em dispositivos com hardware ou rede restritos.
const reducedMotionQuery = typeof window !== 'undefined' && 'matchMedia' in window
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;

export const motionPreference = new EventTarget();
motionPreference.matches = Boolean(reducedMotionQuery?.matches);

function detectLitePerformance() {
  if (typeof navigator === 'undefined') return false;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType && /^(slow-2g|2g)$/.test(connection.effectiveType)) return true;
  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2) return true;
  if (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2) return true;
  return false;
}

export const isLitePerformance = detectLitePerformance();

function applyState() {
  const reduced = Boolean(reducedMotionQuery?.matches);
  motionPreference.matches = reduced;
  document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
  if (isLitePerformance || reduced) {
    document.documentElement.dataset.performance = 'lite';
  } else {
    delete document.documentElement.dataset.performance;
  }
}

export function initMotion() {
  applyState();
  reducedMotionQuery?.addEventListener('change', () => {
    applyState();
    motionPreference.dispatchEvent(new Event('change'));
  });
}
