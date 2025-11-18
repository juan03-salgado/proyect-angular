import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carritoProductos } from '../entitys/carritoProductos';
import { Productos } from '../entitys/productos';

@Injectable({
  providedIn: 'root'
})
export class CarritoProductosService {

  private api: string = 'https://agot-zaox.onrender.com/productosCarrito'

  constructor(private http: HttpClient) { }

    getProductos(): Observable<Productos[]>{
      return this.http.get<Productos[]>('https://agot-zaox.onrender.com/productos')
    }
  
    getCarritoProductos(): Observable<carritoProductos[]> {
      return this.http.get<carritoProductos[]>(this.api);
    }
  
    agregarProductoCarrito(carritoProducto: carritoProductos): Observable<carritoProductos> {
      return this.http.post<carritoProductos>(this.api, carritoProducto);
    }
  
    eliminarProductoCarrito(id: number): Observable<any> {
      return this.http.delete(`${this.api}/${id}`);
    }
  
    actualizarProductoCarrito(carritoProducto: any): Observable<any> {
      return this.http.put(`${this.api}/${carritoProducto.id}`, carritoProducto);
    }
}
