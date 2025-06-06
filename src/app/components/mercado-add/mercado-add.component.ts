import { Component, OnInit } from '@angular/core';
import { MercadosService } from '../../service/mercados.service';
import { Router, RouterLink } from '@angular/router';
import { Mercado } from '../../entitys/mercado';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mercado-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './mercado-add.component.html',
  styleUrl: './mercado-add.component.css'
})
export class MercadoAddComponent implements OnInit{

  id : number = 0;
  nombre : string = '';
  descripcion : string = '';

  constructor(private mercadoService: MercadosService,
      private router: Router,
  ) { }

  ngOnInit(): void {
  }

  addMercado(){
    let mercado = new Mercado(this.id, this.nombre, this.descripcion);
    console.log(mercado);

    this.mercadoService.crearMercado(mercado).subscribe(
      data => console.log(data)
      );
      if (!this.nombre || !this.descripcion) {
       // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops... Algo salio mal',
        text: 'Por favor, complete todos los campos.',
      })
      }else {
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Mercado creado',
        text: 'El mercado ha sido creado correctamente.'
      }).then(() => {
      this.router.navigate(['/mercado']);
      });
    }
  }
}
