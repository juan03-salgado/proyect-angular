import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  nombre_user: string = '';
  contrasena: string = '';

  ngOnInit(): void {
  }

  constructor(private usuariosService: UsuariosService,
    private router: Router
  ) {}

   login(): void {
    if (!this.nombre_user || !this.contrasena) {
      // @ts-ignore
      Swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Campos vacios',
      text: 'Digite un usuario y una contraseña'
      });
      return;
    };

    this.usuariosService.loginUsuario(this.nombre_user, this.contrasena).subscribe({
      next: (res) => {
        const usuario = res.usuario;
        //@ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Bienvenido ' + res.usuario.nombre_user,
          text: 'Has iniciado sesion correctamente'
        }).then(() => {
          localStorage.setItem('logeado', 'true');
          localStorage.setItem('rol', res.usuario.id_rol === 1 ? 'admin' : 'cliente');
          localStorage.setItem('usuario', JSON.stringify(res.usuario));

          if(res.usuario.id_rol === 1){
            this.router.navigate(['/home/home-admin']);
          } else {
            this.router.navigate(['/home/home-cliente']);
          }
        });
      },
      error: (err) => {
        //@ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Usuario o contraseña incorrectos'
        });
      }
    });
  }
}

