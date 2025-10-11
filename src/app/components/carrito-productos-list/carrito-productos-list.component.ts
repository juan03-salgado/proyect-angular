import { Component, OnInit } from '@angular/core';
import { carritoProductos } from '../../entitys/carritoProductos';
import { CarritoProductosService } from '../../service/carrito-productos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Productos } from '../../entitys/productos';
import { ProductosService } from '../../service/productos.service';
import { Compras } from '../../entitys/compras';
import { ComprasService } from '../../service/compras.service';

@Component({
  selector: 'app-carrito-productos-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carrito-productos-list.component.html',
  styleUrl: './carrito-productos-list.component.css'
})
export class CarritoProductosListComponent implements OnInit {

  productosCarrito: carritoProductos[] = [];
  productos: Productos[] = [];
  compras: Compras[] = [];

  constructor(private productosCarritoService: CarritoProductosService,
    private productosService: ProductosService,
    private comprarService: ComprasService
  ){
  }

  ngOnInit(): void {
    this.listCarritoProductos();
    this.loadProductos();
  }

  listCarritoProductos(){
    this.productosCarritoService.getCarritoProductos().subscribe(
      (data: carritoProductos[]) => {
        this.productosCarrito = data;
        console.log('Productos cargados en el carrito:', this.productosCarrito)
      },
    ),
    (error: any) => {
      console.error('Error al cargar los productos:', error);
    }
  }

   loadProductos() {                                             
    this.productosService.getProductos().subscribe(
      (data: Productos[]) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      }
      );
      (error: any) => {
        console.error('Error al cargar los productos:', error);
      }
  }

  precioTotalCarrito(){
    return this.productosCarrito.reduce((total, producto) => total + producto.precio_total, 0);
  }

  realizarCompra(){
    let compra = new Compras(0, 1);
    this.comprarService.RealizarCompra(compra).subscribe({
      next: (res) => {
        console.log(res)
        this.listCarritoProductos();
        // @ts-ignore
        Swal.fire({
        position: 'top',
        title: 'Se ha realizado la compra con exito',
        icon: 'success'
      })
    }, 
      error: (err) => {
      console.error(err.error)
        // @ts-ignore
        Swal.fire({
        position: 'top',
        title: 'Error al realizar la compra',
        icon: 'error'
      });
    }  
  }) 
}

  getNombreProducto(id: number): string {                            
  const producto = this.productos.find(a => a.id === id);
  return producto ? producto.nombre : 'Desconocido';
}

  getPrecioUnidad(id: number): number {
  const producto = this.productos.find(p => p.id === id);
  return producto ? producto.precio_unidad : 0;
}

  deleteProductoCarrito(id: number){
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
    this.productosCarritoService.eliminarProductoCarrito(id).subscribe(
      () => this.listCarritoProductos()
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¡Eliminado!',
      icon: 'success',
    });
    }
  });
};

  editProductoCarrito(productosCarrito: carritoProductos){
    console.log(productosCarrito)
    this.productosCarritoService.actualizarProductoCarrito(productosCarrito).subscribe(
      () => this.listCarritoProductos()
    );
  }
}
