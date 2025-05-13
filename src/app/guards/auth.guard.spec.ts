import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard (clase)', () => {
  let guard: AuthGuard;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = new AuthGuard(mockRouter as any);
  });

  it('debería permitir acceso si hay token', () => {
    localStorage.setItem('token', 'mock-token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('debería redirigir a login si no hay token', () => {
    localStorage.removeItem('token');
    expect(guard.canActivate()).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
