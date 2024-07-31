import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/Usuarios/usuario';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Asegúrate de que esta ruta sea correcta
})
export class LoginComponent implements OnInit {
  link: string = '';
  user: Usuario = new Usuario();

  constructor(private loginService: LoginService, private ruta: Router) { }

  navigateToRegistro() {
    this.ruta.navigate(['/registro']);
  }

  ngOnInit(): void {
    this.link = "http://localhost:8080/demoJakarta/rs/";
    sessionStorage.setItem("link", this.link);
  }

  usuarioIniciar() {
    console.log(this.user);
    this.loginService.authenticate(this.user.username, this.user.password, this.link).subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);  
        if (data && data.id) {
          const id = data.id;
          sessionStorage.setItem("Usuario", this.user.username);
          sessionStorage.setItem("UsuarioID", id.toString());  
          alert("Bienvenido");
          
          this.ruta.navigate(['menu']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error => {
        // Manejar error
        console.error('Error de autenticación:', error);
        alert('Usuario o contraseña incorrectos');
      }
    );
  }  
  
}

