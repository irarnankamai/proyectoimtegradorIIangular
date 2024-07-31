import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/domain/Libro/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }

  getAllLibros(link: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(link+"libros");
  }

  getLibroById(id: number,link: string): Observable<Libro> {
    return this.http.get<Libro>(`${link}libros/${id}`);
  }
  
  updateLibro(libroId: number, libro: Libro, link: string): Observable<Libro> {
    const url = `${link}libros/${libroId}`;
    return this.http.put<Libro>(url, libro);
  }
  
}
