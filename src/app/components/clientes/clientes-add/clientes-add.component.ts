import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../service/usuarios.service';
import { Usuarios } from '../../../entitys/usuarios';

@Component({
  selector: 'app-clientes-add',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './clientes-add.component.html',
  styleUrl: './clientes-add.component.css'
})
export class ClientesAddComponent implements OnInit{

  id: number = 0;
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  id_user: number = 0;

  constructor(private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  addCliente(){
    if(!this.nombre || !this.direccion || !this.telefono || this.id_user <= 0){  
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: 'Ops.. Algo salio mal',
      text: 'Por favor, complete todos los campos requeridos',
      icon: 'error'
    });
      return;
    }
    let cliente = new Usuarios(this.id, this.nombre, this.direccion, this.telefono, this.id_user);
    console.log(cliente);

    this.usuariosService.crearUsuario(cliente).subscribe(     
        data => console.log(data)                                            
    );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: 'cliente creado con exito',
        icon: 'success',
      }).then(() => {
      this.router.navigate(['/clientes']);
      });
    }                              
  }



