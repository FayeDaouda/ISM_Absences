import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on correct login', fakeAsync(() => {
    component.email = 'admin@ism.sn';
    component.password = 'admin';
    component.onLogin();

    // Wait for the setTimeout in onLogin
    tick(1000);

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should not navigate on incorrect login', fakeAsync(() => {
    spyOn(window, 'alert');
    component.email = 'wrong@ism.sn';
    component.password = 'wrong';
    component.onLogin();

    // Wait for the setTimeout in onLogin  
    tick(1000);

    expect(localStorage.getItem('token')).not.toBe('fake-jwt-token');
    expect(window.alert).toHaveBeenCalledWith('Identifiants invalides');
    expect(component.errorMessage).toBe('Email ou mot de passe invalide');
  }));

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });

  it('should set loading state during login', fakeAsync(() => {
    component.email = 'admin@ism.sn';
    component.password = 'admin';
    
    expect(component.isLoading).toBeFalse();
    component.onLogin();
    expect(component.isLoading).toBeTrue();
    
    tick(1000);
    expect(component.isLoading).toBeFalse();
  }));
});