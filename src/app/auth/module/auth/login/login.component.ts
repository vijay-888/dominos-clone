import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        const email = this.loginForm.get('email')?.value;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful!'
        });
        console.log('Login form submitted:', this.loginForm.value);

        // Role-based routing
        if (email === 'coyaja8206@asimarif.com') {
          // Redirect to admin dashboard
          this.router.navigate(['/admin/dashboard']);
        } else if (email === 'vijay@gmail.com') {
          // Redirect to provider dashboard
          this.router.navigate(['/provider/dashboard']);
        } else {
          // Redirect to consumer dashboard
          this.router.navigate(['/consumer/dashboard']);
        }
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  signInWithGoogle() {
    this.messageService.add({
      severity: 'info',
      summary: 'Google Sign In',
      detail: 'Google sign in functionality would be implemented here'
    });
  }

  signInWithApple() {
    this.messageService.add({
      severity: 'info',
      summary: 'Apple Sign In',
      detail: 'Apple sign in functionality would be implemented here'
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
