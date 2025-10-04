import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insumos } from '../entitys/insumos';
import { Observable } from 'rxjs';
import { Proveedores } from '../entitys/proveedores';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private api: string = 'http://localhost:3000/insumos';

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<any>{
    return this.http.get<Proveedores>('http://localhost:3000/proveedores');
  }
  
  getInsumos(): Observable<Insumos[]>{
    return this.http.get<Insumos[]>(this.api);
  }

  crearInsumo(insumo: Insumos){
    return this.http.post(this.api, insumo);
  }

  eliminarInsumo(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarInsumo(insumo: Insumos){
    return this.http.put(`${this.api}/${insumo.id}`, insumo);
  }
}
