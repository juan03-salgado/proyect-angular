import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../service/clientes.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.css'
})
export class PerfilClienteComponent implements OnInit {

  cliente: any = null;
  usuario: any = null;
  seccion: string = '';
  editar: boolean = false;

  constructor(private clienteService: ClientesService,
    private usuarioService: UsuariosService,
    private router: Router
  ){}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const id_user = usuario.id;

    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.cliente = clientes.find((c: any) => c.id_user === id_user);
        console.log("Cliente obtenido", this.cliente);
      },
      error: (err) => {
        console.error("Error al obtener el cliente", err);
      }
    });
    
    this.usuarioService.getUsuariosId(id_user).subscribe({
      next: (usuarioData) => {
        this.usuario = usuarioData[0];
      },
      error: (err) => {
        console.error("Error al obtener usuario", err);
      }
    })
  };

  habilitarEdicion(){
    this.editar = true;
  }

  actualizarCliente(): void{
    this.clienteService.actualizarCliente(this.cliente).subscribe({
      next: () => {
        //@ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Perfil actualizado con exito'
        });
        this.editar = false;
      },
      error: (err) => {
        console.error(err);
        //@ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error al actualizar perfil',
          text: err.error?.error || 'Hubo un problema al guardar los cambios'
        });
      }
    });
  };

  actualizarUsuario(): void{
    this.usuarioService.actualizarUsuario(this.usuario).subscribe({
      next: () => {
        //@ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Informacion de cuenta actualizada con exito'
        });
        this.editar = false;
    },
      error: (err) => {
        console.error(err);
        //@ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error al actualizar cuenta',
          text: err.error?.error || 'Hubo un problema al guardar los cambios'
        });
      }
    });
  };

  eliminarCuenta(): void {
  // @ts-ignore
  Swal.fire({
    position: 'top',
    title: '¿Estás seguro?',
    text: "Se eliminara tu cuenta permanentemente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, eliminar!',
    cancelButtonText: 'Cancelar'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.clienteService.eliminarClienteId(this.cliente.id).subscribe({
        next: () => {
          localStorage.clear();
        //@ts-ignore
          Swal.fire({
            icon: 'success',
            title: 'Cuenta eliminada',
            text: 'Tu cuenta ha sido eliminada correctamente'
        }).then(() => {
            this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error(err);
        //@ts-ignore
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar cuenta',
          text: err.error?.error || 'No se pudo eliminar la cuenta'
        });
      }
    });
  }
});
}

}
