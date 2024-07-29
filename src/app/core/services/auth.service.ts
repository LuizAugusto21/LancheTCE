import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5121/api/Usuario';
  private authenticated = false;

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  register(nome: string, email: string, senha: string, perfil: string, contato: string, enderecoAndar: string, enderecoSala: string, enderecoDepartamento: string): Observable<boolean> {
    const user = {
      nome,
      email,
      senha,
      perfil,
      contato,
      endereco: {
        andar: enderecoAndar,
        sala: enderecoSala,
        departamento: enderecoDepartamento
      }
    };

    return this.http.post<any>(`${this.apiUrl}`, user)
      .pipe(
        tap(response => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
            this.authenticated = true;
          }
        }),
        catchError(() => {
          this.authenticated = false;
          return of(false);
        })
      );
  }

  login(email: string, senha: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap(response => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
            this.authenticated = true;
          }
        }),
        catchError(() => {
          this.authenticated = false;
          return of(false);
        })
      );
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}

