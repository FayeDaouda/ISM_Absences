import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Optimisation des performances
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;
  showPassword = false;
  isComponentReady = false; // Nouveau flag

  // Propriétés pour la compatibilité avec les tests
  get email(): string {
    return this.loginData.email;
  }

  set email(value: string) {
    this.loginData.email = value;
  }

  get password(): string {
    return this.loginData.password;
  }

  set password(value: string) {
    this.loginData.password = value;
  }

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Marquer le composant comme prêt après l'initialisation
    setTimeout(() => {
      this.isComponentReady = true;
    }, 50);

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.onLogin();
  }

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      if (
        this.loginData.email === 'admin@ism.sn' &&
        this.loginData.password === 'admin'
      ) {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', 'fake-jwt-token');
        }
        this.router.navigate(['/dashboard']);
      } else {
        if (isPlatformBrowser(this.platformId)) {
          if (typeof window !== 'undefined' && window.alert) {
            window.alert('Identifiants invalides');
          }
        }
        this.errorMessage = 'Email ou mot de passe invalide';
      }

      this.isLoading = false;
    }, 1000);
  }
}









// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Component({
//   standalone: true,
//   selector: 'app-login',
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginData = {
//     email: '',
//     password: ''
//   };

//   errorMessage = '';
//   isLoading = false;
//   showPassword = false;

//   // Propriétés pour la compatibilité avec les tests
//   get email(): string {
//     return this.loginData.email;
//   }

//   set email(value: string) {
//     this.loginData.email = value;
//   }

//   get password(): string {
//     return this.loginData.password;
//   }

//   set password(value: string) {
//     this.loginData.password = value;
//   }

//   constructor(
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         this.router.navigate(['/dashboard']);
//       }
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   onSubmit(): void {
//     this.onLogin();
//   }

//   // Méthode pour la compatibilité avec les tests
//   onLogin(): void {
//     this.isLoading = true;
//     this.errorMessage = '';

//     setTimeout(() => {
//       if (
//         this.loginData.email === 'admin@ism.sn' &&
//         this.loginData.password === 'admin'
//       ) {
//         if (isPlatformBrowser(this.platformId)) {
//           localStorage.setItem('token', 'fake-jwt-token');
//         }
//         this.router.navigate(['/dashboard']);
//       } else {
//         if (isPlatformBrowser(this.platformId)) {
//           // Pour les tests qui utilisent window.alert
//           if (typeof window !== 'undefined' && window.alert) {
//             window.alert('Identifiants invalides');
//           }
//         }
//         this.errorMessage = 'Email ou mot de passe invalide';
//       }

//       this.isLoading = false;
//     }, 1000);
//   }
// }