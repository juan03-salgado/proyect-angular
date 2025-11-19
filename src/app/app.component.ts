import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  standalone: true,  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router){}

  obtenerLogin(): boolean {
    return this.router.url === '/login'
  }

  esAdmin(): boolean {
    return localStorage.getItem('rol') === 'admin';
  }

  esUsuario(): boolean {
    return localStorage.getItem('rol') === 'cliente';
  }

  logoutAdmin(): void {
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar' 
    }).then((result: any) => {
      if(result.isConfirmed){
      localStorage.removeItem('logeado');
      localStorage.removeItem('rol');
      this.router.navigate(['/login']);
      }                            
    });
  }

  logoutUsuario(): void {
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: '¿Estás seguro de que deseas cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar' 
    }).then((result: any) => {
      if(result.isConfirmed){
      localStorage.removeItem('logeado');
      localStorage.removeItem('rol');
      this.router.navigate(['/login']);
      }                            
    });
  };
  
}
