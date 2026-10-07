/** Punto de entrada del cliente: inicializa cada módulo una sola vez. */
import { initLoader } from './loader';
import { initScroll } from './scroll';
import { initCursor, initMagnetic, initPreview, initProximity } from './pointer';
import { initWork } from './work';
import { initClock, initFallback, initNavSpy, initScramble } from './ambient';
import { initContact } from './contact';

initLoader();
initScroll();
initFallback();
initNavSpy();
initScramble();
initWork();
initCursor();
initProximity();
initMagnetic();
initPreview();
initClock();
initContact();
