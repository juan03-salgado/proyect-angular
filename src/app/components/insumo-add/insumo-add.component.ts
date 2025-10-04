import { Component, OnInit } from '@angular/core';
import { InsumosService } from '../../service/insumos.service';
import { Router, RouterModule } from '@angular/router';
import { Insumos } from '../../entitys/insumos';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insumo-add',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './insumo-add.component.html',
  styleUrl: './insumo-add.component.css'
})
export class InsumoAddComponent implements OnInit {

  id: number = 0;
  nombre: string = '';
  precioUnitario: number = 0;
  descripcion: string = '';
  cantidadDisponible: number = 0;
  idProveedor: number = 0;

  insumos: Insumos[] = [];
  proveedores: any[] = [];

  constructor(private insumosService: InsumosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(){
    this.insumosService.getProveedores().subscribe(
      data => {
        this.proveedores = data;
        console.log("Proveedores cargados:", this.proveedores);
      },
    );
    (error: any) => {
      console.error('Error al cargar los proveedores:', error);
      alert('No se pudieron cargar los proveedores');
    }
  }

  addInsumo(){
    if(!this.nombre || this.precioUnitario <= 0 || !this.descripcion || this.cantidadDisponible <= 0){
    // @ts-ignore
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Ops... algo salio mal',
      text: 'Por favor, complete todos los campos correctamente.',
    });
      return;
  }
    let insumo = new Insumos(this.id, this.nombre, this.precioUnitario, this.descripcion, this.cantidadDisponible, this.idProveedor);
    console.log(insumo);
    
    this.insumosService.crearInsumo(insumo).subscribe(
      data => console.log(data)
    );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Insumo agregado',
        text: 'El insumo ha sido agregado correctamente'
      }).then(() => {
        this.router.navigate(['/insumos']);
      });
    }
}