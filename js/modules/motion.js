// Movimento completo é o padrão do site, sem controle ou preferência salva.
export const motionPreference = new EventTarget();
motionPreference.matches = false;

export function initMotion() {
  document.documentElement.dataset.motion = 'full';
}
