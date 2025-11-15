import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../entitys/clientes';
import { ClientesService } from '../../../service/clientes.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../../../entitys/usuarios';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-clientes-list',
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {

  paginaActual: number = 1;
  clientes: Clientes[] = [];
  clientesFiltrados: Clientes[] = [];
  buscarNombreCliente: string = '';
  usuarios: Usuarios[] = [];

  constructor(private clientesService: ClientesService){ }

  ngOnInit(): void {
    this.listClientes();
    this.loadUsuario();
  }

  filtrarCliente(){
    let filtrados = this.clientes;

    if (this.buscarNombreCliente.trim() !== ''){
        filtrados = filtrados.filter(a => a.nombre.toLowerCase().includes(this.buscarNombreCliente.trim().toLowerCase())); 
      }
      this.clientesFiltrados = filtrados;
  }

  listClientes() {
    this.clientesService.getClientes().subscribe(      
      data => {                                                 
        this.clientes = data;
        this.clientesFiltrados = data;   
        console.log(this.clientes);       
      },
    );
  }

  loadUsuario(){
    this.clientesService.getUsuarios().subscribe(
        (data: Usuarios[]) => {
          this.usuarios = data;
          console.log('Usuarios cargados:', data);
        }
        );
        (error: any) => {
          console.error('Error al cargar los usuarios:', error);
      }
  }

  deleteCliente(id: number){
    // @ts-ignore
  Swal.fire({
    position: 'top',
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, bórralo!'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.clientesService.eliminarClienteId(id).subscribe(
        () => this.listClientes()
      );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: '¡Eliminado!',
        text: 'El cliente ha sido eliminado correctamente.',
        icon: 'success'
      });
    }
  });
}
  editCliente(cliente: Clientes) {
      console.log(cliente);                                                
      this.clientesService.actualizarCliente(cliente).subscribe(    
       () => this.listClientes()                                         
    );
    }
}



