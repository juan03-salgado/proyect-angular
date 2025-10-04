import { Component, OnInit } from '@angular/core';
import { FincasService } from '../../service/fincas.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-fincas-put',
  imports: [FormsModule, RouterLink],                
  templateUrl: './fincas-put.component.html',
  styleUrl: './fincas-put.component.css'
})
export class FincasPutComponent implements OnInit {

  id : number = 0;
  nombre : string = '';
  email : string = '';
  telefono : string = '';
  ubicacion : string = '';

  constructor(
    private fincasService: FincasService,
    private route: ActivatedRoute,                                
    private router: Router,
  ) {}            

  ngOnInit(): void {                                                            
    
    this.route.params.subscribe(params => {                                   
      const id = +params['id'];
      this.id = id;                                             
      this.loadFinca(this.id);                                           
    });
  }

  loadFinca(id: number) {                                              
    this.fincasService.getFincas().subscribe(
      data => {                                                             
        const finca = data.find(a => a.id === id);                     
        if (finca) {
          this.id = finca.id;
          this.nombre = finca.nombre;
          this.email = finca.email;
          this.telefono = finca.telefono;
          this.ubicacion = finca.ubicacion;
        } else {
          // @ts-ignore
          Swal.fire({
            position: 'top',
            title: 'Error',
            text: 'Finca no encontrada',
            icon: 'error'
          });        
        }
      }
    );
  }
  
  updateFinca(): void {                                     
    const finca = { id: this.id, nombre: this.nombre, email: this.email, telefono: this.telefono, ubicacion: this.ubicacion }; 
    console.log(finca);                                                
    this.fincasService.actualizarFinca(finca).subscribe(   
      () => console.log('Finca actualizada')                          
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: 'Finca actualizada con exito',
      text: 'La finca ha sido actualizada con exito',
      icon: 'success'
    }).then(() => {
    this.router.navigate(['/fincas']);
  });
  }
}
  
    