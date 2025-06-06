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

  logout(): void {
    // @ts-ignore
    Swal.fire({
      position: 'top',
      title: 'Sesión cerrada',
      text: 'correctamente',
      icon: 'success'
    }).then(() => {                            
    localStorage.removeItem('logeado');
    this.router.navigate(['/login']);
    });
  }
}
