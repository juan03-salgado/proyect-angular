import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fincas } from '../entitys/fincas';

@Injectable({
  providedIn: 'root'
})

export class FincasService {

  private api: string = 'http://localhost:3000/fincas'; 

  constructor(private http: HttpClient) { }      
  
  getFincas(): Observable<Fincas[]> {        
    return this.http.get<any[]>(this.api);     
}
  crearFinca(fincas: Fincas): Observable<Fincas>{
    return this.http.post<Fincas>(this.api, fincas);
  }

   actualizarFinca(fincas: any): Observable<any>{
    return this.http.put(`${this.api}/${fincas.id}`, fincas);       
  }

  eliminarFincaId(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

}