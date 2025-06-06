import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InsumosService } from '../../service/insumos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insumo-put',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './insumo-put.component.html',
  styleUrl: './insumo-put.component.css'
})
export class InsumoPutComponent implements OnInit {

  id: number = 0;
  nombre: string = '';
  precioUnitario: number = 0;
  descripcion: string = '';
  cantidadDisponible: number = 0;
  idProveedor: number = 0;

  proveedores: any[] = [];

  constructor(private insumosService: InsumosService, 
    private route: ActivatedRoute, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id = id;
      this.loadInsumo(this.id);
      
      this.loadProveedores();
    });
  }

  loadProveedores(){
    this.insumosService.getProveedores().subscribe(
      (data: any[]) => {
        this.proveedores = data;
        console.log('Proveedores cargados:', data);
      }
    )
  }

  loadInsumo(id: number) {
    this.insumosService.getInsumos().subscribe(
      (data: any[]) => {
        const insumo = data.find(a => a.id === id);
        if (insumo) {
          this.id = insumo.id;
          this.nombre = insumo.nombre;
          this.precioUnitario = insumo.precioUnitario;
          this.descripcion = insumo.descripcion;
          this.cantidadDisponible = insumo.cantidadDisponible;
          this.idProveedor = insumo.proveedorId;
        }
      });
  }

  updateInsumo(){
    const insumo = {
      id: this.id,
      nombre: this.nombre,
      precioUnitario: this.precioUnitario,
      descripcion: this.descripcion,
      cantidadDisponible: this.cantidadDisponible,
      proveedorId: this.idProveedor
    };

    console.log(insumo);
    this.insumosService.actualizarInsumo(insumo).subscribe(
      () => 
        console.log('Insumo actualizado')
      );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Insumo actualizado',
        text: 'El insumo ha sido actualizado correctamente'
      }).then(() => {
      this.router.navigate(['/insumos']);
    });
  }
}




