import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../service/productos.service';
import { Router, RouterModule } from '@angular/router';
import { Productos } from '../../entitys/productos';
import { FormsModule } from '@angular/forms';
import { Agricultores } from '../../entitys/agricultores';
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
  nombre: string = '';
  precioEstimado: number = 0;
  descripcion: string = '';
  idAgricultor: number = 0;
  idMercado:  number = 0;

  agricultores: Agricultores[] = [];
  mercados: any[] = [];

  constructor(private productosService: ProductosService,
    private router: Router,   
  ) { }

  ngOnInit(): void {
    this.loadAgricultores();
    this.loadMercados();
  }

  loadAgricultores() {
  this.productosService.getAgricultores().subscribe(
    (data: Agricultores[]) => {
      this.agricultores = data;
      console.log('Agricultores cargados:', data);
    },
    );
}

  loadMercados() {
  this.productosService.getMercados().subscribe(
    (data: any[]) => {
      this.mercados = data;
      console.log('Mercados cargados:', data);  
    }
  );
}

  addProducto(){
    let productos = new Productos(this.id, this.nombre, this.precioEstimado, this.descripcion, this.idAgricultor, this.idMercado);
    console.log(productos);

    this.productosService.crearProducto(productos).subscribe(
      data => console.log(data)
    );

    if(!this.nombre || this.precioEstimado <= 0 || !this.descripcion || this.idAgricultor <= 0 || this.idMercado <= 0) {
      //@ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops.. Algo salio mal',
        text: 'Por favor, complete todos los campos requeridos'
      })
    } else {
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
}

