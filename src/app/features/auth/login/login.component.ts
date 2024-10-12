import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subject, takeUntil } from 'rxjs';
import { LoginActions } from '../store/actions/login.actions';
import { selectIsLoading } from '../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    DividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  strongPasswordRegex: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>/?])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>/?]{8,30}$';
  passwordFocus: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(this.strongPasswordRegex),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.store
      .select(selectIsLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(LoginActions.loginInit({ username, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getUsernameError(control: AbstractControl): string {
    const errors = [];

    if (control.hasError('required')) {
      errors.push('El nombre de usuario es requerido');
    }

    if (control.hasError('minlength')) {
      errors.push(
        `El nombre de usuario debe tener al menos ${control.errors?.['minlength']?.requiredLength} caracteres`
      );
    }

    if (control.hasError('maxlength')) {
      errors.push(
        `El nombre de usuario no puede tener más de ${control.errors?.['maxlength']?.requiredLength} caracteres`
      );
    }

    return errors.join(', ');
  }

  getPasswordErrorMessage(password: string): string {
    let errors = [];

    if (!/(?=.*[a-z])/.test(password)) errors.push('una letra minúscula');
    if (!/(?=.*[A-Z])/.test(password)) errors.push('una letra mayúscula');
    if (!/(?=.*\d)/.test(password)) errors.push('un número');
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};:'"|,.<>/?])/.test(password))
      errors.push('un símbolo especial');
    if (password.length < 8) errors.push('al menos 8 caracteres');
    if (password.length > 30) errors.push('no más de 30 caracteres');

    if (errors.length === 0) return '';

    return `La contraseña debe contener ${errors.join(', ')}`;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
