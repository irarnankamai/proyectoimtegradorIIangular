import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Libro } from 'src/app/domain/Libro/libro';
import { Prestamo } from 'src/app/domain/Prestamo/prestamo';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }

  getPrestamosConTitulo(usuarioId: string, link: string): Observable<any[]> {
    const urlPrestamos = `${link}prestamos/usuario/${usuarioId}`;

    return this.http.get<Prestamo[]>(urlPrestamos).pipe(
      switchMap(prestamos => {
        const libroRequests = prestamos.map(prestamo => {
          const urlLibro = `${link}libros/${prestamo.libro}`;
          return this.http.get<Libro>(urlLibro).pipe(
            map(libro => ({
              prestamo,
              libro
            }))
          );
        });

        return forkJoin(libroRequests);
      }),
      map(results => {
        return results.map(result => ({
          ...result.prestamo,
          titulo: result.libro.titulo
        }));
      })
    );
  }
}