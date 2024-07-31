import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from 'src/app/domain/Prestamo/prestamo';
import { Libro } from 'src/app/domain/Libro/libro';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http: HttpClient) { }

  createPrestamo(prestamo: Prestamo, link: string): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${link}prestamos`, prestamo);
  }

  updateLibro(libro: Libro, link: string): Observable<Libro> {
    return this.http.put<Libro>(`${link}libros/${libro.id}`, libro);
  }

  getBuscarPerdidoLib(id: number,link: string): Observable<Libro> {
    return this.http.get<Libro>(`${link}libros/${id}`);
  }
  
  getPrestamosByUsuario(usuarioId: string, link: string): Observable<Prestamo[]> {
    const url = `${link}prestamos/usuario/${usuarioId}`;
    return this.http.get<Prestamo[]>(url);
  }
}
