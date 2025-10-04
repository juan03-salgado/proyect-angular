import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../service/productos.service';
import { FincasService } from '../../service/fincas.service';
import { InsumosService } from '../../service/insumos.service';
import { ProveedoresService } from '../../service/proveedores.service';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-home',
  standalone: true,                                
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  totalProductos: number = 0;
  totalInsumos: number = 0;
  totalFincas: number = 0;
  totalProveedores: number = 0;
  totalClientes: number = 0;

  constructor( 
    private productosService: ProductosService,
    private insumosService: InsumosService,
    private fincasService: FincasService,
    private proveedoresService: ProveedoresService,
    private clientesService: ClientesService,
    private router: Router
  ) 
    { }

  ngOnInit(): void {
    // esto es para que se actualice el total de todos los datos de mis tablas
    this.productosService.getProductos().subscribe(productos => {this.totalProductos = productos.length;});
    this.insumosService.getInsumos().subscribe(insumos => {this.totalInsumos = insumos.length;});
    this.fincasService.getFincas().subscribe(fincas => {this.totalFincas = fincas.length;});
    this.proveedoresService.getProveedores().subscribe(proveedores => {this.totalProveedores = proveedores.length;});
    this.clientesService.getClientes().subscribe(clientes => {this.totalClientes = clientes.length;});
  }

  logout(): void {
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: 'Sesión cerrada',
      text: 'correctamente',
      icon: 'success'
    }).then(() => {                            
    localStorage.removeItem('logeado');
    this.router.navigate(['/login']);
    });
  }
}

