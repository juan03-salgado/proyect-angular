import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProveedoresService } from '../../service/proveedores.service';

@Component({
  selector: 'app-proveedor-put',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './proveedor-put.component.html',
  styleUrl: './proveedor-put.component.css'
})
export class ProveedorPutComponent implements OnInit {

  id: number = 0;
  nombre: string = '';
  email: string = '';
  direccion: string = '';
  telefono: string = '';

  constructor(
    private proveedoresService: ProveedoresService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id = id;
      this.loadProveedor(this.id);

    });
  }


  loadProveedor(id: number){
    this.proveedoresService.getProveedores().subscribe(
      data => {
        const proveedor = data.find(a => a.id === id);
        if(proveedor){
          this.id = proveedor.id;
          this.nombre = proveedor.nombre;
          this.email = proveedor.email;
          this.direccion = proveedor.direccion;
          this.telefono = proveedor.telefono;
        } else {
          // @ts-ignore
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Proveedor no encontrado',
          })
        }
      }
    );
  }

  updateProveedor(){
    const proveedor = {
      id: this.id, 
      nombre: this.nombre, 
      email: this.email, 
      direccion: this.direccion, 
      telefono: this.telefono, 
    };

    console.log(proveedor);
    this.proveedoresService.actualizarProveedor(proveedor).subscribe(
      () => 
        console.log('Proveedor actualizado')
    );  
    //@ts-ignore
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Proveedor actualizado',
      text: 'El proveedor ha sido actualizado correctamente'
    }).then(() => {
    this.router.navigate(['/proveedores']);
    });
  }
}
