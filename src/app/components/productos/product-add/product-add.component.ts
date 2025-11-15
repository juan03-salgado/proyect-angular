import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../service/productos.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Fincas } from '../../../entitys/fincas';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{

  id: number = 0;
  tipo_producto: string = '';
  nombre: string = '';
  descripcion: string = '';
  unidades: number = 0;
  precio_unidad: number = 0;
  finca_id: number = 0;
  imagen: File | null = null;

  fincas: Fincas[] = [];
  categorias: string[] = ['Vegetales', 'Frutas', 'Carnes', 'Lacteos']

  constructor(private productosService: ProductosService,
    private router: Router,   
  ) { }

  ngOnInit(): void {
    this.loadFincas();
  }

  loadFincas() {
  this.productosService.getFincas().subscribe(
    (data: Fincas[]) => {
      this.fincas = data;
      console.log('Fincas cargadas:', data);
    },
  );
};

  seleccionarArchivo(event: any) {
    this.imagen = event.target.files[0] || null;
  }

  addProducto(){
    if(!this.tipo_producto || !this.nombre || !this.descripcion || this.unidades <= 0 || this.precio_unidad <= 0 || this.finca_id <= 0 || !this.imagen) {
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops.. Algo salio mal',
        text: 'Por favor, complete todos los campos requeridos'
    });
      return;
    };

    const producto = new FormData();
    producto.append('tipo_producto', this.tipo_producto);
    producto.append('nombre', this.nombre);
    producto.append('descripcion', this.descripcion);
    producto.append('unidades', this.unidades.toString());
    producto.append('precio_unidad', this.precio_unidad.toString());
    producto.append('finca_id', this.finca_id.toString());

    if(this.imagen){
      producto.append('imagen', this.imagen);
    }

    this.productosService.crearProducto(producto).subscribe(
      data => console.log(data)
    );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto ha sido creado correctamente.'
      }).then(() => {
      this.router.navigate(['/product']);
    });
  }
}


