import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    first(), // prend la première valeur émise
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

// // auth.guard.ts
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { CanActivateFn } from '@angular/router';
// import { AuthService } from '../services/auth.service';


// export const authGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   console.log("🛡️ AuthGuard - Est authentifié ?", authService.isAuthenticated());

//   if (authService.isAuthenticated()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };


// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
