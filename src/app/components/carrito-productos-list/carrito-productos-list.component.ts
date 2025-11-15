import { Component, OnInit } from '@angular/core';
import { carritoProductos } from '../../entitys/carritoProductos';
import { CarritoProductosService } from '../../service/carrito-productos.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Compras } from '../../entitys/compras';
import { ComprasService } from '../../service/compras.service';

@Component({
  selector: 'app-carrito-productos-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carrito-productos-list.component.html',
  styleUrl: './carrito-productos-list.component.css'
})
export class CarritoProductosListComponent implements OnInit {

  productosCarrito: carritoProductos[] = [];
  compras: Compras[] = [];

  constructor(private productosCarritoService: CarritoProductosService,
    private comprarService: ComprasService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.listCarritoProductos();
  }

  listCarritoProductos(){
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const id_carrito = usuario.id_carrito;

    if(!id_carrito) return;
  
    this.productosCarritoService.getCarritoProductos().subscribe(
      (data: carritoProductos[]) => {
        this.productosCarrito = data.filter(p => p.id_carrito === id_carrito);
        console.log('Productos cargados en el carrito:', this.productosCarrito)
      },
    ),
    (error: any) => {
      console.error('Error al cargar los productos:', error);
    }
  }

  precioTotalCarrito(){
    return this.productosCarrito.reduce((total, producto) => total + producto.precio_total, 0);
  }

  realizarCompra() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const id_carrito = usuario.id_carrito;

    if(!this.productosCarrito || this.productosCarrito.length === 0) {
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'No hay productos en el carrito',
      });
      return;
    };

    //@ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Deseas confirmar tu compra?',
      text: 'Se realizará la compra de los productos seleccionados',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if(result.isConfirmed) {
      let compra = new Compras(0, id_carrito, this.productosCarrito as any);

      this.comprarService.RealizarCompra(compra).subscribe({
      next: (res) => {
        const idCompra = res.id_compra;
        this.router.navigate(['/factura'], {state: {idCompra, productos: this.productosCarrito}})
        
        // @ts-ignore
        Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Compra realizada con éxito',
    });
      this.listCarritoProductos();
    },
      error: (err) => {
      console.error(err);
          // @ts-ignore
        Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error al procesar la compra',
        text: 'Inténtalo nuevamente más tarde.',
        });
      }
      });
    }
  });
}

  deleteProductoCarrito(id: number){
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result: any) => {
      if (result.isConfirmed) {
    this.productosCarritoService.eliminarProductoCarrito(id).subscribe(
      () => this.listCarritoProductos()
    );
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
