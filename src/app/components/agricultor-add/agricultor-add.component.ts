import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Agricultores } from '../../entitys/agricultores';
import { AgricultoresService } from '../../service/agricultores.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agricultor-add',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './agricultor-add.component.html',
  styleUrl: './agricultor-add.component.css'
})

export class AgricultorAddComponent implements OnInit{       //implementamos la interfaz OnInit para inicializar el componente

  id : number = 0;
  nombre : string = '';
  email : string = '';
  telefono : string = '';
  ubicacion : string = '';

  constructor(private agricultoresService: AgricultoresService,              // inyectamos el servicio de agricultores   
      private router: Router,
  ) {}

  ngOnInit(): void {                                                      //este metodo sirve para inicializar el componente
  }

  addAgricultor(){
    let agricultores = new Agricultores(this.id, this.nombre, this.email, this.telefono, this.ubicacion);
      console.log(agricultores);

      this.agricultoresService.crearAgricultor(agricultores).subscribe(      // llamamos al servicio de agricultores y nos suscribimos a la respuesta
        data => console.log(data)                                            
      );

      if(!this.nombre || !this.email || !this.telefono || !this.ubicacion){  
        // @ts-ignore
        Swal.fire({
          position: 'top',
          title: 'Ops.. Algo salio mal',
          text: 'Por favor, complete todos los campos requeridos',
          icon: 'error'
    });
      } else {
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: 'Agricultor creado con exito',
        icon: 'success',
      }).then(() => {
      this.router.navigate(['/agricultores']);
      });
    }                              
  }
}
