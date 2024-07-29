import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5121/api/Usuario'; // URL da API
  private authenticated = false; // Estado de autenticação

  constructor(private http: HttpClient) { }

  // Método para login
  login(email: string, senha: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap(response => {
          // Supondo que a resposta indica sucesso de login
          this.authenticated = true; // Definir como autenticado
        }),
        catchError(() => {
          // Caso haja erro, definir como não autenticado
          this.authenticated = false;
          return of(false); // Retornar false indicando falha no login
        })
      );
  }

  // Método para logout
  logout(): void {
    this.authenticated = false; // Definir como não autenticado
    // Se houver um endpoint de logout, você pode fazer uma chamada para ele aqui
    // Exemplo: this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
