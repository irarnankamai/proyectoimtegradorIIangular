import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/Usuarios/usuario';
import { RegistrarseService, CreateUsuarioResponse } from 'src/app/services/registro/registro.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/domain/Cliente/cliente';  // Asegúrate de importar la clase Cliente

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  link: any = "";
  usuario: Usuario = new Usuario();
  cliente: Cliente = new Cliente();  // Usa la clase Cliente aquí

  constructor(private router: Router, private registrarse: RegistrarseService, private clienteService: ClienteService) { }

  navigateToRegistro() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.link = sessionStorage.getItem("link");
  }

  crearUsuario() {
    this.registrarse.crearUsu(this.usuario, this.link).subscribe(
      (response: CreateUsuarioResponse) => {
        let userId: number = Number(response.id); 
        if (!isNaN(userId)) {
          alert(`Se creó una cuenta con ID: ${userId}`);
          sessionStorage.setItem('userId', userId.toString());  
          this.clienteService.crearCliente(this.cliente, this.link).subscribe(
            data => {
              alert("Cliente creado exitosamente");
             
            },
            error => {
              alert("Error al crear el cliente");
            }
          );
        } else {
          alert("ID de usuario inválido");
        }
      },
      error => {
        alert("Usuario ya creado");
        this.router.navigate(['/login']);
      }
    );
  }
}
