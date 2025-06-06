import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductosService } from '../service/productos.service';
import { AgricultoresService } from '../service/agricultores.service';
import { InsumosService } from '../service/insumos.service';
import { MercadosService } from '../service/mercados.service';
import { ProveedoresService } from '../service/proveedores.service';

@Component({
  selector: 'app-home',
  standalone: true,                                
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  totalProductos: number = 0;
  totalInsumos: number = 0;
  totalAgricultores: number = 0;
  totalMercados: number = 0;
  totalProveedores: number = 0;

  constructor( 
    private productosService: ProductosService,
    private insumosService: InsumosService,
    private agricultoresService: AgricultoresService,
    private mercadosService: MercadosService,
    private proveedoresService: ProveedoresService,
  ) 
    { }

  ngOnInit(): void {
    // esto es para que se actualice el total de todos los datos de mis tablas
    this.productosService.getProductos().subscribe(productos => {this.totalProductos = productos.length;});
    this.insumosService.getInsumos().subscribe(insumos => {this.totalInsumos = insumos.length;});
    this.agricultoresService.getAgricultores().subscribe(agricultores => {this.totalAgricultores = agricultores.length;});
    this.mercadosService.getMercados().subscribe(mercados => {this.totalMercados = mercados.length;});
    this.proveedoresService.getProveedores().subscribe(proveedores => {this.totalProveedores = proveedores.length;});
  }
}
