import { Component, OnInit } from '@angular/core';
import { Insumos } from '../../../entitys/insumos';
import { InsumosService } from '../../../service/insumos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insumo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './insumo-list.component.html',
  styleUrl: './insumo-list.component.css'
})
export class InsumoListComponent implements OnInit {

  insumos: Insumos[] = [];
  proveedores: any[] = [];
  buscarNombreInsumo: string = '';
  insumoFiltrado: Insumos[] = [];

  constructor(private insumoService: InsumosService) { }

  ngOnInit(): void {
    this.listInsumo();
    this.loadProveedores();
  }

  filtrarInsumo(){
    let filtrados = this.insumos;

  if (this.buscarNombreInsumo.trim() !== '') {
     filtrados = filtrados.filter(i => i.nombre.toLowerCase().includes(this.buscarNombreInsumo.trim().toLowerCase()));  
  }
    this.insumoFiltrado = filtrados;
  }

  listInsumo(){
    this.insumoService.getInsumos().subscribe(
      data => {
        this.insumos = data;
        this.insumoFiltrado = data;
        console.log("Insumos cargados:", this.insumos);
      },
    );
    (error: any) => {
      console.error("Error al cargar los insumos:", error);
    }
  }

  loadProveedores(){
    this.insumoService.getProveedores().subscribe(
      data => {
        this.proveedores = data;
        console.log("Proveedores cargados:", this.proveedores);
      },
    );
  }

  getNombreProveedor(proveedorId: number): string {
    const proveedor = this.proveedores.find(p => p.id === proveedorId);
    return proveedor ? proveedor.nombre : 'Desconocido';
  }

  deleteInsumo(id: number){
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result: any) => {
      if (result.isConfirmed){
       this.insumoService.eliminarInsumo(id).subscribe(
      () => this.listInsumo()
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¡Eliminado!',
      text: 'El insumo ha sido eliminado correctamente.',
      icon: 'success'
      });
    }
  });
}

  editInsumo(insumo: Insumos){
    console.log(insumo);
    this.insumoService.actualizarInsumo(insumo).subscribe(
      () => this.listInsumo()
    );
  }
}
