import { CanActivateFn } from '@angular/router';

export const componentReadyGuard: CanActivateFn = (route, state) => {
  return new Promise(resolve => {
    // Petit délai pour s'assurer que le composant est complètement chargé
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};