import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      contato: ['', [Validators.required]],
      enderecoAndar: [''],
      enderecoSala: [''],
      enderecoDepartamento: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { nome, email, senha, confirmPassword, perfil, contato, enderecoAndar, enderecoSala, enderecoDepartamento } = this.registerForm.value;

      if (senha !== confirmPassword) {
        this.snackBar.open('As senhas não coincidem.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
        return;
      }

      this.authService.register(nome, email, senha, perfil, contato, enderecoAndar, enderecoSala, enderecoDepartamento).subscribe(success => {
        if (success) {
          this.authService.login(email, senha).subscribe(loginSuccess => {
            if (loginSuccess) {
              this.router.navigate(['/admin']);
            } else {
              this.snackBar.open('Login após cadastro falhou. Tente novamente.', 'Fechar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['error-snackbar']
              });
            }
          });
        } else {
          this.snackBar.open('Cadastro falhou. Tente novamente.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
