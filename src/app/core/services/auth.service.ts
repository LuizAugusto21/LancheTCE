import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5121/api/Usuario'; // URL da sua API

  constructor(private http: HttpClient) { }

  // Método para fazer login
  login(email: string, senha: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        map(response => {
          // Supondo que a API retorne um token
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(false);
        })
      );
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para obter o perfil do usuário logado
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
}
