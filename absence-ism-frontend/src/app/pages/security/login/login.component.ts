import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/services/impl/auth.service';

@Component({
  selector: 'ism-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // 👈 bien au pluriel ici
  standalone: true,
  imports: [],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorMessage: string = "";
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formLogin = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.formLogin.invalid) return;

    this.loading = true;
    const { login, password } = this.formLogin.value;

    this.authService.Login(login, password).subscribe({
      next: (response: LoginResponse) => {
        if (response.success && response.data) {
          if (response.data.role === "ADMIN") {
            this.router.navigateByUrl("/admin");
          } else {
            this.errorMessage = "Accès refusé. Seul un administrateur peut se connecter.";
          }
        } else {
          this.errorMessage = response.message || "Login ou mot de passe incorrect.";
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur côté serveur.";
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    const user = this.authService.currentUserSignal();
    if (user) {
      if (user.role === "ADMIN") {
        this.router.navigateByUrl("/pointages/absences");
      } else {
        this.router.navigateByUrl("/etudiants/absences");
      }
    }
  }
}
