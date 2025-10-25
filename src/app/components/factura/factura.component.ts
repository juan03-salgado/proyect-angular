import { Component, OnInit } from '@angular/core';
import { carritoProductos } from '../../entitys/carritoProductos';
import { CommonModule } from '@angular/common';
import { ComprasService } from '../../service/compras.service';
import { Compras } from '../../entitys/compras';
import { DetalleCompra } from '../../entitys/detalleCompra';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {

  productosCarrito: DetalleCompra[] = [];
  compras: Compras[] = [];
  referencia = '';
  nombreCliente = '';

  constructor( private comprasService: ComprasService){ }

  ngOnInit(): void {
    const state = history.state;
    const idCompra = state.idCompra;

    if (idCompra) {
      this.cargarFactura(idCompra);
      this.referenciaPago();
    }
  }

cargarFactura(idCompra: number) {
    this.comprasService.getComprasId(idCompra).subscribe({
      next: (res) => {
        if (res.length > 0) {
          const compra = res[0];
          this.productosCarrito = compra.productos || [];
          this.nombreCliente = compra.cliente || 'Desconocido';
          console.log('Factura cargada:', this.productosCarrito);
        }
      },
      error: (err) => console.error(err),
    });
  }

  referenciaPago(){
    this.referencia = 'REF-' + Math.floor(100000 + Math.random() * 90000);
  }
  
  precioTotalCarrito(){
    return this.productosCarrito.reduce((total, producto) => total + producto.precio_total, 0);
  }

}
