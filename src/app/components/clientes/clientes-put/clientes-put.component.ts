import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../../service/clientes.service';

@Component({
  selector: 'app-clientes-put',
  imports: [FormsModule, RouterLink, FormsModule],
  templateUrl: './clientes-put.component.html',
  styleUrl: './clientes-put.component.css'
})
export class ClientesPutComponent implements OnInit{

  id: number = 0;
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  rol: number = 0;

  constructor(private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id = id;
      this.loadCliente(this.id);
  });
}

  loadCliente(id: number) {                                              
    this.clientesService.getClienteId(id).subscribe(
      data => {                                                             
        const cliente = data.find(a => a.id === id);                     
        if (cliente) {
          this.id = cliente.id;
          this.nombre = cliente.nombre;
          this.direccion = cliente.direccion;
          this.telefono = cliente.telefono;
          this.rol = cliente.rol;
        } else {
          // @ts-ignore
          Swal.fire({
            position: 'top',
            title: 'Error',
            text: 'Cliente no encontrado',
            icon: 'error'
          });        
        }
      }
    );
  }
  
  updateCliente(): void {                                     
    const cliente = { id: this.id, nombre: this.nombre, direccion: this.direccion, telefono: this.telefono, id_user: this.rol}; 
    console.log(cliente);                                                
    this.clientesService.actualizarCliente(cliente).subscribe(   
      () => console.log('Cliente actualizado')                          
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: 'Cliente actualizado con exito',
      text: 'El cliente ha sido actualizado con exito',
      icon: 'success'
    }).then(() => {
    this.router.navigate(['/clientes']);
  });
  }
}
