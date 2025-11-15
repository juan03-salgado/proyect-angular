import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Fincas } from '../../../entitys/fincas';
import { FincasService } from '../../../service/fincas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-fincas-list',
  standalone: true,                          
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './fincas-list.component.html',
  styleUrl: './fincas-list.component.css'
})

export class FincasListComponent implements OnInit {         

  paginaActual: number = 1;
  fincas: Fincas[] = []; 
  fincasFiltradas: Fincas[] = [];
  buscarNombreFinca: string = '';

  constructor(private fincasService: FincasService) {           
  }

  ngOnInit(): void {        
    this.listFincas();
    this.filtrarFinca();          
  }

  filtrarFinca(){
    let filtrados = this.fincas;
    
    if (this.buscarNombreFinca.trim() !== ''){
        filtrados = filtrados.filter(a => a.nombre.toLowerCase().includes(this.buscarNombreFinca.trim().toLowerCase())); 
      }
      this.fincasFiltradas = filtrados;
  }

  listFincas() {
    this.fincasService.getFincas().subscribe(      
      data => {                                                 
        this.fincas = data;
        this.fincasFiltradas = data;   
        console.log(this.fincas);       
      },
    );
  }
  
  deleteFinca(id: number) {
  // @ts-ignore
  Swal.fire({
    position: 'top',
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, bórralo!'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.fincasService.eliminarFincaId(id).subscribe(
        () => this.listFincas()
      );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: '¡Eliminado!',
        text: 'La finca ha sido eliminado correctamente.',
        icon: 'success'
      });
    }
  });
}

  editFinca(fincas: Fincas) {
    console.log(fincas);                                                
    this.fincasService.actualizarFinca(fincas).subscribe(    
     () => this.listFincas()                                         
  );
  }
}