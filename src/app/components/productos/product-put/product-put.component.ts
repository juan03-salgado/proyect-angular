import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../service/productos.service';
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
  tipo_producto: string = '';
  nombre: string = '';
  descripcion: string = '';
  unidades: number = 0;
  precio_unidad: number = 0;
  finca_id: number = 0;

  fincas: any[] = [];
  categorias: string[] = ['Vegetales', 'Frutas', 'Carnes', 'Lacteos']

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

      this.loadFincas();
    });
  }

  loadFincas() {
    this.productosService.getFincas().subscribe(
      (data: any[]) => {
        this.fincas = data;
        console.log('Fincas cargadas:', data);
      }
    );
    (error: any) => {
      console.error('Error al cargar las fincas:', error);
    }
  }

  loadProducto(id: number) {
    this.productosService.getProductos().subscribe(
      data => {
        const producto = data.find(a => a.id === id);
        if (producto) {
          this.id = producto.id;
          this.tipo_producto = producto.tipo_producto;
          this.nombre = producto.nombre;
          this.descripcion = producto.descripcion;
          this.unidades = producto.unidades;
          this.precio_unidad = producto.precio_unidad;
          this.finca_id = producto.finca_id;
          console.log('Producto cargado:', producto);
          
        } else {
          console.error('Producto no encontrado');
        }
      }
    );
  }

  updateProducto() {
  const producto = {
    id: this.id,
    tipo_producto: this.tipo_producto,
    nombre: this.nombre,
    descripcion: this.descripcion,
    unidades: this.unidades,
    precio_unidad: this.precio_unidad,
    finca_id: this.finca_id,
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

