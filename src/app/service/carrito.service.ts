import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../entitys/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private api: string = 'http://localhost:3000/carrito'

  constructor(private http: HttpClient) { }

  getCarrito(): Observable<Carrito[]>{
    return this.http.get<Carrito[]>(this.api);
  }

  getCarritoId(id: number): Observable<Carrito[]>{
    return this.http.get<Carrito[]>(`${this.api}/${id}`);
  }
}
