import { Component, OnInit } from '@angular/core';
import { Productos } from '../../entitys/productos';
import { ProductosService } from '../../service/productos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Agricultores } from '../../entitys/agricultores';
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
  mercados: any[] = [];
  agricultores: any[] = [];
  buscarNombreProducto: string = '';
  productoFiltrado: Productos[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.listProductos();
    this.loadMercados();
    this.loadAgricultores();
  }

  filtrarProductos(){
    let filtrados = this.productos;

    if (this.buscarNombreProducto.trim() !== '') {
      filtrados = filtrados.filter(i => i.nombre.toLowerCase().includes(this.buscarNombreProducto.trim().toLowerCase()));
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
  
  loadAgricultores() {                                             // metodo que nos permite cargar los agricultores
  this.productosService.getAgricultores().subscribe(               
    (data: Agricultores[]) => {
      this.agricultores = data;
      console.log('Agricultores cargados:', data);
    }
    );
    (error: any) => {
      console.error('Error al cargar los agricultores:', error);
    }
}

  getNombreAgricultor(id: number): string {                            // este metodo nos permite obtener el nombre del agricultor para mostrarlo en el html 
  const agricultor = this.agricultores.find(a => a.id === id);
  return agricultor ? agricultor.nombre : 'Desconocido';
}

  loadMercados() {
  this.productosService.getMercados().subscribe(
    (data: any[]) => {
      this.mercados = data;
      console.log('Mercados cargados:', data);
    },
    );
    (error: any) => {
      console.error('Error al cargar los mercados:', error);
      alert('No se pudieron cargar los mercados. Verifica la conexión con el servidor.');
    }
  
}

  getNombreMercado(id: number): string {
  const mercado = this.mercados.find(m => m.id === id);
  return mercado ? mercado.nombre : 'Desconocido';
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
}

  editProductos(producto: Productos){
    console.log(producto);
    this.productosService.actualizarProducto(producto).subscribe(
      () => this.listProductos()
    );
  }
}
