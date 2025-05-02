import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('🔗 Interceptor funcional: token añadido a', req.url);
    return next(cloned);
  }

  console.warn('⚠️ No hay token en localStorage. Solicitud sin autorización:', req.url);
  return next(req);
};
