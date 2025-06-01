import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   username = '';
   password = '';

   constructor(private auth: AuthService, private router: Router) {}

  login() {
  const success = this.auth.login(this.username, this.password);

  if (success) {
    this.router.navigate(['/accueil']);
  } else {
    alert("Accès refusé. Seul l'administrateur peut se connecter.");
  }
}

}
