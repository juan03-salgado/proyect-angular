import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  nombre_user: string = '';
  contrasena: string = '';

  usuarios = [
    { nombre: 'user', contrasena: 'password', rol: 'user' },
    { nombre: 'User_admin', contrasena: 'Secret_password', rol: 'admin' }
  ]

  ngOnInit(): void {
  }

  constructor( private router: Router) {}

   login(): void {
    if (!this.nombre_user || !this.contrasena) {
      // @ts-ignore
      Swal.fire({
      position: 'top',
      icon: 'info',
      title: '???',
      text: 'Digite un usuario y una contraseña'
      });
      return;
    };
    
     const usuario = this.usuarios.find(u => u.nombre === this.nombre_user && u.contrasena === this.contrasena)
     if(usuario){
      // @ts-ignore
       Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Bienvenido ' + usuario.nombre,
        text: 'Has iniciado sesión correctamente'
      }).then(() => {
        localStorage.setItem('logeado', 'true');
        localStorage.setItem('rol', usuario.rol);

        if(usuario.rol === "admin"){
          this.router.navigate(['/home/home-admin']);
        } else {
          this.router.navigate(['/home/home-cliente']);
        }
     });

    } else {
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos'
      });
    }
  }
}

