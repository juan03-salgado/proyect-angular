import { Component, OnInit } from '@angular/core';
import { Compras } from '../../entitys/compras';
import { ComprasService } from '../../service/compras.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DetalleCompra } from '../../entitys/detalleCompra';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

@Component({
  selector: 'app-historial-cliente',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './historial-cliente.component.html',
  styleUrl: './historial-cliente.component.css'
})
export class HistorialClienteComponent implements OnInit {
  paginaActual: number = 1;
  idCliente: number = 0;
  compras: Compras[] = [];

  constructor(private comprasService: ComprasService){}

  ngOnInit(): void {
    this.cargarHistorial();
  }

cargarHistorial(){
    const clientes = localStorage.getItem('usuario')!;
     
    if(clientes) {
      const cliente = JSON.parse(clientes);
      this.idCliente = cliente.id_carrito;
    }

    this.comprasService.getCompras().subscribe({
      next: (res) => {
        this.compras = res.filter(c => c.id_carrito === this.idCliente);
        console.log("Compras del cliente", this.compras);
    }, 
      error: (err) => {
        console.error(err)
      }
    });
  }

  descargarFactura(compra: any) {
  const total = compra.productos.reduce((sum: number, p: any) => sum + p.precio_total, 0);
  const docDefinition: any = {
    content: [
      { text: 'Factura de Compra', style: 'title', alignment: 'center', margin: [0, 0, 0, 15] },

      {
        columns: [
          [ { text: `Compra #${compra.id_compra}`, style: 'subtitle', margin: [0, 0, 0, 5] },
            { text: `Cliente: ${compra.cliente}`, style: 'subtitle' }
          ],

          { qr: `Compra#${compra.id_compra} | Cliente: ${compra.cliente} | Total: $${total.toLocaleString('es-CO')}`,
            fit: 80,
            alignment: 'right'
          }
        ]
      },

      { text: '\n' },

      {
        table: {
          widths: ['*', '*', 'auto', 'auto'],
          body: [
            ['Producto', 'Tipo', 'Cantidad', 'Total'],
            ...compra.productos.map((p: any) => [
              p.producto,
              p.tipo_producto,
              p.cantidad,
              `$${p.precio_total.toLocaleString('es-CO')}`
            ])
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 10, 0, 0]
      },

      { text: `TOTAL: $${total.toLocaleString('es-CO')}`,
        style: 'total',
        alignment: 'right',
        margin: [0, 10, 0, 0]
      }
      
    ],
    styles: {
      title: { fontSize: 18, bold: true },
      subtitle: { fontSize: 12 },
      total: { fontSize: 14, bold: true }
    },
    defaultStyle: { fontSize: 12 }
  };

  pdfMake.createPdf(docDefinition).download(`Factura_Compra_${compra.id_compra}.pdf`);
}

totalCompra(productos?: DetalleCompra[]): number {
  return (productos || []).reduce((sum, p) => sum + p.precio_total, 0);
}

}
