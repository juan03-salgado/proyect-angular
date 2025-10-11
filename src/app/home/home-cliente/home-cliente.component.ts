import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../service/productos.service';
import { Productos } from '../../entitys/productos';
import { CommonModule } from '@angular/common';
import { Fincas } from '../../entitys/fincas';
import { RouterLink } from '@angular/router';
import { CarritoProductosService } from '../../service/carrito-productos.service';
import { carritoProductos } from '../../entitys/carritoProductos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent implements OnInit{

  productos: Productos[] = [];
  fincas: Fincas[] = [];
  buscarTipoProducto: string = 'Todos los productos';
  productoFiltrado: Productos[] = [];
  
  constructor(private productosService: ProductosService,
    private productosCarritoService: CarritoProductosService,
  ){ }

   ngOnInit(): void {
    this.listProductos();
    this.loadFincas();
  }

  agregarAlCarrito(producto: Productos) {
    const cantidad = 1; 

    if(producto.unidades <= 0){
      // @ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: `No quedan unidades disponibles de ${producto.nombre}`, 
      });
      return
    }
    
    const id_carrito = 1;

    const precio_total = producto.precio_unidad * cantidad;
    const nuevoItem = new carritoProductos(0, producto.id, cantidad, precio_total, id_carrito);

    this.productosCarritoService.agregarProductoCarrito(nuevoItem).subscribe({
      next: () => {
        // @ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: `${producto.nombre} agregado al carrito`,
        });
      },
      error: (err) => {
        console.error('Error al agregar al carrito:', err);
        // @ts-ignore
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: `No se pudo agregar ${producto.nombre} al carrito`,
        });
      }
    });
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

 filtrarProductos(){
    let filtrados = this.productos;

    if (this.buscarTipoProducto.trim() !== 'Todos los productos') {
      filtrados = filtrados.filter(i => i.tipo_producto.toLowerCase().includes(this.buscarTipoProducto.trim().toLowerCase()));
    } 
    this.productoFiltrado = filtrados;
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

}
