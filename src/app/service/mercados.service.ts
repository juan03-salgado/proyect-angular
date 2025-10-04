import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mercado } from '../entitys/mercado';

@Injectable({
  providedIn: 'root'
})
export class MercadosService {

  private api: string = 'http://localhost:8080/api-notas/mercados';

  constructor(private http:HttpClient) { }

  getMercados(): Observable<Mercado[]> {                 //Observable<any[]> es un tipo de dato que representa una secuencia de valores asíncronos
    return this.http.get<Mercado[]>(this.api);
  }

  crearMercado(mercado: Mercado): Observable<Mercado>{
    return this.http.post<Mercado>(this.api, mercado);
  }

  eliminarMercadoId(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
  
  actualizarMercado(mercado: any): Observable<any>{
    return this.http.put(`${this.api}/${mercado.id}`, mercado);
  }

}
