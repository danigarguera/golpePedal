import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioAuthDTO {
  id: number;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth/me`; // 👈 Corrige aquí la URL base

  constructor(private http: HttpClient) {}

  getUsuarioActual(): Observable<UsuarioAuthDTO> {
    return this.http.get<UsuarioAuthDTO>(this.apiUrl);
  }
}
