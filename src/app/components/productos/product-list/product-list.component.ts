import { Component, OnInit } from '@angular/core';
import { Productos } from '../../../entitys/productos';
import { ProductosService } from '../../../service/productos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Fincas } from '../../../entitys/fincas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productos: Productos[] = [];
  fincas: Fincas[] = [];
  buscarTipoProducto: string = '';
  productoFiltrado: Productos[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.listProductos();
    this.loadFincas();
  }

  filtrarProductos(){
    let filtrados = this.productos;

    if (this.buscarTipoProducto.trim() !== '') {
      filtrados = filtrados.filter(i => i.tipo_producto.toLowerCase().includes(this.buscarTipoProducto.trim().toLowerCase()));
    } 
    this.productoFiltrado = filtrados;
  }
  
  listProductos() {
  this.productosService.getProductos().subscribe(
    (data: Productos[]) => {
      this.productos = data;
      this.productoFiltrado = data;
      console.log('Productos cargados:', this.productos);
    },
  ),
   (error: any) => {
      console.error('Error al cargar los productos:', error);
    }
}
  
  loadFincas() {                                             
  this.productosService.getFincas().subscribe(
    (data: Fincas[]) => {
      this.fincas = data;
      console.log('Fincas cargadas:', data);
    }
    );
    (error: any) => {
      console.error('Error al cargar las fincas:', error);
    }
}

  getNombreFinca(id: number): string {                            
  const finca = this.fincas.find(a => a.id === id);
  return finca ? finca.nombre : 'Desconocido';
}

  deleteProductos(id: number){
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
    this.productosService.eliminarProducto(id).subscribe(
      () => this.listProductos()
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¡Eliminado!',
      text: 'El producto ha sido eliminado correctamente.',
      icon: 'success',
    });
    }
  });
};

  editProductos(producto: Productos){
    console.log(producto);
    this.productosService.actualizarProducto(producto).subscribe(
      () => this.listProductos()
    );
  }
}
