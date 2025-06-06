import { Component, OnInit } from '@angular/core';
import { Mercado } from '../../entitys/mercado';
import { MercadosService } from '../../service/mercados.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mercado-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mercado-list.component.html',
  styleUrl: './mercado-list.component.css'
})
export class MercadoListComponent implements OnInit {

  mercado: Mercado[] = [];
  buscarNombreMercado: string = '';
  mercadoFiltrado: Mercado[] = [];

  constructor(private mercadoService: MercadosService) { }

  ngOnInit(): void {
    this.listMercado();         
  }

  filtrarMercado() {
  let filtrados = this.mercado;
  if (this.buscarNombreMercado.trim() !== '') {            
    filtrados = filtrados.filter(i => i.nombre.toLowerCase().includes(this.buscarNombreMercado.trim().toLowerCase()));     
  } 
  this.mercadoFiltrado = filtrados;
}

  listMercado(){
    this.mercadoService.getMercados().subscribe(
      data => {
        this.mercado = data;
        this.mercadoFiltrado = data;
        console.log(this.mercado);
      },
    );
  }

  deleteMercado(id: number) {
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result: any) => {
      if (result.isConfirmed){
    this.mercadoService.eliminarMercadoId(id).subscribe(
     () => this.listMercado()
    );
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¡Eliminado!',
      text: 'El mercado ha sido eliminado.',
      icon: 'success',
      });
    }
  });
}
  editMercado(mercado: Mercado) {
    console.log(mercado);
    this.mercadoService.actualizarMercado(mercado).subscribe(
     data => this.listMercado = data
  );
  }
}
