import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, from, Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    // Criação de um mock para AuthService
    const authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true) // Mock de sucesso
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Espionar o método de navegação para verificar redirecionamentos
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow the route if the user is authenticated (boolean return)', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true); // Mock de sucesso

    const result = guard.canActivate(
      {} as any, // Ativar parâmetros
      {} as any  // Estado do roteador
    );

    if (result instanceof Observable) {
      result.subscribe(res => {
        expect(res).toBeTrue(); // Verificar se a rota é permitida
        expect(router.navigate).not.toHaveBeenCalled(); // Verificar se não há redirecionamento
      });
    } else if (result instanceof Promise) {
      result.then(res => {
        expect(res).toBeTrue(); // Verificar se a rota é permitida
        expect(router.navigate).not.toHaveBeenCalled(); // Verificar se não há redirecionamento
      });
    } else {
      expect(result).toBeTrue(); // Verificar se a rota é permitida
      expect(router.navigate).not.toHaveBeenCalled(); // Verificar se não há redirecionamento
    }
  });

  it('should redirect to /login if the user is not authenticated (boolean return)', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false); // Mock de falha

    const result = guard.canActivate(
      {} as any, // Ativar parâmetros
      {} as any  // Estado do roteador
    );

    if (result instanceof Observable) {
      result.subscribe(res => {
        expect(res).toBeFalse(); // Verificar se a rota não é permitida
        expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verificar se há redirecionamento para login
      });
    } else if (result instanceof Promise) {
      result.then(res => {
        expect(res).toBeFalse(); // Verificar se a rota não é permitida
        expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verificar se há redirecionamento para login
      });
    } else {
      expect(result).toBeFalse(); // Verificar se a rota não é permitida
      expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verificar se há redirecionamento para login
    }
  });
});
