import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fincas } from '../../../entitys/fincas';
import { FincasService } from '../../../service/fincas.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fincas-add',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './fincas-add.component.html',
  styleUrl: './fincas-add.component.css'
})

export class FincasAddComponent implements OnInit{       //implementamos la interfaz OnInit para inicializar el componente

  id : number = 0;
  nombre : string = '';
  email : string = '';
  telefono : string = '';
  ubicacion : string = '';

  constructor(private fincasService: FincasService,              // inyectamos el servicio de fincas
      private router: Router,
  ) {}

  ngOnInit(): void {                                                      //este metodo sirve para inicializar el componente
  }

  addFinca(){
    if(!this.nombre || !this.email || !this.telefono || !this.ubicacion){  
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: 'Ops.. Algo salio mal',
        text: 'Por favor, complete todos los campos requeridos',
        icon: 'error'
    });
      return;
  } 
      let fincas = new Fincas(this.id, this.nombre, this.email, this.telefono, this.ubicacion);
      console.log(fincas);

      this.fincasService.crearFinca(fincas).subscribe(      // llamamos al servicio de fincas y nos suscribimos a la respuesta
        data => console.log(data)                                            
      );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: 'Finca creada con exito',
        icon: 'success',
      }).then(() => {
      this.router.navigate(['/fincas']);
      });
    }                              
  }

