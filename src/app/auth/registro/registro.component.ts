import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';
import { Router, RouterModule } from '@angular/router';
import { Usuarios } from '../../entitys/usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  nombre_user: string = '';
  email: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private usuariosService: UsuariosService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  registrarUsuario(): void {
    if(!this.nombre_user || !this.email || !this.contrasena || !this.confirmarContrasena){
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Campos vacios',
        text: 'Por favor complete todos los campos requeridos'
      });
      return
    }

    if(this.contrasena !== this.confirmarContrasena){
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error',
        text: 'las contraseñas no coinciden'
      });
      return
    }

      const nuevoUsuario: Usuarios = {id: 0, nombre_user: this.nombre_user, email: this.email, contrasena: this.contrasena, id_rol: 2};
      console.log(nuevoUsuario);

      this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
        next: (res) => {
          //@ts-ignore
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Ya puedes iniciar sesion'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }, 
          error: (err) => {
          //@ts-ignore
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error',
            text: err.error?.error || 'Hubo un problema al registrar el usuario'          
          });
        }
      });
  }
}
