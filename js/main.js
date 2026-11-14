// Entrada do site: cada comportamento tem seu próprio módulo.
import { initIcons } from './modules/icons.js';
import { initNavigation } from './modules/navigation.js';
import { createModal } from './modules/modal.js';
import { initClub } from './modules/clube.js';
import { initLocations } from './modules/onde-encontrar.js';
import { initCheckout } from './modules/checkout.js';
import { initTestimonials } from './modules/depoimentos.js';
import { initReveal } from './modules/animations.js';
import { initExperience } from './modules/experience.js';
import { initValidation } from './modules/feedback.js';
import { initMotion } from './modules/motion.js';

initMotion();
const modal = createModal();
initValidation();
initIcons();
initNavigation();
initClub(modal);
initLocations(modal);
initCheckout(modal);
initTestimonials();
initReveal();
initExperience();
