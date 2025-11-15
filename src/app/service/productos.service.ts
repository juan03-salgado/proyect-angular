import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../entitys/productos';
import { Fincas } from '../entitys/fincas';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private api: string = 'http://localhost:3000/productos';

  constructor(private http:HttpClient) { }

  getFincas(): Observable<Fincas[]> {
  return this.http.get<Fincas[]>('http://localhost:3000/fincas');
}

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.api);
  }

  crearProducto(producto: FormData): Observable<Productos> {
    return this.http.post<Productos>(this.api, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarProducto(id: number, producto: FormData): Observable<any> {
    return this.http.put(`${this.api}/${id}`, producto);
  }
}
