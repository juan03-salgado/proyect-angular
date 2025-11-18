import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedores } from '../entitys/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private api: string = 'https://agot-zaox.onrender.com/proveedores';

  constructor(private http:HttpClient) { }

  getProveedores(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.api);
  }

  crearProveedor(proveedor: Proveedores): Observable<Proveedores> {
    return this.http.post<Proveedores>(this.api, proveedor);
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarProveedor(proveedor: any): Observable<any> {
    return this.http.put(`${this.api}/${proveedor.id}`, proveedor);
  }
}
