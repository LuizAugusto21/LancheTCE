import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5121/api/Usuario'; // URL da sua API

  constructor(private http: HttpClient) { }

  // Método para criar um novo usuário
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user)
      .pipe(
        catchError(error => {
          console.error('Create user error', error);
          return of(null);
        })
      );
  }

  // Método para obter todos os usuários
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Get all users error', error);
          return of([]);
        })
      );
  }

  // Método para obter um usuário pelo ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Get user by id error', error);
          return of(null);
        })
      );
  }
}
