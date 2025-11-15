import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../service/proveedores.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Proveedores } from '../../../entitys/proveedores';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-proveedores-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './proveedores-list.component.html',
  styleUrl: './proveedores-list.component.css'
})
export class ProveedoresListComponent implements OnInit{

  paginaActual: number = 1;
  proveedores: any[] = [];
  buscarNombreProveedor: string = '';
  proveedorFiltrado: Proveedores[] = [];

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit(): void { 
    this.listProveedores();  
  }

  filtrarProveedor(){
    let filtrados = this.proveedores;
    
    if(this.buscarNombreProveedor.trim() !== '') {
     filtrados = filtrados.filter(i => i.nombre.toString().includes(this.buscarNombreProveedor.trim()));
    }
    this.proveedorFiltrado = filtrados;
}

  listProveedores(){
    this.proveedoresService.getProveedores().subscribe(
      (data: Proveedores[]) => {
        this.proveedores = data;
        this.proveedorFiltrado = data;
        console.log('Proveedores cargados:', data);
      },
    );
    (error: any) => {
      console.error('Error al cargar los proveedores:', error);
    }
  }

  deleteProveedores(id: number){
    //@ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro?',
      text: '!No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result: any) => {
   if (result.isConfirmed) {
        this.proveedoresService.eliminarProveedor(id).subscribe(
          () => this.listProveedores()
        );
        // @ts-ignore
        Swal.fire({
          position: 'top',
          title: 'Eliminado',
          text: 'El proveedor ha sido eliminado correctamente.',
          icon: 'success',
        });
      }
    });
  }

  editProveedores(id: number){
    console.log(id);
    this.proveedoresService.actualizarProveedor(id).subscribe(
      () => this.listProveedores()
    );
  }
}
