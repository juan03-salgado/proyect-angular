import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Agricultores } from '../../entitys/agricultores';
import { AgricultoresService } from '../../service/agricultores.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agricultores-list',
  standalone: true,                          
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './agricultores-list.component.html',
  styleUrl: './agricultores-list.component.css'
})

export class AgricultoresListComponent implements OnInit {         

  agricultores: Agricultores[] = []; 
  agricultorFiltrado: Agricultores[] = [];
  buscarNombreAgricultor: string = '';

  constructor(private agricultoresService: AgricultoresService) {           
  }

  ngOnInit(): void {        
    this.listAgricultores();
    this.filtrarAgricultor();          
  }

  filtrarAgricultor(){
    let filtrados = this.agricultores;
    
    if (this.buscarNombreAgricultor.trim() !== ''){
        filtrados = filtrados.filter(a => a.nombre.toLowerCase().includes(this.buscarNombreAgricultor.trim().toLowerCase())); 
      }
      this.agricultorFiltrado = filtrados;
  }

  listAgricultores() {
    this.agricultoresService.getAgricultores().subscribe(      
      data => {                                                 
        this.agricultores = data;
        this.agricultorFiltrado = data;   
        console.log(this.agricultores);       
      },
    );
  }
  
  deleteAgricultor(id: number) {
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
      this.agricultoresService.eliminarAgricultorId(id).subscribe(
        () => this.listAgricultores()
      );
      // @ts-ignore
      Swal.fire({
        position: 'top',
        title: '¡Eliminado!',
        text: 'El agricultor ha sido eliminado correctamente.',
        icon: 'success'
      });
    }
  });
}

  editAgricultor(agricultor: Agricultores) {
    console.log(agricultor);                                                
    this.agricultoresService.actualizarAgricultor(agricultor).subscribe(    
     () => this.listAgricultores()                                         
  );
  }
}