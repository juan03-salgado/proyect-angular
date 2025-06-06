import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../entitys/productos';
import { Agricultores } from '../entitys/agricultores';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private api: string = 'http://localhost:8080/api-notas/productos';

  constructor(private http:HttpClient) { }

  getAgricultores(): Observable<Agricultores[]> {
  return this.http.get<Agricultores[]>('http://localhost:8080/api-notas/agricultores');
}

  getMercados(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8080/api-notas/mercados');
}

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.api);
  }

  crearProducto(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(this.api, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarProducto(producto: any): Observable<any> {
    return this.http.put(`${this.api}/${producto.id}`, producto);
  }
}
