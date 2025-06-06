import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router){} 

   login(): void {
    if (this.username === 'User_admin' && this.password === 'Secret_password'){
      // @ts-ignore
        Swal.fire({
        position: 'top',
        title: 'Bienvenido ' + this.username,
        text: 'Has iniciado sesión correctamente',
        icon: 'success'
      }).then(() => {
      localStorage.setItem('logeado', 'true');
      this.router.navigate(['/home']);
      }); 

    } else if (this.username === '' || this.password === '') {
      // @ts-ignore
      Swal.fire({
      position: 'top',
      icon: 'info',
      title: '???',
      text: 'Digite un usuario y una contraseña'
      });
    }

    else {
      // @ts-ignore
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos'
      });
    }
  }
}
