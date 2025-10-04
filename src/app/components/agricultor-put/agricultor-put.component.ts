import { Component, OnInit } from '@angular/core';
import { AgricultoresService } from '../../service/agricultores.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-agricultor-put',
  imports: [FormsModule, RouterLink],                
  templateUrl: './agricultor-put.component.html',
  styleUrl: './agricultor-put.component.css'
})
export class AgricultorPutComponent implements OnInit {

  id : number = 0;
  nombre : string = '';
  email : string = '';
  telefono : string = '';
  ubicacion : string = '';

  constructor(
    private agricultoresService: AgricultoresService,
    private route: ActivatedRoute,                                
    private router: Router,
  ) {}            

  ngOnInit(): void {                                                            
    
    this.route.params.subscribe(params => {                                   
      const id = +params['id'];
      this.id = id;                                             
      this.loadAgricultor(this.id);                                           
    });
  }

  loadAgricultor(id: number) {                                              
    this.agricultoresService.getAgricultores().subscribe(
      data => {                                                             
        const agricultor = data.find(a => a.id === id);                     
        if (agricultor) {
          this.id = agricultor.id;
          this.nombre = agricultor.nombre;
          this.email = agricultor.email;
          this.telefono = agricultor.telefono;
          this.ubicacion = agricultor.ubicacion;
        } else {
          // @ts-ignore
          Swal.fire({
            position: 'top',
            title: 'Error',
            text: 'Agricultor no encontrado',
            icon: 'error'
          });        
        }
      }
    );
  }
  
  updateAgricultor(): void {                                     
    const agricultor = { id: this.id, nombre: this.nombre, email: this.email, telefono: this.telefono, ubicacion: this.ubicacion }; 
    console.log(agricultor);                                                
    this.agricultoresService.actualizarAgricultor(agricultor).subscribe(   
      () => console.log('Agricultor actualizado')                          
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: 'Agricultor actualizado con exito',
      text: 'El agricultor ha sido actualizado con exito',
      icon: 'success'
    }).then(() => {
    this.router.navigate(['/agricultores']);
  });
  }
}
  
    