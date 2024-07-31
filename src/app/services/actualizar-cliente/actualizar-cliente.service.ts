import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/domain/Cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ActualizarClienteService {

  constructor(private http: HttpClient) { }

  getClienteByUserId(userId: number, link: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${link}cliente/usuario/${userId}`);
  }

  // Actualizar cliente
  updateCliente(cliente: Cliente, link: string): Observable<Cliente> {
    return this.http.put<Cliente>(`${link}cliente`, cliente);
  }
}
