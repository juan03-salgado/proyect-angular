import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agricultores } from '../entitys/agricultores';


@Injectable({
  providedIn: 'root'
})

export class AgricultoresService {

  private api: string = 'http://localhost:8080/api-notas/agricultores'; 

  constructor(private http: HttpClient) { }      
  
  getAgricultores(): Observable<Agricultores[]> {        
    return this.http.get<any[]>(this.api);     
}
  crearAgricultor(agricultor: Agricultores): Observable<Agricultores>{
    return this.http.post<Agricultores>(this.api, agricultor);
  }

  eliminarAgricultorId(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarAgricultor(agricultor: any): Observable<any>{
    return this.http.put(`${this.api}/${agricultor.id}`, agricultor);       
  }
}