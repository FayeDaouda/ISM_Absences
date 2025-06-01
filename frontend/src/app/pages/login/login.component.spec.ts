import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    localStorage.clear();

    const spy = jasmine.createSpyObj('AuthService', ['login', 'isAuthenticated']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    
    // Mock par défaut
    authServiceSpy.isAuthenticated.and.returnValue(false);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if already authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should login successfully with backend', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of(true));
    
    component.loginData.email = 'admin@ism.sn';
    component.loginData.password = 'admin';
    component.onSubmit();

    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith('admin@ism.sn', 'admin');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.isLoading).toBeFalse();
  }));

  it('should handle login error', fakeAsync(() => {
    const errorMessage = 'Identifiants invalides';
    authServiceSpy.login.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loginData.email = 'wrong@ism.sn';
    component.loginData.password = 'wrong';
    component.onSubmit();

    tick();

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.isLoading).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('should validate required fields', () => {
    component.loginData.email = '';
    component.loginData.password = '';
    component.onSubmit();

    expect(component.errorMessage).toBe('Veuillez remplir tous les champs');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });

  // Tests de compatibilité avec l'ancienne méthode onLogin
  it('should work with legacy onLogin method', fakeAsync(() => {
    component.email = 'admin@ism.sn';
    component.password = 'admin';
    component.onLogin();

    tick(1000);

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should fail with wrong credentials in legacy method', fakeAsync(() => {
    spyOn(window, 'alert');
    component.email = 'wrong@ism.sn';
    component.password = 'wrong';
    component.onLogin();

    tick(1000);

    expect(window.alert).toHaveBeenCalledWith('Identifiants invalides');
    expect(component.errorMessage).toBe('Email ou mot de passe invalide');
  }));
});