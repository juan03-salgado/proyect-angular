import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compras } from '../entitys/compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private api: string = 'https://agot-zaox.onrender.com/compras'

  constructor(private http: HttpClient) { }

  getCompras(): Observable<Compras[]>{
    return this.http.get<Compras[]>(this.api)
  }

  getComprasId(id: number): Observable<Compras[]>{
    return this.http.get<Compras[]>(`${this.api}/${id}`);
  }
    
  RealizarCompra(comprar: Compras): Observable<Compras> {
    return this.http.post<Compras>(this.api, comprar);
  }
    
  eliminarCompra(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
