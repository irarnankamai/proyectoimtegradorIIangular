import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/domain/Usuarios/usuario';
import { Observable } from 'rxjs';

export interface CreateUsuarioResponse {
  id: string; 
}

@Injectable({
  providedIn: 'root'
})
export class RegistrarseService {
  constructor(private httpClient: HttpClient) {}

  crearUsu(registro: Usuario, link: string): Observable<CreateUsuarioResponse> {
    return this.httpClient.post<CreateUsuarioResponse>(link + "usuarios", registro);
  }
}
