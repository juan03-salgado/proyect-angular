import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../entitys/clientes';
import { Usuarios } from '../entitys/usuarios';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private api: string = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>('http://localhost:3000/usuarios');
  }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.api);
  }

  getClienteId(id: number): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.api}/${id}`);
  }

  crearCliente(clientes: Clientes): Observable<Clientes>{
    return this.http.post<Clientes>(this.api, clientes);
  }

  actualizarCliente(clientes: any): Observable<any>{
    return this.http.put(`${this.api}/${clientes.id}`, clientes);
  }

  eliminarClienteId(id: number): Observable<any>{
    return this.http.delete(`${this.api}/${id}`);
  }
}
