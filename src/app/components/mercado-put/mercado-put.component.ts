import { Component, OnInit } from '@angular/core';
import { MercadosService } from '../../service/mercados.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mercado-put',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './mercado-put.component.html',
  styleUrl: './mercado-put.component.css'
})
export class MercadoPutComponent implements OnInit{

  id: number = 0;
  nombre : string = '';
  descripcion : string = '';

  constructor(private mercadoService: MercadosService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id = id;
      this.loadMercado(this.id);
    });
  }

  loadMercado(id: number) {
    this.mercadoService.getMercados().subscribe(
      data => {
        const mercado = data.find(m => m.id === id);
        if (mercado) {
          this.id = mercado.id;
          this.nombre = mercado.nombre;
          this.descripcion = mercado.descripcion;
        } else {
          console.error('Mercado no encontrado');
        }
      }
    );
  }

  updateMercado(){
    let mercado = {id: this.id, nombre: this.nombre, descripcion: this.descripcion};
    this.mercadoService.actualizarMercado(mercado).subscribe(
      () => {
        console.log("Mercado actualizado");
      }
    );

    if (mercado.nombre == '' || mercado.descripcion == '') {
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops... Algo salio mal',
        text: 'Por favor, complete todos los campos.'
      });
    } else {
      // @ts-ignore
        Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Mercado actualizado',
        text: 'El mercado ha sido actualizado correctamente.'
      }).then(() => {
      this.router.navigate(['/mercado']);
      });
    }
  }
}
