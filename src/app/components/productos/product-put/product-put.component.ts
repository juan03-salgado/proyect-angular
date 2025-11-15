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
  nuevaImagen: File | null = null;
  imagenActual: string | File | null = null;

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
        const producto = data.find(prod => prod.id === id);
        if (producto) {
          this.id = producto.id;
          this.tipo_producto = producto.tipo_producto;
          this.nombre = producto.nombre;
          this.descripcion = producto.descripcion;
          this.unidades = producto.unidades;
          this.precio_unidad = producto.precio_unidad;
          this.finca_id = producto.finca_id;
          this.imagenActual = producto.imagen || null;
          console.log('Producto cargado:', producto);
          
        } else {
          console.error('Producto no encontrado');
        }
      }
    );
  }

  seleccionarImagen(event: any){
    this.nuevaImagen = event.target.files[0];
    if(this.nuevaImagen){
      this.imagenActual = null;
    }
  }

  updateProducto() {
  const producto = new FormData();
  producto.append('tipo_producto', this.tipo_producto);
  producto.append('nombre', this.nombre);
  producto.append('descripcion', this.descripcion);
  producto.append('unidades', this.unidades.toString());
  producto.append('precio_unidad', this.precio_unidad.toString());
  producto.append('finca_id', this.finca_id.toString());

  if(this.nuevaImagen){
    producto.append('imagen', this.nuevaImagen);
  }
  
  this.productosService.actualizarProducto(this.id, producto).subscribe(
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

