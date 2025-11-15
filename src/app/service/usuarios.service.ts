import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../entitys/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api: string = 'http://localhost:3000/usuarios'

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.api);
  }

  getUsuariosId(id: number): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.api}/${id}`);
  }
  
  crearUsuario(usuarios: Usuarios): Observable<Usuarios>{
    return this.http.post<Usuarios>(this.api, usuarios);
  }
  
  actualizarUsuario(usuarios: any): Observable<any>{
    return this.http.put(`${this.api}/${usuarios.id}`, usuarios);
  }
  
  eliminarUsuarioId(id: number): Observable<any>{
    return this.http.delete(`${this.api}/${id}`);
  }

  loginUsuario(nombre_user: string, contrasena: string): Observable<any>{
    return this.http.post<any>(`${this.api}/login`, { nombre_user, contrasena});
  }

}

