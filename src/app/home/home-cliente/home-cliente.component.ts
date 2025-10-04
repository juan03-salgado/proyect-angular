import { Component } from '@angular/core';
import { ProductosService } from '../../service/productos.service';
import { Productos } from '../../entitys/productos';
import { CommonModule } from '@angular/common';
import { Fincas } from '../../entitys/fincas';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-cliente',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent{

  productos: Productos[] = [];
  fincas: Fincas[] = [];
  buscarNombreProducto: string = '';
  productoFiltrado: Productos[] = [];

  constructor(private productosService: ProductosService,
    private router: Router
  ){
  }

   ngOnInit(): void {
    this.listProductos();
    this.loadFincas();
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
  logoutUsuario(): void {
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro de que deseas cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar' 
    }).then((result: any) => {
      if(result.isConfirmed){
      localStorage.removeItem('logeado');
      this.router.navigate(['/login']);
      }                            
    });
  }

}
