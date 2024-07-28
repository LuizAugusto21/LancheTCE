import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5121';
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Produtos`).pipe(
      tap(products => this.productsSubject.next(products)),
      catchError(error => {
        console.error('Erro ao buscar produtos', error);
        return [];
      })
    );
  }

  getProdutosByCategoria(categoria: string):Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Produtos/filter/categoria?categoria=${categoria}`).pipe(
      tap(products => this.productsSubject.next(products)),
      catchError(error => {
        console.error('Erro ao buscar produtos', error);
        return [];
      })
    );
  }

  // Método para obter os produtos em cache
  getCachedProducts(): Observable<any[]> {
    return this.products$;
  }
}
