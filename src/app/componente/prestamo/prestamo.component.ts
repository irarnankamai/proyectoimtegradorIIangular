import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoService } from 'src/app/services/prestamo/prestamo.service';
import { LibroService } from 'src/app/services/libro/libro.service';
import { Prestamo } from 'src/app/domain/Prestamo/prestamo';
import { Libro } from 'src/app/domain/Libro/libro';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  libroId: number | null = null;
  titulo: string | null = null;
  link: string = '';
  autor: string | null = null;
  isbn: string | null = null;
  anioPublicacion: number | null = null;
  estado: number | null = null;
  monto: number | null = null;
  usuarioId: number | null = null;

  prestamo: Prestamo = new Prestamo();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prestamoService: PrestamoService,
    private libroService: LibroService
  ) { 
 
    this.prestamo.estado = 2;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.libroId = +params['id']; 
      this.titulo = params['titulo'];
      this.autor = params['autor'];
      this.isbn = params['isbn'];
      this.monto = +params['monto'];
      this.anioPublicacion = +params['anioPublicacion'];
      this.estado = +params['estado'];
      this.link = sessionStorage.getItem("link") || '';
    });

  
    this.usuarioId = parseInt(sessionStorage.getItem("UsuarioID") || '0', 10);

    console.log('id del libro:', this.libroId);
    console.log('id del usuario:', this.usuarioId);

    if (this.libroId === null || this.usuarioId === null) {
      console.error('id del libro o de usuario no válido.');
      
    }
  }

  onSubmit(): void {
    if (this.libroId !== null && this.usuarioId !== null) {
      this.prestamo.libro = this.libroId;
      this.prestamo.usuario = this.usuarioId;
      

      console.log('Monto:', this.prestamo.monto);
      console.log('Días:', this.prestamo.dias);
      
   
      if (!this.prestamo.dias || !this.prestamo.estado) {
        console.error('Campos incompletos.');
        return;
      }

      this.prestamoService.createPrestamo(this.prestamo, this.link).subscribe(
        response => {
          console.log('Préstamo creado con éxitosamente:', response);
        
          this.updateLibroEstado(this.libroId);
          this.router.navigate(['/menu']); 
        },
        error => {
          console.error('Error al crear :', error);
        }
      );
    } else {
      console.error('Faltan datos.');
    }
  }

  updateLibroEstado(libroId: number): void {
    
    this.libroService.getLibroById(libroId, this.link).subscribe(
      libro => {
        const updatedLibro: Libro = {
          id: libro.id,
          titulo: libro.titulo,
          autor: libro.autor,
          isbn: libro.isbn,
          monto: libro.monto,
          anioPublicacion: libro.anioPublicacion,
          estado: 2 
        };

        this.prestamoService.updateLibro(updatedLibro, this.link).subscribe(
          response => {
            console.log('Libro actualizado con éxito:', response);
          },
          error => {
            console.error('Error al actualizar el libro:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener el libro:', error);
      }
    );
  }
  navigateToActualizarCliente() {
    this.router.navigate(['/actualizar-cliente']);
  }
  cerrarSesion() {
    sessionStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}
