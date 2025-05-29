// login.component.ts (version mise à jour)
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;
  showPassword = false;
  isComponentReady = false;

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
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Marquer le composant comme prêt après l'initialisation
    setTimeout(() => {
      this.isComponentReady = true;
    }, 50);

    // Vérifier si l'utilisateur est déjà connecté
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login(this.loginData.email, this.loginData.password)
    .then(success => {
      this.isLoading = false;

      if (success) {
        console.log('✅ Connexion réussie');
        this.router.navigate(['/dashboard']);
      } else {
        console.log('❌ Identifiants invalides');
        this.errorMessage = 'Email ou mot de passe invalide';
      }
    })
    .catch(error => {
      this.isLoading = false;
      console.error('Erreur lors de la connexion', error);
      this.errorMessage = 'Une erreur est survenue';
    });

    console.log('Tentative de connexion avec', this.loginData);

}



  async onLogin(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.login(this.loginData.email, this.loginData.password);
      
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        if (isPlatformBrowser(this.platformId)) {
          if (typeof window !== 'undefined' && window.alert) {
            window.alert('Identifiants invalides');
          }
        }
        this.errorMessage = 'Email ou mot de passe invalide';
      }
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue lors de la connexion';
      console.error('Erreur de connexion:', error);
    } finally {
      this.isLoading = false;
    }
  }
}