import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(event: Event): void {
    event.preventDefault();
    const user = { email: this.email, password: this.password };
    if (this.authService.login(user)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Identifiants incorrects';
    }
  }
}
