import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../service/compras.service';
import { Compras } from '../../entitys/compras';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-compras-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './compras-list.component.html',
  styleUrl: './compras-list.component.css'
})
export class ComprasListComponent implements OnInit {

  paginaActual: number = 1;
  compras: Compras[] = [];
  compraFiltrada: Compras[] = [];
  buscarCompra: string = '';

  constructor(private comprasService: ComprasService){}

  ngOnInit(): void { 
    this.listCompras();
  }

  listCompras() {
    this.comprasService.getCompras().subscribe(      
      data => {                                                 
        this.compras = data;
        this.compraFiltrada = data;   
        console.log(this.compras);       
      },
    );
  }

  filtrarCompra() {
    let filtrados = this.compras;
    
    if(this.buscarCompra.toString().trim() !== '') {
      filtrados = filtrados.filter(a => a.productos?.some(p => p.tipo_producto.toLowerCase().includes(this.buscarCompra.trim().toLowerCase()))
      ); 
    }
      this.compraFiltrada = filtrados;
  }

  deleteCompra(id: number) {
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
      this.comprasService.eliminarCompra(id).subscribe(
        () => this.listCompras()
      );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: '¡Eliminado!',
        text: 'La compra ha sido eliminada correctamente.',
        icon: 'success'
      });
    }
  });
}

}

