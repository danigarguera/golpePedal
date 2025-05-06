import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = `${environment.apiUrl}/auth/register`;

  constructor(private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}
