import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    // Rediriger si déjà connecté
    if (this.AuthService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.AuthService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (success): void => {
          this.isLoading = false;
          if (success) {
            console.log('✅ Connexion réussie');
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Échec de la connexion';
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('❌ Erreur de connexion:', error);
          this.errorMessage = error.message || 'Email ou mot de passe invalide';
        }
      });
  }

  // Méthode pour afficher les comptes de test
  showTestAccounts(): void {
    const accounts = [
      'admin@ism.sn / admin',
    ];
    
    alert('Comptes de test disponibles:\n\n' + accounts.join('\n'));
  }
}