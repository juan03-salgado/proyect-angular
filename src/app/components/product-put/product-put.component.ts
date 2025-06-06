import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../service/productos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-put',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './product-put.component.html',
  styleUrl: './product-put.component.css'
})
export class ProductPutComponent implements OnInit {

  id: number = 0;
  nombre: string = '';
  precioEstimado: number = 0;
  descripcion: string = '';
  idAgricultor: number = 0;
  idMercado : number = 0;

  agricultores: any[] = [];
  mercados: any[] = [];

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id = id;
      this.loadProducto(this.id);

      this.loadAgricultores();
      this.loadMercados();
    });
  }

  loadAgricultores() {
    this.productosService.getAgricultores().subscribe(
      (data: any[]) => {
        this.agricultores = data;
        console.log('Agricultores cargados:', data);
      }
    );
    (error: any) => {
      console.error('Error al cargar los agricultores:', error);
    }
  }

  loadMercados() {
    this.productosService.getMercados().subscribe(
      (data: any[]) => {
        this.mercados = data;
      }
    );
    (error: any) => {
      console.error('Error al cargar los mercados:', error);
    }
  }

  loadProducto(id: number) {
    this.productosService.getProductos().subscribe(
      data => {
        const producto = data.find(a => a.id === id);
        if (producto) {
          this.id = producto.id;
          this.nombre = producto.nombre;
          this.precioEstimado = producto.precioEstimado;
          this.descripcion = producto.descripcion;
          this.idAgricultor = producto.agricultorId;
          this.idMercado = producto.mercadoId;
        } else {
          console.error('Producto no encontrado');
        }
      }
    );
  }

  updateProducto() {
  const producto = {
    id: this.id,
    nombre: this.nombre,
    precioEstimado: this.precioEstimado,
    descripcion: this.descripcion,
    agricultorId: this.idAgricultor,
    mercadoId: this.idMercado
  };

  console.log(producto); 
  this.productosService.actualizarProducto(producto).subscribe(
    () => 
      console.log('Producto actualizado')
    );
    //@ts-ignore
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Producto actualizado',
      text: 'El producto ha sido actualizado correctamente'
    }).then(() => {
    this.router.navigate(['/product']);
    });
  }
}

