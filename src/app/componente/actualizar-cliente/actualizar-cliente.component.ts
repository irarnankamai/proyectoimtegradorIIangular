import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarClienteService } from 'src/app/services/actualizar-cliente/actualizar-cliente.service';
import { Cliente } from 'src/app/domain/Cliente/cliente';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {
  userId: string | null = null;
  cliente: Cliente | null = null;
  link: string = '';

  constructor(private clienteService: ActualizarClienteService, private ruta: Router) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("UsuarioID");
    this.link = sessionStorage.getItem("link") || '';

    if (this.userId && this.link) {
      this.clienteService.getClienteByUserId(parseInt(this.userId), this.link).subscribe(
        data => {
          this.cliente = data;
          console.log('Cliente recuperado:', this.cliente);
        },
        error => {
          console.error('Error al recuperar cliente:', error);
        }
      );
    }
  }

  updateCliente() {
    if (this.cliente && this.link) {
      this.clienteService.updateCliente(this.cliente, this.link).subscribe(
        data => {
          console.log('Cliente actualizado:', data);
          alert('Cliente actualizado exitosamente');
        },
        error => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar cliente');
        }
      );
    }
  }
  navigateToActualizarCliente() {
    this.ruta.navigate(['/actualizar-cliente']);
  }
  cerrarSesion() {
    sessionStorage.clear(); 
    this.ruta.navigate(['/login']);
  }
}