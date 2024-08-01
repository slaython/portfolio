import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // PREPARA PARA AS REQUISIÇÕES DE LOGIN
  private loginUrl = 'http://127.0.0.1:8000/api/admin/login';

  constructor(private http: HttpClient) {}

  // REQUISIÇÃO DE LOGIN
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
  }
  // SALVA OS DADOS NO USUARIO NO LOCALSTORAGE
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
