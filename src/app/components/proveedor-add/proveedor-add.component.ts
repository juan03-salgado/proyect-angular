import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProveedoresService } from '../../service/proveedores.service';
import { Proveedores } from '../../entitys/proveedores';

@Component({
  selector: 'app-proveedor-add',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './proveedor-add.component.html',
  styleUrl: './proveedor-add.component.css'
})
export class ProveedorAddComponent implements OnInit {

  id: number = 0;
  nombre: string = '';
  email: string = '';
  direccion: string = '';
  telefono: string = '';

  constructor(private proveedorService: ProveedoresService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  addProveedor(){
    let proveedor = new Proveedores(this.id, this.nombre, this.email, this.direccion, this.telefono);
    this.proveedorService.crearProveedor(proveedor).subscribe(
      data => console.log(data)
    );
    
    if(!this.nombre || !this.email || !this.direccion || !this.telefono) {
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops... Algo salió mal',
        text: 'Por favor, complete todos los campos requeridos',
      })
    } else {
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Proveedor agregado',
        text: 'El proveedor ha sido agregado correctamente',
      }).then(() => {
        this.router.navigate(['/proveedores']);
      });
    }
  }
}

