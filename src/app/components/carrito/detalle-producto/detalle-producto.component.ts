import { Component, OnInit } from '@angular/core';
import { Productos } from '../../../entitys/productos';
import { ProductosService } from '../../../service/productos.service';
import { ActivatedRoute } from '@angular/router';
import { carritoProductos } from '../../../entitys/carritoProductos';
import { CarritoProductosService } from '../../../service/carrito-productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{

  producto!: Productos;
  
  constructor(private productosService: ProductosService,
    private carritoProductosService: CarritoProductosService,
    private router: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    console.log("Id recibido:", id);
  
    if (id) {
    this.cargarProducto(id);
  }
}

  cargarProducto(id: number) {
    this.productosService.getProductosId(id).subscribe(
      (producto: Productos) => {
        this.producto = producto;
        console.log("Producto cargado: ", producto)
      }
    );
  }

  agregarCarrito(){
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const id_carrito = usuario.id_carrito;

    const cantidad = 1;
    const precio_total = this.producto.precio_unidad * cantidad;

    const item = new carritoProductos(0, this.producto.id, cantidad, precio_total, id_carrito);

    this.carritoProductosService.agregarProductoCarrito(item).subscribe(() => {
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `${this.producto.nombre} agregado al carrito`,
      })
    })
  }
}
