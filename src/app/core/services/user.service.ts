import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioGET, UsuarioPOST, UsuarioPUT } from '../models/geral.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5121/api/Usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuarioGET[]> {
    return this.http.get<UsuarioGET[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<UsuarioGET> {
    return this.http.get<UsuarioGET>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: UsuarioPOST): Observable<UsuarioGET> {
    return this.http.post<UsuarioGET>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: UsuarioPUT): Observable<UsuarioGET> {
    return this.http.put<UsuarioGET>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<UsuarioGET> {
    return this.http.delete<UsuarioGET>(`${this.apiUrl}/${id}`);
  }
}
